# Company Profile

A modern Next.js company profile landing page with product catalog, built with best practices and scalable architecture.

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **SCSS** - Enhanced styling

## Features

✨ **Responsive Design** - Mobile, tablet, and desktop support
🎨 **Modern UI/UX** - Clean and professional interface
🔄 **API Integration** - Real-time product data fetching
🖼️ **Product Modal** - Image preview with keyboard support (ESC to close)
⚡ **Performance** - Lazy loading images, optimized rendering
🎯 **Custom Hooks** - Reusable React hooks for state management
📦 **Service Layer** - Organized API calls with error handling

### Grid Layout

- **Mobile**: 2 columns
- **Tablet (768px+)**: 3 columns
- **Desktop (1024px+)**: 4 columns
- **Large Desktop (1280px+)**: 5 columns

## Getting Started

### Prerequisites

- Node.js >= 22.13.0
- pnpm 10

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
company-profile/
├── src/
│   ├── components/           # React components (organized by type)
│   │   ├── Layout/          # Layout components (Header, Section, Container)
│   │   ├── UI/              # Reusable UI components (LoadingSpinner, EmptyState)
│   │   └── Features/        # Feature-specific components
│   │       ├── CompanyDescription.tsx
│   │       └── Products/    # Product-related components
│   ├── hooks/               # Custom React hooks
│   │   ├── useProducts.ts   # Product data fetching hook
│   │   └── useModal.ts      # Modal state management hook
│   ├── services/            # API service layer
│   │   └── product.service.ts
│   ├── types/               # TypeScript type definitions
│   │   └── product.types.ts
│   ├── constants/           # Application constants
│   │   └── api.constants.ts
│   ├── pages/              # Next.js pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── styles/             # Global styles and SCSS
│   │   └── main.scss
│   ├── contexts/           # React contexts (future use)
│   ├── helpers/            # Helper utilities (future use)
│   └── utils/              # Utility functions (future use)
├── public/                 # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Architecture Patterns

### Component Organization

- **Layout**: Structural components (Header, Section, Container)
- **UI**: Reusable UI elements (LoadingSpinner, EmptyState)
- **Features**: Business logic components organized by feature

### Custom Hooks

- `useProducts()` - Manages product data fetching with loading and error states
- `useModal()` - Generic modal state management

### Service Layer

Clean separation of concerns with dedicated service classes for API calls:
- `ProductService` - Handles all product-related API operations

### TypeScript Path Aliases

```typescript
@components/*  → src/components/*
@hooks/*       → src/hooks/*
@services/*    → src/services/*
@types/*       → src/types/*
@constants/*   → src/constants/*
@contexts/*    → src/contexts/*
@helpers/*     → src/helpers/*
@utils/*       → src/utils/*
@styles/*      → src/styles/*
```

## API Integration

### Endpoints

- **Products**: `https://www.giovankov.com/api/product.json`
- **Images**: `https://www.giovankov.com/api/image.json`

### Configuration

API configuration is centralized in `src/constants/api.constants.ts`:
- Base URL
- Endpoints
- Timeout settings
- Retry attempts

## Best Practices Implemented

✅ **Separation of Concerns** - Clear separation between UI, business logic, and data
✅ **Type Safety** - Full TypeScript coverage
✅ **Custom Hooks** - Reusable stateful logic
✅ **Service Layer** - Organized API calls
✅ **Error Handling** - Graceful error states
✅ **Loading States** - User feedback during data fetching
✅ **Accessibility** - Keyboard support, semantic HTML
✅ **Performance** - Lazy loading, optimized rendering
✅ **Code Organization** - Feature-based structure
✅ **Scalability** - Easy to extend and maintain

## Future Enhancements

- Add unit tests with Jest and React Testing Library
- Implement error boundary
- Add analytics tracking
- Implement search and filter functionality
- Add pagination for large product lists
- Implement caching strategy
- Add SEO optimization
- Implement dark mode

## License

MIT
