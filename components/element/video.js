const styles = {
    position: 'absolute',
    zIndex: '5',
}

const Video = ({ src, style = { width: '100%' }, controls = true, type = "video/mp4" }) => (
    <video controls={controls} style={style}>
        <source src={src} type={type} />
        <p>Votre navigateur ne prend pas en charge les vidéos HTML5. Voici <a href={src}>un lien pour télécharger la vidéo</a>.</p>
        <div style={styles}>
            <p>Content above your video</p>
        </div>
    </video>
)

export default Video;
