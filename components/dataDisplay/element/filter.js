import Grid from '@material-ui/core/Grid';
import React, { useState } from "react";


const filtersColor = ['red', 'blue', 'done', 'new']


const FilterComp = ({ onFilter, data, categories }) => {
    const [state, setState] = useState({
        filterCategory: -1
    });
    const toggleCategory = (id) => {
        const newId = id != state.filterCategory ? id : null;
        setState({ ...state, ...{ filterCategory: newId } });
        onFilter && onFilter(newId)
    };

    return (
        <Grid container alignContent='center' alignItems='center'>
            <Grid container item xs={12} sm={12}>
                <div className='container'>
                    {categories && categories.map((e, i) => (
                        <div key={i} className='child'>
                            <Grid item container xs={12} sm={12} onClick={() => toggleCategory(e._id)}>
                                <Grid item container xs={12} className={`filter ${filtersColor[i]} ${state.filterCategory == e._id ? 'active' : ''}`} justify="space-between">
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
                    display: block;
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