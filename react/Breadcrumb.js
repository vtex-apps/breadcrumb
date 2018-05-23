import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

CSS_CLASSES = {
  BREADCRUMB: 'vtex.breadcrumb pa4',
  LINK: 'vtex.breadcrumb__link dib pv1 link light-primary hover-primary ph2',
}

/**
 * Breadcrumb Component.
 */
export default class Breadcrumb extends Component {
  generateCategoriesLink(currentCat, list, i) {
    const category = {}
    const names = currentCat.split('-').filter(el => el !== '')

    category.name = names.length > 0 ? names[names.length - 1] : names[0]
    category.url = list.slice(0, i + 1).join()

    return (
      <span>
        /
        <Link
          className={CSS_CLASSES.LINK}
          page="store/search"
          params={{ term: category.url }}
        >
          {category.name}
        </Link>
      </span>
    )
  }

  treatCategories(list) {
    let result = list || []

    const regex = /^\/(.*)\//g

    result = result.map(el => {
      if (el.includes('/')) {
        return el
          .replace(regex, '$1')
          .replace('/', '-')
          .toLowerCase()
      }

      return el
    })

    if (result.length > 1) {
      result = result.sort(function(e1, e2) {
        if (e1.length < e2.length) {
          return -1
        }

        if (e1.length > e2.length) {
          return 1
        }

        return 0
      })
    }

    return result
  }

  render() {
    const { search, slug, categories } = this.props

    const categoriesList = this.treatCategories(categories)

    return (
      <div className={CSS_CLASSES.BREADCRUMB}>
        <Link className={CSS_CLASSES.LINK} page="store">
          Home
        </Link>
        {categoriesList.map((category, i) => {
          return this.generateCategoriesLink(category, categoriesList, i)
        })}
        /
        <span className="ph2">
          {categories ? '' : search}
          {slug}
        </span>
      </div>
    )
  }
}

Breadcrumb.propTypes = {
  /** Search term used **/
  search: PropTypes.string,
  /** Product's slug**/
  slug: PropTypes.string,
  /** Categories*/
  categories: PropTypes.arrayOf(PropTypes.string),
}
