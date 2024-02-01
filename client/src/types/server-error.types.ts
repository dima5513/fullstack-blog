export interface IValidationError {
    statusCode: number
    message: {
        property: string
        errors: string[]
    }[]
    error: string
}

export interface IServerError {
    statusCode: number
    message: string
    error: string
}
