import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import TextTruncate from 'react-text-truncate';


const MessageComp = ({ paginate }) => {
    const [state, setState] = useState({
        selected: 1,
        offset: 1,
        limit: 50,
        nb_message: 80,
        messages: [{
            _id: 1,
            title: 'Campagne fitz & huxley ',
            description: 'Description sdfsdfsdf r sit amet, consectetur adipiscing elit. Suspendisse ligula v',
            content: 'Hey Samdolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus.mollis at risus,Lina.',
            status: 'unread',
            user: {
                img: '../../../static/img/lisa.png',
                firstName: 'Lisa',
                lastName: 'Smith',
                slug: '@linas15'
            },
            date: '15 juin, 2019'
        },
        {
            _id: 2,
            title: 'Cafitz & hux mpag ≤ndse ley ',
            description: 'Desdsdfsdf sdf ',
            content: 'Hey Samdse ligolor sit ametelit. Suspendisula   pretium consecvelit, molestie sit amet, consectetur adipiscingtetur, mollis at risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus.mollis at risus,Lina.',
            status: 'unread',
            user: {
                img: '../../../static/img/lisa.png',
                firstName: 'Lisa',
                lastName: 'Smith',
                slug: '@linas15'
            },
            date: '15 juin, 2019'
        },
        {
            _id: 3,
            title: 'clesLsd s dfnsdk fn l; ',
            description: 'Dsdfsd sdfd sfe sddsfsfhj sdf ',
            content: 'card, you have to post, as url-encoded, these data:- accessKeyRef: T',
            status: 'read',
            user: {
                img: '../../../static/img/lisa.png',
                firstName: 'Lisa',
                lastName: 'Smith',
                slug: '@linas15'
            },
            date: '15 juin, 2019'
        },
        {
            _id: 4,
            title: 'clesLsd s dfnsdk fn l; ',
            description: 'Dsdfsd sdfd sfe sddsfsfhj sdf ',
            content: 'card, you have to post, as url-encoded, these data:- accessKeyRef: T',
            status: 'read',
            user: {
                img: '../../../static/img/lisa.png',
                firstName: 'Lisa',
                lastName: 'Smith',
                slug: '@linas15'
            },
            date: '15 juin, 2019'
        },
        {
            _id: 5,
            title: 'clesLsd s dfnsdk fn l; ',
            description: 'Dsdfsd sdfd sfe sddsfsfhj sdf ',
            content: 'card, you have to post, as url-encoded, these data:- accessKeyRef: T',
            status: 'read',
            user: {
                img: '../../../static/img/lisa.png',
                firstName: 'Lisa',
                lastName: 'Smith',
                slug: '@linas15'
            },
            date: '15 juin, 2019'
        },
        {
            _id: 6,
            title: 'clesLsd s dfnsdk fn l; ',
            description: 'Dsdfsd sdfd sfe sddsfsfhj sdf ',
            content: 'card, you have to post, as url-encoded, these data:- accessKeyRef: T',
            status: 'read',
            user: {
                img: '../../../static/img/lisa.png',
                firstName: 'Lisa',
                lastName: 'Smith',
                slug: '@linas15'
            },
            date: '15 juin, 2019'
        },
        ]
    });

    const onChange = (name, value) => setState({ ...state, [name]: value });
    const handleSelection = (name, value) => {
        onChange(name, value);
        // update api status read
    }
    const handlePaginate = (offset) => {
        if (offset < 0)
            offset = 0;

        if (offset > state.nb_message)
            offset = state.nb_message;

        onChange('offset', offset);
    }
    const selected = state.messages.find(e => e._id == state.selected);

    return (
        <Grid container id="tchat" alignItems='flex-start'>
            <Grid item container sm={4} justify="space-between" direction="column" className='fullheight'>
                <Grid item container className='tchat-list-container'>
                    {state.messages && state.messages.map((elem, index) => (
                        <Grid item container key={index} sm={12} className={`tchat-list ${elem.status} ${selected._id == elem._id ? 'selected' : ''}`} onClick={() => handleSelection('selected', elem._id)}>
                            <Grid item container alignItems='center'>
                                <Grid item container sm={8}>
                                    <h2>{`${elem.user.firstName} ${elem.user.lastName}`}</h2>
                                </Grid>
                                <Grid item sm={4}>
                                    <div className='message-date'>{elem.date}</div>
                                </Grid>
                            </Grid>
                            <Grid>
                                <div className='message-trucate'>
                                    <TextTruncate
                                        line={2}
                                        element="p"
                                        truncateText="…"
                                        text={elem.content}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item container alignItems="center" justify="flex-end" className='paginate'>
                    <Grid item >
                        <span>{`${state.offset}-${state.limit}`}</span> de<span> {state.nb_message}</span>
                    </Grid>
                    <Grid item direction="row">
                        <div className='paginate-btn' onClick={() => handlePaginate(state.offset - state.limit)}>x</div>
                        <div className='paginate-btn' onClick={() => handlePaginate(state.offset + state.limit)}>></div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={8}>
                <section>
                    {selected && <>
                        <Grid container>
                            <Grid item container alignItems='center' className='tchat-header'>
                                <Grid item container alignItems='center' sm={8}>
                                    <Grid item>
                                        <img src={selected.user.img} />
                                    </Grid>
                                    <Grid item>
                                        <div className='header-user-name'>
                                            <h2>{`${selected.user.firstName} ${selected.user.lastName}`}</h2>
                                            <h3>{selected.user.slug}</h3>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item sm={4}>
                                    <div className='message-date'>{selected.date}</div>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <div>
                                    <h1>{selected.title}</h1>
                                    <p>{selected.content}</p>
                                </div>
                            </Grid>
                        </Grid>
                    </>}
                </section>
            </Grid>
            <style jsx>{`
                h2, h3 {
                    font-size: 1rem;
                    margin: 0;
                }
                .message-date {
                    font-size: .8rem;
                }
                .header-user-name {
                    padding-left: 1rem;
                }
            `}</style>
        </Grid>
    )
}

export default MessageComp