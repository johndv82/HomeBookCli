<script lang="ts">
    import {
        Container,
        Row,
        Col,
        Button,
        Input,
    } from "@sveltestrap/sveltestrap";
    import Hero from "$lib/components/Hero.svelte";
    import BookCard from "$lib/components/BookCard.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    let { data } = $props();

    let searchTerm = $state($page.url.searchParams.get("search") || "");
    let ordering = $state($page.url.searchParams.get("ordering") || "");

    function handleSearch() {
        const query = new URLSearchParams($page.url.searchParams);
        if (searchTerm) {
            query.set("search", searchTerm);
        } else {
            query.delete("search");
        }
        // Reset page on new search if pagination exists
        query.delete("page");
        goto(`/?${query.toString()}`);
    }

    function handleSort(e: Event) {
        const target = e.target as HTMLSelectElement;
        ordering = target.value;
        const query = new URLSearchParams($page.url.searchParams);
        if (ordering) {
            query.set("ordering", ordering);
        } else {
            query.delete("ordering");
        }
        goto(`/?${query.toString()}`);
    }
</script>

<Hero />

<Container id="catalogo">
    <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3"
    >
        <h2 class="fw-bold mb-0">Libros Destacados</h2>

        <div
            class="d-flex gap-2 align-items-center flex-wrap justify-content-end"
        >
            <div class="d-flex gap-2">
                <Input
                    type="search"
                    placeholder="Buscar libros..."
                    bind:value={searchTerm}
                    onkeydown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button color="primary" onclick={handleSearch}>Buscar</Button>
            </div>

            <Input
                type="select"
                style="width: auto; min-width: 200px;"
                value={ordering}
                onchange={handleSort}
            >
                <option value="">Ordenar por...</option>
                <option value="price">Precio (Menor a Mayor)</option>
                <option value="-price">Precio (Mayor a Menor)</option>
                <option value="title">Título (A-Z)</option>
                <option value="-title">Título (Z-A)</option>
            </Input>
        </div>
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
