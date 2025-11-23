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
    } from "@sveltestrap/sveltestrap";
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
                    <Form>
                        <FormGroup class="mb-3">
                            <Label for="email">Correo Electrónico</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="nombre@ejemplo.com"
                            />
                        </FormGroup>
                        <FormGroup class="mb-4">
                            <Label for="password">Contraseña</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                            />
                        </FormGroup>
                        <Button color="primary" block class="w-100 mb-3"
                            >Ingresar</Button
                        >
                        <div class="text-center">
                            <small class="text-muted"
                                >¿No tienes una cuenta? <a
                                    href="/register"
                                    class="text-decoration-none">Regístrate</a
                                ></small
                            >
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    </div>
</Container>
