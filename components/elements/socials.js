import Link from 'next/link';
import Facebook from '../../svg/facebook';
import Instagram from '../../svg/instagram';
import Twitter from '../../svg/twitter';
import Linkedin from '../../svg/linkedin';

const Socials = ({ parent, child, fill, stroke }) => (
    <ul id='socials' style={{ ...parent }}>
        <li className='inline-block' style={{ ...child }}><Link href='#'><a><Facebook fill={fill} stroke={stroke} /></a></Link></li>
        <li className='inline-block' style={{ ...child }}><Link href='#'><a><Twitter fill={fill} stroke={stroke} /></a></Link></li>
        <li className='inline-block' style={{ ...child }}><Link href='#'><a><Linkedin fill={fill} stroke={stroke} /></a></Link></li>
        <li className='inline-block' style={{ ...child }}><Link href='#'><a><Instagram fill={fill} stroke={stroke} /></a></Link></li>
    </ul>
)

export default Socials