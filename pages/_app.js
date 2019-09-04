import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import App, { Container } from 'next/app';
import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import { theme } from '../lib/theme';

import Notifier from '../components/Notifier';
import { DefaultSeo } from 'next-seo';
// import * as gtag from '../lib/gtag';

// let's create a configuration for next-seo
const DEFAULT_SEO = {
    title: 'Bolt Influence',
    description: 'Bolt Influence est la plateforme/agence de marketing d’influence référente qui permet de connecter les marques et les influenceurs sur Instagram, Tik Tok, Youtube, TwitchSEO made easy for Next.js projects',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://www.garymeehan.ie',
        title: 'Next.js Seo',
        description: 'SEO made easy for Next.js projects',
        image:
            'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg',
        site_name: 'GaryMeehan.ie',
        imageWidth: 1200,
        imageHeight: 1200
    },
    twitter: {
        handle: '@garmeeh',
        cardType: 'summary_large_image'
    }
};

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = (url) => {
    NProgress.done();
    //   gtag.pageview(url);
};
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = {};

        if (Component.getInitialProps) {
            Object.assign(pageProps, await Component.getInitialProps(ctx));
        }

        return { pageProps };
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                {/* ThemeProvider makes the theme available down the React
              tree thanks to React context. */}
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <DefaultSeo
                        title='Bolt Influence'
                        description='Bolt Influence est la plateforme/agence de marketing d’influence référente qui permet de connecter les marques et les influenceurs sur Instagram, Tik Tok, Youtube, Twitch...'
                        openGraph={{
                            type: 'website',
                            locale: 'fr_FR',
                            url: 'bolt-influence.com',
                        }}
                        twitter={{
                            handle: '@handle',
                            site: '@site',
                            cardType: 'summary_large_image',
                        }} />
                    <Component {...pageProps} />
                    <Notifier />
                </ThemeProvider>
            </Container>
        );
    }
}

export default MyApp;