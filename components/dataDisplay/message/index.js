import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import TextTruncate from 'react-text-truncate';
import OvalIcon from '../../../static/img/icon/oval.svg'
import StarIcon from '../../../static/img/icon/star.svg'
import ReplyIcon from '../../../static/img/icon/reply.svg'
import TrashIcon from '../../../static/img/icon/trash.svg'
import ArrowIcon from '../../../static/img/icon/arrow.svg'
import { toggleArray } from '../../../utils/datas/convert'
import Btn from '../../../components/elements/btn'

import Autocomplete from '../../dataDisplay/element/autocomplete'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: 0,
        border: 0,
        root: {
            border: 0
        }
    },
    outlinedRoot: {
        border: 0,
        '&:hover': {
            border: 0,
        },
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));


const ReplyComp = ({ }) => {
    const classes = useStyles();

    const InputProps = {
        classes: {
            notchedOutline: classes.outlinedRoot,
        },
    };

    return (
        <>
            <div>
                <div className='reply-content'>
                    <div>
                        <div>
                            <Grid container spacing={1} alignItems="flex-start">
                                <Grid item xs={1}>
                                    <div className='reply-icon'>
                                        <ReplyIcon />
                                    </div>
                                </Grid>
                                <Grid item xs={11}>
                                    <div className='select-user'>
                                        <div>
                                            <Autocomplete />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows="8"
                                fullWidth
                                defaultValue="Default Value"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                InputProps={InputProps}
                            />
                        </div>
                        <div className='submit-container text-right'><Btn text="Envoyer" /></div>
                    </div>
                </div>
            </div>
            <style jsx>{`
            .reply-icon {
                max-width: 25px;
                fill: red;
            }
            .select-user {
                position: relative;
            }
            .select-user > div {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 1;
            }
            .reply-content {
                position: relative;
                padding: 1rem;
            }
            .reply-content > div {
                border: 1px solid rgba(0, 0, 0, 0.23);
                border-radius: 4px;
                box-shadow: 0 5px 3px 1.5px #d2d1d18f;
            }
            .reply-content > div > div:nth-child(1) {
                border-bottom: 1px solid rgba(0,0,0,0.23);
                padding: .5rem;
            }
            .reply-content .submit-container {
                padding: 0 1rem 1rem;
            }
        `}</style>
        </>
    )
}

const optionsList = [
    { type: 'select', Icon: OvalIcon },
    { type: 'favory', Icon: StarIcon },
    { type: 'reply', Icon: ReplyIcon },
    { type: 'trash', Icon: TrashIcon },
]

const OptionsDisplay = ({ options, date, id, handleOption }) => (
    <div>
        <span className='tiny-text'>{date}</span>
        <div className='svg-g-fill-white'>
            {optionsList.map(({ type, Icon }, index) => (
                <span className={`pointer ${type} ${options.includes(type) ? `option-${type}` : ''}`} onClick={() => handleOption(id, type)} key={index}>
                    <Icon />
                </span>
            ))}
        </div>
        <style jsx>{`
                div {
                    text-align: right;
                }
                .pointer {
                    display: inline-block;
                    width: 17px;
                    height: 17px;
                    margin: 0 5px;
                }
                .pointer:last-of-type{
                    margin-right: 0;
                }
                svg {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
    </div>
)

const MessageDisplay = ({ selected = null, messages = [], offset = 0, limit = 0, nb_message = 0, handleSelection, handlePaginate, handleOption, showOptions }) => (
    <Grid container id="tchat" alignItems="stretch">
        <Grid item container sm={4} justify="space-between" direction="column" className='fullheight'>
            <Grid item container className='tchat-list-container'>
                {messages && messages.map((elem, index) => (
                    <Grid item container key={index} sm={12} className={`tchat-list ${elem.status} ${selected._id == elem._id ? 'selected' : ''}`} onClick={() => handleSelection('selected_id', elem._id)}>
                        <Grid item container alignItems='center'>
                            <Grid item container sm={!showOptions ? 12 : 7}>
                                <h2>{`${elem.user.firstName} ${elem.user.lastName}`}</h2>
                            </Grid>
                            {showOptions ? <Grid item sm={5} className='list-message'>
                                <OptionsDisplay options={elem.options} date={elem.date} id={elem._id} handleOption={handleOption} />
                            </Grid> : ''}
                        </Grid>
                        <Grid>
                            <div className='message-trucate'>
                                <TextTruncate
                                    line={2}
                                    element="div"
                                    truncateText="…"
                                    text={elem.content}
                                />
                            </div>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid item container alignItems="center" justify="flex-end" className='paginate'>
                <Grid item>
                    <span>{`${offset}-${limit}`}</span> de<span> {nb_message}</span>
                </Grid>
                <Grid item className='svg-g-fill-white'>
                    <div className='paginate-btn' onClick={() => handlePaginate(offset - limit)}><ArrowIcon /></div>
                    <div className='paginate-btn rotate-reverse' onClick={() => handlePaginate(offset + limit)}><ArrowIcon /></div>
                </Grid>
            </Grid>
        </Grid>
        <Grid item sm={8} className='relative'>
            <section>
                {selected && <>
                    <Grid container>
                        <Grid item container alignItems='center' className='tchat-header'>
                            <Grid item container alignItems='center' sm={!showOptions ? 12 : 7}>
                                {selected.user && <>
                                    <Grid item>
                                        <img src={selected.user.img} />
                                    </Grid>
                                    <Grid item>
                                        <div className='header-user-name'>
                                            <h2>{`${selected.user.firstName} ${selected.user.lastName}`}</h2>
                                            <h3>{selected.user.slug}</h3>
                                        </div>
                                    </Grid>
                                </>}
                            </Grid>
                            {showOptions ? <Grid item sm={5}>
                                <OptionsDisplay options={selected.options} date={selected.date} id={selected._id} handleOption={handleOption} />
                            </Grid> : ''}
                        </Grid>
                        <Grid item>
                            <div>
                                <h1>{selected.title}</h1>
                                <p>{selected.content}</p>
                            </div>
                        </Grid>
                        <div className='reply-container'><ReplyComp /></div>
                    </Grid>
                </>}
            </section>
        </Grid>
        <style jsx>{`
            .reply-container {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
            }
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

const MessageComp = ({ showOptions = true }) => {
    const [state, setState] = useState({
        selected_id: 1,
        offset: 1,
        limit: 50,
        nb_message: 80,
        messages: [{
            _id: 1,
            title: 'Campagne fitz & huxley ',
            description: 'Description sdfsdfsdf r sit amet, consectetur adipiscing elit. Suspendisse ligula v',
            content: 'Hey Samdolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus.mollis at risus,Lina.',
            status: 'unread',
            options: ['select'],
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
            options: ['select'],
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
            options: ['read'],
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
            options: ['read'],
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
            options: ['favory'],
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
            options: ['favory'],
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
    const findById = (id) => state.messages.find(e => e._id == id)

    const handlePaginate = (offset) => {
        if (offset < 0)
            offset = 0;

        if (offset > state.nb_message)
            offset = state.nb_message;

        onChange('offset', offset);
    }
    const handleOption = (id, type) => {
        let index = state.messages.findIndex(e => e._id == id),
            message;

        if (index < 0 || !(message = state.messages[index]))
            return;

        message.options = toggleArray(message.options, type);
        const messages = { ...state.messages };
        messages[index] = message;
        onChange('message', messages)
    }

    const selected = findById(state.selected_id);
    return (
        <MessageDisplay
            selected={selected}
            handlePaginate={handlePaginate}
            handleSelection={handleSelection}
            handlePaginate={handlePaginate}
            handleOption={handleOption}
            showOptions={showOptions}
            {...state}
        />
    )
}

export default MessageComp