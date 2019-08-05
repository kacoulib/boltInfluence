import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import withAuth from '../../../lib/withAuth';
import NavPanel from '../../../components/admin/NavPanel';

import PostList from '../../../components/page/posts/list';
import CategoryList from '../../../components/page/posts/categoryList';
import Faq from '../../../components/page/posts/faq';
import CreatePost from '../../../components/page/create-edit';
import { choiceList } from '../../../utils/variables/general'

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
            list: [{ name: 'Marque1', value: 'marque 1' }, { name: 'Marque2', value: 'second marque' }],
        }
    },
    {
        label: "Tags",
        name: "tags",
        type: 'react-select',
        required: true,
        props: {
            list: [{ name: 'Marque1', value: 'marque 1' }, { name: 'Marque2', value: 'second marque' }],
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

const CustomerIndex = () => {
    const navList = [
        { href: 'account', className: 'icon ', text: 'F.A.Q', page: <Faq /> },
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
    ]

    return (
        <div id='admin-article'>
            <NavPanel navList={navList} />
        </div>
    )
}

export default withLayout(CustomerIndex);
