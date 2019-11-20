import React from 'react'
import {Helmet} from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from '../hooks/useSiteMetadata'
import {withPrefix} from 'gatsby'

const TemplateWrapper = ({ children }) => {
  const {title, description} = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${withPrefix('/')}apple-touch-icon.png`}
        />
        <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}favicon-32x32.png`}
            sizes="32x32"
        />
        <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}favicon-16x16.png`}
            sizes="16x16"
        />

        <link href="https://fonts.googleapis.com/css?family=BarlowPlayfair+Display&display=swap" rel="stylesheet"/>
        >
        <link rel="manifest" href="/manifest.webmanifest"/>
        <meta name="theme-color" content="#F08"/>

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
};

export default TemplateWrapper
