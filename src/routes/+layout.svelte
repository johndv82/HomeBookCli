<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "bootstrap/dist/css/bootstrap.min.css";
	import {
		Navbar,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Container,
		Button,
	} from "@sveltestrap/sveltestrap";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar color="light" light expand="md">
	<Container>
		<NavbarBrand href="/">HomeBookCli</NavbarBrand>
		<Nav class="ms-auto" navbar>
			<NavItem>
				<NavLink href="/">Inicio</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/about">Sobre Nosotros</NavLink>
			</NavItem>
			<NavItem class="ms-md-3">
				<Button color="outline-primary" href="/login" class="me-2"
					>Iniciar Sesión</Button
				>
			</NavItem>
			<NavItem>
				<Button color="primary" href="/register">Registrarse</Button>
			</NavItem>
		</Nav>
	</Container>
</Navbar>

<Container class="my-5" style="min-height: 80vh;">
	{@render children()}
</Container>

<footer class="bg-dark text-white text-center py-3 mt-auto">
	<Container>
		<p class="mb-0">© 2025 HomeBookCli</p>
	</Container>
</footer>
