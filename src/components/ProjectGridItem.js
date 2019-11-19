import PreviewCompatibleImage from "./PreviewCompatibleImage";
import {Link} from "gatsby";
import PropTypes from "prop-types";
import React from "react";

export function ProjectGridItem(props) {
    return <article className={`project-item`}
    >
        <header>
            {props.post.frontmatter.featuredimage ? (
                <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                        imageInfo={{
                            image: props.post.frontmatter.featuredimage,
                            alt: `featured image thumbnail for post ${props.post.title}`,
                        }}
                    />
                </div>
            ) : null}
        </header>
        <p className="project-item-title">
            <Link
                className="has-text-weight-medium has-text-primary is-size-4 font-playfair is-uppercase"
                to={props.post.fields.slug}
            >
                {props.post.frontmatter.title}
            </Link>
        </p>

    </article>;
}

ProjectGridItem.propTypes = {post: PropTypes.object};