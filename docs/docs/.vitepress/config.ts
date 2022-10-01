import { defineConfig } from 'vitepress'

export default defineConfig({
   lang: 'en-US',
   title: 'Unhex',
   description: 'Unhex any color',
   themeConfig: {
      sidebar: [
         {
            text: 'Guide',
            items: [
               { text: 'What is Unhex?', link: '/guide/what-is-unhex' },
               { text: 'Installation', link: '/guide/installation' },
               { text: 'Getting Started', link: '/guide/getting-started' },
            ],
         },
      ],
   },
})
