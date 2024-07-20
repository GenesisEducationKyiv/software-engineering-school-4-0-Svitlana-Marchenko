import { BaseError } from "../base.error";

export default class AddUserError extends BaseError {
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };

    constructor(params?: {message?: string, logging?: boolean, context?: { [key: string]: any }}) {
        const {message, logging } = params || {};

        super(params?.message || "AddUserError");
        this._logging = logging || false;
        this._context = params?.context || {};

        Object.setPrototypeOf(this, AddUserError.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this._context }];
    }

    get logging() {
        return this._logging;
    }
}