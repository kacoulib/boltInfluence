import { Link } from "../../server/routes/next-routes";

const BtnComp = ({ href = '#', text, onClick, style }) => (
    <Link href={`${href}`}><a title='#' className='red-btn bold' onClick={onClick} style={style}>{text || 'Contact'}</a></Link>
)

export default BtnComp;