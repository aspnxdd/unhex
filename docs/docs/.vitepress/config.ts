import { defineConfig } from 'vitepress'

export default defineConfig({
   lang: 'en-US',
   title: 'Unhex',
   description: 'Unhex any color',
   themeConfig: {
      sidebar: [
         {
            text: 'Guide',
            items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
         },
      ],
   },
})
