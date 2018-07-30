/* eslint-env jest */
import { mount } from 'enzyme'
import React from 'react'
import { IntlProvider } from 'react-intl'

import Breadcrumb from '../Breadcrumb'

describe('<BreadCrumbs /> component', () => {
  let wrapper = null
  // let searchQueryMock = null
  // let facetsQueryMock = null

  beforeEach(() => {
    const messages = require('../locales/en-US')
    const props = {
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
  })

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  it('should render items', () => {
    expect(wrapper.container.querySelectorAll('.vtex-carousel').length).toBe(1)
    expect(
      wrapper.container.querySelectorAll('.vtex-carousel__img-container').length
    ).toBe(3) // set to be infinite
  })
})
