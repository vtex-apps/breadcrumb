/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import { Link } from '../__mocks__/render'
import { IntlProvider } from 'react-intl'

import Breadcrumb from '../Breadcrumb'

describe('<BreadCrumb /> component', () => {
  let wrapper = null

  beforeEach(() => {
    const messages = require('../locales/en-US')
    const props = {
      slug: 'test',
      productQuery: {
        loading: false,
        product: { categories: ['/Eletrônicos/Smartphones/', '/Eletrônicos/'] },
      },
    }

    wrapper = mount(
      <IntlProvider locale="en-US" messages={messages}>
        <Breadcrumb {...props} />
      </IntlProvider>
    )
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('.vtex-breadcrumb')).toHaveLength(1)
  })

  it('should render links', () => {
    expect(wrapper.find('.vtex-breadcrumb__link')).toHaveLength(3) // set to be infinite
  })
})
