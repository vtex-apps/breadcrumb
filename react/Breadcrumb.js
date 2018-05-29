import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

const CSS_CLASSES = {
  BREADCRUMB: 'vtex-breadcrumb pa4',
  LINK: 'vtex-breadcrumb__link dib pv1 link light-primary hover-primary ph2',
}

/**
 * Breadcrumb Component.
 */
export default class Breadcrumb extends Component {
  generateCategoriesLink(currentCat, list, i) {
    let category = ''
    const names = currentCat.split('/')

    category = names.length > 0 ? names[names.length - 1] : names[0]

    let countCat = (currentCat.match(/\//g) || []).length
    countCat = countCat === 0 ? '' : countCat + 1

    const search = `store/search${countCat}`
    const params = {}

    currentCat.split('/').map((el, i) => {
      params[`term${i === 0 ? '' : i}`] = el
    })

    return (
      <span key={`category-${i}-id`}>
        /
        <Link
          className={CSS_CLASSES.LINK}
          page={search}
          params={params}
        >
          {category}
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
          .toLowerCase()
      }

      return el
    })

    if (result.length > 1) {
      result = result.sort(function (e1, e2) {
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
