import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

/**
 * Breadcrumb Component.
 */
export class Breadcrumb extends Component {
  generateCategoryLink(currentCat, list) {
    const category = {}

    const names = currentCat.split('-')

    category.name = names.length > 0 ? names[names.length - 1] : names
    category.url = list.join()

    return (
      <Link
        className="vtex.breadcrumbs__link ph2"
        page="store/search"
        params={{ category: category.url }}
      >
        {category.replace('-', '')}
      </Link>
    )
  }

  render() {
    const { search, slug, categories } = this.props

    const categoriesList = categories || []
    const categoriesUrl = categories || []

    return (
      <div className="vtex.breadcrumbs pa4">
        <Link className="vtex.breadcrumbs__link ph2" page="store">
          Home
        </Link>
        /
        {categoriesList.map(function(category) {})}
        /
        {search && (
          <Link
            className="vtex.breadcrumbs__link ph2"
            page="store/search"
            params={{ term: `${encodeURI(search).replace('/', '%2F')}` }}
          >
            {search.replace('/', ' ')}
          </Link>
        )}
        {slug && (
          <Link
            className="vtex.breadcrumbs__link ph2"
            page="store/product"
            params={{ slug: `${encodeURI(slug)}` }}
          >
            {slug}
          </Link>
        )}
      </div>
    )
  }
}

Breadcrumb.propTypes = {
  /** Search term used **/
  search: PropTypes.string.isRequired,
  /** Product's slug**/
  slug: PropTypes.string,
  /** Categories*/
  categories: PropTypes.arrayOf(PropTypes.string),
}

export default Breadcrumb
