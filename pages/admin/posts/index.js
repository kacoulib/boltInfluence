import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import withAuth from '../../../lib/withAuth';
import NavPanel from '../../../components/admin/NavPanel';

import PostList from '../../../components/page/posts/list';
import CategoryList from '../../../components/page/posts/categoryList';
import Faq from '../../../components/page/posts/faq';
import CreatePost from '../../../components/page/create-edit';
import { choiceList } from '../../../utils/variables/general'
import { customRequest } from '../../../lib/api/http/index';
import { buildFromArray } from '../../../components/form/reactSelect'
import Home from '../../../components/page/home';
import { useRouter } from 'next/router'

const categoryFields = [
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
        label: "Couleur",
        name: "color",
        type: 'color',
        required: true,
        props: {
            margin: "normal",
        }
    },
]


const tagsFields = [
    {
        label: "Titre",
        name: "title",
        type: 'input',
        required: true,
        props: {
            margin: "normal",
        }
    },
]


const CustomerIndex = (props) => {
    const router = useRouter()
    const { categories, articles } = router.query

    const [state, setState] = useState({
        categories: categories, waitingInfluencer: 32300,
        articles: articles, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,

        influencersList: [],
        selectedInfluencer: null
    });
    console.log(state, categories)
    // console.log('props', props)
    // async function getData() {
    //     const { categories } = await customRequest({ path: '/admin/categories' });
    //     // console.log(categories, buildFromArray(categories, 'title', '_id'))
    //     return categories;
    // }
    // getData()
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
                list: [{ label: 'Marque1', value: 'marque 1' }, { label: 'Marque2', value: 'second marque' }],
            }
        },
        {
            label: "Tags",
            name: "tags",
            type: 'react-select',
            required: true,
            props: {
                list: [{ value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },],
            }
        },
        {
            label: "Contenu",
            name: "content",
            type: 'wysiwyg',
            required: true,
            props: {
                list: choiceList,
                required: true,
                margin: "normal",
                variant: "outlined",
            }
        },
    ]

    return (
        <div id='admin-article'>
            <NavPanel navList={[
                {
                    href: 'home', className: 'icon home', text: 'Acceuil', page: <Home
                        datas={
                            [
                                {
                                    title: 'Articles',
                                    card: [{ icon: 'FeedIcon', text: 'Crées', nb: state.articles }]
                                },
                                {
                                    title: 'Catégories',
                                    card: [{ icon: 'AccountIcon', text: 'Crées', nb: state.categories }, { icon: 'TimeIcon', text: 'En attente', nb: state.waitingInfluencer }]
                                },
                                {
                                    title: 'Campagnes',
                                    card: [{ icon: 'PostIcon', text: 'Crées', nb: state.subscribedCampagne }, { icon: 'TimeIcon', text: 'En attente', nb: state.waitingCampagne }]
                                }
                            ]
                        }
                    />
                },
                {
                    href: 'article', className: 'icon photos', text: 'Articles', subMenu: {
                        title: 'Articles', navList: [
                            { href: 'mark', className: 'icon photos', text: 'Créer un article', page: <CreatePost fields={articleFields} path='/admin/articles' /> },
                            { href: 'account', className: 'icon mark', text: 'Liste des articles', page: <PostList fields={articleFields} path='/admin/articles' editIdenfier='slug' /> },
                        ]
                    }
                },
                {
                    href: 'account', className: 'icon mark', text: 'Categories', subMenu: {
                        title: 'Catégories', navList: [
                            { href: 'mark', className: 'icon photos', text: 'Créer un article', page: <CreatePost fields={categoryFields} path='/admin/categories' /> },
                            { href: 'account', className: 'icon mark', text: 'Liste des Catégories', page: <CategoryList fields={categoryFields} path='/admin/categories' editIdenfier='_id' /> },
                        ]
                    }
                },
                {
                    href: 'account', className: 'icon mark', text: 'Tags', subMenu: {
                        title: 'Catégories', navList: [
                            { href: 'mark', className: 'icon photos', text: 'Créer un tag', page: <CreatePost fields={tagsFields} path='/admin/tags' /> },
                            { href: 'account', className: 'icon mark', text: 'Liste des tags', page: <CategoryList fields={tagsFields} path='/admin/tags' editIdenfier='_id' /> },
                        ]
                    }
                },
                { href: 'account', className: 'icon ', text: 'F.A.Q', page: <Faq /> },

            ]} />
        </div>
    )
}

export default withAuth(CustomerIndex);
