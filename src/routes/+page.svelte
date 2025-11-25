<script lang="ts">
    import {
        Container,
        Row,
        Col,
        Card,
        CardBody,
        CardTitle,
        CardSubtitle,
        CardText,
        Button,
        CardImg,
    } from "@sveltestrap/sveltestrap";

    let { data } = $props();
</script>

<div class="hero-section text-center py-5 mb-5">
    <Container>
        <h1 class="display-4 fw-bold mb-3">Bienvenido a HomeBook</h1>
        <p class="lead text-muted mb-4">
            Descubre mundos, historias y conocimientos en nuestra colección
            curada de libros.
        </p>
        <Button color="primary" size="lg" class="px-5 rounded-pill shadow-sm"
            >Explorar Catálogo</Button
        >
    </Container>
</div>

<Container>
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
            <p class="small text-muted">
                Asegúrate de que la API esté corriendo en http://127.0.0.1:8000/
            </p>
        </div>
    {:else}
        <Row>
            {#each data.books as book}
                <Col sm="6" md="4" lg="3" class="mb-4">
                    <Card
                        class="h-100 shadow-sm border-0 book-card overflow-hidden"
                    >
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
                                    title="Ver Detalles">👁️</Button
                                >
                                <Button
                                    color="primary"
                                    class="rounded-circle mx-1 shadow-sm"
                                    title="Añadir al Carrito">🛒</Button
                                >
                            </div>
                        </div>
                        <CardBody class="d-flex flex-column p-3">
                            <CardTitle
                                class="mb-1 fw-bold text-truncate"
                                title={book.title}>{book.title}</CardTitle
                            >
                            <CardSubtitle class="mb-2 text-muted small"
                                >{book.author ||
                                    "Autor Desconocido"}</CardSubtitle
                            >
                            <div
                                class="mt-auto d-flex justify-content-between align-items-center"
                            >
                                <span class="h5 mb-0 fw-bold text-primary"
                                    >${book.price || "0.00"}</span
                                >
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            {/each}
        </Row>
    {/if}
</Container>

<style>
    .hero-section {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        padding-top: 4rem;
        padding-bottom: 4rem;
        border-bottom: 1px solid #dee2e6;
    }

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
