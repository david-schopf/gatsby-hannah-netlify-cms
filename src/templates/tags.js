import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import {ProjectGridItem} from "../components/ProjectGridItem";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;

    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <Layout path={this.props.path}>
          <section className="section">
            <Helmet title={`${tag} | ${title}`}>
              <meta name="description"
                    content={tag.endsWith('in') ? `Projekte als ${capitalizeFirstLetter(tag)}` : `Projekte im Bereich ${capitalizeFirstLetter(tag)}`}/>
            </Helmet>
            <div className="container content">
              <div className="columns">
                <div
                    className="column is-10 is-offset-1"
                    style={{marginBottom: '6rem'}}
                >
                  <h3 className="title is-size-4 is-bold-light">{tag}</h3>
                  <div className="columns is-multiline">
                    {posts &&
                    posts.map(({node: post}) => (
                        <div className="is-parent column is-3" key={post.fields.slug}>
                          <ProjectGridItem post={post}/>
                        </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
 sort: {frontmatter: {date: DESC}}
 filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
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
`;
