This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Enable https on development server

**Https on localhost is only needed for developing push notifications**

Don't use Firefox when developing notifications for your sanity.

Install [mkcert](https://github.com/FiloSottile/mkcert)

When you have downloaded the binary, install mkcert

```bash
mkcert -install
```

Include the following in your `.env.local` file

```bash
NEXT_PUBLIC_URL=https://localhost:3000
NODE_TLS_REJECT_UNAUTHORIZED = '0'
```

Generate a certificate for localhost. Run the command in the root directory of the repository

```bash
mkcert localhost
```

Run the development server with https

```bash
npm run dev:https
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
