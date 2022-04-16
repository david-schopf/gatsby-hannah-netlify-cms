import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import {HTMLContent} from '../components/Content'
import {Helmet} from "react-helmet";
import AboutPageTemplate from "./about-page-template";

const AboutPage = ({data, path}) => {
    const {markdownRemark: post} = data

    return (
        <Layout path={path}>
            <Helmet title='About | Hannah Schopf'>
                <meta name="description"
                      content="Seit 2012 arbeitet Hannah als freie Dramaturgin und Autorin (u.a. Volksbühne Berlin). Als Drehbuchautorin veröffentlichte sie die Kinofilme Tiger Girl, So was von da und San Remo. Am Heimathafen Neukölln feierte sie mit LA DEUTSCHE VITA ihr Debüt als Regisseurin."
                />
            </Helmet>
            <AboutPageTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.html}
            />
        </Layout>
    )
}

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
    query AboutPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
            }
        }
    }
`
