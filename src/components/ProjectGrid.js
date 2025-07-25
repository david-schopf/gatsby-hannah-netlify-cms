import React from 'react'
import PropTypes from 'prop-types'
import {graphql, useStaticQuery} from 'gatsby'
import {ProjectGridItem} from "./ProjectGridItem";

class ProjectGridRender extends React.Component {
  render() {
    const {data} = this.props;
    const {edges: posts} = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
              <div className="is-parent column is-3-desktop is-6-tablet is-12-mobile" key={post.id}>
                  <ProjectGridItem post={post}/>
              </div>
          ))}
      </div>
    )
  }
}

ProjectGridRender.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const ProjectGrid = () => {
  const data = useStaticQuery(graphql`
    query ProjectGridQuery {
      allMarkdownRemark(
        sort: {frontmatter: {date: DESC}}
        filter: { frontmatter: { templateKey: { eq: "project" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              featuredimage {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED, width: 400, height: 400)
                }
              }
            }
          }
        }
      }
    }
  `);

  return <ProjectGridRender data={data} />;
}

export default ProjectGrid
