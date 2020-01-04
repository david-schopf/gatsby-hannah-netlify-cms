import PreviewCompatibleImage from "./PreviewCompatibleImage";
import {Link} from "gatsby";
import PropTypes from "prop-types";
import React from "react";

export function ProjectGridItem(props) {
    return <article className="project-item"
    >
        <Link to={props.post.fields.slug}>
            <header>
                {props.post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                        <PreviewCompatibleImage
                            imageInfo={{
                                image: props.post.frontmatter.featuredimage,
                                alt: `featured image thumbnail for post ${props.post.frontmatter.title}`,
                            }}
                        />
                        <div className="featured-thumbnail-hover">{props.post.frontmatter.title}</div>
                    </div>
                ) : null}
            </header>
        </Link>
    </article>;
}

ProjectGridItem.propTypes = {post: PropTypes.object};
