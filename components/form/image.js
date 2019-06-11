import React from 'react';
import PropTypes from 'prop-types'


const DropImage = ({ onChange, src, style }) => (
    <img src={src} style={style} />
);

Image.propTypes = {
    onChange: PropTypes.func.isRequired,
    src: PropTypes.string
}

module.exports = {
    DropImage
}
