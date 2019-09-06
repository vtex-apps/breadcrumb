import React, { FC } from 'react'
import { pathOr } from 'ramda'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import BaseBreadcrumb, { NavigationItem } from '../BaseBreadcrumb'

interface Props {
  showOnMobile?: boolean
}

const SearchBreadcrumb: FC<Props> = ({ showOnMobile }) => {
  const { searchQuery } = useSearchPage()
  const breadcrumb = pathOr<NavigationItem[]>(
    [],
    ['data', 'productSearch', 'breadcrumb'],
    searchQuery
  )
  return (
    <BaseBreadcrumb
      breadcrumb={breadcrumb}
      showOnMobile={showOnMobile}
      categories={[]} //unused prop, its OK
    />
  )
}

export default SearchBreadcrumb
