import { Link } from "../../server/routes/next-routes";

const BtnComp = ({ href = '#', title = '#', text, onClick, style }) => (
    <Link href={`${href}`}><a title={title} className='red-btn bold' onClick={onClick} style={style}>{text || 'Contact'}</a></Link>
)
const BtnChild = ({ href = '#', title = '#', children, onClick, style }) => (
    <Link href={`${href}`}><a title={title} className='red-btn bold' onClick={onClick} style={style}>
        {children || 'Contact'}
    </a></Link>
)

export default BtnComp;
export { BtnChild }