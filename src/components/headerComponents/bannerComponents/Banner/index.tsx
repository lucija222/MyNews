import "./Banner.scss";
import { MouseEventHandler } from "react";

interface BannerProps {
    handleBannerBtnClick: MouseEventHandler<HTMLDivElement>;
}

const Banner = ({ handleBannerBtnClick }: BannerProps) => {
    return (
        <div className="banner-container">
            <div className="banner-grid">
                <h2>Make MyNews your homepage</h2>
                <p>Discover what's trending on the internet every day!</p>
                <div
                    className="banner-grid__btns"
                    onClick={handleBannerBtnClick}
                >
                    <button aria-label="Don't make MyNews homepage">No, thanks</button>
                    <button aria-label="Make MyNews homepage">GET</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
