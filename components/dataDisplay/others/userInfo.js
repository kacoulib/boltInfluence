import Grid from '@material-ui/core/Grid';
import { Link } from "../../../server/routes/next-routes";


const navList = [
    { label: 'Contact', href: '/contact' },
    { label: 'Connexion', href: '/connexion' },
    { label: 'Paiement', href: '/paiement' },
    { label: 'Tableau de bord ', href: '/dashboard' },
    { label: 'Media kit', href: '/mediaKit' },
    { label: 'Campagnes', href: '/campagnes' },
    { label: 'Notes / Appréciations', href: '/notes' },
]

const NavInfo = ({ color = '' }) => (
    <Grid container item className='user_bio'>
        <Grid item xs={12}>
            <div className={`container ${color == 'red' ? 'red-bg' : ''}`}>
                <div className='text-center'><h3>Information profil</h3></div>
                <ul >
                    {navList.map((elem, index) => (
                        <li>
                            <Link href={elem.href}>{elem.label}</Link>
                        </li>
                    ))}
                </ul>
                <style jsx>{`
            .container.red-bg {
                padding: 1rem;
            }
            li {
                padding: .5rem;
            }
            h3 {
                display: inline-block;
                padding: 1rem 1rem 0;
                border-bottom: 1px solid white;
                margin: auto;
            }
        `}</style>
            </div>
        </Grid>
    </Grid>
)
const UserProfile = ({ name, src, complete = 0 }) => (
    <Grid container item className='text-center'>
        <Grid item xs={12}>
            <h2>{name}</h2>
        </Grid>
        <Grid item xs={12}>
            <div className='img_container'>
                <img src={src} alt={name} />
            </div>
        </Grid>
        <Grid item xs={12}>
            <p>Profil <span className='red-color'>{complete}%</span> Complete</p>
        </Grid>
        <style jsx>{`
            img {
                display: inline-block;
                max-width: 100px;
                border-radius: 50%;
                border: 5px solid #F13F4B;
            }
            h2 {
                color: #F13F4B;
            }
        `}</style>
    </Grid>
)

const fakeUser = {
    name: 'Sam49',
    src: '../../../static/img/user.png',
    complete: 80,
    size: 'small',
    // color: 'red'
}
const UserInfoComp = (props) => {
    const data = { ...fakeUser, ...props };
    const isSmal = data.size == 'small';

    return (
        <Grid container xs={12} alignItems="stretch" justify="center" className={`${isSmal ? 'flex-center' : ''}`}>
            <Grid item xs={isSmal ? 5 : 12}>
                <UserProfile {...data} />
            </Grid>
            <Grid item xs={isSmal ? 7 : 12}>
                <NavInfo color={data.color} />
            </Grid>
        </Grid>
    )
}

export default UserInfoComp