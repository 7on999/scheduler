import pino from "pino";

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      destination: './pino-logger.log', 
      mkdir: true,
      ignore: 'pid,hostname',
    }
  }
})

export default logger
