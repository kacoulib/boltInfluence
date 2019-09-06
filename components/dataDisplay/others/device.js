import BlackIphone from '../../../static/img/black-iphone.png'
import WhiteIphone from '../../../static/img/white-iphone-rotate.png'
import Video from '../../../components/elements/video'


const IphoneComp = ({ deviceColor = 'white', src, title, autoplay = true }) => (
    <div className='iphone_container'>
        <div>
            {src.includes('.mp4') ?
                <Video autoplay={autoplay} src={src} title={title} />
                :
                <img src={src} title={title} />
            }
        </div>

        <img src={deviceColor == 'white' ? WhiteIphone : BlackIphone} />
    </div>
)
export { IphoneComp }