import "./Loader.scss";

interface LoaderProps {
    cardClass: "category-card" | "widget-card";
}

const Loader = ({ cardClass }: LoaderProps) => {
    return (
        <div className={`loader-container ${cardClass}-loader`}>
            <div className="loader-backgroud">
                <div className="lds-default">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};
export default Loader;
