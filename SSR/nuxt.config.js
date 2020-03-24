const colors = require("vuetify/es5/util/colors").default;
// import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

import sharp from 'responsive-loader/sharp'

export default {
    mode: "universal",
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: "%s - " + process.env.npm_package_name,
        title: process.env.npm_package_name || "",
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
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#fff" },
    /*
     ** Global CSS
     */
    css: ["@/assets/scss/main.scss"],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        // '@plugins/vuetify'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        "@nuxtjs/svg-sprite",
        "@nuxtjs/eslint-module",
        "@nuxtjs/vuetify",
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/axios",
        // Doc: https://github.com/nuxt-community/dotenv-module
        "@nuxtjs/dotenv",
        // Doc: https://github.com/bazzite/nuxt-optimized-images
        '@bazzite/nuxt-optimized-images',
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
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
            dark: true,
            themes: {
                dark: {
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

    svgSprite: {
        input: "~/assets/svg/",
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        // transpile: ['vuetify/lib'],
        // plugins: [new VuetifyLoaderPlugin()],
        extractCSS: { ignoreOrder: true },
        extend(config, ctx) {},
    },

    optimizedImages: {
        optimizeImages: true,
        optimizeImagesInDev: false,
        defaultImageLoader: 'img-loader',
        mozjpeg: {
            quality: 75,
        },
        svgo: {
            plugins: [{ removeViewBox: false }, { removeDimensions: true }],
        },
        responsive: {
            placeholder: false,
            adapter: sharp,
            sizes: [600, 960, 1265, 1900],
        },
        responsiveImagesName: ({ isDev }) =>
            isDev
                ? '[path][name]--[width][hash:optimized].[ext]'
                : 'img/[hash:7]-[width].[ext]',
    },

    // srcDir: 'client/',

    router: {
        // base: '2020/',
    },
};
