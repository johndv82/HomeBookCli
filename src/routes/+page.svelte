<script lang="ts">
    import { Container, Row, Col, Button } from "@sveltestrap/sveltestrap";
    import Hero from "$lib/components/Hero.svelte";
    import BookCard from "$lib/components/BookCard.svelte";

    let { data } = $props();
</script>

<Hero />

<Container id="catalogo">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Libros Destacados</h2>
        <Button color="link" class="text-decoration-none"
            >Ver todos &rarr;</Button
        >
    </div>

    {#if data.books.length === 0}
        <div class="text-center py-5">
            <p class="text-muted lead">
                No se encontraron libros disponibles en este momento.
            </p>
        </div>
    {:else}
        <Row>
            {#each data.books as book}
                <Col sm="6" md="4" lg="3" class="mb-4">
                    <BookCard {book} />
                </Col>
            {/each}
        </Row>
    {/if}
</Container>
