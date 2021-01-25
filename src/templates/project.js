import React, {useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import {graphql, Link} from 'gatsby'
import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'
import Gallery from "react-photo-gallery";
import Carousel, {Modal, ModalGateway} from "react-images";
import {stripHtml} from "string-strip-html";

export const ProjectGallery = ({gallery, credits}) => {
    const photos = (gallery || [])
        .map(galleryImage => {
            if (typeof galleryImage === "string") {
                return {
                    src: galleryImage,
                    width: 4,
                    height: 3
                }
            }

            const {childImageSharp: {fluid: image}} = galleryImage;
            return {
                src: image.src,
                srcSet: image.srcSet,
                sizes: image.sizes,
                width: image.presentationWidth,
                height: image.presentationHeight,
            }
        });

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, {photo, index}) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return <div style={{marginTop: `4rem`}}>

        <Gallery photos={photos} onClick={openLightbox}/>
        <p style={{marginTop: '0.5rem'}}>{credits}</p>
        <ModalGateway>
            {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                    <Carousel
                        currentIndex={currentImage}
                        views={photos.map(x => ({
                            ...x,
                            srcset: x.srcSet,
                        }))}
                    />
                </Modal>
            ) : null}
        </ModalGateway>
    </div>
};

export const ProjectTemplate = ({
                                    content,
                                    contentComponent,
                                    tags,
                                    title,
                                    helmet,
                                    participants,
                                    gallery,
                                    credits,
                                    previous,
                                    next
                                }) => {
    const PostContent = contentComponent || Content;

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
                        {gallery && <ProjectGallery gallery={gallery} credits={credits}/>}
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
    gallery: PropTypes.array,
    previous: PropTypes.object,
    next: PropTypes.object,
    participants: PropTypes.string
};

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
                        fluid(quality: 95) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                            presentationHeight
                        }
                    }
                }
                credits
            }
        }
    }
`;
