import React from 'react'
import { render } from '@vtex/test-tools/react'

import Breadcrumb, { Props } from '../Breadcrumb'

describe('<BreadCrumb /> component', () => {
  const defaultCategories = ['/Eletrônicos/Smartphones/', '/Eletrônicos/']
  const renderComponent = (customProps?: Partial<Props>) => {
    const props = {
      categories: defaultCategories,
      ...customProps,
    }
    return render(<Breadcrumb {...props} />)
  }

  it('should match the snapshot', () => {
    expect(renderComponent({ term: 'term' }).asFragment()).toMatchSnapshot()
  })

  it('should render links', () => {
    const { queryByText, asFragment } = renderComponent()
    expect(asFragment().querySelectorAll('a')).toHaveLength(3)
    expect(queryByText('eletrônicos')).toBeDefined()
    expect(queryByText('smartphones')).toBeDefined()
  })

  it('should render term', () => {
    const { rerender, queryByText } = renderComponent({
      term: 'term',
    })
    expect(queryByText('term')).toBeDefined()

    rerender(<Breadcrumb categories={defaultCategories} />)

    expect(queryByText('term')).toBeNull()
  })

  it('should have dn db-ns if showOnMobile is false', () => {
    const { getByTestId } = renderComponent({showOnMobile: false,})
    const container = getByTestId('breadcrumb')
    expect(container.className).toContain('dn db-ns')
  })

  it('should not have dn if showOnMobile is true', () => {
    const { getByTestId } = renderComponent({showOnMobile: true,})
    const container = getByTestId('breadcrumb')
    expect(container.className).not.toContain('dn')
  })
})
