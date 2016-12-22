import gql from 'graphql-tag'
import { connect } from 'react-redux'
import Link from 'vtex.render/Link'
import { withApollo } from 'react-apollo'
import { ShimmerLoading } from 'vtex.loading'
import React, { Component, PropTypes } from 'react'
import makeCancelable from './utils/makeCancelable'

const categoryQuery = gql`
  query GetCategory($category: String) {
    category(slug: $category) {
      name,
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
      id,
      slug,
      categories {
        name,
        slug
      }
    }
  }
`

const EMPTY_OBJECT = {}
const EMPTY_ARRAY = []

// eslint-disable-next-line
class Breadcrumb extends Component {
  constructor (props) {
    super(props)
    this.generateLink = this.generateLink.bind(this)
  }

  compareHistory (historyA, historyB) {
    if (historyA.length === historyB.length) {
      let isEqual = true
      historyA.forEach((route, index) => {
        Object.keys(route).forEach(key => {
          if (route[key] !== historyB[index][key]) {
            isEqual = false
          }
        })
      })
      return isEqual
    }
    return false
  }

  generateLink (previousRoute, slug) {
    const {name, params, path} = previousRoute

    if (name === 'category') {
      return this.props.client.query({
        query: categoryQuery,
        variables: {category: params.category},
      })
        .then(({data}) => {
          return (
            <Link
              className="dib pv1 link light-primary hover-primary"
              to={`/${data.category.slug}/c`}
              >
              {data.category.name}
            </Link>
          )
        })
    } else if (name === 'brand') {
      return this.props.client.query({
        query: brandQuery,
        variables: {brand: params.brand},
      })
        .then(({data}) => {
          return (
            <Link
              className="dib pv1 link light-primary hover-primary"
              to={path}
              >
              {data.brand.name}
            </Link>
          )
        })
    } else if (name === 'search') {
      return Promise.resolve(
        <Link
          className="dib pv1 link light-primary hover-primary"
          to={previousRoute.path}
          >
          {`Resultados para "${params.searchTerm}"`}
        </Link>
      )
    } else if (name === 'myOrders') {
      return Promise.resolve(
        <Link
          className="dib pv1 link light-primary hover-primary"
          to={previousRoute.path}
          >
          Meus Pedidos
        </Link>
      )
    }

    return this.props.client.query({
      query: productQuery,
      variables: { slug },
    })
      .then(({data}) => {
        return (
          <Link
            className="dib pv1 link light-primary hover-primary"
            to={`/${data.product.categories[0].slug}/c`}
            >
            {data.product.categories[0].name}
          </Link>
        )
      })
  }

  componentWillMount () {
    const {slug} = this.props
    const history = this.props.history || EMPTY_ARRAY
    const previousRoute = history.length > 1 ? history[history.length - 2] : EMPTY_OBJECT
    this.generateLink(previousRoute, slug).then(Link => this.setState({ Link, previousRoute }))
  }

  componentWillReceiveProps (nextProps) {
    if (!this.compareHistory(nextProps.history, this.props.history)) {
      const history = nextProps.history || EMPTY_ARRAY
      const currentRoute = history.length > 0 ? history[history.length - 1] : EMPTY_OBJECT
      const previousRoute = history.length > 1 ? history[history.length - 2] : EMPTY_OBJECT
      const slug = previousRoute && (previousRoute.name === 'product' && currentRoute.name === 'product')
        ? nextProps.slug : this.props.slug
      this.generateLinkPromise = makeCancelable(this.generateLink(previousRoute, slug))
      this.generateLinkPromise.promise
        .then(Link => this.setState({ Link, previousRoute }))
        .catch(error => {
          if (!error.isCanceled) {
            console.log(error)
          }
        })
    }
  }

  componentWillUnmount () {
    if (this.generateLinkPromise) {
      this.generateLinkPromise.cancel()
    }
  }

  render () {
    const previousRoute = this.state ? this.state.previousRoute : null
    return (
      <nav className="dn db-ns w-100 f6 ph3 pv2 bt b--black-05">
        {
          this.state
            ? (
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
                  previousRoute && previousRoute.name !== 'home'
                    ? (
                      <div className="dib">
                        <li className="dib">
                          {this.state.Link}
                        </li>
                        <li className="dib">
                          <span className="dib b pv1 ph2 black-30">&rsaquo;</span>
                        </li>
                      </div>
                    )
                    : null
                }
                <li>
                  <span className="dib pv1 link black-30">{this.props.productName}</span>
                </li>
              </ul>
            )
            : <ShimmerLoading style={{ width: '40%' }} className="h2" />
        }
      </nav>
    )
  }
}

Breadcrumb.propTypes = {
  slug: PropTypes.string,
  productName: PropTypes.string,
  client: PropTypes.object.isRequired,
  history: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = (state) => {
  const {context: {history}, placeholders: {product: {settings: {slug}}}} = state
  return { history, slug }
}

export default withApollo(connect(mapStateToProps)(Breadcrumb))
