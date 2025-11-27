<script lang="ts">
    import {
        Container,
        Card,
        CardBody,
        FormGroup,
        Input,
        Label,
        Button,
        Alert,
    } from "@sveltestrap/sveltestrap";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { auth } from "$lib/auth.svelte";

    let email = $state("");
    let password = $state("");

    // Check if user just registered
    let registered = $derived(
        $page.url.searchParams.get("registered") === "true",
    );

    async function handleLogin(e: Event) {
        e.preventDefault();

        const success = await auth.login(email, password);
        if (success) {
            goto("/");
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

                    {#if auth.error}
                        <Alert color="danger">{auth.error}</Alert>
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
                            disabled={auth.loading}
                        >
                            {auth.loading ? "Ingresando..." : "Ingresar"}
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
