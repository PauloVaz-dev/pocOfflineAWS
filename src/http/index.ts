export interface HttpResponse {
    statusCode: number
    body?: string
}

export const success = (body?: any): HttpResponse => ({
    statusCode: 201,
    body: body ? JSON.stringify(body) : undefined
})

export const response = (statusCode: number, body: any): HttpResponse => ({
    statusCode,
    body: JSON.stringify(body)
})
