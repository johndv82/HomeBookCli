export interface Book {
    id: number;
    title: string;
    author: string; // Adjust based on actual API response
    price: number;
    cover_image?: string; // Adjust based on actual API response
    description?: string;
    stock?: number;
}
