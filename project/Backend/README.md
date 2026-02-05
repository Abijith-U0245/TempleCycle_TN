# TempleCycle TN Backend API

A comprehensive Node.js + Express backend for the TempleCycle TN platform - managing temple floral waste through sustainable supply chain solutions.

## 🚀 Features

- **Authentication & Authorization**: JWT-based login with role-based access control
- **User Management**: Admin, SHG, Buyer, and CSR roles
- **Product Management**: Temple flower products (incense powder, compost, dyes, essential oils)
- **RFQ System**: Request for Quotation workflow
- **Order Management**: Complete order lifecycle tracking
- **Dashboard Analytics**: Role-specific dashboards with metrics
- **Impact Tracking**: Environmental and social impact metrics
- **Traceability**: Supply chain transparency with QR codes
- **In-Memory Fallback**: Works without MongoDB using in-memory data

## 📋 Prerequisites

- Node.js 16+ 
- MongoDB 4.4+ (optional - falls back to in-memory)
- npm or yarn

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 🔧 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/templecycle
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

## 📚 API Documentation

### Authentication

#### POST /api/auth/login
```json
{
  "email": "admin@templecycle.com",
  "password": "admin123"
}
```

#### GET /api/auth/me
Headers: `Authorization: Bearer <token>`

### Products

#### GET /api/products
Query params: `page`, `limit`, `category`, `status`, `search`

#### POST /api/products
Headers: `Authorization: Bearer <token>`
Body: Product details (SHG/Admin only)

### RFQs

#### GET /api/rfq
Headers: `Authorization: Bearer <token>`

#### POST /api/rfq
Headers: `Authorization: Bearer <token>`
Body: RFQ details (Buyer/Admin only)

### Orders

#### GET /api/orders
Headers: `Authorization: Bearer <token>`

#### POST /api/orders
Headers: `Authorization: Bearer <token>`
Body: Order details (Buyer/Admin only)

### Dashboards

#### GET /api/dashboard/admin
Headers: `Authorization: Bearer <token>` (Admin only)

#### GET /api/dashboard/shg
Headers: `Authorization: Bearer <token>` (SHG/Admin only)

#### GET /api/dashboard/buyer
Headers: `Authorization: Bearer <token>` (Buyer/Admin only)

### Impact & Traceability

#### GET /api/impact/metrics
Headers: `Authorization: Bearer <token>`

#### GET /api/impact/traceability/:productId
Headers: `Authorization: Bearer <token>`

## 👥 User Roles & Permissions

### Admin
- Full access to all endpoints
- User management
- System configuration
- Analytics and reporting

### SHG (Self-Help Group)
- Manage products
- View and respond to RFQs
- Manage orders
- SHG dashboard

### Buyer
- Create and manage RFQs
- View products
- Manage orders
- Buyer dashboard

### CSR (Corporate Social Responsibility)
- Read-only access to most endpoints
- View impact metrics
- View traceability data

## 🌱 Seed Data

The backend includes seed data for testing:

**Default Users:**
- Admin: `admin@templecycle.com` / `admin123`
- SHG: `shg@templecycle.com` / `shg123`
- Buyer: `buyer@templecycle.com` / `buyer123`
- CSR: `csr@templecycle.com` / `csr123`

**Sample Products:**
- Premium Incense-Grade Marigold Powder
- Temple Flower Vermicompost
- Marigold Yellow Dye Extract

## 🔧 Development

### Running Tests
```bash
npm test
```

### Database Seeding
```bash
npm run seed
```

### Code Linting
```bash
npm run lint
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js          # Database configuration
│   │   └── env.js         # Environment variables
│   ├── controllers/       # API controllers
│   ├── middleware/        # Auth & role middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   │   ├── jwt.js        # JWT utilities
│   │   ├── response.js   # Response helpers
│   │   └── inMemoryDB.js # In-memory database
│   ├── seed/             # Seed data
│   └── server.js         # Main server file
├── .env.example          # Environment template
├── package.json          # Dependencies
└── README.md            # This file
```

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Role-based access control
- CORS configuration
- Rate limiting
- Input validation with Joi
- SQL injection prevention
- XSS protection

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Configure production database
3. Set strong `JWT_SECRET`
4. Enable HTTPS
5. Configure reverse proxy (nginx/Apache)

### Docker Support
```bash
docker build -t templecycle-backend .
docker run -p 5000:5000 templecycle-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Email: support@templecycle.com
- Documentation: [Wiki](link-to-wiki)

## 🌍 Impact

TempleCycle TN is transforming temple floral waste into sustainable products while empowering rural women and promoting environmental stewardship across Tamil Nadu.

**Key Metrics:**
- 2.8M+ kg waste processed
- 12,450+ women employed
- 2,847+ temples onboarded
- 456+ SHG units active
- 32+ districts covered
