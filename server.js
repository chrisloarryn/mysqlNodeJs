// Import .env configurations
const { loadConfig } = require('./config/config')

// process.on('uncaughtException', err => {
//   console.log(`▶️ ${err} ◀️`)
//   console.log(`UNCAUGHT REJECTION! 💥 Shutting down...`)
//   process.exit(1) // 0 success, 1 failure
// })

// Initialize configurations
loadConfig()

// Import app
const app = require('./app')
const port = process.env.PORT || 3000

// Run server on ${port}
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... 😊`)
})

// process.on('unhandledRejection', err => {
//   console.log(`▶️ ${err.name}: ${err.message} ◀️`)
//   console.log(`UNHANDLED REJECTION! 💥 Shutting down...`)
//   server.close(() => {
//     process.exit(1) // 0 success, 1 failure
//   })
// })

// process.on('SIGTERM', () => {
//   console.log(`✋ SIGTERM RECEIVED. Shutting down gracefully`)
//   server.close(() => {
//     console.log(`💥 Process terminated`)
//   })
// })
