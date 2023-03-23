export interface Moment{
    id?: number,
    title: string,
    description: string,
    image: string, // string = caminho da imagem
    createdAt?: string,
    updatedAt?: string,
    comment?: [{text: string, username: string}];
}