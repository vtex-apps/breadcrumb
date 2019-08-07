import React, { Fragment, useMemo, useContext } from 'react'
import unorm from 'unorm'
import { Link } from 'vtex.render-runtime'
import { IconCaret, IconHome } from 'vtex.store-icons'
import { ProductContext } from 'vtex.product-context'
import { path, pathOr } from 'ramda'

import styles from './breadcrumb.css'

const LINK_CLASS_NAME = `${styles.link} dib pv1 link ph2 c-muted-2 hover-c-link`

interface NavigationItem {
  name: string
  href: string
}

export interface Props {
  term?: string
  /** Shape [ '/Department' ,'/Department/Category'] */
  categories: string[]
  categoryTree?: NavigationItem[]
  breadcrumb?: NavigationItem[]
  showOnMobile?: Boolean
}

const makeLink = (str: string) =>
  unorm
    .nfd(str)
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-')

const getCategoriesList = (categories: string[]): NavigationItem[] => {
  const categoriesSorted = categories
    .slice()
    .sort((a, b) => a.length - b.length)
  return categoriesSorted.map(category => {
    const categoryStripped = category.replace(/^\//, '').replace(/\/$/, '')
    const currentCategories = categoryStripped.split('/')
    const [categoryKey] = currentCategories.reverse()
    const linkCompletion = currentCategories.length === 1 ? '/d' : ''
    const href = `/${makeLink(categoryStripped)}${linkCompletion}`
    return {
      href,
      name: categoryKey,
    }
  })
}

const withProductContextWrapper = (
  Component: React.ComponentType<Props>
): React.FC<Props> => props => {
  const { product } = useContext(ProductContext) || { product: null }
  const term = props.term || path(['productName'], product)
  const categoryTree = props.categoryTree || path(['categoryTree'], product)
  const categories = props.categories || pathOr([], ['categories'], product)

  return (
    <Component
      term={term}
      categories={categories}
      categoryTree={categoryTree}
      breadcrumb={props.breadcrumb}
      showOnMobile={props.showOnMobile}
    />
  )
}

/**
 * Breadcrumb Component.
 */
const Breadcrumb: React.FC<Props> = ({
  term,
  categories,
  categoryTree,
  breadcrumb,
  showOnMobile,
}) => {
  const navigationList = useMemo(
    () => breadcrumb || categoryTree || getCategoriesList(categories),
    [breadcrumb, categories, categoryTree]
  )

  const breadcrumbStyle = showOnMobile ? '' : 'dn db-ns'

  return !navigationList.length ? null : (
    <div data-testid="breadcrumb" className={`${styles.container} ${breadcrumbStyle} pv3`}>
      <Link className={`${LINK_CLASS_NAME} v-mid`} page="store.home">
        <IconHome size={26} />
      </Link>
      {navigationList.map(({ name, href }, i) => (
        <span
          key={`navigation-item-${i}`}
          className={`${styles.arrow} ph2 c-muted-2`}
        >
          <IconCaret orientation="right" size={8} />
          <Link className={LINK_CLASS_NAME} to={href}>
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

export default withProductContextWrapper(Breadcrumb)
