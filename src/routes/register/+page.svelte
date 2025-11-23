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
    } from "@sveltestrap/sveltestrap";
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
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup class="mb-3">
                                    <Label for="firstName">Nombre</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="Juan"
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
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup class="mb-3">
                            <Label for="email">Correo Electrónico</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="nombre@ejemplo.com"
                            />
                        </FormGroup>
                        <FormGroup class="mb-3">
                            <Label for="password">Contraseña</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
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
                            />
                        </FormGroup>
                        <Button
                            color="success"
                            block
                            class="w-100 mb-3 text-white">Registrarse</Button
                        >
                        <div class="text-center">
                            <small class="text-muted"
                                >¿Ya tienes una cuenta? <a
                                    href="/login"
                                    class="text-decoration-none"
                                    >Inicia Sesión</a
                                ></small
                            >
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    </div>
</Container>
