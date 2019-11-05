import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, pathOr } from 'ramda'
import BaseBreadcrumb, { Props } from './components/BaseBreadcrumb'

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
      homeIconSize={props.homeIconSize}
      caretIconSize={props.caretIconSize}
    />
  )
}

export default withProductContextWrapper(BaseBreadcrumb)
