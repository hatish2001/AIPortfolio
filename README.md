# Workflix - Netflix-Styled Portfolio

A modern, responsive portfolio website built with Next.js 14 that presents your professional journey in a familiar Netflix-inspired interface.

## Features

- **Netflix-style UI/UX**: Horizontal carousels, hover previews, and modal details
- **Responsive Design**: Works seamlessly from mobile (360px) to desktop (1440px+)
- **Accessibility**: Full keyboard navigation, ARIA labels, and focus management
- **Performance**: Optimized images, lazy loading, and smooth animations
- **SEO Ready**: Meta tags, OpenGraph, and semantic HTML
- **Type-Safe**: Built with TypeScript for reliability

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## Content Management

All content is managed through a single JSON file at `/lib/data.ts`. You can easily update:

- **Apps**: Your projects with descriptions, tech stack, and links
- **Experience**: Work history with responsibilities and impact metrics
- **Education**: Academic background with courses and achievements
- **Hobbies**: Personal interests with galleries
- **About**: Bio, skills, and contact information

### Adding Images

Place your images in the appropriate folders:
- `/public/images/apps/` - App project thumbnails
- `/public/images/exp/` - Company/experience images
- `/public/images/edu/` - Education institution images
- `/public/images/hobbies/` - Hobby-related images
- `/public/video/` - Preview videos (MP4/WebM, 2-3MB max)

## Project Structure

```
app/
├── page.tsx          # Home page with content rows
├── about/page.tsx    # About me page
├── layout.tsx        # Root layout
components/
├── Header.tsx        # Navigation header
├── Hero.tsx          # Featured content banner
├── Row.tsx           # Horizontal carousel
├── Tile.tsx          # Content cards
├── DetailModal.tsx   # Netflix-style modal
├── Footer.tsx        # Site footer
lib/
├── data.ts          # Content data
├── utils.ts         # Helper functions
types/
├── content.ts       # TypeScript interfaces
```

## Performance

- **LCP**: < 2.5s on 4G
- **CLS**: ~0
- **Lighthouse**: 90+ desktop, 80+ mobile

## Browser Support

- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on Vercel
3. Deploy with default settings

### Other Platforms

Build for production:
```bash
npm run build
npm start
```

## Customization

### Colors

Edit `/tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  background: '#0b0b0f',    // Main background
  accent: '#e50914',        // Primary accent (red)
  // ... more colors
}
```

### Animations

Adjust timing in components or add new animations in `tailwind.config.ts`.

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

- UI design inspired by Netflix (trademark acknowledgment)
- Built with Next.js, React, TailwindCSS, and Framer Motion
