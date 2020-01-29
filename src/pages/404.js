import React from 'react'
import { graphql, Link } from 'gatsby'

import { Layout } from '../layout'
import { Head } from '../components/head'

import './404.scss'

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Head title="404: Not Found" />
        <div className="not-found">
          <h1>Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </div>
        <div className="back-home">
          <Link to="/" className="back-home-text">
            BACK TO HOME
          </Link>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
