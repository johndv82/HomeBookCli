# HomeBook Client 📚

Bienvenido al cliente web de **HomeBook**, una tienda online moderna dedicada al comercio de libros. Este proyecto está construido con **SvelteKit** y sirve como interfaz de usuario para interactuar con la API de HomeBook.

## 🚀 Características

- **Catálogo de Libros**: Exploración de libros con detalles como título, autor, precio y portada.
- **Autenticación**:
  - Inicio de Sesión (Login)
  - Registro de Usuarios (Register)
- **Diseño Responsivo**: Interfaz adaptable construida con Bootstrap (Sveltestrap).
- **Integración API**: Conexión dinámica con el backend para obtener datos en tiempo real.

## 🛠️ Tecnologías Utilizadas

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Lenguaje**: TypeScript
- **Estilos**: Bootstrap 5 & [Sveltestrap](https://sveltestrap.js.org/)
- **Build Tool**: Vite

## ⚙️ Configuración del Proyecto

### Prerrequisitos

- Node.js (versión 18 o superior recomendada)
- NPM

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd HomeBookCli
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

### Ejecutar en Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación correrá en `http://localhost:5173/`.

## 📦 Estructura del Proyecto

- `/src/routes`: Páginas y rutas de la aplicación (Home, Login, Register).
- `/src/lib`: Componentes reutilizables, utilidades y tipos.
- `/static`: Archivos estáticos públicos.
