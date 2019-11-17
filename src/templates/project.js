import React from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import {graphql, Link} from 'gatsby'
import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'

export const ProjectTemplate = ({
                                    content,
                                    contentComponent,
                                    tags,
                                    title,
                                    helmet,
                                }) => {
    const PostContent = contentComponent || Content;

    return (
        <section className="section">
            {helmet || ''}
            <div className="container content">
                <div className="columns is-multiline is-centered">
                    <div className="column is-full-mobile is-6">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            {title}
                        </h1>
                        <PostContent content={content}/>
                        {tags && tags.length ? (
                            <div style={{marginTop: `4rem`}}>
                                <h4>Tags</h4>
                                <ul className="taglist">
                                    {tags.map(tag => (
                                        <li key={tag + `tag`}>
                                            <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    )
};

ProjectTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    title: PropTypes.string,
    helmet: PropTypes.object,
};

const Project = ({data}) => {
    const {markdownRemark: post} = data;

    return (
        <Layout>
            <ProjectTemplate
                content={post.html}
                contentComponent={HTMLContent}
                helmet={
                    <Helmet titleTemplate="%s | Blog">
                        <title>{`${post.frontmatter.title}`}</title>
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
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
            }
        }
    }
`;
