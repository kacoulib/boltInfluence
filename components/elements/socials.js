import Link from 'next/link';
import Facebook from '../../svg/facebook';
import Instagram from '../../svg/instagram';
import Twitter from '../../svg/twitter';
import Linkedin from '../../svg/linkedin';

const SocialsComp = ({ parent, child, fill, stroke }) => (
    <ul className='socials' style={{ ...parent }}>
        <li className='inline-block' style={{ ...child }}><Link href='https://www.facebook.com/boltinfluence/'><a target='_blank' rel='noopener' title='Bolt social Facebook'><Facebook fill={fill} stroke={stroke} /></a></Link></li>
        <li className='inline-block' style={{ ...child }}><Link href='https://twitter.com/BoltInfluence'><a target='_blank' rel='noopener' title='Bolt social Twitter'><Twitter fill={fill} stroke={stroke} /></a></Link></li>
        <li className='inline-block' style={{ ...child }}><Link href='https://www.linkedin.com/company/bolt-influence/'><a target='_blank' rel='noopener' title='Bolt social Linkedin'><Linkedin fill={fill} stroke={stroke} /></a></Link></li>
        <li className='inline-block' style={{ ...child }}><Link href='https://www.instagram.com/boltinfluence/'><a target='_blank' rel='noopener' title='Bolt social Instagram'><Instagram fill={fill} stroke={stroke} /></a></Link></li>
    </ul>
)

export default SocialsComp