This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

OrionAi is a experimental AI project powered by Google's Gemini API. Because it currently operates entirely on the Gemini Free Tier Quota, it is highly susceptible to rate-limiting and immediate credit exhaustion as soon as heavy prompts are introduced.

This project is built to explore those limits and provide a baseline framework for AI-driven automation.

⚡ The Primary Weakness: API Quota Limits
Because this project utilizes the free version of the Gemini API, it faces aggressive strict limits imposed by Google:

Rate Limits: 15 RPM (Requests Per Minute)

Daily Caps: 1,500 RPD (Requests Per Day)

Token Caps: 32,000 TPM (Tokens Per Minute)

⚠️ Warning: If you input a massive first prompt, or if multiple users attempt to query OrionAi simultaneously, the free tier tokens will instantly exhaust, resulting in a 429 Too Many Requests or quota error.
