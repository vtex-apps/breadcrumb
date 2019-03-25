import React, { Fragment, useMemo } from 'react'
import { Link } from 'vtex.render-runtime'
import unorm from 'unorm'
import { IconHome, IconCaret } from 'vtex.store-icons'

import styles from './breadcrumb.css'

const LINK_CLASS_NAME = `${styles.link} dib pv1 link ph2 c-muted-2 hover-c-link`

interface Category {
  name: string
  link: string
}
interface Props {
  term?: string
  categories: Array<string>
}

/**
 * Return a new string with the first letter as capital
 * @param string:  String to be capitalized
 */
const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase()

/**
 * Returns a category name by replacing the hypens with spaces and capitalizing
 * the result
 * @param categoryKey
 */
const getCategoryName = (categoryKey: string): string =>
  capitalize(categoryKey.replace(/[-]/g, ' '))

/**
 * Breadcrumb Component.
 */
const Breadcrumb = ({ term, categories }: Props) => {
  const categoriesList = useMemo((): Array<Category> => {
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
        name: getCategoryName(categoryKey),
        link: categoryStripped,
      }
    })
  }, [categories])

  return !categories.length ? null : (
    <div className={`${styles.container} dn db-ns pv3`}>
      <Link className={`${LINK_CLASS_NAME} v-mid`} page="store.home">
        <IconHome size={26} />
      </Link>
      {categoriesList.map(({ name, link }, i) => (
        <span key={`category-${i}`} className={`${styles.arrow} ph2 c-muted-2`}>
          <IconCaret orientation="right" size={8} />
          <Link className={LINK_CLASS_NAME} to={`/${link}`}>
            {name}
          </Link>
        </span>
      ))}

      {term && (
        <Fragment>
          <span className={`${styles.arrow} ph2 c-muted-2`}>
            <IconCaret orientation="right" size={8} />
          </span>
          <span className={`${styles.term} ph2 c-on-base`}>{term}</span>
        </Fragment>
      )}
    </div>
  )
}

Breadcrumb.defaultProps = {
  categories: [],
}

export default Breadcrumb
