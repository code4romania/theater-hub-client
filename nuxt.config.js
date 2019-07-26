import { getConfig } from './config/env';

const config = getConfig();

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Theater Hub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Theater Hub' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/theater_hub_logo-1.jpg' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Titillium+Web:300,400,600,700|Material+Icons'
      }
    ]
  },
  router: {
    middleware: 'i18n'
  },
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
    '~/plugins/vuetify.js',
    {
      src: '~/plugins/vue-gallery.js',
      ssr: false
    },
    '~/plugins/axios.js',
    '~/plugins/services-axios.js',
    '~/plugins/vue-i18n.js'
  ],
  css: [
    'node_modules/vuetify/dist/vuetify.min.css',
    'node_modules/blueimp-gallery/css/blueimp-gallery.min.css',
    '@/assets/styles/styles.scss'
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    vendor: ['vuetify'],
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
  env: {
    baseURL: config.application.baseURL,
    apiURL: config.API.baseURL
  },
  axios: {
    baseURL: config.API.baseURL,
    proxyHeaders: false,
    credentials: false
  }
};
