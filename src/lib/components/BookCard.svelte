<script lang="ts">
    import {
        Card,
        CardBody,
        CardTitle,
        CardSubtitle,
        CardImg,
        Button,
    } from "@sveltestrap/sveltestrap";
    import type { Book } from "$lib/types";

    let { book } = $props<{ book: Book }>();
</script>

<Card class="h-100 shadow-sm border-0 book-card overflow-hidden">
    <div class="position-relative">
        {#if book.cover_url}
            <CardImg
                top
                src={book.cover_url}
                alt={book.title}
                style="height: 320px; object-fit: cover;"
            />
        {:else}
            <div
                class="bg-light d-flex align-items-center justify-content-center text-muted"
                style="height: 320px;"
            >
                <span class="fs-1">📖</span>
            </div>
        {/if}
        <div
            class="card-overlay d-flex align-items-center justify-content-center"
        >
            <Button
                color="light"
                class="rounded-circle mx-1 shadow-sm"
                title="Ver Detalles"
                href={`/books/${book.id}`}>👁️</Button
            >
            <Button
                color="primary"
                class="rounded-circle mx-1 shadow-sm"
                title="Añadir al Carrito">🛒</Button
            >
        </div>
    </div>
    <CardBody class="d-flex flex-column p-3">
        <CardTitle class="mb-1 fw-bold text-truncate" title={book.title}
            >{book.title}</CardTitle
        >
        <CardSubtitle class="mb-2 text-muted small"
            >{book.author || "Autor Desconocido"}</CardSubtitle
        >
        <div class="mt-auto d-flex justify-content-between align-items-center">
            <span class="h5 mb-0 fw-bold text-primary"
                >${book.price || "0.00"}</span
            >
        </div>
    </CardBody>
</Card>

<style>
    :global(.book-card) {
        transition: all 0.3s ease;
    }

    :global(.book-card:hover) {
        transform: translateY(-5px);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    }

    .card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    :global(.book-card:hover) .card-overlay {
        opacity: 1;
    }
</style>
