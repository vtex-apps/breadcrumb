import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Link } from 'render'

const CSS_CLASSES = {
  BREADCRUMB: 'vtex-breadcrumb pa4 gray',
  LINK: 'vtex-breadcrumb__link dib pv1 link light-primary hover-primary ph2',
}

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
      <div className={CSS_CLASSES.BREADCRUMB}>
        <Link className={CSS_CLASSES.LINK} page="store">
          {this.props.intl.formatMessage({ id: 'breadcrumb.home' })}
        </Link>
        {categoriesList.map(({ name, value }, i) => (
          <span key={`category-${i}`}>
            /
            <Link className={CSS_CLASSES.LINK} to={`/${value}`}>
              {name}
            </Link>
          </span>
        ))}

        {term && (
          <Fragment>
            /
            <span className="ph2"> {term} </span>
          </Fragment>
        )}
      </div>
    )
  }
}

Breadcrumb.propTypes = {
  /** Intl instance. */
  intl: intlShape.isRequired,
  /** Search term or product slug. */
  term: PropTypes.string,
  /** Product's categories. */
  categories: PropTypes.arrayOf(PropTypes.string),
}

export default injectIntl(Breadcrumb)
