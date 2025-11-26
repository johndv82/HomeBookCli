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
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { API_BASE_URL } from "$lib/constants";
	import { goto } from "$app/navigation";

	let { children } = $props();
	let isAuthenticated = $state(false);

	// Re-check auth whenever the URL changes (e.g. after login redirect)
	$effect(() => {
		// Dependency on $page.url to trigger re-run
		const _ = $page.url;
		checkAuth();
	});

	const VERIFY_INTERVAL = 5 * 60 * 1000; // 5 minutes

	async function checkAuth() {
		const token = localStorage.getItem("access_token");
		if (!token) {
			isAuthenticated = false;
			return;
		}

		const lastVerified = Number(
			localStorage.getItem("token_last_verified") || "0",
		);
		const now = Date.now();

		// If verified recently, skip API call to avoid throttling
		if (now - lastVerified < VERIFY_INTERVAL) {
			isAuthenticated = true;
			return;
		}

		try {
			const res = await fetch(`${API_BASE_URL}/auth/jwt/verify/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token }),
			});

			if (res.ok) {
				isAuthenticated = true;
				localStorage.setItem("token_last_verified", now.toString());
			} else if (res.status === 429) {
				// If throttled, assume valid session to prevent flickering
				console.warn(
					"Auth verify throttled (429), assuming valid session",
				);
				isAuthenticated = true;
				localStorage.setItem("token_last_verified", now.toString()); // Still update timestamp to avoid immediate re-check
			} else {
				// Token might be expired, try to refresh it
				await tryRefreshToken();
			}
		} catch {
			isAuthenticated = false;
		}
	}

	async function tryRefreshToken() {
		const refresh = localStorage.getItem("refresh_token");
		if (!refresh) {
			isAuthenticated = false;
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
				localStorage.setItem("access_token", data.access);
				localStorage.setItem(
					"token_last_verified",
					Date.now().toString(),
				);
				isAuthenticated = true;
			} else {
				// Refresh failed, user is truly logged out
				logout();
			}
		} catch {
			isAuthenticated = false;
		}
	}

	function logout() {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("token_last_verified");
		isAuthenticated = false;
		goto("/login");
	}
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
			{#if !isAuthenticated}
				<NavItem class="ms-md-3">
					<Button color="outline-primary" href="/login" class="me-2"
						>Iniciar Sesión</Button
					>
				</NavItem>
				<NavItem>
					<Button color="primary" href="/register">Registrarse</Button
					>
				</NavItem>
			{:else}
				<NavItem class="ms-md-3">
					<Button color="outline-danger" onclick={logout}
						>Cerrar Sesión</Button
					>
				</NavItem>
			{/if}
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
