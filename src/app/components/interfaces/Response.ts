// reposta da api
export interface Response<T> {
    message?: string,
    data: T // generic, pode ser um comentário por exemplo, momento, etc.
}