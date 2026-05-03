import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import './app.sass'
import useSiteMetadata from '../hooks/useSiteMetadata'
import {withPrefix} from 'gatsby'

const TemplateWrapper = ({children, path}) => {
    return (
        <div>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </div>
    )
};

export function Head({location}) {
    const {title, description, siteUrl} = useSiteMetadata();
    const path = location?.pathname || '';

    return (
        <>
            <html lang="de"/>
            <title>{title}</title>
            <meta name="description" content={description}/>

            <link rel="manifest" href="/manifest.webmanifest"/>
            {path && <link rel="canonical" href={`${siteUrl}${path}`}/>}
            <meta name="theme-color" content="#ff8576"/>
            <meta property="og:locale" content="de_DE"/>
            <meta property="og:site_name" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={title}/>
            <meta property="og:url" content={siteUrl}/>
            <meta
                property="og:image"
                content={`${withPrefix('/')}img/icon.png`}
            />
        </>
    )
}

export default TemplateWrapper
