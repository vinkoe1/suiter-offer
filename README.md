# Marriage Permission Offer

A shareable, mobile-friendly calculator for a prospective suitor to compose a **marriage-permission contribution** (livestock and classic cars) and submit only when the total reaches **$50,000**.

There is no checkout, payment, or live pricing. Values are a one-time family snapshot. See [VALUATION.md](./VALUATION.md).

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server with hot reload |
| `npm run build` | Typecheck and build static files into `dist/` |
| `npm run preview` | Serve the production build locally |

## How it works

- Nine gift items with **fixed unit prices** live in [`src/config/offer.ts`](./src/config/offer.ts). Change prices, labels, or the $50,000 minimum there.
- The daughter’s name defaults to `my daughter` and is editable in the page header (so it can be customized without a code change).
- Quantities, name, message, and daughter name are stored in the **URL query string** and in `localStorage`, so a filled-in offer can be bookmarked or shared. A blank page is also shareable.
- **Submit offer** stays disabled until the running total is at least $50,000. On submit, a confirmation screen summarizes the offer and can copy it as plain text (for email or messaging). There is no backend.

## Deploy (static hosting)

This is a Vite static site. Any static host works.

### Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Deploy. Share the production URL with a suitor.

CLI alternative:

```bash
npm install -g vercel
npm run build
vercel --prod
```

### Other static hosts

Build, then upload `dist/`:

```bash
npm run build
```

Netlify, Cloudflare Pages, GitHub Pages, and similar hosts all work as long as they serve the `dist` folder. No server rewrite rules are required; state is kept in the query string on the same page.

## License

Private family use unless you add a license of your own.
