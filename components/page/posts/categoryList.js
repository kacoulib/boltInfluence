import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import Stars from '../../../static/img/icon/stars.png'
import InfluenceurJones from '../../../static/img/pictures/rectangle.png'
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { customRequest } from '../../../lib/api/http/index';
import Edit from '../create-edit'
import Ucfirst from '../../../lib/ucfirst'

const cardContainer = {
    padding: '1rem',
    color: 'white',
    backgroundColor: '#242B45',
    margin: '.5em'
}
const styles = {
    cardContainer,
    rightCardContainer: Object.assign({}, cardContainer, { backgroundColor: '#F13F4B' }),
    container: { padding: '0 3rem' },
    listContainer: { padding: '1rem', backgroundColor: '#DEDEE8', marginBottom: '1rem' },
    footer: { marginTop: '1rem' },
    childContainer: { marginBottom: '3em' },
    cardText: { margin: '.5em 0 0' },
    status: { color: '#F13F4B' },
    stars: { width: '50%' },
    influencer_img_container: { height: 'auto', paddingTop: 5 },
    influencer_info_container: { padding: '1rem' },
    marqueName: { color: '##5b5b5d' }
}

const Index = ({ fields, path, editIdenfier, titleIdentifier = 'title', title, showImg = true, requestProp }) => {
    const [state, setState] = useState({ [requestProp]: [], selectedArticle: null })

    useEffect(() => {
        async function getData() {
            const tmp = await customRequest({ path });
            setState({ ...state, ...tmp })
        }
        getData()
    }, [])

    const loadMore = () => console.log('loading...')
    const handleSelectArticle = (id) => {
        const tmp = state[requestProp].find((e) => e._id == id);
        setState({ ...state, selectedArticle: tmp })
    }
    if (state.selectedArticle)
        return (<Edit selected={state.selectedArticle} isEdit={true} fields={fields} path={path} editIdenfier={editIdenfier} />)
    return (
        <Grid container alignItems='center' justify="center" style={styles.container} >
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                {state[requestProp] && state[requestProp].map((elem, i) => (
                    <Grid key={i} container alignItems='stretch' justify="center" className='influencers_list relative' style={styles.listContainer}>
                        <div className='listActions'>
                            <span className='icon write pointer' onClick={() => handleSelectArticle(elem._id)}></span>
                        </div>
                        {showImg && <Grid item xs={4} sm={4} className='center-text' style={styles.influencer_img_container}>
                            <div className='influencers_img' style={{ backgroundColor: elem.color }}><div></div>
                                {/* <img src={elem.picture || InfluenceurJones} /> */}
                            </div>
                        </Grid>}
                        <Grid item xs={8} sm={8} style={styles.influencer_info_container}>
                            <h2>{Ucfirst(elem[titleIdentifier])}</h2>
                            <h3 style={styles.marqueName}>{elem.marque}</h3>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={() => loadMore()}>More</Button>
        </ Grid>
    )
}


export default Index;