<script lang="ts">
    import {
        Container,
        Card,
        CardBody,
        Form,
        FormGroup,
        Input,
        Label,
        Button,
        Alert,
    } from "@sveltestrap/sveltestrap";
    import { API_BASE_URL } from "$lib/constants";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    let email = $state("");
    let password = $state("");
    let error = $state("");
    let loading = $state(false);

    // Check if user just registered
    let registered = $derived(
        $page.url.searchParams.get("registered") === "true",
    );

    async function handleLogin(e: Event) {
        e.preventDefault();
        error = "";
        loading = true;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/jwt/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                // Redirect to home or previous page
                goto("/");
            } else {
                console.error(
                    "Login failed:",
                    response.status,
                    response.statusText,
                );
                try {
                    const data = await response.json();
                    error = data.detail || "Credenciales inválidas";
                } catch (parseError) {
                    error = `Error ${response.status}: ${response.statusText}`;
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            error =
                "Error de conexión con el servidor. Verifique que el backend esté corriendo.";
        } finally {
            loading = false;
        }
    }
</script>

<Container class="py-5">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <Card class="shadow-sm border-0">
                <CardBody class="p-4">
                    <div class="text-center mb-4">
                        <h2 class="fw-bold">Iniciar Sesión</h2>
                        <p class="text-muted">Bienvenido de nuevo a HomeBook</p>
                    </div>

                    {#if registered}
                        <Alert color="success">
                            ¡Registro exitoso! Por favor inicia sesión.
                        </Alert>
                    {/if}

                    {#if error}
                        <Alert color="danger">{error}</Alert>
                    {/if}

                    <form onsubmit={handleLogin}>
                        <FormGroup class="mb-3">
                            <Label for="email">Correo Electrónico</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="nombre@ejemplo.com"
                                bind:value={email}
                                required
                            />
                        </FormGroup>
                        <FormGroup class="mb-4">
                            <Label for="password">Contraseña</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                bind:value={password}
                                required
                            />
                        </FormGroup>
                        <Button
                            color="primary"
                            block
                            class="w-100 mb-3"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Ingresando..." : "Ingresar"}
                        </Button>
                        <div class="text-center">
                            <small class="text-muted"
                                >¿No tienes una cuenta? <a
                                    href="/register"
                                    class="text-decoration-none">Regístrate</a
                                ></small
                            >
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    </div>
</Container>
