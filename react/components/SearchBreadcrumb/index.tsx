import React, { FC } from 'react'
import { path } from 'ramda'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import BaseBreadcrumb, { NavigationItem } from '../BaseBreadcrumb'

interface Props {
  showOnMobile?: boolean
  homeIconSize?: number
  caretIconSize?: number
}

const SearchBreadcrumb: FC<Props> = ({
  showOnMobile,
  homeIconSize,
  caretIconSize,
}) => {
  const { searchQuery } = useSearchPage()
  const breadcrumb =
    path<NavigationItem[]>(
      ['data', 'productSearch', 'breadcrumb'],
      searchQuery
    ) ||
    path<NavigationItem[]>(['data', 'facets', 'breadcrumb'], searchQuery) ||
    []

  return (
    <BaseBreadcrumb
      breadcrumb={breadcrumb}
      showOnMobile={showOnMobile}
      categories={[]} //unused prop, its OK
      homeIconSize={homeIconSize}
      caretIconSize={caretIconSize}
    />
  )
}

export default SearchBreadcrumb
