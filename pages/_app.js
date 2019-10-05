import React from 'react';
import App, { Container } from 'next/app';
// import { appWithTranslation } from '../utils/i18n'
import Router from 'next/router'
import * as gtag from '../utils/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

class MyApp extends App {
  static async getInitialProps({ Component, ctx, req, res, query }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);

    }

    return {
      pageProps,
    };
  }


  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;