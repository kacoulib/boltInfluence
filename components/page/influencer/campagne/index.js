import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from "react";
import Filter from '../../../dataDisplay/element/filter'
import Btn from '../../../elements/btn'
import FormGenerator from '../../../formElement/generator'
import { getCampagns } from '../../../../lib/api/http/user/influencer';
import Link from 'next/link'

const fields = [
    {
        label: "Activity *",
        name: "activity",
        type: 'checkbox',
        required: true,
        list: [
            { name: 'Salarié (non cadre)', value: 'salarie' },
            { name: 'Cadre', value: 'cadre' },
            { name: 'Entrepreneur/autoentrepreneur', value: 'entreprenor' },
            { name: 'De profession libérale', value: 'liberal' },
            { name: 'Profession des arts et spectacles', value: 'art' },
            { name: 'Sans emploi', value: 'businessman' },
            { name: 'Retraité', value: 'retiree' },
            { name: 'Autre', value: 'other' },
        ],
        props: {
            inline: false,
        }
    }
];
const settings = {
    // showLabel: true,
    unableUnderline: true,
    unableBoxShadow: false,
    bordered: true
};

const ListDisplay = ({ list }) => (
    <ul>
        {list && list.map((elem, index) => (
            <li className={`icon ${elem}`}></li>
        ))}
        <style jsx>{`
            li {
                margin: 1rem .5rem 0;
            }
        
        `}</style>
    </ul>
)

const Accordion = (props) => {
    const { title, onClick, active } = props;

    return (
        <div className={`accordion_container ${active ? 'active' : ''}`}>
            <button onClick={onClick}>{title}<span className={`arrow ${active ? 'top' : ''}`}></span></button>
            <div className="panel">
                {props.children}
            </div>
            <style jsx>{`
            .accordion_container {
                display: block;
            }
            button {
                position: relative;
                font-size: 1.3rem!important;
                color: #444;
                cursor: pointer;
                padding: 18px;
                width: 100%;
                border: none;
                text-align: left;
                outline: none;
                font-size: 15px;
                transition: 0.4s;
            }
            .panel {
                display: none;
                overflow: hidden;
                text-align: left;
            }
            .active .panel {
                display: block;
            }
            span {
                position: absolute;
                top: 0;
                right: 1rem;
                height: 100%;
            }
        `}</style>
        </div>
    )
}

const CampagnListComp = () => {
    const [state, setState] = useState({
        campagns: [
            { title: '#Campagne', marque: 'Marque', category: ['Mode', 'Autres'], platforms: ['facebook', 'instagram', 'tiktok'] },
            // { title: '#Campagne', marque: 'Marque', category: ['Voyage', 'Maman', 'Autres'], platforms: ['facebook', 'instagram', 'tiktok'] },
            // { title: '#Campagne', marque: 'Marque', category: ['Mode', 'Voyage', 'Maman', 'Autres'], platforms: ['facebook', 'instagram', 'tiktok'] },
            // { title: '#Campagne', marque: 'Marque', category: ['Mode', 'Maman', 'Autres'], platforms: ['facebook', 'instagram', 'tiktok'] },
            // { title: '#Campagne', marque: 'Marque', category: ['Voyage', 'Maman', 'Autres'], platforms: ['facebook', 'instagram', 'tiktok'] },
            // { title: '#Campagne', marque: 'Marque', category: ['Mode', 'Maman',], platforms: ['facebook', 'instagram', 'tiktok'] },
            // { title: '#Campagne', marque: 'Marque', category: ['Mode', 'Voyage', 'Maman', 'Autres'], platforms: ['facebook', 'instagram', 'tiktok'] },
            // { title: '#Campagne', marque: 'Marque', category: ['Mode', 'Voyage', 'Autres'], platforms: ['facebook', 'instagram', 'tiktok'] },
        ],
        accordionIndex: 0,
        filterIndex: 0,
        activity: []
    })
    const onChange = (title, value) => setState({ ...state, [title]: value })

    const onFilter = (index) => onChange('filterIndex', index);

    const categories = [
        {
            _id: 1,
            title: 'Mode',
            nb: 1,
        },
        {
            _id: 2,
            title: 'Voyage',
            nb: 2,
        },
        {
            _id: 3,
            title: 'Maman',
            nb: 3,
        },
        {
            _id: 4,
            title: 'Autres',
            nb: 4,
        },
    ];

    const handleSubmit = () => { }
    const currentCategory = categories.find(e => e._id == state.filterIndex)
    let filteredData = null;

    if (currentCategory)
        filteredData = state.campaigns.filter(elem => elem.category.includes(currentCategory.title))
    else
        filteredData = state.campaigns;

    useEffect(() => {
        const setCamps = async () => {
            const { campaigns = [] } = await getCampagns();
            onChange('campaigns', campaigns)
        }
        setCamps()
    }, [])
    console.log(filteredData)

    return (
        <Grid container alignContent='center' alignItems='center'>
            <Grid container item xs={12}>
                <Grid container item xs={4}>
                </Grid>
                <Grid container item xs={8}>
                    <div className='filter-container spacing'>
                        <Filter onFilter={onFilter} categories={categories} />
                    </div>
                </Grid>
            </Grid>
            <Grid container item xs={12} alignItems='flex-start'>
                <Grid container item xs={4}>
                    <Grid item xs={12}>
                        <Accordion
                            title='Type de campagne'
                            onClick={() => onChange('accordionIndex', 0)}
                            active={state.accordionIndex == 0}
                        >
                            <FormGenerator
                                fields={fields}
                                state={state}
                                onChange={onChange}
                                settings={settings}
                            />
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion
                            title='Type de revenu'
                            onClick={() => onChange('accordionIndex', 1)}
                            active={state.accordionIndex == 1} />
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion
                            title='Statut de la campagne'
                            onClick={() => onChange('accordionIndex', 2)}
                            active={state.accordionIndex == 2} />
                    </Grid>
                </Grid>
                <Grid container item xs={8}>
                    <div className='spacing fullwidth'>
                        <Grid container item xs={12} className='flex-center space-between'>
                            {filteredData && filteredData.map(({ slug, title, brand = {}, platforms }, index) => (
                                <div container item xs={4} key={index} className='container'>
                                    <Link href="/influencer/campagn/[slug]" as={`/influencer/campagn/${slug}`}>
                                        <a>
                                            <div className='campagn-list'>
                                                <div>
                                                    <img src={'../../../../static/img/white-rectangle.jpg'} />
                                                    <div className='overlay'>
                                                        <div>
                                                            <h2>{title}</h2>
                                                            <h3>{brand.name}</h3>
                                                        </div>
                                                    </div>
                                                    <div className='footer-container'>
                                                        <div className='btn-container'><Btn onClick={handleSubmit} text='Postuler' /></div>
                                                        <footer><ListDisplay list={platforms} /></footer>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <style jsx>{`
                .spacing {
                    padding-right: 3rem;
                }
                .filter-container {
                    display: block;
                    width: 100%;
                    margin-bottom: 2rem;
                    text-align: right;
                }
                .container {
                    width: calc(33.33% - 5px);
                    margin-bottom: 10px;
                }
                h2 {
                    font-size: 1.4rem;
                }
                h3 {
                    font-size: 1.2rem;
                }
                .btn-container {
                    display: inline-block;
                    margin: 0 auto 1rem auto;
                    border: 2px solid white;
                    border-radius: 5px;
                }
                .campagn-list {
                    position: relative;
                    text-align: center;
                }
                .campagn-list > div {
                    padding: 5px;
                    background-color: #F4F3F8;
                }
                .campagn-list > div img {
                    display: block;
                    width: 100%;
                }
                .campagn-list .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    margin: auto;
                    width: calc(100% - 1rem);
                    margin-bottom: 1rem
                }
                .footer-container {
                    transform: translateY(-25%);
                }
            `}</style>
        </Grid>
    )
}

export default CampagnListComp