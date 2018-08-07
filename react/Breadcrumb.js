import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

import HomeIcon from './icons/HomeIcon'
import ArrowIcon from './icons/ArrowIcon'

const LINK_CLASS_NAME =
  'vtex-breadcrumb__link dib pv1 link ph2 gray hover-near-black'

/**
 * Breadcrumb Component.
 */
class Breadcrumb extends Component {
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
        name: categoryKey.toLowerCase(),
        value: `${categoryStripped}/${hint}`,
      }
    })
  }

  render() {
    const { term, categories } = this.props

    if (!categories) {
      return null
    }

    const categoriesList = this.getCategories(categories)
    return (
      <div className="vtex-breadcrumb pa4 gray">
        <Link className={LINK_CLASS_NAME} page="store">
          <HomeIcon />
        </Link>
        {categoriesList.map(({ name, value }, i) => (
          <span key={`category-${i}`}>
            <span className="ph2">
              <ArrowIcon />
            </span>
            <Link className={LINK_CLASS_NAME} to={`/${value}`}>
              {name}
            </Link>
          </span>
        ))}

        {term && (
          <Fragment>
            <span className="ph2">
              <ArrowIcon />
            </span>
            <span className="vtex-breadcrumbs__term ph2 near-black">
              {term}
            </span>
          </Fragment>
        )}
      </div>
    )
  }
}

Breadcrumb.propTypes = {
  /** Search term or product slug. */
  term: PropTypes.string,
  /** Product's categories. */
  categories: PropTypes.arrayOf(PropTypes.string),
}

export default Breadcrumb
