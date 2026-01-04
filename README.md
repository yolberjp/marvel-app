# Marvel App

This app allows users to search for all Marvel characters, view detailed information about each character including the comics where they appear, and manage a list of favorites.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Architecture](#architecture)

## Features

- **Character List**: List of Marvel characters with search functionality
- **Character Details**: View detailed information about each character including their comics
- **Favorites Management**: Add/remove characters to/from your favorites list using local storage
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Server-Side Rendering**: Leverages Next.js App Router for optimal performance

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20 or higher
- **pnpm**: Package manager (recommended) or npm/yarn
- **ComicVine API Key**: Required for fetching Marvel character data

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd marvel-app
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your ComicVine API key:
   ```env
   COMICVINE_API_KEY=your_api_key_here
   ```

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

### Linting

Run ESLint to check for code quality issues:

```bash
pnpm lint
```

### Testing

The application uses Vitest and React Testing Library for unit and component testing.

Run all tests:

```bash
pnpm test
```

## Error Handling

The application includes custom error handling pages to provide a better user experience:

- **404 Page** (`app/not-found.tsx`): Displayed when a user navigates to a non-existent route.
- **Generic Error Page** (`app/error/page.tsx`): A catch-all error page that displays error details based on search parameters.
- **Error UI Component** (`app/components/error-page.tsx`): A reusable component used by both the 404 and error pages to maintain a consistent look and feel.

## Environment Variables

| Variable            | Description                                        | Required |
| ------------------- | -------------------------------------------------- | -------- |
| `COMICVINE_API_KEY` | Your ComicVine API key for fetching character data | Yes      |

## Architecture

### Application Flow

1. **Data Fetching**: The app uses Next.js Server Actions for data fetching, located in the `app/actions` directory
2. **API Integration**: All API calls go through the `fetchApi` utility which communicates with the ComicVine API
3. **State Management**:
   - Server state is managed through Next.js Server Components and Server Actions
   - Client state (favorites) is managed using React Context API with local storage persistence
4. **Routing**: Utilizes Next.js App Router with file-based routing
5. **Rendering Strategy**:
   - Server-Side Rendering (SSR) for initial page loads
   - Client-side interactivity for search and favorites

### Key Components

- **Server Actions** (`app/actions/`): Handle all data fetching and API communication
- **Context Providers** (`app/contexts/`): Manage global client-side state (favorites)
- **Page Components**: Server components that fetch and display data
- **UI Components**: Reusable client and server components for the interface

## Tech Stack

### Core Framework

- **Next.js**
- **React**
- **TypeScript**

### Styling

- **TailwindCSS**

### Utilities

- **use-debounce**

### Testing

- **Vitest**
- **React Testing Library**
- **jsdom**

### Development Tools

- **ESLint**
- **Prettier**
- **TypeScript**

### Fonts

- **Roboto Condensed**: Google Font used throughout the application

**Note**: This application uses the ComicVine API to fetch Marvel character data. Make sure you have a valid API key configured in your `.env` file before running the application. You can get a free API key from [ComicVine](https://comicvine.gamespot.com/api/).
