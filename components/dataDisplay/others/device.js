import BlackIphone from '../../../static/img/black-iphone.png'
import WhiteIphone from '../../../static/img/white-iphone.png'
import WhiteTablet from '../../../static/img/white-tablet.png'
import Video from '../../../components/elements/video'


const DeviseComp = (props) => {
    const { src, title, autoplay } = props
    return (
        <div className='iphone_container'>
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

const IphoneComp = (props) => (
    <DeviseComp {...props}>
        <img src={props.deviceColor == 'white' ? WhiteIphone : BlackIphone} />
    </DeviseComp>
)

const TabletComp = (props) => (
    <DeviseComp {...props}>
        <img src={WhiteTablet} />
    </DeviseComp>
)
export { IphoneComp, TabletComp }