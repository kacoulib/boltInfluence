import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import AccountIcon from '../../../static/img/icon/account.png'
import TimeIcon from '../../../static/img/icon/time.png'
import PostIcon from '../../../static/img/icon/post.png'
import FeedIcon from '../../../static/img/icon/feed-white.png'
import Stars from '../../../static/img/icon/stars.png'
import InfluenceurJones from '../../../static/img/pictures/influencer_jones.png'
import Button from '@material-ui/core/Button';

const cardContainer = {
    padding: '1rem',
    color: 'white',
    backgroundColor: '#242B45',
    margin: '.5em'
}
const styles = {
    cardContainer,
    rightCardContainer: Object.assign({}, cardContainer, { backgroundColor: '#F13F4B' }),
    container: { padding: '0 3em' },
    childContainer: { marginBottom: '3em' },
    cardText: { margin: '.5em 0 0' },
    status: { color: '#F13F4B' },
    stars: { width: '50%' },
    influencer_img_container: { height: 'auto', paddingTop: 5 },
    influencer_info_container: { padding: '1rem' },
}

const Index = ({ datas, loadMore }) => {
    console.log(datas)
    return (
        <Grid container alignItems='center' justify="center" style={styles.container} >
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2>Influenceurs</h2>
                {datas && datas.map((elem, i) => (
                    <Grid key={i} container alignItems='center' justify="center" className='influencers_list'>
                        <Grid item xs={4} sm={4} className='center-text' style={styles.influencer_img_container}>
                            <div className='influencers_img' style={{ backgroundImage: "url(" + InfluenceurJones + ")" }}><div></div>
                                <img src={InfluenceurJones} />
                            </div>
                        </Grid>
                        <Grid item xs={8} sm={8} style={styles.influencer_info_container}>
                            <div>
                                <Grid key={i} container alignItems='center' justify="center" >
                                    <Grid item xs={4} sm={4}><img src={Stars} style={styles.stars} /></Grid>
                                    <Grid item xs={4} sm={4} className='text-center'><span>{`${elem.firstName} ${elem.lastName}`}</span></Grid>
                                    <Grid item xs={4} sm={4} className='text-right'><span className='icon write pointer'></span></Grid>
                                </Grid>
                            </div>
                            <div>ID : {elem._id}</div>
                            <div>Email : {elem.email}</div>
                            <div>Numéro de téléphone : {elem.phone}</div>
                            <div style={styles.status} className='center-text'>{elem.status}</div>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={() => loadMore()}>More</Button>
        </ Grid>
    )
}
Index.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Index;