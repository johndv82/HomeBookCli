<script lang="ts">
    import { onMount } from "svelte";
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
    import { API_BASE_URL } from "$lib/constants";

    interface User {
        id: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
    }

    let { data } = $props();
    let user = $state<User | null>(null);
    let isAuthenticated = $state(false);
    let authLoading = $state(true);

    onMount(async () => {
        console.log("Component mounted, starting auth check...");
        await checkAuth();
        // authLoading = false; // Moved to finally block in checkAuth
    });

    const CACHE_INTERVAL = 5 * 60 * 1000; // 5 minutes

    async function checkAuth() {
        const token = localStorage.getItem("access_token");
        console.log(
            "Checking token in localStorage:",
            token ? "Found" : "Not found",
        );

        if (!token) {
            authLoading = false;
            return;
        }

        // Check cache first
        const lastFetched = Number(
            localStorage.getItem("user_last_fetched") || "0",
        );
        const now = Date.now();
        const cachedUser = localStorage.getItem("user_profile");

        if (cachedUser && now - lastFetched < CACHE_INTERVAL) {
            console.log("Using cached user profile");
            user = JSON.parse(cachedUser);
            isAuthenticated = true;
            authLoading = false;
            return;
        }

        try {
            // Verify token
            console.log("Verifying token with backend...");
            const verifyRes = await fetch(`${API_BASE_URL}/auth/jwt/verify/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            console.log("Verify response status:", verifyRes.status);

            if (verifyRes.ok) {
                console.log("Token is valid, fetching user profile...");
                await fetchUser(token);
            } else if (verifyRes.status === 429) {
                console.warn("Verify throttled (429).");
                if (cachedUser) {
                    console.log("Using cached user profile as fallback");
                    user = JSON.parse(cachedUser);
                    isAuthenticated = true;
                }
            } else {
                console.warn("Token invalid or expired, attempting refresh...");
                await refreshToken();
            }
        } catch (err) {
            console.error("Auth check failed with error:", err);
            // Don't logout immediately on network error, maybe just fail silently for now
            if (cachedUser) {
                user = JSON.parse(cachedUser);
                isAuthenticated = true;
            }
        } finally {
            authLoading = false;
        }
    }

    async function refreshToken() {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) {
            console.warn("No refresh token found, logging out.");
            logout();
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/auth/jwt/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Token refreshed successfully.");
                localStorage.setItem("access_token", data.access);
                await fetchUser(data.access);
            } else {
                console.error("Refresh failed:", res.status);
                logout();
            }
        } catch (err) {
            console.error("Refresh error:", err);
            logout();
        }
    }

    async function fetchUser(token: string) {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/users/me/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                user = await res.json();
                console.log("User fetched successfully:", user);
                isAuthenticated = true;
                // Cache user profile
                localStorage.setItem("user_profile", JSON.stringify(user));
                localStorage.setItem(
                    "user_last_fetched",
                    Date.now().toString(),
                );
            } else if (res.status === 429) {
                console.warn("Fetch user throttled (429)");
                // Try to use cache even if expired?
                const cachedUser = localStorage.getItem("user_profile");
                if (cachedUser) {
                    user = JSON.parse(cachedUser);
                    isAuthenticated = true;
                }
            } else {
                console.error("Failed to fetch user profile:", res.status);
            }
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    }

    function logout() {
        console.log("Logging out...");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_profile");
        localStorage.removeItem("user_last_fetched");
        localStorage.removeItem("token_last_verified");
        isAuthenticated = false;
        user = null;
    }
</script>

<div class="hero-section text-center py-5 mb-5">
    <Container>
        {#if authLoading}
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        {:else if isAuthenticated && user}
            <h1 class="display-4 fw-bold mb-3">
                Hola, {user.first_name || user.username}!
            </h1>
            <p class="lead text-muted mb-4">
                Nos alegra verte de nuevo. ¿Qué te gustaría leer hoy?
            </p>
        {:else}
            <h1 class="display-4 fw-bold mb-3">Bienvenido a HomeBook</h1>
            <p class="lead text-muted mb-4">
                Descubre mundos, historias y conocimientos en nuestra colección
                curada de libros.
            </p>
            <div class="d-flex justify-content-center gap-3">
                <Button
                    color="primary"
                    size="lg"
                    class="px-5 rounded-pill shadow-sm"
                    >Explorar Catálogo</Button
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
