import { Link } from "@material-ui/core";

const BtnComp = ({ href = '#', text, onClick }) => (
    <Link href={`${href}`}><a title='#' className='red-btn bold' onClick={onClick}>{text || 'Contact'}</a></Link>
)

export default BtnComp;