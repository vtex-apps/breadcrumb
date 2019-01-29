import PropTypes from 'prop-types'
import React, { Component, Fragment, ReactNode } from 'react'
import { Link } from 'vtex.render-runtime'
import unorm from 'unorm'
import { Icon } from 'vtex.use-svg'

import breadcrumb from './breadcrumb.css'

const LINK_CLASS_NAME = `${breadcrumb.link} dib pv1 link ph2 c-muted-2 hover-c-link`
const ARROW_ICON = <Icon id="nav-angle--right" size={12} className="c-muted-1"/>

interface DefaultProps {
  categories: Array<string>
}
  
interface Props extends DefaultProps {
  term?: string
}

type Category = {
  name: string
  value: string
}

/**
 * Breadcrumb Component.
 */
class Breadcrumb extends Component<Props> {
  public static readonly defaultProps = {
    categories: [],
  }

  public static readonly propTypes = {
    /** Search term or product slug. */
    term: PropTypes.string,
    /** Product's categories. */
    categories: PropTypes.arrayOf(PropTypes.string),
  }

  private get categoriesList(): Array<Category> {
    const { categories } = this.props
    const categoriesSorted = categories
      .slice()
      .sort((a, b) => a.length - b.length)
    return categoriesSorted.map(category => {
      let categoryStripped = category.replace(/^\//, '').replace(/\/$/, '')
      const currentCategories = categoryStripped.split('/')
      const [categoryKey] = currentCategories.reverse()
      categoryStripped = unorm
        .nfd(categoryStripped)
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/[-\s]+/g, '-')
      categoryStripped += currentCategories.length === 1 ? '/d' : ''
      return {
        name: categoryKey.toLowerCase(),
        value: categoryStripped,
      }
    })
  }

  public render(): ReactNode {
    const { term, categories } = this.props

    if (!categories.length) {
      return null
    }

    return (
      <div className={`${breadcrumb.container} dn db-ns pv3`}>
        <Link className={LINK_CLASS_NAME} page="store.home">
          Home
        </Link>
        {this.categoriesList.map(({ name, value }, i) => (
          <span key={`category-${i}`}>
            <span className={`${breadcrumb.arrow} ph2`}>
              {ARROW_ICON}
            </span>
            <Link className={LINK_CLASS_NAME} to={`/${value}`}>
              {name}
            </Link>
          </span>
        ))}

        {term && (
          <Fragment>
            <span className={`${breadcrumb.arrow} ph2`}>
              {ARROW_ICON}
            </span>
            <span className={`${breadcrumb.term} ph2 c-on-base`}>
              {term}
            </span>
          </Fragment>
        )}
      </div>
    )
  }
}

export default Breadcrumb
