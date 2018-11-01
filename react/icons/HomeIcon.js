import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Home Icon component in svg
 */
export default class HomeIcon extends Component {
  static propTypes = {
    /* Percentage size of the icon */
    size: PropTypes.number,
    /* Fill color for the icon */
    fillColor: PropTypes.string,
  }

  static defaultProps = {
    size: 25,
    fillColor: '#979899',
  }

  render() {
    const { size, fillColor } = this.props

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 576 512"
        xmlns="http://www.w3.org/2000/svg"
        className="vtex-icon__home-icon relative"
        style={{ top: '5px' }}
        color={fillColor}
      >
        <use href="#home" />
      </svg>
    )
  }
}
