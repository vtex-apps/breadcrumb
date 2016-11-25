import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {equals} from 'ramda'

import ApolloClient from 'apollo-client'
import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'

import {ShimmerLoading} from 'vtex.loading'
import Link from 'vtex.render/Link'

const categoryQuery = gql`
  query GetCategory($category: String) {
    category(slug: $category) {
      name
      slug
    }
  }
`

const brandQuery = gql`
  query GetBrand($brand: String) {
    brand(slug: $brand) {
      name
    }
  }
`

const productQuery = gql`
  query GetProduct($slug: String) {
    product(slug: $slug) {
      id
      slug
      categories{
        name
        slug
      }
    }
  }
`

//eslint-disable-next-line
class Breadcrumb extends Component {
  constructor (props) {
    super(props)
    this.generateLink.bind(this)
  }

  componentWillMount () {
    const history = this.props.history || []
    const previousRoute = history.length > 1 ? history[history.length - 2] : {}
    this.generateLink(previousRoute).then((Link) => {
      this.setState({
        Link,
        previousRoute,
      })
    })
  }

  componentWillReceiveProps (nextProps) {
    if (!equals(nextProps.history, this.props.history)) {
      const history = nextProps.history || []
      const previousRoute = history.length > 1 ? history[history.length - 2] : null
      this.generateLink(previousRoute).then((Link) => {
        this.setState({
          Link,
          previousRoute,
        })
      })
    }
  }

  // Hack :grimacing:
  generateLink (previousRoute) {
    const {name, params, path} = previousRoute

    if (name === 'category') {
      return this.props.client.query({
        query: categoryQuery,
        variables: {
          'category': params.category,
        },
      })
      .then((result) => {
        return (
          <Link className="dib pv1 link light-primary hover-primary" to={`/${result.data.category.slug}/c`}>{result.data.category.name}</Link>
        )
      })
    } else if (name === 'brand') {
      return this.props.client.query({
        query: brandQuery,
        variables: {
          'brand': params.brand,
        },
      })
      .then((result) => {
        return (
          <Link className="dib pv1 link light-primary hover-primary" to={path}>{result.data.brand.name}</Link>
        )
      })
    } else if (name === 'search') {
      return Promise.resolve(
        <Link className="dib pv1 link light-primary hover-primary" to={previousRoute.path}>{`Resultados para "${params.searchTerm}"`}</Link>
      )
    } else if (name === 'myOrders') {
      return Promise.resolve(
        <Link className="dib pv1 link light-primary hover-primary" to={previousRoute.path}>{'Meus Pedidos'}</Link>
      )
    }
    return this.props.client.query({
      query: productQuery,
      variables: {
        'slug': this.props.slug,
      },
    })
    .then((result) => {
      return (
        <Link className="dib pv1 link light-primary hover-primary" to={`/${result.data.product.categories[0].slug}/c`}>{result.data.product.categories[0].name}</Link>
      )
    })
  }

  render () {
    const previousRoute = this.state ? this.state.previousRoute : null
    return (
      <nav className="dn db-ns w-100 f5 pa2 bt b--black-10">
        {
          this.state ? (
            <ul className="flex list ma0 pa0">
              <li>
                <Link className="dib pv1 link light-primary hover-primary" to="/">
                  Início
                </Link>
              </li>
              <li>
                <span className="dib b pv1 ph2 black-30">&rsaquo;</span>
              </li>
              {
                previousRoute && previousRoute.name !== 'home' ? (
                  <div className="dib">
                    <li className="dib">
                      {this.state.Link}
                    </li>
                    <li className="dib">
                      <span className="dib b pv1 ph2 black-30">&rsaquo;</span>
                    </li>
                  </div>
                ) : null
              }
              <li>
                <span className="dib pv1 link black-30">{this.props.productName}</span>
              </li>
            </ul>
          ) : (
            <ShimmerLoading style={{width: '40%'}} className="h2" />
          )
        }
      </nav>
    )
  }
}

Breadcrumb.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object),
  productName: PropTypes.string,
  slug: PropTypes.string,
  client: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  const {context: {history}, placeholders: {product: {settings: {slug}}}} = state
  return {history, slug}
}

export default withApollo(connect(mapStateToProps)(Breadcrumb))
