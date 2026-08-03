


# 🏠 RentNest — Full-Stack API Integration Mapping & System Architecture

This document details the exhaustive synchronization matrix between the Next.js client layers and the remote REST API endpoint cluster. It maps specific user features, frontend presentation components, protected dashboard paths, and verified server adapters.

---
  



## 🛰️ Global Gateways & Environment Variable Spec

To secure network requests across cross-origin requests (CORS), the system consumes production URLs securely bounded via Next.js client environments.

*   **Production API Server:** `https://assignment-4-vnjw.onrender.com`
*   **Dynamic Variable Engine Key:** `process.env.NEXT_PUBLIC_BACKEND_API_URL`
*   **Secure Authorization Protocol:** JSON Web Tokens (JWT) dispatched via standard `Bearer` authorization headers.

---





## 🔑 1. Authentication & Session Lifecycles

Handles cryptographic registration payloads, secure authorization token validation switches, and client-side layout session persistence.

| Feature / User Flow | Next.js Page Route | Backend API Endpoint | HTTP Method | Frontend Controller Component |
| :--- | :--- | :--- | :---: | :--- |
| **Role Selection & Registration** | `/auth/register` | `/api/auth/register` | `POST` | `RegisterForm` |
| **Identity Authentication** | `/auth/login` | `/api/auth/login` | `POST` | `LoginForm` |
| **Resolve User Model** | *(Global Layout Shell)* | `/api/auth/me` | `GET` | `RootLayout` (Server Async Thread) |
| **Mutate Profile Database Mesh** | `/dashboard/tenant/profile` | `/api/auth/my-profile` | `PUT` | `ProfileForm` |

---





## 🏠 2. Public Catalogs & Dynamic Filtering Mesh

Consumes heavy listing data streams, provides zero-latency parameter query indexing, and maps relational properties into responsive UI grids.

| Feature / User Flow | Next.js Page Route | Backend API Endpoint | HTTP Method | Frontend Controller Component |
| :--- | :--- | :--- | :---: | :--- |
| **Live Featured Sliders** | `/` | `/api/properties?limit=3` | `GET` | `FeaturedProperties` |
| **Taxonomy Navigation Mesh** | `/` | `/api/categories` | `GET` | `CategorySlider` |
| **Browse & Keyword Filtering** | `/properties` | `/api/properties` | `GET` | `PropertiesGrid` (Consumes `?search=`) |
| **Asset Specifics & Relational Data**| `/properties/[id]` | `/api/properties/:id` | `GET` | `PropertyByIdPage` |

---






## 💻 3. Authorized Panel Clusters (Role-Based Roster)

Protected interfaces requiring token verification guarded under the global Next.js `middleware.ts` layer. Mapped distinctly across **Tenant**, **Landlord**, and **Admin** actors.




### 🛡️ Tenant Access Matrix

| Feature / User Flow | Next.js Page Route | Backend API Endpoint | HTTP Method | Frontend Controller Component |
| :--- | :--- | :--- | :---: | :--- |
| **Lease Request History** | `/dashboard/tenant` | `/api/rentals` | `GET` | `TenantOverview` |
| **Rental Tracking Checks** | `/dashboard/tenant/requests` | `/api/rentals/my-requests` | `GET` | `RentalRequestTable` |
| **Payment Ledgers Logs** | `/dashboard/tenant/payments` | `/api/payments` | `GET` | `PaymentLedger` |




### 🏠 Landlord Roster

| Feature / User Flow | Next.js Page Route | Backend API Endpoint | HTTP Method | Frontend Controller Component |
| :--- | :--- | :--- | :---: | :--- |
| **Registered Asset Stream** | `/dashboard/landlord` | `/api/landlord/properties` | `GET` | `LandlordProperties` |
| **Write Asset Instance (Form)** | `/dashboard/landlord/properties/new` | `/api/landlord/properties` | `POST` | `CreateListingForm` |
| **Audit Incoming Contracts** | `/dashboard/landlord/requests` | `/api/landlord/requests` | `GET` | `IncomingRequests` |
| **Mutate Contract State** | `/dashboard/landlord/requests` | `/api/landlord/requests/:id` | `PATCH` | `RequestManager` |




### 👑 Admin Management

| Feature / User Flow | Next.js Page Route | Backend API Endpoint | HTTP Method | Frontend Controller Component |
| :--- | :--- | :--- | :---: | :--- |
| **Administrative Telemetry Overview**| `/dashboard/admin` | `/api/admin/stats` | `GET` | `AdminOverview` |
| **System User Matrix Control** | `/dashboard/admin/users` | `/api/admin/users` | `GET` | `AdminUserRoster` |
| **Toggle Active User Ban Status** | `/dashboard/admin/users` | `/api/admin/users/:id` | `PATCH` | `UserStatusController` |
| **Manage Category Schema** | `/dashboard/admin/categories` | `/api/categories` | `POST` | `CategoryForm` |
| **Property Moderation Queue** | `/dashboard/admin/moderation` | `/api/properties/moderation`| `GET` | `PropertyModerationList` |

---




## 💳 4. Production Fiscal Gateways & Payment Outcomes

Manages real-time billing calculations, secure gateway redirections, and digital verification handshakes for transactional receipts.

| Feature / User Flow | Next.js Page Route | Backend API Endpoint | HTTP Method | Frontend Controller Component |
| :--- | :--- | :--- | :---: | :--- |
| **Initialize SSLCommerz Token** | `/dashboard/tenant/requests/[id]/pay` | `/api/payments/create` | `POST` | `PaymentGatewayInitiator` |
| **Resolve Gateway Callbacks** | `/payment/success` & `/cancel` | `URL Param Extraction` | `GET` | `PaymentOutcomeManager` |
| **Active Lease Document Invoicing** | `/dashboard/tenant/payments/receipt/[id]`| `/api/payments?transactionId=:id` | `GET` | `CustomReceiptPage` |

---





## 🔒 5. Route Guards & Interceptor Policies

All `/dashboard/:path*` targets automatically traverse the native server `middleware.ts` stack to decode JWT payloads using low-level base64 buffers before rendering views.



### Next.js Middleware Matcher Node:
```typescript
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/login',
    '/register'
  ],
};
```


*Note: Public callback strings (`/dashboard/tenant/payments/success` and `/dashboard/tenant/payments/fail`) are dynamically white-listed inside the middleware thread to allow direct validation returns from external banking IPs without route guard blocks.*

---
