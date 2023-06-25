import { nytAPI_Key } from "../../util/helpers/constants";
import InfiniteScroller from "../InfiniteScroller";
import "./LatestNewsWidget.scss";

const LatestNewsWidget = () => {
    //Change limit and offset later
    const nytAPI_URL = `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=10&offset=0&api-key=${nytAPI_Key}`;

    return (
        <section className="widget-container">
            <div className="latest-heading-container">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        opacity="0.24"
                        cx="10"
                        cy="10"
                        r="10"
                        fill="#BB1E1E"
                    />
                    <circle cx="10" cy="10" r="5" fill="#BB1E1E" />
                </svg>
                <h2>Latest news</h2>
            </div>
            <InfiniteScroller URL={nytAPI_URL} cardClass="widget-card" containerName="widget-scroller_container"/>
            <div className="see-all-news">
                <button>See all news</button>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.4802 0.45193C4.29996 0.271688 4.00773 0.271688 3.82749 0.45193L3.33795 0.941466C3.15771 1.12171 3.15771 1.41394 3.33795 1.59418L7.66251 5.91874C7.70757 5.9638 7.70757 6.03686 7.66251 6.08192L3.33828 10.4061C3.15804 10.5864 3.15804 10.8786 3.33828 11.0589L3.82749 11.5481C4.00773 11.7283 4.29996 11.7283 4.4802 11.5481L9.37556 6.65271C9.73604 6.29223 9.73604 5.70777 9.37556 5.34729L4.4802 0.45193Z"
                        fill="#1D1D1B"
                    />
                </svg>
            </div>
        </section>
    );
};

export default LatestNewsWidget;
