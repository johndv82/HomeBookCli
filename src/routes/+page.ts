import { API_BASE_URL } from '$lib/constants';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/books/books`);
        if (!res.ok) {
            console.error('Failed to fetch books:', res.statusText);
            return { books: [] };
        }
        const data = await res.json();
        // Assuming the API returns an array of books directly, or a paginated response.
        // If it's paginated, it might be data.results.
        // For now, let's assume it might be data or data.results.
        const books = Array.isArray(data) ? data : (data.results || []);
        return { books };
    } catch (error) {
        console.error('Error fetching books:', error);
        return { books: [] };
    }
};
