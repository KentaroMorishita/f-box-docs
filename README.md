# F-Box Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This is the official documentation site for **F-Box**, a library designed for functional programming in TypeScript. The site is built using Astro and Starlight.

## 🚀 Project Structure

Inside this project, you’ll find the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/          # Documentation pages
│   │   └── config.ts      # Site configuration
│   └── env.d.ts
├── astro.config.mjs        # Astro configuration
├── package.json            # Project metadata and scripts
└── tsconfig.json           # TypeScript configuration
```

- **`src/content/docs/`**: Contains all the Markdown documentation files. Each file corresponds to a route on the site.
- **`src/assets/`**: Store images and other assets to use in the documentation.
- **`public/`**: Contains static assets, like favicons, that are served as-is.

## 🧞 Commands

Run these commands from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts the local dev server at `localhost:4321`  |
| `npm run build`           | Builds the site for production to `./dist/`      |
| `npm run preview`         | Previews the production build locally            |
| `npm run astro ...`       | Runs Astro CLI commands like `astro check`       |
| `npm run deploy`          | Deploys the site to Vercel                       |

## 🌐 Deployment

The documentation site is designed to be deployed on [Vercel](https://vercel.com). Use the `npm run deploy` command to deploy the latest version of the site.

### Vercel Configuration

Ensure the following settings are in place in your Vercel project:

- **Build Command**: `astro build`
- **Output Directory**: `dist`

For local deployment testing, install the Vercel CLI:

```bash
npm install vercel --save-dev
```

## 👀 Learn More

- [F-Box Documentation](https://f-box-docs.com)
- [Astro Documentation](https://docs.astro.build)
- [Starlight Documentation](https://starlight.astro.build)
- [Vercel Documentation](https://vercel.com/docs)

## 🛠 Contributing

We welcome contributions to improve the F-Box documentation! Please fork this repository, make your changes, and submit a pull request.

---
Built with ❤️ using [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).