/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'

import Breadcrumb from '../Breadcrumb'

describe('<BreadCrumb /> component', () => {
  let wrapper = null

  beforeEach(() => {
    const props = {
      term: 'test',
      categories: ['/Eletrônicos/Smartphones/', '/Eletrônicos/'],
    }

    wrapper = mount(<Breadcrumb {...props} />)
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('.vtex-breadcrumb')).toHaveLength(1)
  })

  it('should render links', () => {
    expect(wrapper.find('.vtex-breadcrumb__link')).toHaveLength(3) // set to be infinite
  })
})
