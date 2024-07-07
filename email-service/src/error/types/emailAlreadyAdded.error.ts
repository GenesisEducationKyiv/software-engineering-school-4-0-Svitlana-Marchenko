import { BaseError } from "../base.error";

export default class EmailAlreadyAddedError extends BaseError {
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };

    constructor(params?: {message?: string, logging?: boolean, context?: { [key: string]: any }}) {
        const {message, logging } = params || {};

        super(params?.message || "Email has been already added");
        this._logging = logging || false;
        this._context = params?.context || {};

        Object.setPrototypeOf(this, EmailAlreadyAddedError.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this._context }];
    }

    get logging() {
        return this._logging;
    }
}