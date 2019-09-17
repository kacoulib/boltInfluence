import React, { useState } from "react";
import withLayout from '../../../lib/withLayout';
import NavPanel from '../../../components/admin/NavPanel';

import Home from '../../../components/page/dashboard/index';
import Influencers from '../../../components/page/dashboard/influencers';
import Marques from '../../../components/page/dashboard/marques';
import Campagne from '../../../components/page/dashboard/campagne';
import HomeIcon from '../../../static/img/icon/home.svg';
import FeedIcon from '../../../static/img/icon/feed.svg';
import CampagneIcon from '../../../static/img/icon/campagne.svg';
import { buildFromArray } from '../../../utils/datas/convert'
import PostList from '../../../components/page/posts/list';
import CategoryList from '../../../components/page/posts/categoryList';
import CreatePost from '../../../components/page/create-edit';
import { categoryFields, tagsFields, faqsFields, emailTemplateFields } from '../../../components/formElement/fields/admin/posts'
import { customRequest } from '../../../lib/api/http/index';



const CustomerIndex = ({ categories = [], articlesLength, tags = [], faqsLength, email = [] }) => {

    const [state, setState] = useState({
        navTitle: null,
        showMessageView: false,
        showNav: true,
        showSubMenu: false,
        subscribedInfluencer: 22300, waitingInfluencer: 32300,
        subscribedMarque: 18068, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,

        influencersList: [{ _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },],
        selectedInfluencer: null,

        marquesList: [{ _id: '5483752', isActif: true, firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },],
        selectedMarque: null,

        campagnesList: [{
            _id: '5483752',
            isActif: true,
            name: 'Campagne Naked blushed ',
            agence: 'Sephora',
            picture: 'influencer_jones.png',
            email: 'Sam.jones@gmail.com',
            phone: '09764314',
            star: 4,
            status: 'Inscrit',
            propositions: [
                { _id: '5483752', role: 'Créateur', firstName: 'Sam', lastName: 'Jones', status: 'Brouillon', delivery: '2', total: '4', price: '800€' },
                { _id: '5483753', role: 'Créateur', firstName: 'Sam', lastName: 'Jones', status: 'Brouillon', delivery: '2', total: '4', price: '800€' },
                { _id: '5483754', role: 'Créateur', firstName: 'Sam', lastName: 'Jones', status: 'Brouillon', delivery: '2', total: '4', price: '800€' },
            ],
            influencers: [
                { _id: '5483755', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', date: '05-08-2019' }
            ]
        },],
        selectedCampagne: null,
        influencers: [],
        selected: null,
        offset: 0,
        limit: 2,
    });
    const getDatas = async (path, dataKey, setDatas) => {
        console.log(path)
        const data = await customRequest({ path });
        setDatas(data[dataKey])
    }
    const loadMore = (name) => () => {
        // const tmp = state[name].push({ _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'En attente de confirmation' },
        //     { _id: '5483752', bio: 'sdfsdfdsf', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },
        // )
        // setState(Object.assign({}, state, { [name]: state[name] }))
        // setState({ ...state, limit: 4, offset: 4 })
        // console.log('more', state)
        // return (fn) => { }
    }

    const selectInfluencer = (id) => {
        const elem = state.influencersList.find((e) => e._id == id);
        setState(Object.assign({}, state, { selectedInfluencer: elem }))
    }

    const setSelection = name => id => {
        const elem = state[name] ? state[name].find((e) => e._id == id) : null;
        const e = {
            influencers: 'selectedInfluencer',
            marquesList: 'selectedMarque',
            campagnesList: 'selectedCampagne',
        }
        setState({ ...state, [e[name]]: elem })
    }

    const onChange = (name, value) => setState({ ...state, [name]: value })
    const setNavTitle = (value) => value !== state.navTitle && onChange('navTitle', value);
    const resetNav = () => {
        setState({ ...state, selectedInfluencer: null, selectedMarque: null, navTitle: null, selectedCampagne: null, showMessageView: false, showNav: true, showSubMenu: false })
    }
    const articleFields = [
        {
            label: "Poster / image",
            name: "picture",
            type: 'upload',
            required: true,
            width: 12,
        },
        {
            label: "Titre",
            name: "title",
            type: 'input',
            required: true,
            props: {
                margin: "normal",
            }
        },
        {
            label: "Catégories",
            name: "categories",
            type: 'react-select',
            required: true,
            props: {
                list: buildFromArray(categories, 'title', '_id'),
            }
        },
        {
            label: "Tags",
            name: "tags",
            type: 'react-select',
            required: true,
            props: {
                list: buildFromArray(tags, 'title', '_id'),
            }
        },
        {
            label: "Contenu",
            name: "content",
            type: 'wysiwyg',
            required: true,
            props: {
                margin: "normal",
                variant: "outlined",
            }
        },
    ]

    const navList = [
        {
            href: 'home', className: 'icon home', text: 'Acceuil',
            icon: <HomeIcon />,
            page: <Home
                datas={{
                    subscribedInfluencer: state.subscribedInfluencer, waitingInfluencer: state.waitingInfluencer,
                    subscribedMarque: state.subscribedMarque, waitingMarque: state.waitingMarque,
                    subscribedCampagne: state.subscribedCampagne, waitingCampagne: state.waitingCampagne,
                }}
            />
        },
        {
            href: 'account', className: 'icon account', text: 'Influencers',
            icon: <FeedIcon />,
            page: <Influencers
                datas={state.influencers}
                selected={state.selectedInfluencer}
                loadMore={loadMore('influencersList')}
                selectInfluencer={selectInfluencer}
                setNavTitle={setNavTitle}
                setDatas={(datas) => onChange('influencers', datas)}
                setSelection={setSelection('influencers')}

                title='Influenceurs'
                getDatas={() => getDatas(`/admin/influencers?limit=${state.limit}&offset=${state.offset}`, 'influencers', (datas) => onChange('influencers', datas))}
            />,
        },
        {
            href: 'publish', className: 'icon feed', text: 'Marques & Agences',
            icon: <FeedIcon />,
            page: <Marques
                datas={state.marquesList}
                setSelection={setSelection('marquesList')}
                loadMore={loadMore('marquesList')}
                selectedElem={state.selectedMarque}
                setNavTitle={setNavTitle}

                setDatas={(datas) => onChange('influencers', datas)}
                setSelection={setSelection('influencers')}

                path='/admin/influencers'
                title='Influenceurs'
            />,
        },
        {
            href: 'post-validate', className: 'icon post', text: 'Campagne',
            icon: <CampagneIcon />,
            page: <Campagne
                datas={state.campagnesList}
                setSelection={setSelection('campagnesList')}
                loadMore={loadMore('campagnesList')}
                selectedElem={state.selectedCampagne}
                setNavTitle={setNavTitle}
                showMessageView={state.showMessageView}
                toggleMessageView={() => onChange('showMessageView', true)}
                setShowNav={() => state.showNav && onChange('showNav', false)}
            />,
        },
        {
            href: 'article', className: 'icon photos', text: 'Articles', subMenu: {
                title: 'Articles', navList: [
                    { href: 'mark', className: 'icon photos', text: 'Créer un article', page: <CreatePost fields={articleFields} setNavTitle={setNavTitle} title="Créer un article" path='/admin/articles' /> },
                    {
                        href: 'account', className: 'icon mark', text: 'Liste des articles', page: <PostList
                            fields={articleFields}
                            path='/admin/articles'
                            requestProp='articles'
                            editIdenfier='slug'
                            setNavTitle={setNavTitle}
                        />
                    },
                ]
            }
        },
        {
            href: 'account', className: 'icon mark', text: 'Categories', subMenu: {
                title: 'Catégories', navList: [
                    { href: 'mark', className: 'icon photos', text: 'Créer un article', page: <CreatePost fields={categoryFields} setNavTitle={setNavTitle} title="Créer un article" path='/admin/categories' /> },
                    {
                        href: 'account', className: 'icon mark', text: 'Liste des Catégories', page: <CategoryList
                            fields={categoryFields}
                            path='/admin/categories'
                            editIdenfier='_id'
                            title='Liste des catégories'
                            editTitle='Liste des catégories'
                            requestProp='categories'
                        />
                    },
                ]
            }
        },
        {
            href: 'account', className: 'icon mark', text: 'Tags', subMenu: {
                title: 'Tags', navList: [
                    { href: 'mark', className: 'icon photos', text: 'Créer un tag', page: <CreatePost setNavTitle={setNavTitle} title="Créer un article" fields={tagsFields} path='/admin/tags' /> },
                    {
                        href: 'account', className: 'icon mark', text: 'Liste des tags', page: <CategoryList
                            fields={tagsFields}
                            path='/admin/tags'
                            editIdenfier='_id'
                            showImg={false}
                            title='Liste des tags'
                            requestProp='tags'
                        />
                    },
                ]
            }
        },
        {
            href: 'account', className: 'icon mark', text: 'F.A.Q', subMenu: {
                title: 'F.A.Q', navList: [
                    { href: 'mark', className: 'icon photos', text: 'Créer un tag', page: <CreatePost setNavTitle={setNavTitle} fields={faqsFields} path='/admin/faqs' /> },
                    {
                        href: 'account', className: 'icon mark', text: 'Liste des tags', page: <CategoryList
                            fields={faqsFields}
                            path='/admin/faqs'
                            editIdenfier='_id'
                            showImg={false}
                            title='Liste des F.A.Q'
                            requestProp='faqs'
                        />
                    },
                ]
            }
        },
        {
            href: 'account', className: 'icon mark', text: 'Email', subMenu: {
                title: 'Email', navList: [
                    { href: 'mark', className: 'icon photos', text: 'Créer un tag', page: <CreatePost fields={emailTemplateFields} path='/admin/emailtemplate' /> },
                    {
                        href: 'account', className: 'icon mark', text: 'Liste des tags', page: <CategoryList
                            fields={emailTemplateFields}
                            path='/admin/emailtemplates'
                            editIdenfier='_id'
                            titleIdentifier='name'
                            showImg={false}
                            title="Liste des templates d'email"
                            requestProp='templates'
                        />
                    },
                ]
            }
        },
    ]

    return (
        <NavPanel
            topTitleLeft='Admin'
            navTitle={state.navTitle}
            navList={navList}
            index={0}
            showSubMenu={state.showSubMenu}
            resetNav={resetNav}
            showNav={state.showNav}
        />
    )
}

export default withLayout(CustomerIndex);
