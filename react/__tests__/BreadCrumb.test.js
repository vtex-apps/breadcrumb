/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'

import Breadcrumb from '../Breadcrumb'

describe('<BreadCrumb /> component', () => {
  const renderComponent = customProps => {
    const props = {
      categories: [
        {
          link: '/Eletrônicos/',
          name: 'Eletrônicos',
        },
        {
          link: '/Eletrônicos/Smartphones/',
          name: 'Smartphones :)',
        },
      ],
      ...customProps,
    }
    return render(<Breadcrumb {...props} />)
  }

  it('should be rendered', () => {
    expect(renderComponent().asFragment().firstChild).toHaveClass('container')
  })

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

    rerender(<Breadcrumb />)
    expect(queryByText('term')).toBeNull()
  })
})
