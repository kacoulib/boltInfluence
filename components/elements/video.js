
const YoutubeWrapper = ({ id, props }) => {
    let params = '',
        excludes = ['width', 'height', 'src', 'allowfullscreen', 'autoplay'];

    Object.keys(props).map(e => params += props[e] && e != 'width' && e != 'height' ? `&${e}=1` : '');
    const args = Object.keys(props);
    for (let index = 0, argsLength = args.length; index < argsLength; index++) {
        const elem = args[index];
        if (props[elem] && !excludes.includes(elem)) {
            params += `&${elem}=1`;
            if (elem == 'loop' && props.src)
                params += `&playlist=${id}`
        }
    }
    props.src = 'https://www.youtube.com/embed/' + id + '?rel=0' + params;
    return (
        <iframe {...props} frameborder="0"></iframe>
    )
};

const getYoutubeVideoID = (src) => {
    let video_id,
        ampersandPosition;

    if (!(video_id = src.split('v=')[1]))
        return (null);

    ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
}
const VideoComp = ({ src, controls = true, autoplay = true, loop = true, modestbranding = true, allowfullscreen = true, width, height }) => {
    let props = { src, controls, autoplay, loop, modestbranding: true, allowfullscreen: false, width, height };

    if (src.includes('youtube.com'))
        return <YoutubeWrapper id={getYoutubeVideoID(src)} props={props} />
    return (
        <video {...props} ></video>
    )
}

export default VideoComp;