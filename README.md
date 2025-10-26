# Vue Image Gallery 

A simple and responsive image gallery built with Vue 3 and the Picsum API

## Project Setup

```sh
pnpm install

pnpm run dev       # Compile and Hot-Reload for Development
pnpm run build     # Type-Check, Compile and Minify for Production
pnpm run test:unit # Run Unit Tests with [Vitest](https://vitest.dev/)
pnpm run lint      # Lint with [ESLint](https://eslint.org/)
```

## Features 

- [x] `pnpm` as package manager
- [x] Github Pages auto deploy through Github Actions (~40s)
- [x] Lazy loaded routes
- [x] Scalable reactive custom fetch API
- [ ] Virtual Scroll
- [x] Lazy images
- [x] Light/Dark Themes
- [x] Loading Skeletons
- [x] Routes animations
- [x] 404 Not Found Route
- [ ] Smoke tests
- [ ] Dynamic Picsum API requests
- [ ] WAI-ARIA compliant
- [x] Native Dialog component + animations with `@starting-style`
- [x] Image Detail Dialog reachable through URL

## Considerations

- To avoid unnecessary **Cumulative Layout Shift `CLS`**
  - App is mounted after router `isReady`
  - `Image Gallery` grid component pre-renders placeholder while fetching
  - `LazyImage` component 

## TODOs

- [ ] Dynamic/reactive focus trap
- [ ] Better lazy-loaded image component
- [ ] Icon component
- [ ] Better image grid keyboard support, move selected image with arrow keys
- [ ] Image responsive `srcset` and `size`
- [ ] Dialog using [Teleport](https://vuejs.org/guide/built-ins/teleport)
- [ ] More tests

## Resources

- [Building a dialog component](https://web.dev/articles/building/a-dialog-component)
- [Animating dialog and popover elements with CSS](https://blog.logrocket.com/animating-dialog-popover-elements-css-starting-style/)
- [Composables ](https://vuejs.org/guide/reusability/composables#accepting-reactive-state)
