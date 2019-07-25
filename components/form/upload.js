
import defaultUserImage from "../../static/img/upload-image.png";

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
        let { defaultImage, resetImage, label } = this.props;
        let { imagePreviewUrl, imageUpdated } = this.state;

        if (defaultImage && (!imageUpdated || resetImage))
            imagePreviewUrl = defaultImage;

        return (
            <div className="upload-container">
                <div className="upload inline-block">
                    <img
                        src={imagePreviewUrl}
                        className="upload-src"
                        alt="..."
                    />
                    <input type="file" onChange={e => this.handleImageChange(e)} />
                </div>
                <h6 className="inline-block">{label}</h6>
            </div>
        );
    }
}