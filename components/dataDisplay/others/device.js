import BlackIphone from '../../../static/img/black-iphone.png'
import WhiteIphone from '../../../static/img/white-iphone.png'
import WhiteTrendingIphone from '../../../static/img/white-trending-iphone.png'
import WhiteTablet from '../../../static/img/white-tablet.png'
import Video from '../../../components/elements/video'


const DeviseComp = (props) => {
    const { src, title, autoplay } = props
    return (
        <div className={`iphone_container ${props.extendClass}`}>
            <div>
                {src.includes('.mp4') ?
                    <Video autoplay={autoplay} src={src} title={title} />
                    :
                    <img src={src} title={title} />
                }
            </div>
            {props.children}
        </div>
    )
}

const IphoneComp = (props) => {
    let src, extendClass;

    if (props.deviceColor == 'white')
        src = WhiteIphone;
    else if (props.deviceColor == 'white-trending')
        src = WhiteTrendingIphone;
    else
        src = BlackIphone;

    extendClass = props.deviceColor.includes('white') ? 'white-iphone' : '';

    return (
        <DeviseComp {...props} extendClass={extendClass}>
            <img src={src} />
        </DeviseComp>
    )
}

const TabletComp = (props) => (
    <DeviseComp {...props}>
        <img src={WhiteTablet} />
    </DeviseComp>
)
export { IphoneComp, TabletComp }