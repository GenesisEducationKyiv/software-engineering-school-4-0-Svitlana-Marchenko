export type CustomErrorContent = {
   message: string
   context?: { [key: string]: any }
}

export abstract class BaseError extends Error {
   abstract readonly errors: CustomErrorContent[]
   abstract readonly logging: boolean

   protected constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, BaseError.prototype)
   }
}
