import { API_BASE_URL } from '$lib/constants';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/books/books`);
        if (!res.ok) {
            console.error('Failed to fetch books:', res.statusText);
            return { books: [], pagination: null };
        }
        const data = await res.json();

        // Handle the specific paginated structure
        const books = data.results || [];
        const pagination = {
            total_items: data.total_items,
            total_pages: data.total_pages,
            current_page: data.current_page,
            next: data.next,
            previous: data.previous
        };

        return { books, pagination };
    } catch (error) {
        console.error('Error fetching books:', error);
        return { books: [], pagination: null };
    }
};
