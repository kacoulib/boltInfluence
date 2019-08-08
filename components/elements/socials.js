import Link from 'next/link';
import Facebook from '../../svg/facebook';
import Instagram from '../../svg/instagram';
import Twitter from '../../svg/twitter';
import Linkedin from '../../svg/linkedin';

const SocialsComp = ({ parent, child, fill, stroke }) => (
    <ul id='socials' style={{ ...parent }}>
        <li className='inline-block' style={{ ...child }}><Link href='#'><a title='Facebook'><Facebook fill={fill} stroke={stroke} /></a></Link></li>
        <li className='inline-block' style={{ ...child }}><Link href='#'><a title='Twitter'><Twitter fill={fill} stroke={stroke} /></a></Link></li>
        <li className='inline-block' style={{ ...child }}><Link href='#'><a title='Linkedin'><Linkedin fill={fill} stroke={stroke} /></a></Link></li>
        <li className='inline-block' style={{ ...child }}><Link href='#'><a title='Instagram'><Instagram fill={fill} stroke={stroke} /></a></Link></li>
    </ul>
)

export default SocialsComp