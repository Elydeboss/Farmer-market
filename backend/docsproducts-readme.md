# Products API, guard notes

scope, dev2, products and marketplace

## base url
`/api/products`

## auth
- public read, GET only
- write is farmer only, jwt in `Authorization: Bearer <token>`
- farmer must be verified by admin, guard is `ensureVerifiedFarmer`

## security guards in play
- `authMiddleware`, reads jwt, sets `req.user`
- `authorizeRoles("farmer")`, blocks non farmers on write routes
- `ensureVerifiedFarmer`, only verified farmers can create, update, delete, toggle
- ownership check, farmer can only modify own products

## validation shape
server validates both body and query, errors return `400` with:
```json
{
  "message": "validation failed",
  "errors": ["price is required, number >= 0"]
}

Environment

Create .env in backend:

PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/agrolink
JWT_SECRET=supersecret
JWT_EXPIRATION=1d

# optional for email features
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password

Run
npm run dev

backend/
  src/
    config/
      db.ts
      email.ts
    controllers/
      user.controller.ts
      admin.controller.ts
      product.controller.ts
    middlewares/
      auth.middleware.ts
      product.validation.ts
      ensureVerifiedFarmer.ts
    models/
      user.schema.ts
      products.schema.ts
      order.schema.ts
    routes/
      user.routes.ts
      admin.routes.ts
      product.routes.ts
    seeders/
      product.seeder.ts
    index.ts
  seedAdmin.ts
  package.json
  tsconfig.json
  .env

