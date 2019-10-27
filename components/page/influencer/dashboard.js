import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import { choropleth } from './data'
import { Pie, Choropleth } from './index'

const data = [
    {
        "id": "sass",
        "label": "sass",
        "value": 525,
        "color": "hsl(12, 70%, 50%)"
    },
    {
        "id": "lisp",
        "label": "lisp",
        "value": 234,
        "color": "hsl(102, 70%, 50%)"
    },
    {
        "id": "ruby",
        "label": "ruby",
        "value": 384,
        "color": "hsl(107, 70%, 50%)"
    },
    {
        "id": "haskell",
        "label": "haskell",
        "value": 459,
        "color": "hsl(99, 70%, 50%)"
    },
    {
        "id": "stylus",
        "label": "stylus",
        "value": 148,
        "color": "hsl(114, 70%, 50%)"
    }
]

const Dashboard = ({ user = {} }) => {
    const [state, setState] = useState({
        currentView: 0,
    })
    const stats = [
        {
            text: 'Nombre abonnés',
            score: '356K',
            color: 'influencer-red',
        },
        {
            text: 'Moyenne de likes par posts',
            score: '234K',
            color: 'influencer-cryan',
        },
        {
            text: 'Moyenne de commentaires par posts',
            score: '235K',
            color: 'influencer-blue'
        },
    ];
    const plateforms = [
        {
            slug: 'SamJ',
            img: '../../../static/img/screen11.png',
            plateformImg: '../../../static/img/icon/big-facebook.png'
        },
        {
            slug: 'SamJ',
            img: '../../../static/img/screen11.png',
            plateformImg: '../../../static/img/icon/big-instagram.png'
        },
    ];
    const onChange = (name, value) => setState({ ...state, [name]: value })

    return (
        <>
            <div className='spacing'>
                <ul>
                    {plateforms && plateforms.map(({ img, slug, plateformImg }, index) => (
                        <li key={index} className={`${state.currentView == index ? 'active' : ''}`} onClick={() => onChange('currentView', index)}>
                            <div>
                                <img src={img} />
                                <span><img src={plateformImg} /></span>
                            </div>
                            <h3>{slug}</h3>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='spacing'>
                <h2>Localisation de mon audience</h2>
                <Choropleth data={choropleth} />
            </div>
            <div className='spacing'>
                <h2>Appareil utilisé par mon audience</h2>
                <Pie data={data} />
            </div>
            <div className='spacing color-container'>
                <h2>Total ventilé</h2>
                <Grid container justify="space-around" className='white-color'>
                    {stats && stats.map(({ color, text, score }, index) => (
                        <Grid container justify="space-between" direction="column" item xs={4} key={index} className='influencer-color-container'>
                            <Grid justify="space-between" direction="column" className={`influencer-color ${color}`}>
                                <Grid item><h3>{text}</h3></Grid>
                                <Grid item><h4>{score}</h4></Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <style jsx>{`
                .color-container h3,
                .color-container h4 {
                    text-align: center;
                    padding: 0 1rem;
                }
                ul li {
                    margin: 0 2rem 2rem;
                    display: inline-block;
                    width: 65px;
                    text-align: center;
                }
                ul li:first-child {
                    margin-left: 0;
                }

                ul li.active {
                    transform: scale(1.2);
                    z-index: 1;
                }
                ul li div {

                    position: relative;
                    cursor: pointer;
                    border-radius: 100%;
                }
                ul li div::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: black;
                    opacity: .5;
                    border-radius: 100%;
                }
                ul li.active div::after {
                    opacity: 0;
                }
                ul li h3 {
                    opacity: .5;
                }
                ul li.active h3 {
                    opacity: 1;
                }
                ul li div > img {
                    display: block;
                    border-radius: 100%;
                    width: 100%;
                }
                
                ul li span {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    text-align: right;
                    z-index: 1;
                    width: 35%;
                    height: 35%;
                }
                ul li span img {
                    width: 100%;
                    height: 100%;
                }

                .spacing {
                    display: block;
                    width: 100%;
                    padding: 1rem 0;
                }
                .color-container {
                    padding: 1rem;
                    height: 100%;
                    border-radius: 5px;
                }
                .red {
                    background-color: #242B45;
                }
                .cryan {
                    background-color: #87B8C2;
                }
                .blue {
                    background-color: #F13F4B;
                }
            `}</style>
        </>
    )
}
export default Dashboard