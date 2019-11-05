import React, { useState } from "react";

const Tabs = ({ children, selected = 0, headerStyle }) => {
    const [state, setState] = useState({ selected })
    const onChange = (name, value) => setState({ ...state, [name]: value })

    return (
        <div>
            <ul style={headerStyle}>
                {children.map((elem, index) => (
                    <li key={index} className='inline-block'>
                        <h3 onClick={() => onChange('selected', index)} className={`pointer inline-block ${state.selected == index ? 'full-bordered-head' : ''}`}>{elem.props.title}</h3>
                    </li>
                ))}
            </ul>
            <div>{children[state.selected].props.children}</div>
            <style jsx>{`
                li {
                    min-width: 25%;
                }
            `}</style>
        </div>
    )
}

export default Tabs