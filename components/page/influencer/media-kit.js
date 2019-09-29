import Grid from '@material-ui/core/Grid';


const MediaKit = ({ user }) => {
    return (
        <>

            <div className='cover relative card-bg dots-white bottom' style={{ backgroundImage: `url(${user.src})` }}>
                <img src={user.src} />
                <h1><span>{`${user.firstName} ${user.lastName}`}</span></h1>
                <span className='icon write pointer'></span>
            </div>
            <div>
                <h2>Hello, I’m {`${user.firstName} ${user.lastName}`}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat sed elit sceleris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat sed elit scelerisque iaculis. Nullam nec porttitor justo, at iaculis risus. Aliquam erat volutpat. que iaculis. </p>
            </div>
            <div className='red-bg white-color'>

                <Grid container alignItems='center'>
                    <Grid item xs={6}>
                        <div>{user.phone}</div>
                        <div>{user.email}</div>
                    </Grid>
                    <Grid item xs={6}>{user.address}</Grid>
                </Grid>
            </div>
            <div>
                <div>
                    <p>{user.phone}</p>
                    <p>{user.email}</p>
                </div>
                <p>{user.adress}</p>
            </div>
            <div>
                <div>
                    <p>{user.phone}</p>
                    <p>{user.email}</p>
                </div>
                <p>{user.adress}</p>
            </div>
            <style jsx>{`
                .write {
                    position: absolute;
                    top: 1rem;
                    right: 3rem;
                }
                .cover {
                    margin-bottom: 3rem;
                    background-size: cover;
                }
                .cover img {
                    opacity: 0;
                }
                .cover h1 {
                    position: absolute;
                    margin: 0;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    transform: translateY(25%);
                    text-align: center;
                }
                .cover h1 span {
                    background-color: #242B45;
                    color: white;
                    padding: .5rem 1rem;
                }
            `}</style>
        </>
    )
}

export default MediaKit