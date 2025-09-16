# DevLinks - Professional Link Sharing Platform

<div align="center">

![DevLinks Logo](public/avatar.png)

**A modern, full-stack link-in-bio application built with Next.js 14**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-purple?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)](https://postgresql.org/)

[Live Demo](https://devlinks-demo.vercel.app) • [Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT)

</div>

## 📋 Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Screenshots](#screenshots)
-   [Getting Started](#getting-started)
-   [Project Structure](#project-structure)
-   [API Documentation](#api-documentation)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [License](#license)

## 🎯 Overview

DevLinks is a professional link-sharing platform that allows users to create personalized link pages. Built as a **Guru-level Frontend Mentor challenge**, this application demonstrates modern full-stack development practices with Next.js 14, TypeScript, and PostgreSQL.

### Key Highlights

-   🏆 **Guru Level Challenge** - Frontend Mentor's highest difficulty level
-   🚀 **Modern Architecture** - Next.js 14 App Router with Server Components
-   🔒 **Secure Authentication** - NextAuth.js with JWT strategy
-   📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
-   🎨 **Real-time Preview** - Live mobile mockup updates
-   ⚡ **Performance Optimized** - Database indexing and connection pooling

## ✨ Features

### 🔐 Authentication & Security

-   **Secure Registration & Login** with NextAuth.js
-   **Password Hashing** using bcryptjs
-   **JWT-based Session Management**
-   **Protected Routes** with middleware
-   **Form Validation** with Yup schemas

### 📱 Link Management

-   **Drag & Drop Reordering** with SortableJS
-   **Platform Support** - GitHub, LinkedIn, Facebook, Twitter, Instagram, YouTube, Website, Custom
-   **URL Validation** with platform-specific patterns
-   **CRUD Operations** - Create, read, update, delete links
-   **Real-time Updates** in mobile preview

### 👤 Profile Management

-   **Avatar Upload** with Vercel Blob storage
-   **Profile Details** - First name, last name, email
-   **Real-time Preview** with mobile mockup
-   **Share Functionality** - One-click link copying
-   **Responsive Design** for all screen sizes

### 🎨 User Experience

-   **Interactive Elements** with hover and focus states
-   **Toast Notifications** for user feedback
-   **Loading States** throughout the application
-   **Error Handling** with comprehensive validation
-   **Accessibility** considerations

## 🛠️ Tech Stack

### Frontend

-   **Next.js 14** - App Router, Server Components, Server Actions
-   **React 18** - Latest React features and hooks
-   **TypeScript** - Full type safety with zero `any` types
-   **Tailwind CSS** - Utility-first CSS framework
-   **Formik** - Advanced form handling
-   **Yup** - Schema validation
-   **Lucide React** - Beautiful icons

### Backend

-   **Next.js API Routes** - Serverless API endpoints
-   **Server Actions** - Server-side data mutations
-   **Prisma ORM** - Type-safe database operations
-   **PostgreSQL** - Robust relational database
-   **NextAuth.js** - Authentication framework
-   **Vercel Blob** - Cloud file storage

### Development Tools

-   **ESLint** - Code quality and consistency
-   **TypeScript** - Static type checking
-   **Prisma Studio** - Database management
-   **Hot Reload** - Fast development experience

## 📸 Screenshots

<div align="center">

### Dashboard

![Dashboard](https://via.placeholder.com/800x400/1e40af/ffffff?text=Dashboard+View)

### Mobile Preview

![Mobile Preview](https://via.placeholder.com/300x600/1e40af/ffffff?text=Mobile+Preview)

### Link Management

![Link Management](https://via.placeholder.com/800x400/1e40af/ffffff?text=Link+Management)

</div>

## 🚀 Getting Started

### Prerequisites

-   **Node.js** 18+ and **Yarn** package manager
-   **PostgreSQL** database (local or cloud)
-   **Vercel Blob** storage account

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/htirawi/link-sharing-app.git
    cd devlinks
    ```

2. **Install dependencies**

    ```bash
    yarn install
    ```

3. **Environment Setup**

    ```bash
    cp .env.example .env
    ```

    Configure your `.env` file:

    ```bash
    # Database
    DATABASE_URL="postgresql://username:password@localhost:5432/devlinks"

    # Authentication
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your-secret-key"

    # Vercel Blob Storage
    BLOB_READ_WRITE_TOKEN="your-blob-token"
    BLOB_FOLDER_NAME="dev-links"
    ```

4. **Database Setup**

    ```bash
    # Run migrations
    yarn prisma:migrate

    # Generate Prisma client
    yarn prisma:generate

    # Seed database with test user
    yarn prisma:seed
    ```

5. **Start Development Server**

    ```bash
    yarn dev
    ```

6. **Access the Application**
    - Open [http://localhost:3000](http://localhost:3000)
    - Use test credentials: `hussein` / `hussein@123`

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint

# Database
yarn prisma:migrate    # Run database migrations
yarn prisma:generate   # Generate Prisma client
yarn prisma:deploy     # Deploy migrations to production
yarn prisma:seed       # Seed database with test data
```

## 📁 Project Structure

```
devlinks/
├── app/                          # Next.js 14 App Router
│   ├── [username]/              # Dynamic user profile routes
│   │   ├── (authWrapper)/       # Protected routes group
│   │   │   ├── edit/            # Profile editing
│   │   │   └── links/           # Link management
│   │   └── page.tsx             # User profile page
│   ├── auth/                    # Authentication pages
│   │   ├── signin/              # Login page
│   │   ├── signup/              # Registration page
│   │   └── signout/             # Logout page
│   ├── api/                     # API routes
│   │   └── auth/                # NextAuth.js API
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable UI components
│   ├── button/                   # Button component
│   ├── input/                    # Input components
│   ├── icons/                    # Icon components
│   └── ...                       # Other components
├── actions/                      # Server actions
│   ├── auth/                    # Authentication actions
│   ├── links.ts                 # Link management actions
│   └── profile.ts               # Profile actions
├── hooks/                        # Custom React hooks
├── utils/                        # Utility functions
├── prisma/                       # Database schema & migrations
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Database migrations
│   └── seed.ts                  # Database seeding
├── types/                        # TypeScript type definitions
└── public/                       # Static assets
```

## 📚 API Documentation

### Authentication Endpoints

-   `POST /api/auth/signin` - User login
-   `POST /api/auth/signup` - User registration
-   `POST /api/auth/signout` - User logout

### User Profile Endpoints

-   `GET /[username]` - Get user profile
-   `PUT /[username]/edit` - Update profile
-   `GET /[username]/links` - Get user links
-   `POST /[username]/links` - Create new link
-   `PUT /[username]/links` - Update link
-   `DELETE /[username]/links` - Delete link

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**

    - Import your GitHub repository to Vercel
    - Configure environment variables in Vercel dashboard

2. **Database Setup**

    - Use Vercel PostgreSQL or external PostgreSQL
    - Update `DATABASE_URL` in environment variables

3. **Blob Storage**

    - Set up Vercel Blob storage
    - Add `BLOB_READ_WRITE_TOKEN` and `BLOB_FOLDER_NAME`

4. **Deploy**
    ```bash
    yarn prisma:deploy
    ```

### Environment Variables

| Variable                | Description                  | Required |
| ----------------------- | ---------------------------- | -------- |
| `DATABASE_URL`          | PostgreSQL connection string | ✅       |
| `NEXTAUTH_URL`          | Application URL              | ✅       |
| `NEXTAUTH_SECRET`       | JWT secret key               | ✅       |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token            | ✅       |
| `BLOB_FOLDER_NAME`      | Blob storage folder name     | ✅       |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
    ```bash
    git checkout -b feature/amazing-feature
    ```
3. **Commit your changes**
    ```bash
    git commit -m 'Add amazing feature'
    ```
4. **Push to the branch**
    ```bash
    git push origin feature/amazing-feature
    ```
5. **Open a Pull Request**

### Development Guidelines

-   Follow TypeScript best practices
-   Use meaningful commit messages
-   Add tests for new features
-   Update documentation as needed
-   Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   [Frontend Mentor](https://www.frontendmentor.io/) for the design challenge
-   [Next.js](https://nextjs.org/) for the amazing framework
-   [Prisma](https://prisma.io/) for the excellent ORM
-   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:

-   Open an [issue](https://github.com/htirawi/link-sharing-app/issues)
-   Check the [documentation](https://github.com/htirawi/link-sharing-app/wiki)
-   Contact us at [hmtirawi@gmail.com](mailto:hmtirawi@gmail.com)

---

<div align="center">

**Built with ❤️ by [Hussein Tirawi](https://github.com/htirawi)**

[⭐ Star this repo](https://github.com/htirawi/link-sharing-app) • [🐛 Report Bug](https://github.com/htirawi/link-sharing-app/issues) • [💡 Request Feature](https://github.com/htirawi/link-sharing-app/issues)

</div>
