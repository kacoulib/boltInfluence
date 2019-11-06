import React from "react";
import Awards from '../../../static/img/icon/award.svg'

const CardComp = ({ src, borderColor = 'red', badgeColor }) => (
    <div className={`card-container ${borderColor}`}>
        <img src={src} />
        {badgeColor ? <div className={`badge svg-g-fill-${badgeColor}`}><Awards /></div> : ''}
        <style jsx>{`
            .badge {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                width: 4rem;
            }
            .card-container {
                position: relative;
                display: inline-block;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0px 0px 5px gray;
            }
            .card-container > img {
                display: block;
                width: 100%;
            }
            .gray {
                background-color: #DEDEE8;
            }
            .red {
                background-color: #F13F4B;
            }
            .blue {
                background-color: #242B45;
            }
        
        `}</style>
    </div>
)

const TripleCard = ({ src, borderColor = 'red', badgeColor }) => (
    <div className='triple-container inline-block relative auto'>
        <div className='left'>
            <CardComp {...{ src, borderColor: 'blue', badgeColor }} />
        </div>
        <div className='center'>
            <CardComp {...{ src, borderColor: 'red', badgeColor }} />
        </div>
        <div className='right'>
            <CardComp {...{ src, borderColor: 'blue', badgeColor }} />
        </div>
        <style jsx>{`
            .triple-container > div {
                display: inline-block;
            }
            .left, .right {
                position: absolute;
                top: -25%;
            }
            .left {
                transform: rotate(22deg);
                left: -110%;
            }
            .right {
                transform: rotate(-22deg);
                right: -110%;
            }
        `}</style>
    </div>
)

export { TripleCard }

export default CardComp