# Agent Instructions for LinkShort Project

This document provides guidance for AI coding assistants working on the LinkShort project. Follow these guidelines to maintain consistency, quality, and project standards.

## Project Overview

LinkShort is a URL shortening service built with Next.js 16, React 19, TypeScript, and Drizzle ORM with PostgreSQL (Neon). The application uses Clerk for authentication and shadcn/ui for components.

## Quick Reference

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Clerk
- **UI Components**: shadcn/ui + Radix UI
- **Package Manager**: npm

## Detailed Documentation

> **CRITICAL — NON-NEGOTIABLE**: You MUST read every relevant file in the `/docs` directory BEFORE writing or generating ANY code. This is not optional. Generating code without first reading the applicable docs is strictly forbidden and will result in incorrect, inconsistent output.

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory:

- **[Authentication](/docs/authentication.md)** - Clerk integration, protected routes, and auth patterns
- **[UI Components](/docs/ui-components.md)** - shadcn/ui usage and component guidelines

**Before writing any code**, identify which of the above files apply to your task and read them in full using your file-reading tools. Do not skip this step under any circumstances.
 
## Core Principles

### 1. Middleware Configuration
- **CRITICAL**: Use `proxy.ts` for Next.js middleware, NOT `middleware.ts`
- This is a project-specific convention that must be followed
- All route protection and middleware logic belongs in `proxy.ts`

### 2. Type Safety First
- Always use TypeScript with strict mode enabled
- Avoid `any` types - use proper typing or `unknown` when necessary
- Define explicit return types for functions
- Use type guards for runtime validation

### 3. Component Standards
- Use Server Components by default
- Add `"use client"` only when necessary (interactivity, hooks, browser APIs)
- Implement proper error boundaries
- Follow React 19 conventions

### 4. Performance Optimization
- Implement proper code splitting
- Use Next.js Image component for images
- Optimize bundle size with dynamic imports
- Follow Next.js caching strategies

### 5. Security Best Practices
- Validate all user inputs
- Use environment variables for sensitive data
- Implement proper authentication checks
- Follow OWASP guidelines

### 6. Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast standards

## Development Workflow

### File Creation
- Create components in appropriate directories
- Follow naming conventions (PascalCase for components, kebab-case for routes)
- Include proper imports and exports
- Add TypeScript interfaces/types

### Code Changes
- Make incremental, focused changes
- Preserve existing code style
- Update related types and interfaces
- Test changes in development environment

### Database Changes
- Create migration files for schema changes
- Update schema.ts with proper types
- Run migrations in correct order
- Document breaking changes

## Path Aliases

Use the `@/` alias for imports:
```typescript
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { cn } from "@/lib/utils"
```

## Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

## Common Patterns

### Server Actions
```typescript
"use server"

export async function createLink(data: LinkFormData) {
  // Validate input
  // Check authentication
  // Perform database operation
  // Return result
}
```

### Client Components
```typescript
"use client"

import { useState } from "react"

export function InteractiveComponent() {
  // Component logic
}
```

### Database Queries
```typescript
import { db } from "@/db"
import { links } from "@/db/schema"

const result = await db.select().from(links).where(...)
```

## Error Handling

- Use try-catch blocks for async operations
- Provide meaningful error messages
- Log errors appropriately
- Return proper HTTP status codes

## Code Review Checklist

Before completing work, verify:
- [ ] TypeScript compiles without errors
- [ ] ESLint passes with no warnings
- [ ] Code follows project conventions
- [ ] Imports use path aliases
- [ ] Environment variables are documented
- [ ] Error handling is implemented
- [ ] Types are properly defined
- [ ] Components are accessible
- [ ] Performance is optimized
- [ ] Security best practices followed

## Getting Help

- Review existing code for patterns
- Check Next.js 16 documentation
- Consult Drizzle ORM docs
- Reference shadcn/ui components
- Ask for clarification when uncertain

## Version Information

- Next.js: 16.1.6
- React: 19.2.3
- TypeScript: 5.x
- Node.js: 20.x recommended

---

**Note**: These guidelines ensure consistency across the codebase. When in doubt, follow existing patterns in the project or consult the detailed documentation in the `/docs` directory.
