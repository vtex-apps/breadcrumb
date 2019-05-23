import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import Breadcrumb from './Breadcrumb';

interface Props {
  term?: string | undefined
  categories: string[] | undefined
}

const BreadcrumbProduct = (props: Props) => {
  const valuesFromContext = React.useContext(ProductContext)

  const defProps: Props = !valuesFromContext || isEmpty(valuesFromContext)
    ? props
    : { term: path(['product', 'productName'], valuesFromContext), categories: path(['categories'], valuesFromContext) }

  const { term, categories } = defProps

  return (
    <Breadcrumb 
      term={term} 
      categories={categories || []} 
    />
  )
}

BreadcrumbProduct.defaultProps = {
  categories: [],
}

export default BreadcrumbProduct
