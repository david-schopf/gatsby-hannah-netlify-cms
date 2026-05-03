import React from 'react'
import PropTypes from 'prop-types'
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

export function Head({data}) {
    const {markdownRemark: post} = data;
    const description = stripHtml(post.html).result.trim();

    return (
        <>
            <title>{post.frontmatter.title} | Hannah Schopf</title>
            <meta name="description" content={description}/>
        </>
    )
}

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
