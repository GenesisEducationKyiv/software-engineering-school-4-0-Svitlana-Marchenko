export const RATE_API_URL =
   `${process.env.RATE_API_HOST}:${process.env.RATE_API_PORT}${process.env.RATE_API_PATH}` ||
   'http://localhost:3002/api/rate'

export const EVENT_API_URL =
   `${process.env.EVENT_API_HOST}:${process.env.EVENT_API_PORT}${process.env.EVENT_API_PATH}` ||
   'http://localhost:3004/api/event'
