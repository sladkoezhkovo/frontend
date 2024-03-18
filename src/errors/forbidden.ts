
export interface RequestErrorProps {
    status: number
    message: string
}

export class RequestError extends Error {
    status: number
    constructor(props: RequestError) {
        super(props.message)
        this.status = props.status
    }
}

export class TimeoutError extends Error {
    constructor(props: string) {
        super(props);
    }

}