import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"

export default defineConfig({
  site: "https://f-box-docs.com",
  integrations: [
    starlight({
      title: "F-Box",
      social: {
        github: "https://github.com/KentaroMorishita/f-box-core",
      },
      head: [
        { tag: "meta", attrs: { property: "og:title", content: "F-Box" } },
        {
          tag: "meta",
          attrs: {
            property: "og:description",
            content:
              "Explore the power of F-Box for functional programming and reactive state management.",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://f-box-docs.com/ogp/f-box-logo.png",
          },
        },
        { tag: "meta", attrs: { property: "og:type", content: "website" } },
      ],
      sidebar: [
        {
          label: "F-Box",
          items: [
            { label: "Overview", slug: "f-box-core/introduction" },
            {
              label: "Installation",
              slug: "f-box-core/introduction/installation",
            },
            { label: "Key Concepts", slug: "f-box-core/introduction/concepts" },
            {
              label: "Reference",
              items: [
                { label: "Box", slug: "f-box-core/reference/box" },
                { label: "RBox", slug: "f-box-core/reference/rbox" },
                { label: "Maybe", slug: "f-box-core/reference/maybe" },
                { label: "Either", slug: "f-box-core/reference/either" },
                { label: "Task", slug: "f-box-core/reference/task" },
              ],
            },
            { label: "FAQ", slug: "f-box-core/faq" },
          ],
        },
        {
          label: "F-Box React",
          items: [
            { label: "Overview", slug: "f-box-react/introduction" },
            {
              label: "Installation",
              slug: "f-box-react/introduction/installation",
            },
            {
              label: "Key Concepts",
              slug: "f-box-react/introduction/concepts",
            },
            {
              label: "Reference",
              items: [
                { label: "useBox", slug: "f-box-react/reference/use-box" },
                { label: "useRBox", slug: "f-box-react/reference/use-rbox" },
                {
                  label: "useRBoxForm",
                  slug: "f-box-react/reference/use-rbox-form",
                },
              ],
            },
            {
              label: "Guides",
              items: [
                { label: "useBox", slug: "f-box-react/guides/use-box" },
                { label: "useRBox", slug: "f-box-react/guides/use-rbox" },
                {
                  label: "useRBoxForm",
                  slug: "f-box-react/guides/use-rbox-form",
                },
              ],
            },
            { label: "FAQ", slug: "f-box-react/faq" },
          ],
        },
      ],
    }),
  ],
})
