import { useState } from "react";
import Grid from '@material-ui/core/Grid';

const MediaKit = ({ user }) => {
    const [state, setState] = useState({
        currentView: 0
    })
    const socialStats = [
        { src: '../../../static/img/icon/facebook.png', score: '58K' },
        { src: '../../../static/img/icon/instagram.png', score: '10K' },
        { src: '../../../static/img/icon/tiktok.png', score: '200K' },
        { src: '../../../static/img/icon/facebook.png', score: '58K' },
        { src: '../../../static/img/icon/instagram.png', score: '10K' },
        { src: '../../../static/img/icon/tiktok.png', score: '200K' },
    ];
    const onChange = (name, value) => setState({ ...state, [name]: value })

    const audienceList = ['Centre d’intérêt', 'Sexe', 'Âge', 'Langues'];

    const ageStats = [
        { age: '13-17', percent: 15, color: 'orange' },
        { age: '18-24', percent: 60, color: 'blue-light' },
        { age: '35-34', percent: 80, color: 'dark' },
        { age: '35-44', percent: 45, color: 'green' },
        { age: '45-54', percent: 30, color: 'orange-light' },
        { age: '57-64', percent: 25, color: 'orange' },
        { age: '65+', percent: 10, color: 'blue-light' },
    ]

    return (
        <>
            <div className='cover relative card-bg dots-white bottom' style={{ backgroundImage: `url(${user.src})` }}>
                <img src={user.src} />
                <h1><span>{`${user.firstName} ${user.lastName}`}</span></h1>
                <span className='icon write pointer'></span>
            </div>
            <div className='presentation'>
                <h2>Hello, I’m {`${user.firstName} ${user.lastName}`}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat sed elit sceleris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat sed elit scelerisque iaculis. Nullam nec porttitor justo, at iaculis risus. Aliquam erat volutpat. que iaculis. </p>
            </div>
            <div className='red-bg white-color'>
                <Grid container alignItems='center'>
                    <Grid item xs={6}>
                        <div>{user.phone}</div>
                        <div>{user.email}</div>
                    </Grid>
                    <Grid item xs={6}>{user.address}</Grid>
                </Grid>
            </div>
            <div className='spacing'>
                <Grid container alignItems='center'>
                    <Grid item xs={6}>
                        <div className='total-score red-color'>358K</div>
                        <p>Total abonnés</p>
                    </Grid>
                    <Grid container item xs={6}>
                        {socialStats.map(({ src, score }, index) => (
                            <Grid item xs={4} key={index}>
                                <div>
                                    <img src={src} />
                                    <div>{score}</div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </div>
            <div className='audience'>
                <h2>Audience</h2>
                <div className='list'>
                    <Grid container>
                        {audienceList.map((elem, index) => (
                            <Grid index xs={3} key={index} onClick={() => onChange('currentView', index)} className={`pointer ${state.currentView == index ? 'bold' : ''}`}>
                                <div className='list-container'>{elem}</div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='list-value text-left'>
                    <Grid container alignItems='center'>
                        {ageStats.map(({ age, percent, color, }, index) => (
                            <>
                                <Grid xs={2}><div className={color}>{age}</div></Grid>
                                <Grid xs={10}><div className={`bar ${color}`}><div style={{ width: `${percent}%` }}></div></div></Grid>
                            </>
                        ))}
                    </Grid>

                </div>
            </div>
            <style jsx>{`
                .bar {
                    display: block;
                    width: 100%;
                    min-height: 50px;
                    padding: .5rem 0;
                }
                .blue-light div {
                    background-color: #9DC2E4;
                }
                .orange-light div {
                    background-color: #EE9D25;
                }
                .dark div {
                    background-color: #2C3434;
                }
                .green div {
                    background-color: #9FD9DD;
                }
                .orange div {
                    background-color: #F05E22;
                }
                .bar div {
                    display: block;
                    min-height: 50px;
                }
                .presentation {
                    margin-bottom: 3rem;
                }
                .spacing {
                    margin: 5rem 0;
                }
                .list-container {
                    padding: 1rem;
                }
                .audience h2 {
                    text-align: left;
                }
                .audience .list {
                    background-color: #F4F3F8;
                }
                .total-score {
                    font-size: 4rem;
                    font-weight: bold;
                }
                .write {
                    position: absolute;
                    top: 1rem;
                    right: 3rem;
                }
                .cover {
                    margin-bottom: 3rem;
                    background-size: cover;
                }
                .cover img {
                    opacity: 0;
                }
                .cover h1 {
                    position: absolute;
                    margin: 0;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    transform: translateY(25%);
                    text-align: center;
                }
                .cover h1 span {
                    background-color: #242B45;
                    color: white;
                    padding: .5rem 1rem;
                }
            `}</style>
        </>
    )
}

export default MediaKit