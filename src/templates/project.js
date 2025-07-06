import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import {HTMLContent} from '../components/Content'
import {stripHtml} from "string-strip-html";
import ProjectTemplate from "./project-template";

const Project = ({data, pageContext, path}) => {
    const {markdownRemark: post} = data;

    return (
        <Layout path={path}>
            <ProjectTemplate
                content={post.html}
                contentComponent={HTMLContent}
                helmet={
                    <Helmet titleTemplate="%s | Hannah Schopf">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta name="description" content={stripHtml(post.html).result.trim()}/>
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
                participants={post.frontmatter.participants}
                gallery={post.frontmatter.galleryImages}
                credits={post.frontmatter.credits}
                {...pageContext}
            />
        </Layout>
    )
};

Project.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default Project

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                tags
                participants
                galleryImages {
                    childImageSharp {
                        gatsbyImageData(layout: FIXED)
                    }
                }
                credits
            }
        }
    }
`;
