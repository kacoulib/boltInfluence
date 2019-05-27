const publicMenu = [
    {
        text: 'Marques / Agences',
        href: '/public/agences'
    },
    {
        text: 'Influenceurs',
        href: '/public/influenceurs'
    },
    {
        text: 'La video au service de l\'influence marketing',
        href: '/public/video'
    },
    {
        text: 'Comment travaillons nous ?',
        href: '/public/how-we-work'
    },
    {
        text: 'Contactez-nous',
        href: '/public/contact'
    },
]

const optionsMenuCustomer = [
    {
        text: 'Dashboard',
        href: '/',
    },
    {
        text: 'Log out',
        href: '/logout',
    },
];

const optionsMenuAdmin = [
    {
        text: 'Admin',
        href: '/admin',
    },
    {
        text: 'Log out',
        href: '/logout',
    },
];


const influencerMenu = [
    {
        text: 'Inbox',
        href: '/admin',
    },
    {
        text: 'Starred',
        href: '/logout',
    },
    {
        text: 'Send email',
        href: '/logout',
    },
    {
        text: 'Drafts',
        href: '/logout',
    },
];

export {
    publicMenu,
    optionsMenuAdmin,
    optionsMenuCustomer,
    influencerMenu
}