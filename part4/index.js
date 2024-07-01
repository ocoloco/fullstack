// Ejercicios 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7
// 4.8, 4.9, 4.10, 4.11, 4.12, 4.13, 4.14, 4.15, 4.16
// 4.17, 4.18, 4.19, 4.20, 4.21, 4.22, 4.23

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
