# [Allovin E-commerce Website](https://allovin.pages.dev)

Allovin is an e-commerce website that sells a variety of products. This website is built using [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

# Table of Contents

- [Allovin E-commerce Website](#allovin-e-commerce-website)
- [Table of Contents](#table-of-contents)
- [🚀 Tech Stack](#-tech-stack)
  - [Web framework](#web-framework)
  - [Astro integrations](#astro-integrations)
    - [Official integrations](#official-integrations)
    - [Third-party integrations](#third-party-integrations)
  - [Third-party Services](#third-party-services)
- [🚀 Project Structure](#-project-structure)
- [🧞 Commands](#-commands)
- [👀 Want to learn more?](#-want-to-learn-more)

# 🚀 Tech Stack

## Web framework

- [Astro](https://astro.build): Astro is a new kind of static site builder. Astro combines decades of proven performance best practices with the DX improvements of the component-oriented era. Use your favorite JavaScript framework and automatically ship the bare-minimum amount of JavaScript—by default.

## Astro integrations

Astro integrations are packages that add functionality to your Astro project. They are installed and configured in your `astro.config.mjs` file.

### Official integrations

- [mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/): MDX is a popular format for writing content in your project. It allows you to write JSX in your Markdown files, and have it compiled to HTML.
- [svelte](https://docs.astro.build/en/guides/integrations-guide/svelte/): Svelte is a popular framework for building web applications. It allows you to write components in a familiar way, and have them compiled to HTML.
- [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/): Sitemap generation is a common need for websites. This integration allows you to generate a sitemap.xml file for your site.
- [tailwindcss](https://docs.astro.build/en/guides/integrations-guide/tailwind/): Tailwind CSS is a popular utility-first CSS framework. This integration allows you to use Tailwind CSS in your Astro project.

### Third-party integrations

- [Astro-imagetools](https://github.com/RafidMuhymin/astro-imagetools#readme): Astro-imagetools is a collection of image processing tools for Astro.
- [Astro-compress](https://github.com/astro-community/astro-compress#readme): Astro-compress is a package of compression tools for Astro. It compresses all your HTML, CSS, and JS files within your build folder.
- [Astro-seo](https://github.com/jonasmerlin/astro-seo#readme): Astro-seo is a package of SEO tools for Astro. It handles the generation of meta tags, Open Graph tags, etc.
- [Astro-robotstxt](https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme): Astro-robotstxt is a package of robots.txt tools for Astro. It handles the generation of a robots.txt file for your site.

## Third-party Services

- [FuseJS](https://fusejs.io/): Fuse.js is a lightweight fuzzy-search library with zero dependencies.
- [SwiperJS](https://swiperjs.com/): Swiper is the most modern free mobile touch slider with hardware accelerated transitions and amazing native behavior.

# 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

# 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

# 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
