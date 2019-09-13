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

export { categoryFields, tagsFields, faqsFields, emailTemplateFields }