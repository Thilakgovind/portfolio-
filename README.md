# Thilak — The Series

A streaming-inspired portfolio for Thilak Govind S S, adapted from [Portfolio_series](https://github.com/Sushmitadasari/Portfolio_series). The site uses React, Vite, Tailwind CSS and Framer Motion. Portfolio content lives in `src/data/portfolio-data.json`; supplied photographs, certificates and presentation files live under `public/assets`.

## Run locally

```sh
npm ci
npm run dev
```

## Build for deployment

```sh
npm run build
```

Deploy the generated `dist` directory as a static site. No server environment variables are required. The public resume copy has its phone number removed, and the JSON does not include the private number.
