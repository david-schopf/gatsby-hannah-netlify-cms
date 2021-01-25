import React from 'react'
import {Helmet} from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import './app.sass'
import useSiteMetadata from '../hooks/useSiteMetadata'
import {withPrefix} from 'gatsby'

const TemplateWrapper = ({children}) => {
    const {title, description, siteUrl} = useSiteMetadata();
    const schemaOrgJSONLD = JSON.stringify(
        {
            "@context": "https://schema.org/",
            "@type": "Person",
            "name": "Hannah Schopf",
            "url": "https://www.hannah-schopf.de",
            "image": "https://www.hannah-schopf.com/static/93104da4594b404c3de96176d0a20e0c/b46c2/hs.jpg",
            "jobTitle": "Freie Autorin"
        });

    return (
        <div>
            <Helmet>
                <html lang="de"/>
                <title>{title}</title>
                <meta name="description" content={description}/>

                <link rel="manifest" href="/manifest.webmanifest"/>
                <link rel="canonical" href={`${siteUrl}${window.location.pathname}`}/>
                <meta name="theme-color" content="#ff8576"/>
                <meta property="og:locale" content="de_DE"/>
                <meta property="og:site_name" content="Hannah Schopf"/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content={title}/>
                <meta property="og:url" content={siteUrl}/>
                <meta
                    property="og:image"
                    content={`${withPrefix('/')}img/icon.png`}
                />
            </Helmet>
            <Navbar/>
            <div>{children}</div>
            <Footer/>
        </div>
    )
};

export default TemplateWrapper
