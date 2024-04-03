# HuHu leirisovellus

HuHu leirisovellus (HuHu camp app) is mobile app developed for [Lounais-Suomen Partiopiiri ry](https://lounaissuomi.partio.fi/) [HuHu24 event](https://huhuleiri.fi).
Purpose of the app is to enable direct communication to participants.
Main features of the app are releases and timetable.
App also includes various other features such as safety chat, notifications, map and information pages.

## Technical overview
HuHu leirisovellus main technologies are Next.js and Firebase. 
The app is build with Next.js app directory and uses TypeScript. 
Tailwind CSS is used for styling. 

The app is delivered to end users as PWA.

## Development
### Getting started with the repository

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

4. Setup [Firebase](https://firebase.google.com/)
   1. Create Firebase project
   2. Configure Authentication, Firestore Database, Storege, Remote Config and Messaging
      - When configuring authentication, configure both Email/Password and Anynomous
   3. Replace Firebase config at `firebase.ts`
   4. Generate new private key from project settings -> service accounts -> Firebase Admin SDK
   5. Fill in the values in `.env.local` from the private key
   

5. Configure the values below to `.env.local`

```dotenv
FB_PROJECT_ID=                     # Firebase project id from Firebase Admin SDK private key file
FB_PRIVATE_KEY=                    # Firebase private key from Firebase Admin SDK private key file
FB_CLIENT_EMAIL=                   # Firebase client email from Firebase Admin SDK private key file
NEXT_PUBLIC_URL=                   # URL where code is hosted
```

6. Run development server

```
npm run dev
```

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

### Figma

Figma is used to design interfaces of the app and for other diagrams to help develop the app

- [Link to user interfaces](https://www.figma.com/file/Ln3PArMLgmxdIyilgOkazZ/Sovellus?type=design&t=ZucJONXrBHwmmhcD-6)
- [Link to other diagrams and plans](https://www.figma.com/file/NfgHJLsfqPndRL8NtWJFbc/Kaikki-kaaviot?type=whiteboard&t=ZucJONXrBHwmmhcD-6)


## Development team

Head developer and project leader is [Aaro Heroja](https://github.com/Aromiii), [aaro.heroja@partio.fi](mailto:aaro.heroja@partio.fi).
Team includes two other developers. 

If you want to know more about the repository, contact [Aaro](mailto:aaro.heroja@partio.fi).
