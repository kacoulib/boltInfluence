
import defaultUserImage from "assets/img/default-avatar.png";

const styles = {
    img: {
        height: '100%'
    }
}

export default class PictureUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUpdated: false,
            imagePreviewUrl: defaultUserImage
        };
    }

    handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ imagePreviewUrl: reader.result, imageUpdated: true });
            this.props.onChange(file)
        };
        if (file)
            reader.readAsDataURL(file);
    }

    render() {
        let { defaultImage, resetImage } = this.props;
        let { imagePreviewUrl, imageUpdated } = this.state;

        if (defaultImage && (!imageUpdated || resetImage))
            imagePreviewUrl = defaultImage;

        return (
            <div className="picture-container">
                <div className="picture">
                    <img
                        src={imagePreviewUrl}
                        className="picture-src"
                        alt="..."
                        style={styles.img}
                    />
                    <input type="file" onChange={e => this.handleImageChange(e)} />
                </div>
                <h6 className="description">{test}</h6>
            </div>
        );
    }
}