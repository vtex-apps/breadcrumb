import React from 'react'
import PropTypes from 'prop-types'

/**
 * Home Icon component in svg
 */
const HomeIcon = ({ size, fillColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="vtex-icon__home-icon relative"
      viewBox="0 0 576 512"
      version="1.1"
      width={size}
      height={size}
      style={{ top: '5px' }}
      color={fillColor}
    >
      <use href="#home" xlinkHref="#home" />
    </svg>
  )
}

HomeIcon.propTypes = {
  /* Percentage size of the icon */
  size: PropTypes.number,
  /* Fill color for the icon */
  fillColor: PropTypes.string,
}

HomeIcon.defaultProps = {
  size: 25,
  fillColor: '#979899',
}

export default HomeIcon
