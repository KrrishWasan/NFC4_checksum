import express from 'express'
import cors from 'cors'
import { ethers } from 'ethers'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true })) // Allow React frontend
app.use(express.json())

// Store nonces temporarily (use a DB in production)
const nonces = {}

// JWT secret key
const JWT_SECRET = 'your_super_secret_key'

// 1️⃣ Generate a nonce
app.get('/nonce/:address', (req, res) => {
  const { address } = req.params
  const nonce = Math.floor(Math.random() * 1000000) // random 6-digit number
  nonces[address.toLowerCase()] = nonce
  res.json({ nonce })
})

// 2️⃣ Verify signature
app.post('/verify', async (req, res) => {
  const { address, signature } = req.body
  const lowerAddress = address.toLowerCase()

  const nonce = nonces[lowerAddress]
  if (!nonce) {
    return res.status(400).json({ success: false, message: 'Nonce not found' })
  }

  try {
    // Recreate the signed message
    const message = `Sign this message to login: ${nonce}`

    // Recover address from signature
    const recoveredAddress = ethers.verifyMessage(message, signature).toLowerCase()
    console.log('Recovered:', recoveredAddress, '| Expected:', lowerAddress)

    if (recoveredAddress === lowerAddress) {
      const token = jwt.sign({ address: lowerAddress }, JWT_SECRET, { expiresIn: '1h' })
      delete nonces[lowerAddress] // nonce can't be reused
      return res.json({ success: true, token })
    } else {
      return res.status(401).json({ success: false, message: 'Signature verification failed' })
    }
  } catch (err) {
    console.error('Verification error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// 3️⃣ Start server
app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'))
