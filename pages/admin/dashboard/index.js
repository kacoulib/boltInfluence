import React, { useState, useEffect } from "react";
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
import RequestWrapper from '../../../components/page/requestWrapper';
import { categoryFields, tagsFields, faqsFields, emailTemplateFields } from '../../../components/formElement/fields/admin/posts'
import { customRequest } from '../../../lib/api/http/index';


const CustomerIndex = ({ categories = [], articlesLength, tags = [], faqsLength, email = [] }) => {

    const [state, setState] = useState({
        navTitle: null,
        showMessageView: false,
        showNav: true,
        showSubMenu: false,

        selectedInfluencer: null,

        selectedMarque: null,

        selectedCampagne: null,
        influencers: [],
        selected: null,
        influencers: [],
        datas: null,
        limit: 2,
        offset: 0,
    }),
        addRowNumber = 2;

    const getData = async ({ requestName, limit = 2, offset = 0 } = {}) => {

        const { path, requestProp } = createTopNav(requestName);

        if (!requestName)
            return;
        let tmp = await customRequest({ path: `${path}?limit=${limit}&offset=${offset}` });
        if (tmp && (tmp = tmp[requestProp])) {
            if (onChange) {
                if (typeof tmp == 'Object') {
                    for (const key in tmp) {
                        if (tmp.hasOwnProperty(key)) {
                            const element = tmp[key];
                            onChange("datas", element)
                        }
                    }
                }
                else
                    onChange("datas", tmp)
            }
        }
    }

    const setSelection = id => {
        const selected = state.datas ? state.datas.find((e) => e._id == id) : null;

        onChange('selected', selected)
    }
    const onChange = (name, value) => setState({ ...state, [name]: value })
    const setNavTitle = (value) => value !== state.navTitle && onChange('navTitle', value);
    const resetNav = () => {
        setState({ ...state, datas: null, limit: addRowNumber, offset: 0, selected: null, selectedInfluencer: null, selectedMarque: null, navTitle: null, selectedCampagne: null, showMessageView: false, showNav: true, showSubMenu: false })
    }
    const loadMore = (requestName) => getData({ requestName, limit: state.limit += addRowNumber })
    const createTopNav = (name) => ({ path: `/admin/${name}`, requestProp: name })

    const setElemProps = (title, requestName) => ({
        title,
        setSelection: setSelection,
        selected: state.selected,
        datas: state.datas,
        loadMore: () => loadMore(requestName)
    })
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
            page: <RequestWrapper
                title='Influenceurs'
                path='/admin/dashboard'
                requestProp='dashboard'
                editIdenfier='_id'
                setNavTitle={setNavTitle}

                page={(props) => <Home  {...props} />}
            />
        },
        {
            href: 'account', className: 'icon account', text: 'Influencers', icon: <FeedIcon />,
            requestName: 'influencers',
            page: <Influencers {...setElemProps('Influenceurs', 'influencers')} />
        },
        {
            href: 'publish', className: 'icon feed', text: 'Marques & Agences', icon: <FeedIcon />,
            requestName: 'businesses',

            page: <Marques {...setElemProps('Marques & agences', 'businesses')} />,
        },
        {
            href: 'post-validate', className: 'icon post', text: 'Campagne', icon: <CampagneIcon />,
            requestName: 'campaigns',

            page: <Campagne {...setElemProps('Campagnes', 'campaigns')} />
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
            onChange={onChange}
            getData={getData}
        />
    )
}

export default withLayout(CustomerIndex);
