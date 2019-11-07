import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, pathOr } from 'ramda'
import BaseBreadcrumb, { Props, NavigationItem } from '../BaseBreadcrumb'

const withProductContextWrapper = (
  Component: React.ComponentType<Props>
): React.FC<Props> => props => {
  const { product } = useContext(ProductContext) || { product: null }
  const term = path<string>(['productName'], product)
  const categoryTree = path<NavigationItem[]>(['categoryTree'], product)
  const categories = pathOr([], ['categories'], product)

  return (
    <Component
      term={term}
      categories={categories}
      categoryTree={categoryTree}
      breadcrumb={props.breadcrumb}
      showOnMobile={props.showOnMobile}
      homeIconSize={props.homeIconSize}
      caretIconSize={props.caretIconSize}
    />
  )
}

export default withProductContextWrapper(BaseBreadcrumb)
