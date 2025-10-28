# Quick Reference - Mobile Responsive Patterns 📱

## 🎯 Mobile First Patterns

### Text Sizes
```jsx
// Small to Large
text-sm md:text-base      // Body text
text-base md:text-lg      // Slightly larger
text-lg md:text-xl        // Section titles
text-xl md:text-2xl       // Sub-headers
text-2xl md:text-4xl      // Headers
text-3xl md:text-5xl      // Large headers
text-4xl md:text-6xl      // Hero titles
```

### Spacing (Padding & Margin)
```jsx
// Vertical spacing
py-8 sm:py-16            // Section padding
py-4 sm:py-6             // Medium padding
py-2 sm:py-3             // Small padding

// Horizontal spacing
px-4 sm:px-6 md:px-8     // Container padding
px-2 sm:px-4             // Small padding

// Margins
mb-4 sm:mb-6             // Bottom margin
mb-8 sm:mb-16            // Large bottom margin
mt-6 sm:mt-8             // Top margin
```

### Gap (Flexbox/Grid)
```jsx
gap-4 md:gap-6           // Small gap
gap-6 md:gap-8           // Medium gap
gap-8 md:gap-12          // Large gap

// Individual
gap-x-4 gap-y-6          // Different x/y gaps
```

### Component Heights
```jsx
h-10 md:h-12            // Small buttons/inputs
h-11 md:h-12            // Medium inputs
h-12 md:h-14            // Large buttons/inputs
h-auto sm:h-[240px]     // Flexible heights
```

### Widths
```jsx
w-full sm:w-auto                    // Full width mobile
w-full max-w-md sm:w-auto          // Full with max-width
w-full max-w-xs sm:w-auto          // Narrower full width
w-28 md:w-32                       // Fixed widths
```

## 🔄 Hide/Show Patterns

### Hide on Mobile, Show on Desktop
```jsx
hidden sm:block          // Block element
hidden md:flex           // Flex element
hidden lg:grid           // Grid element
```

### Show on Mobile, Hide on Desktop
```jsx
block md:hidden          // Block element
flex md:hidden           // Flex element
grid md:hidden           // Grid element
```

### Conditional Classes
```jsx
// Different on mobile vs desktop
bg-white md:bg-sky-100
text-[#093B77] sm:text-black
top-0 sm:top-14
```

## 📐 Layout Patterns

### Grid Layouts
```jsx
// Stacked on mobile, multi-column on desktop
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
grid grid-cols-1 md:grid-cols-2
grid grid-cols-1 gap-6 md:gap-8

// Centering items
place-items-center md:place-items-stretch
```

### Flex Layouts
```jsx
// Vertical on mobile, horizontal on desktop
flex flex-col md:flex-row
flex flex-col-reverse md:flex-row

// Alignment
items-center
justify-center md:justify-between
justify-center lg:justify-end
```

### Spacing
```jsx
// Using gap instead of space-*
gap-4 md:gap-6           // Better than space-x-4
gap-3 md:gap-6 lg:gap-8  // Responsive gaps
```

## 🎨 Common Component Patterns

### Buttons
```jsx
// Full width mobile, auto desktop
className="w-full sm:w-auto px-6 py-3 text-base rounded-lg"

// With max-width
className="w-full max-w-xs sm:w-auto px-6 py-3"

// Responsive sizing
className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
```

### Cards
```jsx
// Card container
className="p-5 sm:p-6 rounded-lg shadow-lg"

// Card grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Card spacing
className="space-y-6 md:space-y-0 md:gap-6"
```

### Images
```jsx
// Icon sizes
className="w-4 h-4 md:w-5 md:h-5"      // Small icons
className="w-5 h-5 md:w-6 md:h-6"      // Medium icons
className="w-12 h-12 md:w-16 md:h-16"  // Large icons

// Responsive images
className="w-full max-w-md sm:max-w-lg"
className="h-64 md:h-80 object-cover"
```

### Text Containers
```jsx
// Centered text mobile, left desktop
className="text-center md:text-left"

// Max width
className="max-w-4xl mx-auto"
className="max-w-md mx-auto px-4"
```

## 🎯 Section Patterns

### Section Wrapper
```jsx
<section className="py-8 sm:py-16 px-4 sm:px-6 md:px-8">
  {/* Content */}
</section>
```

### Section Container
```jsx
<div className="container mx-auto px-4 sm:px-6 md:px-8">
  {/* Content */}
</div>
```

### Section Header
```jsx
<div className="text-center mb-8 sm:mb-16">
  <p className="text-3xl sm:text-4xl lg:text-5xl text-[#927C4E] mb-2 sm:mb-4">
    Subtitle
  </p>
  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
    Main Title
  </h2>
  <p className="text-base sm:text-xl text-gray-400 max-w-4xl mx-auto">
    Description
  </p>
</div>
```

## 🔄 Common Transformations

### From Desktop-First to Mobile-First

#### Before (Desktop-First)
```jsx
<div className="px-8 py-16 text-xl">
```

#### After (Mobile-First)
```jsx
<div className="px-4 sm:px-6 md:px-8 py-8 sm:py-16 text-base sm:text-xl">
```

### Navigation Bar

#### Before
```jsx
<nav className="bg-white shadow-sm">
  <div className="flex justify-between px-8">
    <Logo />
    <div className="flex gap-8">
      {/* Desktop links */}
    </div>
  </div>
</nav>
```

#### After
```jsx
<nav className="bg-[#093B77] sm:bg-white shadow-sm">
  <div className="flex justify-between px-4 sm:px-8">
    {/* Mobile Logo */}
    <div className="block sm:hidden">
      <Logo variant="white" width={48} height={60} />
    </div>
    
    {/* Desktop Logo */}
    <div className="hidden sm:block">
      <Logo width={64} height={80} variant={logoVariant} />
    </div>
    
    {/* Desktop Links - Hidden on Mobile */}
    <div className="hidden md:flex gap-8">
      {/* Links */}
    </div>
    
    {/* Mobile Menu Button */}
    <button className="md:hidden">
      {/* Icon */}
    </button>
  </div>
</nav>
```

## 💡 Best Practices

### 1. Consistent Breakpoints
```jsx
// Always use same breakpoint for related properties
text-sm sm:text-base lg:text-xl
px-4 sm:px-6 lg:px-8
// Not: text-sm md:text-base lg:text-xl with px-4 sm:px-6 lg:px-8
```

### 2. Use Gap over Space
```jsx
// ✅ Good
className="flex gap-4 md:gap-6"

// ❌ Avoid
className="flex space-x-4 md:space-x-6"
```

### 3. Mobile-First Sizing
```jsx
// ✅ Good - Start small, grow
text-base md:text-lg lg:text-xl

// ❌ Avoid - Start big, shrink
text-xl md:text-lg sm:text-base
```

### 4. Meaningful Max Widths
```jsx
// ✅ Good
className="w-full max-w-md sm:w-auto"

// ❌ Avoid unnecessary constraints
className="w-full max-w-[234px] sm:w-auto"
```

### 5. Semantic Hiding
```jsx
// ✅ Good - Clear intent
<div className="hidden md:block">Desktop only content</div>
<div className="block md:hidden">Mobile only content</div>

// ❌ Avoid complex logic
<div className="hidden sm:block md:hidden lg:block">
```

## 🎨 Color Patterns

### Muted Text (Gray)
```jsx
// Use for less important text
text-gray-400      // Light gray
text-gray-500      // Medium gray
text-gray-600      // Darker gray
```

### Conditional Colors
```jsx
// Different colors for different sizes
text-[#093B77] sm:text-black
bg-white md:bg-sky-100
```

## 📱 Common Mobile Adjustments

### Form Inputs
```jsx
// Before
<input className="h-14 px-4 text-base" />

// After
<input className="h-12 md:h-14 px-3 md:px-4 text-sm md:text-base" />
```

### Buttons
```jsx
// Before
<button className="px-8 py-4 text-base">Submit</button>

// After
<button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
  Submit
</button>
```

### Card Padding
```jsx
// Before
<div className="p-6 rounded-lg">

// After
<div className="p-4 sm:p-6 rounded-lg">
```

### Section Padding
```jsx
// Before
<section className="py-20">

// After
<section className="py-8 sm:py-16 md:py-20">
```

## 🚀 Quick Checklist

When making a component responsive:

- [ ] Start with mobile sizing (smallest first)
- [ ] Add sm: breakpoint (640px+)
- [ ] Add md: breakpoint (768px+)
- [ ] Add lg: breakpoint (1024px+)
- [ ] Use gap instead of space-x/space-y
- [ ] Test on 375px, 768px, 1024px screens
- [ ] Check for horizontal scroll
- [ ] Verify text is readable
- [ ] Ensure buttons are tappable (min 44x44)
- [ ] Test navigation/menus work
- [ ] Confirm images load properly
- [ ] Check spacing consistency

## 📊 Breakpoint Reference

| Breakpoint | Width | Common Device | Usage |
|------------|-------|---------------|-------|
| **default** | 0px+ | Mobile | Base styles, no prefix |
| **sm** | 640px+ | Large phones, small tablets | `sm:` prefix |
| **md** | 768px+ | Tablets, small laptops | `md:` prefix |
| **lg** | 1024px+ | Laptops, desktops | `lg:` prefix |
| **xl** | 1280px+ | Large desktops | `xl:` prefix |

## 🎯 Common Responsive Utilities

```jsx
// Display
block md:hidden
hidden md:block
flex md:hidden
hidden md:flex

// Sizing
w-full sm:w-auto
h-auto sm:h-64
max-w-md sm:max-w-lg

// Spacing
p-4 sm:p-6 md:p-8
m-2 sm:m-4 md:m-6
gap-4 md:gap-6 lg:gap-8

// Typography
text-sm sm:text-base md:text-lg
leading-tight sm:leading-normal

// Layout
flex-col md:flex-row
items-start md:items-center
justify-center md:justify-between

// Grid
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
place-items-center md:place-items-stretch
```

---

**Last Updated**: 2025-10-28  
**Version**: 1.0  
**Status**: Ready to Use ✅

