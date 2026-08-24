# UI Components Guidelines

## Overview

LinkShort uses **shadcn/ui** exclusively for all UI components. Do not create custom components when a shadcn/ui alternative exists.

## Core Rules

### 1. shadcn/ui Only
- Use shadcn/ui components for all UI elements
- Never create custom button, input, dialog, or form components
- If a component doesn't exist in shadcn/ui, extend existing ones

### 2. Component Installation
- Install components via CLI: `npx shadcn@latest add [component-name]`
- Components are added to `@/components/ui/`
- Always check if a component is already installed before adding

### 3. No Custom UI Components
- Do not recreate functionality that shadcn/ui provides
- Do not create custom styled versions of existing components
- Use composition and shadcn/ui primitives for complex UIs

## Available Components

Common shadcn/ui components to use:

### Forms & Inputs
- `button` - All button variants
- `input` - Text inputs
- `textarea` - Multi-line text
- `select` - Dropdowns
- `checkbox` - Checkboxes
- `radio-group` - Radio buttons
- `switch` - Toggle switches
- `form` - Form handling with react-hook-form

### Feedback
- `alert` - Alert messages
- `toast` - Notifications
- `dialog` - Modals and dialogs
- `alert-dialog` - Confirmation dialogs
- `popover` - Popovers
- `tooltip` - Tooltips

### Layout
- `card` - Content containers
- `separator` - Dividers
- `tabs` - Tab navigation
- `accordion` - Collapsible sections
- `sheet` - Side panels

### Display
- `badge` - Status badges
- `avatar` - User avatars
- `table` - Data tables
- `skeleton` - Loading states

## Implementation Patterns

### Basic Component Usage
```typescript
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MyComponent() {
  return (
    <div>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </div>
  )
}
```

### Using Variants
```typescript
import { Button } from "@/components/ui/button"

<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Forms with shadcn/ui
```typescript
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function MyForm() {
  const form = useForm()
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Composing Components
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function LinkCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Title</CardTitle>
        <CardDescription>Description here</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>View Link</Button>
      </CardContent>
    </Card>
  )
}
```

## Styling Components

### Using className
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

<Button className={cn("w-full", isActive && "bg-primary")}>
  Button Text
</Button>
```

### Custom Variants (Rare)
Only extend component variants if absolutely necessary:
```typescript
// components/ui/button.tsx
const buttonVariants = cva(
  "base-classes...",
  {
    variants: {
      variant: {
        default: "...",
        // Add custom variant only if needed
        custom: "...",
      }
    }
  }
)
```

## Checklist

Before creating any UI component:
- [ ] Check if shadcn/ui has this component
- [ ] Search installed components in `@/components/ui/`
- [ ] Install missing shadcn/ui component if needed
- [ ] Use composition instead of creating custom components
- [ ] Apply custom styles via `className` prop

## Common Mistakes to Avoid

- ❌ Creating `<CustomButton>` when `<Button>` exists
- ❌ Writing custom input components
- ❌ Building modals from scratch
- ❌ Creating custom form controls
- ❌ Reinventing layout components
- ✅ Use shadcn/ui components exclusively
- ✅ Compose shadcn/ui components for complex UIs
- ✅ Extend via `className` for custom styling

## Installing New Components

```bash
# Check available components
npx shadcn@latest add

# Install specific component
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form

# Install multiple at once
npx shadcn@latest add button input card
```

## Additional Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Radix UI Primitives](https://www.radix-ui.com/primitives) (underlying library)
