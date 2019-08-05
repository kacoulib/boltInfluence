import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import Stars from '../../../static/img/icon/stars.png'
import InfluenceurJones from '../../../static/img/pictures/rectangle.png'
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { getArticles, getBookList } from '../../../lib/api/http/admin';
import Edit from './create'

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

const Index = ({ datas, loadMore }) => {
    const [state, setState] = useState({ articles: [], selectedArticle: null })

    useEffect(() => {
        async function getData() {
            const articles = await getArticles();
            setState({ ...state, ...articles })
        }
        getData()
    }, [])

    const handleSelectArticle = (id) => {
        const tmp = state.articles.find((e) => e._id == id);
        setState({ ...state, selectedArticle: tmp })
    }

    if (state.selectedArticle)
        return (<Edit selected={state.selectedArticle} isEdit={true} />)
    return (
        <Grid container alignItems='center' justify="center" style={styles.container}>
            <Grid item xs={12} sm={12}>
                <h2>Liste des articles</h2>
            </Grid>
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                {state.articles && state.articles.map((elem, i) => (
                    <Grid key={i} container alignItems='center' justify="center" className='influencers_list' style={styles.listContainer}>
                        <Grid item xs={4} sm={4} className='center-text' style={styles.influencer_img_container}>
                            <div className='influencers_img' style={{ backgroundImage: "url(" + elem.picture || InfluenceurJones + ")" }}><div></div>
                                <img src={elem.picture || InfluenceurJones} />
                            </div>
                        </Grid>
                        <Grid item xs={8} sm={8} style={styles.influencer_info_container}>
                            <Grid item xs={4} sm={4} className='text-right'><span className='icon write pointer' onClick={() => handleSelectArticle(elem._id)}></span></Grid>
                            <h2>{elem.title}</h2>
                            <h3 style={styles.marqueName}>{elem.marque}</h3>

                        </Grid>
                        <Grid item container xs={12} sm={12} style={styles.footer}>
                            <Grid item xs={2} sm={2}> <Link prefetch href={'#Aperçu'}><a>Aperçu </a></Link></Grid>
                            <Grid item xs={2} sm={2}> <Link prefetch href={'#Brief'}><a>Brief campage </a></Link></Grid>
                            <Grid item xs={2} sm={2}> <Link prefetch href={'#Calendrier'}><a>Calendrier </a></Link></Grid>
                            <Grid item xs={2} sm={2}> <Link prefetch href={'#Influencers'}><a>Influencers </a></Link></Grid>
                            <Grid item xs={2} sm={2}> <Link prefetch href={'#Contenus'}><a>Contenus </a></Link></Grid>
                            <Grid item xs={2} sm={2}> <Link prefetch href={'#Analytics'}><a>Analytics </a></Link></Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={() => loadMore()}>More</Button>
        </ Grid>
    )
}
Index.propTypes = {
    datas: PropTypes.object.isRequired,
    selectInfluencer: PropTypes.func.isRequired,
    loadMore: PropTypes.func
}

export default Index;