import { Link } from "@material-ui/core";

const BtnComp = ({ text, onClick }) => (
    <Link href='#'><a title='#' className='red-btn bold' onClick={onClick}>{text || 'Contact'}</a></Link>
)

export default BtnComp;