import { Request, Response } from 'express'

export interface IRateController {
   getRate(req: Request, res: Response): Promise<Response>
}
