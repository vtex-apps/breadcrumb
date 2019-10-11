import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, pathOr } from 'ramda'
import BaseBreadcrumb, { Props, NavigationItem } from '../BaseBreadcrumb'

const withProductContextWrapper = (
  Component: React.ComponentType<Props>
): React.FC<Props & { hideProductName: boolean }> => ({
  hideProductName,
  breadcrumb,
  showOnMobile,
}) => {
  const { product } = useContext(ProductContext) || { product: null }
  const term = hideProductName
    ? undefined
    : path<string>(['productName'], product)
  const categoryTree = path<NavigationItem[]>(['categoryTree'], product)
  const categories = pathOr([], ['categories'], product)

  return (
    <Component
      term={term}
      categories={categories}
      categoryTree={categoryTree}
      breadcrumb={breadcrumb}
      showOnMobile={showOnMobile}
    />
  )
}

export default withProductContextWrapper(BaseBreadcrumb)
