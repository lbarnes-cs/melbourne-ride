const colors = require("vuetify/es5/util/colors").default;
const axios = require('axios').default;

module.exports = {
    target: 'static',
    mode: "universal",
    crawler: true,

    /*
     ** Headers of the page
     */
    head: {
        title: "Melbourne Ride" || "",
        titleTemplate: "%s | Melbourne Ride",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || "",
            },
            {
                property: 'og:image',
                content: './facebook-banner.png',
            },
            {
                property: 'og:locale', content: 'en_US'
              },
              {
                property: 'og:type', content: 'website',
              },
              {
                property: 'og:title', content: 'Melbourne Ride',
              },
              {
                property: 'og:description', content: 'Grab your helmets, bike and decorare your bikes, as it\'s time to help raise awareness for cyclist safety and promote environmentally friendly transportation alternative.',
              },
               {
                 property: 'og:site_name', content: 'Melbourne Ride',
           },

        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: colors.red.darken1 },
    /*
     ** Global CSS
     */
    css: ["@/assets/scss/main.scss"],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        "@plugins/filters",
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        "@nuxtjs/svg-sprite",
        "@nuxtjs/eslint-module",
        "@nuxtjs/vuetify",
        "@nuxtjs/recaptcha",
        "@nuxtjs/google-analytics"
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/axios",
        // Doc: https://github.com/nuxt-community/dotenv-module
        "@nuxtjs/dotenv",
        // Doc: https://http.nuxtjs.org/
        "@nuxt/http",
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: 'localhost:3000/wp',
    },

    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        treeShake: true,
        css: false,
        materialIcons: true,
        customVariables: ["~/assets/variables.scss"],
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: colors.red.darken1,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    recaptcha: {
      hideBadge: false,
      language: 'en',
      siteKey: '',
      version: 3,
      size: 'normal',
    },

    svgSprite: {
        input: "~/assets/svg/",
    },

    generate: {
        routes: () => {
            const previousRides = axios.get('http://localhost:3000/wp-json/wp/v2/album').then((res) => {
                return res.data.map((post) => {
                    return route: 'previous-rides/' + post.slug
                })
            })

            const faqs = axios.get('http://localhost:3000/wp-json/wp/v2/faq?per_page=100').then((res) => {
                return res.data.map((post) => route: 'faqs/' + post.slug,
                })
            })


            return Promise.all([previousRides, faqs]).then(values => {
                return [...values[0], ...values[1]]
            })
        }
    },

    googleAnalytics: {
      id: "UA-1234-1"
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extractCSS: { ignoreOrder: true },
        extend(config, ctx) {},
    },

};
