# Queen Crackers Fireworks Website

Queen Crackers is a complete static storefront prototype for a fireworks shop. It includes a premium landing page, product catalog, category filter, cart, customer checkout form, printable bill generator, and an admin demo for manually adding categories and products with image uploads.

## Features

- Queen Crackers brand logo and responsive fireworks storefront UI.
- Product catalog with category filtering and search.
- Add-to-cart workflow with quantity controls and cart clearing.
- Bill generation with subtotal, 18% GST, delivery charge, grand total, invoice number, and print support.
- Admin panel concept for manually adding categories, products, stock, price, description, and uploaded product images.
- Browser `localStorage` persistence for demo products, categories, and cart data.
- ASP.NET Core + SQL Server architecture concept section for converting the prototype into a full database-backed web application.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Suggested ASP.NET Core + SQL Server build plan

1. Create an ASP.NET Core MVC or Razor Pages project.
2. Add Entity Framework Core models for `Category`, `Product`, `Customer`, `Order`, `OrderItem`, `Payment`, and `AdminUser`.
3. Store uploaded images in `wwwroot/uploads` and save the image path in the `Products` table.
4. Build admin CRUD pages for categories and products.
5. Build customer pages for product listing, cart, checkout, and invoice printing.
6. Use SQL Server migrations to create the database and seed default Queen Crackers categories.
