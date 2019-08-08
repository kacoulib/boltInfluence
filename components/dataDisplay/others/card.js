import { darkOrangeColor, darkBlueColor } from '../../../utils/variables/css'
import Rectangle from '../../../static/img/rectangle.png'

const styles = {
    red: {
        backgroundColor: darkOrangeColor
    },
    blue: {
        backgroundColor: darkBlueColor

    }
}
const CardComp = ({ src, title, color }) => (
    <div className='text-center publicCard'>
        <img src={src || Rectangle} alt={title} />
        <h3 style={styles[color]}>{title}</h3>
    </div>
)

export default CardComp