/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'

import Breadcrumb from '../Breadcrumb'

describe('<BreadCrumb /> component', () => {
  const renderComponent = customProps => {
    const props = {
      term: 'test',
      categories: ['/Eletrônicos/Smartphones/', '/Eletrônicos/'],
      ...customProps,
    }
    return render(<Breadcrumb {...props} />)
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match the snapshot', () => {
    expect(renderComponent()).toMatchSnapshot()
  })
})
