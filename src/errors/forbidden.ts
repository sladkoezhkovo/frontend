export interface RequestErrorProps {
    status: number
    message: string
}

export class RequestError extends Error {
    status: number
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export class TimeoutError extends Error {
    constructor(props: string) {
        super(props)
    }
}
