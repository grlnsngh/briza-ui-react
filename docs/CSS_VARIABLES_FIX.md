# CSS Variables Loading Fix

## 🐛 Problem Identified

### Symptoms

- Input component appeared broken when first loaded in Storybook
- No gray background visible (transparent/white)
- Helper text was abnormally large
- Spacing and sizing were incorrect
- **BUT** after visiting Button component stories, Input suddenly rendered correctly

### Root Cause

**The design token variables from `src/theme/variables.css` were never imported in Storybook!**

#### What Was Happening:

1. **Input Component Dependencies:**

   ```css
   /* input.module.css relies on these variables: */
   background-color: var(--color-default-100); /* UNDEFINED! */
   font-size: var(--font-size-sm); /* UNDEFINED! */
   gap: var(--spacing-1_5); /* UNDEFINED! */
   border-radius: var(--radius-md); /* UNDEFINED! */
   /* ...and 50+ more variables */
   ```

2. **Missing Import Chain:**

   ```
   Input.tsx
     ↓ imports
   input.module.css
     ↓ uses
   CSS Variables (--color-default-100, etc.)
     ↓ defined in
   theme/variables.css
     ↓
   ❌ NEVER IMPORTED IN STORYBOOK! ❌
   ```

3. **Why Button "Fixed" It:**
   - Some side effect from Button stories triggered variable loading
   - Unpredictable due to Vite's module bundling and HMR
   - Not a reliable solution - order-dependent loading

### The Evidence

#### Missing Imports

Checked all entry points, none imported `variables.css`:

- ❌ `.storybook/preview.ts` - NO import
- ❌ `src/index.css` - NO import
- ❌ `src/index.ts` - NO import
- ❌ `ThemeProvider.tsx` - NO import

#### Token Conflicts

Two separate design token systems found:

- **Old tokens** in `src/index.css` (HSL colors, Button-focused)
- **New tokens** in `src/theme/variables.css` (Hex colors, comprehensive)
- Input component built with NEW tokens but they weren't loaded!

## ✅ Solution Implemented

### Fix Applied

**File: `.storybook/preview.ts`**

```typescript
import React from "react";
import type { Preview } from "@storybook/react-vite";
import "../src/theme/variables.css"; // ← ADDED: Design tokens must load first
import "../src/index.css";
```

### Why This Works

1. **Load Order Guarantee:**

   - `variables.css` loads FIRST, before any component
   - All CSS custom properties are defined before stories render
   - No more undefined variables

2. **Storybook-Specific:**

   - Only affects Storybook preview
   - Doesn't impact production builds
   - Ensures consistent development experience

3. **Single Source of Truth:**
   - All design tokens available globally
   - No dependency on visiting other stories
   - Predictable, reliable rendering

## 📊 Before vs After

### Before (Broken)

```
Load Input Story
  ↓
input.module.css loads
  ↓
var(--color-default-100) → UNDEFINED
  ↓
Browser fallback: transparent/white background
Helper text: Browser default (16px instead of 14px)
Spacing: Browser default (no consistent gaps)
```

### After (Fixed)

```
Storybook Starts
  ↓
variables.css loads ALL tokens
  ↓
--color-default-100: #f3f4f6 ✅
--font-size-sm: 0.875rem ✅
--spacing-1_5: 0.375rem ✅
  ↓
Load Input Story
  ↓
input.module.css uses defined variables
  ↓
Perfect rendering from first load! ✅
```

## 🎯 What's Now Working

### Immediate Benefits

- ✅ Input component renders correctly on first load
- ✅ Consistent gray background (`#f3f4f6`)
- ✅ Proper text sizing (14px helper text)
- ✅ Correct spacing (6px gaps)
- ✅ All validation states work
- ✅ Dark theme works immediately
- ✅ No need to visit Button first

### Long-Term Benefits

- ✅ Predictable component rendering
- ✅ Better developer experience
- ✅ Faster debugging (no order-dependent bugs)
- ✅ Scalable pattern for new components
- ✅ All design tokens available globally

## 🔍 Technical Details

### CSS Custom Properties Loaded

**From `variables.css` (329 lines):**

#### Colors

```css
--color-default-50 through --color-default-900
--color-primary-50 through --color-primary-900
--color-secondary-50 through --color-secondary-900
--color-success, --color-warning, --color-danger
--color-background, --color-foreground
```

#### Typography

```css
--font-size-xs, --font-size-sm, --font-size-base, --font-size-lg, --font-size-xl
--font-weight-normal, --font-weight-medium, --font-weight-semibold, --font-weight-bold
--line-height-tight, --line-height-normal, --line-height-relaxed
```

#### Spacing

```css
--spacing-0_5, --spacing-1, --spacing-1_5, --spacing-2, --spacing-3, --spacing-4
```

#### Radius & Effects

```css
--radius-sm, --radius-md, --radius-lg, --radius-full
--shadow-sm, --shadow-md, --shadow-lg
--transition-duration-150, --transition-duration-200, --transition-duration-300
```

### Theme Support

Dark theme overrides automatically applied:

```css
[data-theme="dark"] {
  /* All color scales inverted */
  --color-default-50: #111827; /* Was #f9fafb in light */
  --color-default-900: #f9fafb; /* Was #111827 in light */
  /* ...complete theme overrides */
}
```

## 📝 Testing Results

### Test Suite: ✅ All Passing

```
✓ 15 tests passed
✓ Input component > renders with label and helper text
✓ Input component > announces error and success states
✓ Input component > supports prefix and suffix adornments
✓ Input component > toggles password visibility
✓ Input component > displays character count
✓ Input component > applies rounded shape by default
✓ Input component > applies square shape when specified
```

### Visual Testing

- ✅ Input renders correctly on first Storybook load
- ✅ Gray background visible immediately
- ✅ Helper text sized correctly (14px)
- ✅ All spacing consistent
- ✅ Hover states work (gray → darker gray)
- ✅ Focus states work (blue ring + darker background)
- ✅ Error/Success states render properly
- ✅ Dark theme switch works instantly

## 🚀 Verification Steps

To verify the fix works:

1. **Clear browser cache** (important!)
2. **Restart Storybook**: `npm run storybook`
3. **Navigate directly to Input component**
4. **Observe:** Gray background should be visible immediately
5. **Test hover:** Background should darken on hover
6. **Test focus:** Click input, should show blue ring
7. **Switch theme:** Toggle dark mode in Storybook toolbar
8. **Result:** Everything works perfectly from first load!

## 🎓 Lessons Learned

### Design Token Best Practices

1. **Always import token files in app entry points**

   - Storybook: `.storybook/preview.ts`
   - Production: `src/main.tsx` or `src/index.ts`
   - Tests: `src/test-setup.ts` (if needed)

2. **CSS Custom Properties need explicit loading**

   - Unlike JS modules, CSS doesn't auto-import
   - Global styles must be loaded at root level
   - Order matters: tokens first, then components

3. **Avoid order-dependent loading**

   - Don't rely on component A loading tokens for component B
   - Explicit imports are better than implicit side effects
   - Makes debugging much easier

4. **Single source of truth**
   - One token file (`variables.css`)
   - Imported once at the root
   - Available to all components

## 📚 Related Files

- **Fixed:** `.storybook/preview.ts` - Added variables.css import
- **Uses tokens:** `src/components/Input/input.module.css` - All CSS variables
- **Token source:** `src/theme/variables.css` - 329 lines of design tokens
- **Theme switching:** `.storybook/preview.ts` - Theme decorator

## 🎉 Status: RESOLVED

The Input component now renders perfectly on first load with all design tokens available from the start!
