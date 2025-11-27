import { API_BASE_URL } from '$lib/constants';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const { id } = params;

    try {
        const res = await fetch(`${API_BASE_URL}/api/books/books/${id}/`);

        if (!res.ok) {
            if (res.status === 404) {
                error(404, 'Libro no encontrado');
            }
            error(res.status, 'Error al cargar el libro');
        }

        const book = await res.json();
        return { book };
    } catch (err: any) {
        if (err?.status) throw err;
        console.error('Error fetching book detail:', err);
        error(500, 'Error interno del servidor');
    }
};
