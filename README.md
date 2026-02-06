# ST Comp Holdings Sdn Bhd - Service Marketplace Platform

A modern, full-stack web application designed for **ST Comp Holdings Sdn Bhd** to facilitate corporate service purchases, specialist management, and order tracking.

This platform connects customers (both registered and guests) with corporate service specialists (e.g., Company Secretaries), allowing for seamless browsing, purchasing, and management of business services like company incorporation.

---

## 🚀 Technology Stack

We use a robust, type-safed, and modern stack to ensure performance, scalability, and developer experience.

### **Frontend**
*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type checking.
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) for client-side state.
*   **Styling**: 
    *   [Tailwind CSS v4](https://tailwindcss.com/) for utility-first styling.
    *   [Shadcn UI](https://ui.shadcn.com/) for accessible, reusable component primitives (Radix UI based).
    *   [Lucide React](https://lucide.dev/) for beautiful icons.
    *   **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/) for elegant, non-intrusive alerts.

### **Backend**
*   **API**: Next.js API Routes (App Router).
*   **Database**: [PostgreSQL](https://www.postgresql.org/) hosted on **Neon Tech** (Serverless Postgres).
*   **ORM**: [TypeORM](https://typeorm.io/) for object-relational mapping and schema management.
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Auth.js) with Google & Credentials providers. (Using TypeORM Adapter)
*   **Storage**: **Local Storage** for storing images within the `public/uploads` directory.

---

## ✨ Key Features

### 1. **Service Marketplace**
*   **Browse Services**: Users can view verified specialists and their service offerings.
*   **Service Details**: Comprehensive pages showing price breakdowns, specialist profiles, and certifications.
*   **Dynamic Pricing**: Calculates Base Price + Platform Fees automatically.

### 2. **Authentication & Identity**
*   **NextAuth Implementation**: Secure JWT-based session management.
*   **Multi-Provider**: Google OAuth and Email/Password authentication.
*   **Role-Based Access**: Role management for Users, Specialists, and Admins.

### 3. **Dashboards**
*   **Customer Dashboard**: View "My Companies", track order status, and manage profile settings.
*   **Admin Panel**: 
    *   **Verify Specialists**: Approve/Reject company registrations.
    *   **Client Management**: Professional table view with detailed registration modals.
    *   **Master Data**: Manage global service offerings (Master List).

### 4. **Modern UI/UX**
*   **Responsive Design**: Mobile-first approach.
*   **Real-time Feedback**: Instant validation and success/error toasts using *Sonner*.
*   **Auto-sync Schema**: TypeORM synchronization for seamless development database updates.

---

## 📂 Project Structure

```bash
.
├── src/
│   ├── app/            # Next.js App Router (Pages & API)
│   ├── components/     # Reusable UI Components
│   ├── entities/       # TypeORM Entity Definitions
│   ├── lib/            # Utility libraries (DB source, Auth options)
│   ├── modules/        # Domain-specific logic (Controllers & Services)
│   ├── store/          # Zustand State Stores
│   └── types/          # Global TypeScript definitions
├── public/
│   └── uploads/        # Local file storage for uploaded images
└── ...
```

---

## 🛠️ Getting Started

### Prerequisites
*   Node.js (v18+)
*   pnpm (Recommended)
*   A Neon Tech PostgreSQL Database URL

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd any-comp-project
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file:
    ```env
    DATABASE_URL="postgresql://..."
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="..."
    GOOGLE_CLIENT_ID="..."
    GOOGLE_CLIENT_SECRET="..."
    ```

4.  **Database Sync:**
    The project uses TypeORM's `synchronize: true` in development mode to automatically create tables based on entities.
    Ensure your `DATABASE_URL` is correct, then run:
    ```bash
    pnpm dev
    ```

---

## 📝 Key Commands

*   `pnpm dev`: Start development server.
*   `pnpm build`: Build for production.
*   `pnpm start`: Start production server.
*   `pnpm lint`: Run ESLint.

---

## 🔒 Security & Best Practices

*   **JWT Authentication**: Securely signed tokens.
*   **Type Safety**: Complete TypeScript implementation.
*   **Data Integrity**: TypeORM entities with strict relations and validation.
*   **Password Hashing**: BCrypt hashing for credential security.

---

*Verified & Updated: 2026-02-06*
