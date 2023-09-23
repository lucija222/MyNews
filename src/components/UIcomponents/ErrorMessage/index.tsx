import "./ErrorMessage.scss";

const ErrorMessage = () => {
    return (
        <div className="error-container">
            <div>
                <h1>Oops, something went wrong</h1>
                <p>
                    We apologize for the inconvenience, please reload the page.
                </p>
            </div>
        </div>
    );
};
export default ErrorMessage;
