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
                                    participants,
                                    previous,
                                    next
                                }) => {
    const PostContent = contentComponent || Content;

    console.log(next);

    const {node: {fields: {slug: prevSlug} = {}, frontmatter: {title: prevTitle, templateKey: prevTemplate} = {}} = {}} = previous || {};
    const {node: {fields: {slug: nextSlug} = {}, frontmatter: {title: nextTitle, templateKey: nextTemplate} = {}} = {}} = next || {};
    const hasPrevious = previous && prevTemplate === "project";
    const hasNext = next && nextTemplate === "project";

    return (
        <section className="section">
            {helmet || ''}
            <div className="container content">
                <div className="columns is-multiline is-centered">
                    <div className="column is-full-mobile is-6">
                        <h1 className="has-text-centered is-size-2-desktop">
                            {title}
                        </h1>
                        <PostContent content={content}/>
                        {participants &&
                        <div className="participants">{participants.split("\n").map(p => <span
                            key={p}>{p}<br/></span>)}</div>}
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
                        {(hasPrevious || hasNext) && <hr/>}
                        <div className="page-controls">
                            <p>{hasPrevious && <Link to={prevSlug}>{prevTitle}</Link>}</p>
                            <p>{hasNext && <Link to={nextSlug}>{nextTitle}</Link>}</p>
                        </div>
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
    previous: PropTypes.object,
    next: PropTypes.object,
    participants: PropTypes.string
};

const Project = ({data, pageContext}) => {
    const {markdownRemark: post} = data;

    console.log(pageContext);

    return (
        <Layout>
            <ProjectTemplate
                content={post.html}
                contentComponent={HTMLContent}
                helmet={
                    <Helmet titleTemplate="%s | Hannah Schopf">
                        <title>{`${post.frontmatter.title}`}</title>
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
                participants={post.frontmatter.participants}
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
            }
        }
    }
`;
