module.exports = {
    siteMetadata: {
        title: `Demo Website`,
        description: `Fairly simple Gatsby-powered demo project`,
        author: `@gatsbyjs`,
        siteUrl: `https://franciszekfiutek.com`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                // This will impact how browsers show your PWA/website
                // https://css-tricks.com/meta-theme-color-and-trickery/
                // theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/assets/icons/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                displayName: true
            },
        },
        "gatsby-plugin-root-import"

        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
