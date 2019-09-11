
import defaultUserImage from "../../static/img/upload-image.png";
import { FormElementWrapper } from './index'
import { useState } from "react";
import PropTypes from 'prop-types'

const UploadImageComp = ({ name, value, onChange, label, showLabel, props }) => {
    const [state, setState] = useState({
        imageUpdated: false,
        imagePreviewUrl: value || defaultUserImage
    })
    const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setState({ imagePreviewUrl: reader.result, imageUpdated: true });
            onChange && onChange(reader.result)
        };
        if (file)
            reader.readAsDataURL(file);
    }

    let { imagePreviewUrl, imageUpdated } = state;

    if (value && imageUpdated)
        imagePreviewUrl = value;
    return (
        <FormElementWrapper label={label} showLabel={showLabel}>
            <div className="upload-container" {...props}>
                <div className="upload inline-block">
                    <img
                        src={imagePreviewUrl}
                        className="upload-src"
                        alt="..."
                    />
                    <input type="file" name={name} onChange={e => handleImageChange(e)} />
                </div>
                {!showLabel && <h6 className="inline-block">{label}</h6>}
            </div>
        </FormElementWrapper>

    );
}
UploadImageComp.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    showLabel: PropTypes.bool,
    label: PropTypes.string,
}
export default UploadImageComp