# Electro Store

A modern e-commerce storefront built with Next.js. Users can register, sign in, and browse electronics products with search, category filtering, and pagination. Product details include an image gallery and interactive UI elements.

## Links

| Resource | URL |
| --- | --- |
| **GitHub Repository** | [https://github.com/mahmouudkhaled2/electro-pi-task](https://github.com/mahmouudkhaled2/electro-pi-task) |
| **Live Demo** | [https://electro-pi-store.netlify.app/products](https://electro-pi-store.netlify.app/products) |
| **API Collection** | [Route E-Commerce API (Postman)](https://documenter.getpostman.com/view/5709532/2s93JqTRWN#intro) |

## Tech Stack

| Category | Technologies |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **UI** | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| **Components** | [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) (Credentials provider + JWT) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Data Fetching** | Next.js Server Actions, [TanStack React Query](https://tanstack.com/query) |
| **URL State** | [nuqs](https://nuqs.47ng.com/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Carousel** | [Embla Carousel](https://www.embla-carousel.com/) |
| **Deployment** | [Netlify](https://www.netlify.com/) (`@netlify/plugin-nextjs`) |
| **External API** | [Route E-Commerce API](https://ecommerce.routemisr.com/) |

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- npm (or yarn / pnpm)

### 1. Clone the repository

```bash
git clone https://github.com/mahmouudkhaled2/electro-pi-task.git
cd electro-pi-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
API=https://ecommerce.routemisr.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

| Variable | Description |
| --- | --- |
| `API` | Base URL for the Route E-Commerce API |
| `NEXTAUTH_URL` | Your app URL (use your production URL when deploying) |
| `NEXTAUTH_SECRET` | Secret used to sign JWT sessions. Generate one with: `openssl rand -base64 32` |

Optional for production deployments:

```env
NEXT_PUBLIC_APP_URL=https://electro-pi-store.netlify.app
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production server |
| `npm run lint` | Run ESLint |

## Features

- **Authentication** — User registration and login via the Route API (`/auth/signup`, `/auth/signin`)
- **Protected routes** — `/products` and product detail pages require authentication
- **Product listing** — Grid view with server-side data fetching and caching
- **Search** — Keyword search across product titles (URL-synced via `nuqs`)
- **Category filter** — Desktop sidebar and mobile sheet filter
- **Pagination** — Page-based navigation synced to URL query params
- **Product details** — Image gallery carousel, size selector, wishlist toggle, and add-to-cart toast
- **Loading & error states** — Skeleton loaders and dedicated error UI
- **Responsive design** — Mobile-first layout with adaptive navigation

## Project Structure

```
src/
├── app/
│   ├── (app)/          # Main app routes (home, products)
│   ├── (auth)/         # Auth routes (login, register)
│   └── api/auth/       # NextAuth API route
├── auth.ts             # NextAuth configuration
├── proxy.ts            # Route protection middleware
├── components/         # Shared UI and layout components
└── lib/
    ├── apis/           # Server actions for API calls
    ├── schemas/        # Zod validation schemas
    ├── types/          # TypeScript type definitions
    └── utils/          # Helper utilities
```

## Evaluation Criteria

This project was built against the following criteria:

| Criteria | Implementation |
| --- | --- |
| **Authentication** | Login and registration integrated with the Route E-Commerce API using NextAuth.js credentials provider and JWT sessions |
| **Route protection** | Middleware (`proxy.ts`) guards `/products` routes and redirects unauthenticated users to login with a callback URL |
| **Products listing** | Fetches products from `/api/v1/products` with pagination, category filtering, and keyword search |
| **Product details** | Dynamic route `/products/[id]` with image gallery, product info, and interactive UI |
| **API integration** | Server actions call the documented Route API endpoints with typed responses and error handling |
| **Form validation** | Login and register forms validated with Zod + React Hook Form before submission |
| **URL state management** | Search, category, and page params synced to the URL for shareable, bookmarkable views |
| **UI/UX quality** | Responsive layout, loading skeletons, error boundaries, toast notifications, and accessible components |
| **Code quality** | TypeScript throughout, modular folder structure, reusable components, and consistent naming |
| **Deployment** | Production build deployed to Netlify with the official Next.js plugin |

## Demo Credentials

Register a new account on the [live demo](https://electro-pi-store.netlify.app/), or use any valid credentials from the Route E-Commerce API.

## License

This project is private and was created as part of a technical assessment.
