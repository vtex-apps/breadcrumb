import React, { Component } from 'react'

/**
 * Arrow Icon component in svg
 */
export default class ArrowIcon extends Component {
  render() {
    return (
      <svg
        width="5"
        height="8"
        viewBox="0 0 5 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href="#arrow-right" />
      </svg>
    )
  }
}
