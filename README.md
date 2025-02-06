# 🏪 Pawnshop Management System

## 📝 Project Overview

The **Pawnshop Management System** is a comprehensive business management solution designed to modernize and streamline pawnshop operations. This application empowers administrators to manage employees while enabling staff to efficiently handle customer relationships and inventory management. The system provides robust functionality for processing both pawned items and products for sale, with each item carefully tracked and associated with specific customer records.

## 🎯 Core Features

- **Employee Management** (Admin Access)
  - User role management
  - Staff performance tracking
  - Access control administration

- **Customer Management**
  - Detailed customer profiles
  - Transaction history
  - Contact information management

- **Product Management**
  - Inventory tracking
  - Item status monitoring
  - Customer-product association
  - Automated pricing suggestions

- **Future Enhancements**
  - PDF contract generation
  - E-commerce platform integration
  - Advanced reporting capabilities
  - Inventory analytics

## 🔧 Technology Stack

- **Frontend**
  - React with TypeScript
  - Vite (Build tool)
  - TailwindCSS (Styling)

- **Backend**
  - Node.js + Express.js
  - TypeScript
  - RESTful API architecture

- **Database**
  - Microsoft SQL Server

- **Tools & Libraries**
  - Axios (HTTP client)
  - JWT (Authentication)
  - TypeORM (Database ORM)

## 📂 Project Architecture

### Frontend Structure (`PawnshopClient`)
```
src/
├── main.tsx                 # Application entry point
├── index.html              # HTML template
├── components/             # Reusable UI components
├── pages/                  # Route components
├── styles/                 # Global styles and themes
└── assets/                 # Static resources
```

### Backend Structure (`PawnshopServer`)
```
src/
├── controllers/            # Request handlers
│   ├── customer.controller.ts
│   ├── employee.controller.ts
│   └── product.controller.ts
├── models/                 # Data models
│   ├── customer.model.ts
│   ├── employee.model.ts
│   └── product.model.ts
├── routes/                 # API routes
│   ├── customer.routes.ts
│   ├── employee.routes.ts
│   └── product.routes.ts
└── index.ts               # Server entry point
```

## 🌐 API Documentation

### Employee Management
| Method | Endpoint             | Description                           | Auth Required |
|--------|---------------------|---------------------------------------|---------------|
| POST   | `/api/employees`    | Create new employee record            | Admin         |
| GET    | `/api/employees`    | Retrieve all employees                | Admin         |
| GET    | `/api/employees/:id`| Get specific employee details         | Admin         |
| PUT    | `/api/employees/:id`| Update employee information           | Admin         |
| DELETE | `/api/employees/:id`| Remove employee record                | Admin         |

### Customer Management
| Method | Endpoint             | Description                           | Auth Required |
|--------|---------------------|---------------------------------------|---------------|
| POST   | `/api/customers`    | Register new customer                 | Yes           |
| GET    | `/api/customers`    | List all customers                    | Yes           |
| GET    | `/api/customers/:id`| Retrieve customer details             | Yes           |
| PUT    | `/api/customers/:id`| Update customer information           | Yes           |
| DELETE | `/api/customers/:id`| Remove customer record                | Yes           |

### Product Management
| Method | Endpoint            | Description                           | Auth Required |
|--------|---------------------|---------------------------------------|---------------|
| POST   | `/api/products`     | Add new product                       | Yes           |
| GET    | `/api/products`     | List all products                     | Yes           |
| GET    | `/api/products/:id` | Get product details                   | Yes           |
| PUT    | `/api/products/:id` | Update product information            | Yes           |
| DELETE | `/api/products/:id` | Remove product                        | Yes           |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Microsoft SQL Server
- npm or yarn package manager

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jklis2/Pawnshop.git
   cd Pawnshop
   ```

2. **Backend Setup**
   ```bash
   cd PawnshopServer
   npm install
   ```

3. **Configure Environment**
   Create `.env` file in `PawnshopServer`:
   ```env
   DB_HOST=localhost
   DB_PORT=1433
   DB_NAME=pawnshop
   DB_USER=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_secret_key
   ```

4. **Start Backend Server**
   ```bash
   npm run dev
   ```

5. **Frontend Setup**
   ```bash
   cd ../PawnshopClient
   npm install
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 💡 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.
