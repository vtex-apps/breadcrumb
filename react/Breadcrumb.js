import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Link } from 'render'

const CSS_CLASSES = {
  BREADCRUMB: 'vtex-breadcrumb pa4',
  LINK: 'vtex-breadcrumb__link dib pv1 link light-primary hover-primary ph2',
}

/**
 * Breadcrumb Component.
 */
class Breadcrumb extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  getPageHint(categories) {
    switch (categories.length) {
      case 1:
        return 'd'
      case 2:
        return 'c'
      case 3:
        return 'sc'
    }
  }

  getCategories(categories) {
    const categoriesSorted = categories
      .slice()
      .sort((a, b) => a.length - b.length)
    return categoriesSorted.map(category => {
      const categoryStripped = category.replace(/^\//, '').replace(/\/$/, '')
      const categories = categoryStripped.split('/')
      const [categoryKey] = categories.reverse()
      const hint = this.getPageHint(categories)
      return {
        key: categoryKey.toLowerCase(),
        value: `${categoryStripped}/${hint}`,
      }
    })
  }

  render() {
    const { slug, productQuery } = this.props

    if (productQuery.loading || !productQuery.product.categories) {
      return null
    }

    const { categories } = productQuery.product

    const categoriesList = this.getCategories(categories)
    return (
      <div className={CSS_CLASSES.BREADCRUMB}>
        <Link className={CSS_CLASSES.LINK} page="store">
          {this.props.intl.formatMessage({ id: 'breadcrumb.home' })}
        </Link>
        {categoriesList.map((category, i) => {
          return (
            <span key={`${category.key}-${i}`}>
              /
              <Link className={CSS_CLASSES.LINK} to={`/${category.value}`}>
                {category.key}
              </Link>
            </span>
          )
        })}
        /
        <span className="ph2"> {slug} </span>
      </div>
    )
  }
}

Breadcrumb.propTypes = {
  /** Search term used **/
  search: PropTypes.string,
  /** Product's slug**/
  slug: PropTypes.string,
  /** Product data**/
  productQuery: {
    /** Product**/
    product: PropTypes.shape({
      /** Categories*/
      categories: PropTypes.arrayOf(PropTypes.string),
    }),
    /** Loading**/
    loading: PropTypes.bool.isRequired,
  },
}

export default injectIntl(Breadcrumb)
