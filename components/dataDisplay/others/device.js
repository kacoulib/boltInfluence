import BlackIphone from '../../../static/img/black-iphone.png'
import WhiteIphone from '../../../static/img/white-iphone.png'
import WhiteTrendingIphone from '../../../static/img/white-trending-iphone.png'
import WhiteTablet from '../../../static/img/white-tablet.png'
import Video from '../../../components/elements/video'


const DeviseComp = (props) => {
    const { src, title, autoplay, deviceType } = props
    return (
        <div className={`${deviceType == 'tablet' ? 'tablet_container' : 'iphone_container'} ${props.extendClass ? props.extendClass : ''}`}>
            <div>
                {src.includes('.mp4') ?
                    <Video autoplay={autoplay} src={src} title={title} {...props} />
                    :
                    <img src={src} title={title} />
                }
            </div>
            {props.children}
        </div>
    )
}

const IphoneComp = (props) => {
    let src, extendClass = null;

    if (props.deviceColor == 'white')
        src = WhiteIphone;
    else if (props.deviceColor == 'white-trending') {
        extendClass = 'white-trending-iphone';
        src = WhiteTrendingIphone;
    }
    else
        src = BlackIphone;

    if (!extendClass && props.deviceColor.includes('white'))
        extendClass = 'white-iphone';

    return (
        <DeviseComp {...props} extendClass={extendClass}>
            <img src={src} />
        </DeviseComp>
    )
}

const TabletComp = (props) => (
    <DeviseComp {...props} deviceType='tablet'>
        <img src={WhiteTablet} />
    </DeviseComp>
)
export { IphoneComp, TabletComp }