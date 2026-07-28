# API Integration Mapping

| Frontend Component | Backend Endpoint | Method |
|-------------------|------------------|--------|
| LoginForm | /api/auth/login | POST |
| RegisterForm | /api/auth/register | POST |
| PropertyCard | /api/properties | GET |
| PropertyByIdPage | /api/properties/:id | GET |
| Reservation Button | /api/payments/create-checkout-session | POST |
| Landlord Dashboard | /api/landlord/properties | GET |



# API Integration Mapping - RentNest

## 🔑 Authentication

| Feature | Next.js Route | Backend API Endpoint | Method |
|---------|---------------|----------------------|--------|
| Register | `/auth/register` | `/api/auth/register` | `POST` |
| Login | `/auth/login` | `/api/auth/login` | `POST` |
| Get My Profile | (Global Layout) | `/api/auth/me` | `GET` |
| Update Profile | `/dashboard/tenant/profile` | `/api/auth/my-profile` | `PUT` |

## 🏠 Properties & Payments

| Feature | Next.js Route | Backend API Endpoint | Method |
|---------|---------------|----------------------|--------|
| Featured List | `/` | `/api/properties` | `GET` |
| Init Payment | `/payment` | `/api/payment/init` | `POST` |
