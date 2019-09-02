import React, { useState, useEffect } from 'react';
import StarIcon from '../../static/img/icon/star.svg'

const StarComp = ({ length = 5, selected = length, onClick }) => {
    const [state, setState] = useState({ selected })

    const stars = [...Array(length).keys()];
    const handleSelection = (index) => {
        setState({ selected: index });
        onClick && onClick(index);
    }

    return (
        <ul className='star-container'>
            {stars.map((elem, index) => (
                <li key={index} className={`${index <= state.selected ? 'active' : ''}`} onClick={() => handleSelection(index)}>
                    <StarIcon />
                </li>
            ))}
        </ul>
    )
}

export default StarComp;
