import Dialog from '@material-ui/core/Dialog';

const Index = (props) => (
    <Dialog maxWidth={true} aria-labelledby="simple-dialog-title" open={props.open} id='popup'>
        <div id='subscribe'>
            <div className='close' onClick={props.handleClose} >X</div>
            <div className='content'>
                {props.children}
            </div>
        </div>
        <style jsx>{`
               #subscribe {
                   position: relative;
                   padding: 3rem 0 0;
                   color: white;
                   background-color: #F4F3F8;
                }
                .content {
                    margin: auto;
                    width: 90%;
                }
                .close {
                    position: absolute;
                    top: 0;
                    right: .5rem;
                    font-size: 2rem;
                    cursor: pointer;
                    color: black;
                }

                @media all and (max-width : 400px) {
                    html {
                        overflow: hidden;
                    }
                    #subscribe {
                        padding: 1rem 0;
                    }
                }
            `}</style>
        <style jsx global>{`
                    html, body {
                        overflow: hidden;
                    }
            `}</style>
    </Dialog >
)
export default Index