import { BaseError } from '../base.error'

export default class SendEmailError extends BaseError {
   private readonly _logging: boolean
   private readonly _context: { [key: string]: any }

   constructor(params?: {
      message?: string
      logging?: boolean
      context?: { [key: string]: any }
   }) {
      super(params?.message || 'Error sending email')
      this._logging = params?.logging || false
      this._context = params?.context || {}
   }

   get errors() {
      return [{ message: this.message, context: this._context }]
   }

   get logging() {
      return this._logging
   }
}
