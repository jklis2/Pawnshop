# Pawnshop Management System

## 📝 Project Description

The **Pawnshop Management System** is an application designed to streamline operations in a pawnshop by enabling administrators to add employees, and all employees to manage customers and products for sale or pawn. Each product is associated with a specific customer. The application aims to simplify daily pawnshop operations like accepting items for pawn or sale. In the future, the app will be extended to include functionality for generating contracts in PDF format and integrating with an e-commerce platform, allowing automatic listing of items marked for sale in the online store.

## 🔧 Technologies Used

- **Frontend**: React TypeScript + Vite
- **Styling**: TailwindCSS
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: MongoDB
- **HTTP Communication**: `axios`

## 📂 Project Structure

### Frontend (`PawnshopClient`)

```css
src/
├── main.tsx
├── index.html
├── components/
├── pages/
├── styles/
└── assets/
```

### Backend (`PawnshopServer`)

```css
src/
├── controllers/
│   ├── customer.controller.ts
│   ├── employee.controller.ts
│   └── product.controller.ts
├── models/
│   ├── customer.model.ts
│   ├── employee.model.ts
│   └── product.model.ts
├── routes/
│   ├── customer.routes.ts
│   ├── employee.routes.ts
│   └── product.routes.ts
└── index.ts
```

## 🌐 API Endpoints

### Employee Endpoints

| HTTP Method | Endpoint             | Description              |
|-------------|----------------------|--------------------------|
| POST        | `/api/employees`     | Add a new employee       |
| GET         | `/api/employees/:id` | Get an employee by ID    |
| GET         | `/api/employees`     | Get all employees        |
| PUT         | `/api/employees/:id` | Update an employee       |
| DELETE      | `/api/employees/:id` | Delete an employee       |

### Customer Endpoints

| HTTP Method | Endpoint             | Description              |
|-------------|----------------------|--------------------------|
| POST        | `/api/customers`     | Add a new customer       |
| GET         | `/api/customers/:id` | Get a customer by ID     |
| GET         | `/api/customers`     | Get all customers        |
| PUT         | `/api/customers/:id` | Update a customer        |
| DELETE      | `/api/customers/:id` | Delete a customer        |D

### Product Endpoints

| HTTP Method | Endpoint             | Description              |
|-------------|----------------------|--------------------------|
| POST        | `/api/products`      | Add a new product        |
| GET         | `/api/products/:id`  | Get a product by ID      |
| GET         | `/api/products`      | Get all products         |
| PUT         | `/api/products/:id`  | Update a product         |
| DELETE      | `/api/products/:id`  | Delete a product         |

## ✨ Features

- Employee management (admin role).
- Customer management.
- Product management linked to specific customers.
- Basic CRUD operations for employees, customers, and products.
- Automatic linking of products to customers.
- Future plans: PDF contract generation.
- Future plans: Integration with an e-commerce platform.

## 🚀 Future Development Plans

- Integration with an e-commerce application to automatically list products for sale in an online store.
- Generation of pawn and sale contracts in PDF format.
- Extension of the application with additional reporting and inventory management features.

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jklis2/Pawnshop.git
```
### 2.  Install Backend Dependencies
Navigate to the backend directory:
```bash
cd PawnshopServer
```
Install the dependencies:
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `PawnshopServer` directory and add the following environment variables:

```bash
DATABASE_URL=<YourDatabaseURL>
```

### 4. Start the Backend Serve

```bash
npm run dev
```

### 5. Install Frontend Dependencies

Open a new terminal window, navigate to the frontend directory:

```bash
cd ../PawnshopClient
```
Install the dependencies:

```bash
npm install
```

### 6. Start the Frontend Application

```bash
npm run dev
```

The frontend will automatically open in your default browser on `http://localhost:5173`. If it doesn't, navigate to this URL manually.
