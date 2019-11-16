import PreviewCompatibleImage from "./PreviewCompatibleImage";
import {Link} from "gatsby";
import PropTypes from "prop-types";
import React from "react";

export function ProjectGridItem(props) {
    return <article
        className={`blog-list-item tile is-child`}
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
        <p className="post-meta">
            <Link
                className="title has-text-primary is-size-4"
                to={props.post.fields.slug}
            >
                {props.post.frontmatter.title}
            </Link>
        </p>

    </article>;
}

ProjectGridItem.propTypes = {post: PropTypes.object};