<template>
  <div class='code-viewer' @click="init">
    <pre>
      <code class="language-html">
        {{ code }}
      </code>
    </pre>
  </div>
</template>

<script>
// https://highlightjs.org/download/
import hljs from './highlight.min'

export default {
  name: 'CodeViewer',
  props: {},
  data() {
    return {
      theme: 'vs-2015',
      code: `import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
`
    }
  },
  mounted() {
    // 123123
    this.init()
  },
  methods: {
    init() {
      hljs.highlightAll()
    }
  },
  watch: {}
}
</script>
