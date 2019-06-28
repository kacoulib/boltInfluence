import Slick from "react-slick";

const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const Slider = (props) => {
    const settings = Object.assign(defaultSettings, { ...props.settings });

    return (
        <Slick>
            {props.children}
        </Slick>
    )
}

export default Slider;
