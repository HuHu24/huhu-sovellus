# HuHu leirisovellus

HuHu leirisovellus (HuHu camp app) is mobile app developed for [Lounais-Suomen Partiopiiri ry](https://lounaissuomi.partio.fi/) [HuHu24 event](https://huhuleiri.fi).
Purpose of the app is to enable direct communication to participants.
Main features of the app are releases and timetable.
App also includes various other features such as safety chat, notifications, map and information pages.

## Technical overview

## Development

### Figma

Figma is used to design interfaces of the app and for other diagrams to help develop the app

- [Link to user interfaces](https://www.figma.com/file/Ln3PArMLgmxdIyilgOkazZ/Sovellus?type=design&t=ZucJONXrBHwmmhcD-6)
- [Link to other diagrams and plans](https://www.figma.com/file/NfgHJLsfqPndRL8NtWJFbc/Kaikki-kaaviot?type=whiteboard&t=ZucJONXrBHwmmhcD-6)

### Getting started with the repository

#### Prerequisites

You need at least Node version 20 at your local machine.

#### Installation

1. Download the repository for your local machine

```
git clone https://github.com/HuHu24/huhu-sovellus.git
```

2. Change directory to the repository

```
cd huhu-sovellus
```

3. Install packages

```
npm i
```

4. Configure the values below to `.env.local`

```
FB_PROJECT_ID=
FB_PRIVATE_KEY=
FB_CLIENT_EMAIL=
NEXT_PUBLIC_URL=
NODE_TLS_REJECT_UNAUTHORIZED='0'
```

5. Run development server

```
npm run dev
```

#### Configuring [Firebase](https://firebase.google.com/)

1. Create Firebase project
2. Configure Authentication, Firestore Database, Storege, Remote Config and Messaging
   - When configuring authentication, configure both Email/Password and Anynomous
3. Replace Firebase config at `firebase.ts`

### How to enable https on development server

Https on localhost is only needed for developing push notifications

Don't use Firefox when developing notifications for your sanity.

1. Install [mkcert](https://github.com/FiloSottile/mkcert)

2. When you have downloaded the binary, install mkcert

```bash
mkcert -install
```

3. Include the following in your `.env.local` file

```bash
NEXT_PUBLIC_URL=https://localhost:3000
NODE_TLS_REJECT_UNAUTHORIZED = '0'
```

4. Generate a certificate for localhost. Run the command in the root directory of the repository

```bash
mkcert localhost
```

5. Run the development server with https

```bash
npm run dev:https
```

## Development team

Head developer and project leader is [Aaro Heroja](https://github.com/Aromiii), [aaro.heroja@partio.fi](mailto:aaro.heroja@partio.fi).
Team includes two other developers. All the developers are volunteers.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
