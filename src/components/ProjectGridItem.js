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
                                alt: props.post.frontmatter.title,
                            }}
                        />
                        <div className="featured-thumbnail-hover">
                            <p>{props.post.frontmatter.title}</p>
                        </div>
                    </div>
                ) : null}
            </header>
        </Link>
    </article>;
}

ProjectGridItem.propTypes = {post: PropTypes.object};
