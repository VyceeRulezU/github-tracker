# GitDash | Premium Developer Dashboard

A high-performance, Apple-inspired dashboard built to streamline your development workflow.

## 🚀 Overview

GitDash is a production-quality React application designed for developers who value minimal aesthetics and clear data visualization. It provides real-time insights into your GitHub activity, manages your personal task lists, and tracks local environmental data.

### Core Features
- **GitHub Explorer**: Analyze any developer profile with integrated repository filtering and smart sorting.
- **Task Manager**: High-performance task tracking with local persistence and progress insights.
- **Weather Insights**: Real-time atmospheric data based on your current workspace location.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Typography**: Raleway (Primary) & Inter (System)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React Router v7

## 🏗 Architecture

The project follows a strict **Service-Oriented Architecture (SOA)** ensuring a total separation of concerns:

- **`/src/services`**: Infrastructure layer handling all API communication logic.
- **`/src/hooks`**: Domain logic layer using custom hooks for lifecycle management and state synchronization.
- **`/src/components/ui`**: Atomic UI library focusing on reusable, premium building blocks.
- **`/src/pages`**: View layer responsible for layout and feature orchestration.

> [!NOTE]
> For a deep dive into the architecture, see [docs/architecture.md](./docs/architecture.md).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📄 Documentation

Comprehensive guides are available in the `/docs` directory:
- [Routes Definition](./docs/routes.md)
- [Custom Hooks](./docs/hooks.md)
- [State Strategy](./docs/state.md)
- [Component Library](./docs/components.md)

## 🎯 Core Principles
- **Clean UI**: Minimalist design philosophy inspired by modern editorial aesthetics.
- **No Backend**: Stateless architecture utilizing secure client-side persistence and public APIs.
- **Fluid Layout**: Responsive, wide-screen optimized workspace.
