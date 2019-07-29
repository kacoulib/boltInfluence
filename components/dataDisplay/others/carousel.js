import Slider from "react-slick";

const styles = {
    container: {
        width: '100%'
    }
}
var defaultSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
};
const CarouselComp = (props) => {
    const tmp = { ...defaultSettings, ...props.settings };

    return (
        <div style={styles.container}>
            <Slider {...tmp}>{props.children}</Slider>
        </div>
    )
}

export default CarouselComp