<script lang="ts">
    import {
        Container,
        Row,
        Col,
        Button,
        Badge,
        Breadcrumb,
        BreadcrumbItem,
    } from "@sveltestrap/sveltestrap";
    import type { BookDetail } from "$lib/types";

    let { data } = $props();
    let book = $derived(data.book as BookDetail);
</script>

<Container class="py-5">
    <Breadcrumb class="mb-4">
        <BreadcrumbItem><a href="/">Inicio</a></BreadcrumbItem>
        <BreadcrumbItem active>{book.title}</BreadcrumbItem>
    </Breadcrumb>

    <Row>
        <Col md="4" class="mb-4">
            {#if book.cover_url}
                <img
                    src={book.cover_url}
                    alt={book.title}
                    class="img-fluid rounded shadow w-100"
                />
            {:else}
                <div
                    class="bg-light d-flex align-items-center justify-content-center text-muted rounded shadow"
                    style="height: 400px;"
                >
                    <span class="fs-1">📖</span>
                </div>
            {/if}
        </Col>
        <Col md="8">
            <h1 class="fw-bold mb-2">{book.title}</h1>
            {#if book.subtitle}
                <h4 class="text-muted mb-3">{book.subtitle}</h4>
            {/if}

            <div class="mb-3">
                {#each book.authors as author}
                    <Badge color="info" class="me-2 text-decoration-none"
                        >{author.name || "Autor Desconocido"}</Badge
                    >
                {/each}
            </div>

            <div class="d-flex align-items-center mb-4">
                <h2 class="text-primary fw-bold mb-0 me-3">${book.price}</h2>
                {#if book.stock > 0}
                    <Badge color="success">En Stock ({book.stock})</Badge>
                {:else}
                    <Badge color="danger">Agotado</Badge>
                {/if}
            </div>

            <p class="lead">
                {book.description || "Sin descripción disponible."}
            </p>

            <div class="d-grid gap-2 d-md-flex mt-4">
                <Button color="primary" size="lg" disabled={book.stock === 0}
                    >Añadir al Carrito</Button
                >
                <Button color="outline-secondary" size="lg"
                    >Añadir a Favoritos</Button
                >
            </div>

            <hr class="my-5" />

            <h5 class="fw-bold">Detalles del Producto</h5>
            <Row class="mt-3">
                <Col sm="6">
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <strong>ISBN-13:</strong>
                            {book.isbn_13 || "N/A"}
                        </li>
                        <li class="mb-2">
                            <strong>ISBN-10:</strong>
                            {book.isbn_10 || "N/A"}
                        </li>
                        <li class="mb-2">
                            <strong>Año de Publicación:</strong>
                            {book.published_year}
                        </li>
                    </ul>
                </Col>
                <Col sm="6">
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <strong>Páginas:</strong>
                            {book.pages || "N/A"}
                        </li>
                        <li class="mb-2">
                            <strong>Idioma:</strong>
                            {book.language}
                        </li>
                        <li class="mb-2"><strong>OLID:</strong> {book.olid}</li>
                    </ul>
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
