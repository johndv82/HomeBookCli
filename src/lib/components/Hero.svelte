<script lang="ts">
    import { Container, Button } from "@sveltestrap/sveltestrap";
    import { auth } from "$lib/auth.svelte";
</script>

<div class="hero-section text-center py-5 mb-5">
    <Container>
        {#if auth.loading}
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        {:else if auth.isAuthenticated && auth.user}
            <h1 class="display-4 fw-bold mb-3">
                Hola, {auth.user.first_name || auth.user.username}!
            </h1>
            <p class="lead text-muted mb-4">
                Nos alegra verte de nuevo. ¿Qué te gustaría comprar hoy?
            </p>
        {:else}
            <h1 class="display-4 fw-bold mb-3">Bienvenido a HomeBook</h1>
            <p class="lead text-muted mb-4">
                Descubre mundos, historias y conocimientos en nuestra colección
                extensa de libros.
            </p>
            <div class="d-flex justify-content-center gap-3">
                <Button
                    color="primary"
                    size="lg"
                    class="px-5 rounded-pill shadow-sm"
                    href="#catalogo">Explorar Catálogo</Button
                >
                <Button
                    color="outline-primary"
                    size="lg"
                    class="px-5 rounded-pill shadow-sm"
                    href="/login">Iniciar Sesión</Button
                >
            </div>
        {/if}
    </Container>
</div>

<style>
    .hero-section {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        padding-top: 4rem;
        padding-bottom: 4rem;
        border-bottom: 1px solid #dee2e6;
    }
</style>
