import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head
        title='Webtree'
        
      />
      
      <body>
        <Main />
        <NextScript />
      </body>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
      />
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-RSBV84JS2B"
      />
      <Script strategy="lazyOnload" id="G-RSBV84JS2B">
        {`
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RSBV84JS2B');
            `}
      </Script>

    </Html>
  )
}
