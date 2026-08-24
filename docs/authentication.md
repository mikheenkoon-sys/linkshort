# Authentication Guidelines

## Overview

All authentication in LinkShort is handled exclusively by **Clerk**. No other authentication methods should be implemented or used.

## Core Rules

### 1. Clerk Only
- Use Clerk for all authentication flows
- Never implement custom auth logic
- Do not add alternative auth providers without explicit approval

### 2. Sign In/Sign Up Modals
- Always launch sign in and sign up as modals
- Use Clerk's modal mode configuration
- Maintain consistent modal behavior across the app

### 3. Protected Routes
- `/dashboard` and all sub-routes require authentication
- Use Clerk's middleware or route protection
- Redirect unauthenticated users to sign in modal

### 4. Homepage Redirect
- If user is authenticated and accesses `/`, redirect to `/dashboard`
- Implement this check in the root page component or middleware

## Implementation Patterns

### Protecting Routes
```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

### Client-Side Auth Checks
```typescript
"use client"

import { useAuth, useUser } from "@clerk/nextjs"

export function ProtectedComponent() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  
  if (!isSignedIn) return null
  
  return <div>Protected content</div>
}
```

### Server-Side Auth Checks
```typescript
import { auth, currentUser } from "@clerk/nextjs/server"

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  return <div>Dashboard content</div>
}
```

### Modal Configuration
```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        signIn: { routing: 'modal' },
        signUp: { routing: 'modal' }
      }}
    >
      {children}
    </ClerkProvider>
  )
}
```

## Checklist

Before implementing auth-related features:
- [ ] Verify using Clerk components/hooks
- [ ] Confirm modal mode for sign in/sign up
- [ ] Test protected route behavior
- [ ] Verify homepage redirect for authenticated users
- [ ] Check proper TypeScript types from Clerk

## Common Mistakes to Avoid

- ❌ Creating custom login forms
- ❌ Using JWT manually
- ❌ Implementing session management
- ❌ Using full-page sign in/sign up routes
- ❌ Storing auth tokens in localStorage
- ✅ Let Clerk handle all auth concerns

## Environment Variables

Required Clerk environment variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Additional Resources

- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Middleware Guide](https://clerk.com/docs/references/nextjs/clerk-middleware)
- [Clerk Components](https://clerk.com/docs/components/overview)
