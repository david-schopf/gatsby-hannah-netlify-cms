import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'
import {Helmet} from "react-helmet";

export const AboutPageTemplate = ({title, content, contentComponent}) => {
    const PageContent = contentComponent || Content

    return (
        <section className="section section--gradient">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="section">
                            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                                {title}
                            </h2>
                            <PageContent className="content" content={content}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
}

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
