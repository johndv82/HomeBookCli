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
        Row,
        Col,
        Alert,
    } from "@sveltestrap/sveltestrap";
    import { API_BASE_URL } from "$lib/constants";
    import { goto } from "$app/navigation";

    let firstName = $state("");
    let lastName = $state("");
    let username = $state("");
    let email = $state("");
    let password = $state("");
    let confirmPassword = $state("");

    let error = $state("");
    let loading = $state(false);

    async function handleRegister(e: Event) {
        e.preventDefault();
        error = "";
        loading = true;

        if (password !== confirmPassword) {
            error = "Las contraseñas no coinciden";
            loading = false;
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                }),
            });

            if (response.ok) {
                // Success
                goto("/login?registered=true");
            } else {
                const data = await response.json();
                // Handle DRF errors which are usually objects with field keys
                error =
                    Object.values(data).flat().join(" ") ||
                    "Error al registrarse";
            }
        } catch (err) {
            console.error(err);
            error = "Error de conexión con el servidor";
        } finally {
            loading = false;
        }
    }
</script>

<Container class="py-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <Card class="shadow-sm border-0">
                <CardBody class="p-4">
                    <div class="text-center mb-4">
                        <h2 class="fw-bold">Crear Cuenta</h2>
                        <p class="text-muted">
                            Únete a nuestra comunidad de lectores
                        </p>
                    </div>

                    {#if error}
                        <Alert color="danger">{error}</Alert>
                    {/if}

                    <form onsubmit={handleRegister}>
                        <Row>
                            <Col md={6}>
                                <FormGroup class="mb-3">
                                    <Label for="firstName">Nombre</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="Juan"
                                        bind:value={firstName}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup class="mb-3">
                                    <Label for="lastName">Apellido</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Pérez"
                                        bind:value={lastName}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup class="mb-3">
                            <Label for="username">Nombre de Usuario</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="juanperez"
                                bind:value={username}
                                required
                            />
                        </FormGroup>
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
                        <FormGroup class="mb-3">
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
                        <FormGroup class="mb-4">
                            <Label for="confirmPassword"
                                >Confirmar Contraseña</Label
                            >
                            <Input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="••••••••"
                                bind:value={confirmPassword}
                                required
                            />
                        </FormGroup>
                        <Button
                            color="success"
                            block
                            class="w-100 mb-3 text-white"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Registrando..." : "Registrarse"}
                        </Button>
                        <div class="text-center">
                            <small class="text-muted"
                                >¿Ya tienes una cuenta? <a
                                    href="/login"
                                    class="text-decoration-none"
                                    >Inicia Sesión</a
                                ></small
                            >
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    </div>
</Container>
