export interface Book {
    id: number;
    olid: string;
    isbn_10: string | null;
    isbn_13: string | null;
    title: string;
    subtitle: string | null;
    published_year: string;
    pages: number | null;
    language: string;
    cover_url: string;
    price: string;
    stock: number;
    author?: string; // Kept as optional for UI compatibility, though not in example JSON
}

export interface PaginatedBooksResponse {
    total_items: number;
    total_pages: number;
    current_page: number;
    next: string | null;
    previous: string | null;
    results: Book[];
}
