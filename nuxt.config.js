const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {

  generate: {
    routes: ['/', '/about', '/fa', '/fa/about']
  },
  server: {
    // nuxt.js server options ( can be overrided by environment variables )
    port: 8081,
    host: "localhost",
  },
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'سیستم مدیریت درسترسی',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description', name: 'description', content: 'سیستم مدیریت درسترسی \n'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3adced'},

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style-fa/theme.styl',
    '~/assets/style-fa/app.styl',
    '~/assets/style-fa/style.css',
    'font-awesome/css/font-awesome.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vee-validate',
    '@/plugins/i18n.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    
    loaders: {
      stylus: {
        import: ["~assets/style-fa/variables.styl"]
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  router: {
    middleware: ['i18n']
  }
}
