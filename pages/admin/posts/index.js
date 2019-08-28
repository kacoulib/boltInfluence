import React, { useState, useEffect } from "react";
import withAuth from '../../../lib/withAuth';
import NavPanel from '../../../components/admin/NavPanel';

import PostList from '../../../components/page/posts/list';
import CategoryList from '../../../components/page/posts/categoryList';
import Faq from '../../../components/page/posts/faq';
import CreatePost from '../../../components/page/create-edit';
import { customRequest } from '../../../lib/api/http/index';
import { buildFromArray } from '../../../utils/datas/convert'
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

const faqsFields = [
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
        label: "Contenu",
        name: "content",
        type: 'wysiwyg',
        required: true,
        props: {
            margin: "normal",
            variant: "outlined",
        }
    }
]

const emailTemplateFields = [
    {
        label: "Name",
        name: "name",
        type: 'input',
        required: true,
        props: {
            margin: "normal",
        }
    },
    {
        label: "Subject",
        name: "subject",
        type: 'input',
        required: true,
        props: {
            margin: "normal",
        }
    },
    {
        label: "Message",
        name: "message",
        type: 'wysiwyg',
        required: true,
        props: {
            margin: "normal",
            variant: "outlined",
        }
    }
]


const CustomerIndex = ({ categories = [], articlesLength, tags = [], faqsLength, email = [] }) => {
    // // const router = useRouter()
    // const { categories = [], articlesLength = 0, tags = [], faqsLength = 0, email = [] } = {}
    const router = useRouter()
    // const { categories, articlesLength, tags, faqsLength, email = [] } = router.query

    const [state, setState] = useState({
        categories,
        articlesLength,
        tags,
        email,
        faqsLength,

        influencersList: [],
        selectedInfluencer: null
    });
    console.log('---', router.query)
    // console.log(state, buildFromArray(categories))
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

    return (
        <div id='admin-article'>
            <NavPanel navList={[
                {
                    href: 'home', className: 'icon home', text: 'Acceuil', page: <Home
                        datas={
                            [
                                {
                                    title: 'Articles',
                                    card: [{ icon: 'FeedIcon', text: 'Crées', nb: state.articlesLength }]
                                },
                                {
                                    title: 'Catégories',
                                    card: [{ icon: 'AccountIcon', text: 'Crées', nb: state.categories.length }]
                                },
                                {
                                    title: 'Tags',
                                    card: [{ icon: 'PostIcon', text: 'Crées', nb: state.tags.length }]
                                },
                                {
                                    title: 'FAQs',
                                    card: [{ icon: 'PostIcon', text: 'Crées', nb: state.faqsLength }]
                                },
                                {
                                    title: 'Email',
                                    card: [{ icon: 'PostIcon', text: 'Crées', nb: state.email.length }]
                                }
                            ]
                        }
                    />
                },
                {
                    href: 'article', className: 'icon photos', text: 'Articles', subMenu: {
                        title: 'Articles', navList: [
                            { href: 'mark', className: 'icon photos', text: 'Créer un article', page: <CreatePost fields={articleFields} path='/admin/articles' /> },
                            {
                                href: 'account', className: 'icon mark', text: 'Liste des articles', page: <PostList
                                    fields={articleFields}
                                    path='/admin/articles'
                                    requestProp='articles'
                                    editIdenfier='slug'
                                />
                            },
                        ]
                    }
                },
                {
                    href: 'account', className: 'icon mark', text: 'Categories', subMenu: {
                        title: 'Catégories', navList: [
                            { href: 'mark', className: 'icon photos', text: 'Créer un article', page: <CreatePost fields={categoryFields} path='/admin/categories' /> },
                            {
                                href: 'account', className: 'icon mark', text: 'Liste des Catégories', page: <CategoryList
                                    fields={categoryFields}
                                    path='/admin/categories'
                                    editIdenfier='_id'
                                    title='Liste des catégories'
                                    requestProp='categories'
                                />
                            },
                        ]
                    }
                },
                {
                    href: 'account', className: 'icon mark', text: 'Tags', subMenu: {
                        title: 'Tags', navList: [
                            { href: 'mark', className: 'icon photos', text: 'Créer un tag', page: <CreatePost fields={tagsFields} path='/admin/tags' /> },
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
                            { href: 'mark', className: 'icon photos', text: 'Créer un tag', page: <CreatePost fields={faqsFields} path='/admin/faqs' /> },
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
                // { href: 'account', className: 'icon ', text: 'F.A.Q', page: <Faq /> },

            ]} />
        </div>
    )
}
CustomerIndex.getInitialProps = async ({ query, req }) => {
    let data;
    try {
        data = await customRequest({ path: '/admin/posts' });

    } catch (err) {
        console.log('err', err)
    }
    return data
}

export default withAuth(CustomerIndex, { adminRequired: true });
