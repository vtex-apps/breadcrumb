import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Link } from 'render'

import ArrowIcon from './icons/ArrowIcon'
import HomeIcon from './icons/HomeIcon'

const LINK_CLASS_NAME =
  'vtex-breadcrumb__link dib pv1 link ph2 gray hover-near-black'

/**
 * Breadcrumb Component.
 */
class Breadcrumb extends Component {
  getCategories(categories) {
    const categoriesSorted = categories
      .slice()
      .sort((a, b) => a.length - b.length)
    return categoriesSorted.map(category => {
      const categoryStripped = category.replace(/^\//, '').replace(/\/$/, '')
      const categories = categoryStripped.split('/')
      const [categoryKey] = categories.reverse()

      return {
        name: categoryKey.toLowerCase(),
        value: categoryStripped,
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
      <div className="vtex-breadcrumb dn db-ns pb4 pt4 gray">
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
