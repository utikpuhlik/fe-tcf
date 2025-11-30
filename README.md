## Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Second, add environment variables in a `.env` file. You can use the `.env.example` file as a template.

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Overview

### Theme & Design
* Tailwind CSS
* **Components**: Shadcn UI
* **Icons**: lucide-icons (radix ui)
* **Font**: Geist with cyrillic support
* **Theme**: Only light theme for now + prussian blue primary color (bg-blue-900)

### Release & Deployment
Now vercel is used for deployment. You can deploy your own version by pushing your branch to repository.

### Lint & Formatting
* Biome (v2) for linting and formatting
* Husky (pre-commit hooks)


## Business Logic Overview
### Catalog
```
Categories
    ↓ 1-to-many
Subcategories
    ↓ 1-to-many
Products
    ↓ 1-to-many
Offers - конкретное предложение от производителя/поставщика:
    ↓ add-to-cart
Cart Items
```
## Useful Links
- russian banks icons: https://www.figma.com/community/file/863381574197862284
- navbar with amazing animation: https://www.shadcnblocks.com/block/navbar1
- components: https://www.shadcn-ui-blocks.com/blocks/react/ecommerce/shopping-cart/1
- components_2: https://shadcnuikit.com/dashboard/default