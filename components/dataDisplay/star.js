import React, { useState, useEffect } from 'react';
import StarIcon from '../../static/img/icon/star.svg'
import Rating from '@material-ui/lab/Rating';

const StarComp = ({ name = '', length = 5, selected = length, onClick, activateSelection = true }) => {
    const [state, setState] = useState({ selected })

    const stars = [...Array(length).keys()];
    const handleSelection = (index) => {
        setState({ selected: index });
        onClick && onClick(index);
    }

    console.log(state)
    return (
        <Rating
            name={name}
            value={state.selected}
            readOnly={!activateSelection}
            onChange={(event, newValue) => handleSelection(newValue)}
        />
    )
    return (
        <ul className='star-container'>
            {stars.map((elem, index) => (
                <li key={index} className={`${index <= state.selected ? 'active' : ''}`} onClick={() => activateSelection && handleSelection(index)}>
                    <StarIcon />
                </li>
            ))}
        </ul>
    )
}

export default StarComp;
