import Grid from '@material-ui/core/Grid';
import React, { useState } from "react";


const FilterComp = ({ onFilter, data }) => {
    const [state, setState] = useState({
        categories: [
            {
                _id: 1,
                title: 'inbox',
                nb: 1,
                color: 'red'
            },
            {
                _id: 2,
                title: 'Envoyé',
                nb: 2,
                color: 'blue'
            },
            {
                _id: 3,
                title: 'Brouillons',
                nb: 3,
                color: 'done'
            },
            {
                _id: 4,
                title: 'corbeille',
                nb: 4,
                color: 'new'
            },
        ],
        filterCategory: 1
    });
    const toggleCategory = (id) => {
        setState({ ...state, ...{ filterCategory: id != state.filterCategory ? id : null } });
        onFilter && onFilter(id)
    };

    return (
        <Grid container alignContent='center' alignItems='center'>
            <Grid container item xs={1} sm={1} justify='center'>
            </Grid>
            <Grid container item xs={11} sm={11}>
                <div className='container'>
                    {state.categories && state.categories.map((e, i) => (
                        <div key={i} className='child'>
                            <Grid item container xs={12} sm={12} onClick={() => toggleCategory(e._id)}>
                                <Grid item container xs={12} className={`filter ${e.color} ${state.filterCategory == e._id ? 'active' : ''}`} justify="space-between">
                                    <div className='upper'>{e.title}</div>
                                    <div className='nb'>{e.nb || 3}</div>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </div>
            </Grid>
            <style jsx>{`
                .container {
                    width: 100%;
                }
                .child {
                    display: inline-block;
                    width: calc(25% - 5px);
                    padding: 0 5px;
                }
                .container .child:last-child {
                    padding-right: 0;
                }
                .container .child:first-child {
                    padding-left: 0;
                }
            `}</style>
        </Grid>
    )
}

export default FilterComp