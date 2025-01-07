# Portfolio with AI Assistant

A modern portfolio website built with Next.js 14 that features an integrated AI assistant powered by OpenAI.

## Technologies Used

- [Next.js](https://nextjs.org) 14 with App Router
- [OpenAI API](https://openai.com/api/) for the AI assistant
- [NLUX](https://nlux.ai) for the chat interface
- [Tailwind CSS](https://tailwindcss.com) for styling
- [TypeScript](https://typescriptlang.org) for type safety
- [Geist Font](https://vercel.com/font) for typography

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a .env.local file with your OpenAI API key:
4. Run the development server:
```bash
npm run dev
```
5. Open http://localhost:3000 in your browser

## Features

- Modern, responsive portfolio design
- AI assistant integration via OpenAI's API
- Real-time streaming chat responses
- Custom chat interface using NLUX components
- Dark/light mode support

## Development

The project uses Next.js 14's App Router and follows modern React practices. Key files:

- [`route.ts`](src/app/api/assistant/route.ts) - AI assistant API endpoint
- [`layout.tsx`](src/app/layout.tsx) - Root layout with Geist font configuration
- [`page.tsx`](src/app/page.tsx) - Main portfolio page

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com). Simply push to your repository and connect it to Vercel for automatic deployments.

## License

MIT