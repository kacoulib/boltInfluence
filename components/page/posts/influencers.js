import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import Stars from '../../../static/img/icon/full-stars.png'
import InfluenceurJones from '../../../static/img/pictures/influencer_jones.png'
import FacebookIcon from '../../../static/img/icon/facebook.png'
import InstagramIcon from '../../../static/img/icon/instagram.png'
import TiktokIcon from '../../../static/img/icon/tiktok.png'
import Button from '@material-ui/core/Button';

const styles = {
    container: { padding: '0 3em' },
    interstList: { padding: '.5rem' },
    interstListIcon: { verticalAlign: 'middle', marginRight: 10 },
    tiniIcon: { height: '1rem', },
    socialList: { margin: '1rem' },
    socialListIcon: { width: 25 },
    influencer_info_container: { padding: '.5rem 1rem' }
}

const Index = ({ datas, selectedInfluencer, selectInfluencer, loadMore }) => {
    return (
        <Grid container alignItems='center' justify="center" style={styles.container}>
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2>Influenceurs</h2>
                {datas && datas.map((elem, i) => (
                    <Grid key={i} container alignItems='center' justify="center" className='influencers_list' alignItems="stretch">
                        <Grid item xs={4} sm={4} className='center-text' style={styles.influencer_img_container} >
                            <div className='influencers_img' style={{ backgroundImage: "url(" + InfluenceurJones + ")", backgroundSize: 'contain' }}><div></div>
                                <img src={InfluenceurJones} />
                            </div>
                        </Grid>
                        <Grid item xs={8} sm={8} style={styles.influencer_info_container}>
                            <div>
                                <Grid key={i} container alignItems='center' justify="center" >
                                    <Grid item xs={4} sm={4}><img src={Stars} style={styles.stars} /></Grid>
                                    <Grid item xs={4} sm={4} className='text-center'><span>{`${elem.firstName} ${elem.lastName}`}</span></Grid>
                                    <Grid item xs={4} sm={4} className='text-right'><span className='icon love pointer' onClick={() => selectInfluencer(elem._id)}></span></Grid>
                                </Grid>
                            </div>
                            <div className='center-text'>
                                <ul >{elem.interests.map(((e, y) => (<li key={y} className='inline-block' style={styles.interstList}><span style={styles.interstListIcon} className={`icon ${e.name}`}></span>{e.text}</li>)))}</ul>
                                <p><span style={styles.interstListIcon} className='icon location' style={styles.tiniIcon}></span>{elem.location}</p>
                            </div>
                            <Grid item container xs={12} sm={12}>
                                <Grid item xs={12} sm={4} className='text-center'>
                                    <div>
                                        <div className='red-color'>3508K</div>
                                        <span>Total abonnés</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4} className='text-center'>
                                    <div>
                                        <div className='red-color'>200€</div>
                                        <span>Coût moyen par post / vidéo</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4} className='text-center'>
                                    <div>
                                        <div className='red-color'>250K</div>
                                        <span>Engagement moyen</span>
                                    </div>
                                </Grid>
                                <Grid item container xs={12} sm={12} className='text-center'>
                                    <div className='text-center' style={styles.socialList}>
                                        <div><img src={FacebookIcon} style={styles.socialListIcon} /></div>
                                        <div>58K</div>
                                    </div>
                                    <div className='text-center' style={styles.socialList}>
                                        <div><img src={InstagramIcon} style={styles.socialListIcon} /></div>
                                        <div>58K</div>
                                    </div>
                                    <div className='text-center' style={styles.socialList}>
                                        <div><img src={TiktokIcon} style={styles.socialListIcon} /></div>
                                        <div>58K</div>
                                    </div>
                                </Grid>
                            </Grid>
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