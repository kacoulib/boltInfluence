import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import InfluenceurJones from '../../../static/img/pictures/influencer_jones.png'
import Detail from './campagne-detail'
import MessageComp from '../../../components/dataDisplay/message'
import ListDisplay from './listDisplay'

const styles = {
    container: { padding: '0 3em' },
    childContainer: { marginBottom: '3em' },
    status: { color: '#F13F4B' },
    influencer_info_container: { padding: '1rem' },
}

const Index = ({ datas, selected, showMessageView = false, toggleMessageView, setNavTitle, setShowNav, setSelection, loadMore, title }) => {
    if (selected)
        return (<Detail selected={selected} setNavTitle={setNavTitle} />);
    else if (showMessageView) {
        setShowNav()
        return (<MessageComp showOptions={false} />);
    }

    return (
        <ListDisplay loadMore={loadMore} title={title}>
            {datas && datas.map((elem, i) => (
                <Grid key={i} container alignItems="stretch" justify="center" className='influencers_list'>
                    <Grid item xs={4} sm={4} className='center-text'>
                        <div className='influencers_img' style={{ backgroundImage: "url(" + InfluenceurJones + ")" }}><div></div>
                            <img src={InfluenceurJones} />
                        </div>
                    </Grid>
                    <Grid item container xs={8} sm={8} style={styles.influencer_info_container}>
                        <Grid item container xs={12} sm={12}>
                            <Grid item container xs={12} sm={12}>
                                <Grid item xs={12} sm={12}><h3 className='no-margin'>{`${elem.name}`}</h3></Grid>
                                <Grid item xs={12} sm={12}><span>{`${elem.agence}`}</span></Grid>
                            </Grid>

                            <Grid item container xs={12} sm={12} alignContent='center' className='text-center'>
                                <Grid item xs={3} sm={3}><p className='pointer' style={styles.status} onClick={() => setSelection(elem._id)}>Administrer</p></Grid>
                                <Grid item xs={3} sm={3}><p className='pointer' style={styles.status}>Activer</p></Grid>
                                <Grid item xs={3} sm={3}><p className='pointer' style={styles.status}>Cloturer</p></Grid>
                                <Grid item xs={3} sm={3}><p className='pointer' style={styles.status} onClick={() => toggleMessageView(elem._id)}>Messages</p></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
            <style jsx>{`
                p {
                    margin: 0;
                    font-size: 1rem;
                }
            `}</style>
        </ListDisplay>
    )
}
Index.propTypes = {
    datas: PropTypes.object.isRequired,
    loadMore: PropTypes.func
}

export default Index;