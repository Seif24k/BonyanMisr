# BonyanMisr - Next.js Website

Modern, SEO-optimized website for BonyanMisr construction company built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Modern Next.js 15 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Dark mode support
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Fast performance
- ✅ Ready for 3D integration (Three.js)

## Pages

- **Home** - Hero section, services overview, stats, CTA
- **Services** - Detailed service descriptions
- **Portfolio** - Project showcase
- **Careers** - Job opportunities
- **Contact** - Contact form and information

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

## Deployment to Hostinger

### Option 1: Static Export (Recommended for Hostinger)

1. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

2. Build static files:
```bash
npm run build
```

3. Upload the `out` folder contents to your Hostinger public_html directory via:
   - FTP/SFTP
   - Hostinger File Manager
   - Git deployment

### Option 2: Node.js Hosting

If your Hostinger plan supports Node.js:

1. Upload all files to your hosting
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Start: `npm start`
5. Configure your domain to point to the Node.js app

## Adding 3D Models (Three.js)

To add 3D functionality:

```bash
# Install Three.js and React Three Fiber
npm install three @react-three/fiber @react-three/drei
```

Then create 3D components in `components/3d/` folder.

## Environment Variables

Create `.env.local` for environment variables:

```
NEXT_PUBLIC_SITE_URL=https://bonyanmisr.com
NEXT_PUBLIC_CONTACT_EMAIL=info@bonyanmisr.com
```

## Customization

- **Colors**: Edit `tailwind.config.ts`
- **Content**: Edit page files in `app/` directory
- **Components**: Edit files in `components/` directory
- **Fonts**: Update in `app/layout.tsx`

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Hostinger (Static or Node.js)

## Support

For issues or questions, contact the development team.

---

Built with ❤️ for BonyanMisr
