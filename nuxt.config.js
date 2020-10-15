export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'my-nuxt-content-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['uikit/dist/css/uikit.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/uikit', ssr: false },
    { src: '~/plugins/ga.js', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        theme: false,
      },
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-mathjax'],
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  // Sitemap
  sitemap: {
    hostname: '<domain>',
    routes() {
      return getRoutes();
    },
  },
}
