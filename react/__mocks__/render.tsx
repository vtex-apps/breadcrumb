import React, { Component, ReactNode } from 'react'

/**
 * Link Mocked Component.
 */
export class Link extends Component {
  render(): ReactNode {
    return (
      <a href="#">{this.props.children}</a>
    )
  }
}
