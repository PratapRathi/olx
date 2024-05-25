# Full Stack OLX Clone with Next.js 14 App Router: React, Tailwind, Prisma, MongoDB, Pusher, NextAuth 2024

This is a repository for a Full Stack OLX Clone with Next.js 14 App Router: React, Tailwind, Prisma, MongoDB, Pusher, NextAuth.


Features:

- Tailwind design
- Tailwind animations and effects
- Real-time messaging using Pusher
- Full responsiveness
- Credential authentication
- Google authentication
- Github authentication
- Linkedin authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Page loading state
- Page empty state
- Creation and deletion of Items
- Advanced search algorithm by category, location and keyword
    - For example we will filter out Items based on our keyword search
- Favorites system
- Shareable URL filters
    - Lets say you select a category and location, you will be able to share URL with a logged out friend in another browser and they will see the same results
- How to write POST and DELETE routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database (WITHOUT API! like Magic!)
- How to handle files like error.tsx and loading.tsx which are new Next 14 templating files to unify loading and error handling
- How to handle relations between Server and Child components!

### Prerequisites

**Node version 14.x**

### Live Deployed at 

```shell
https://olx-pratap.vercel.app/
```

### Cloning the repository

```shell
git clone https://github.com/PratapRathi/olx.git
```

### Install packages

```shell
npm install
```

### Setup .env file


```js
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `build`         | Starts a production build of the app     |
