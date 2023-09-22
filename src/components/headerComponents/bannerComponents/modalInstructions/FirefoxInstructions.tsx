import { HamburgerSvg } from "../../../../assets/svg/svgImports";

const FirefoxInstructions = () => {
    return (
        <>
            <ol>
                <li className="hamburger-li-modal">
                    Click the menu button <HamburgerSvg /> and select
                    <b> Settings</b>
                </li>
                <li>
                    Click the <b>Home</b> panel
                </li>
                <li>
                    Click the menu next to <i>Homepage</i> and
                    <i> new windows</i> and choose to show the <b>custom URLs</b>
                </li>
            </ol>
            <p>
                If you encounter any issues, please refer to the <a
                    href="https://support.mozilla.org/en-US/kb/how-to-set-the-home-page"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <b>support page</b>
                </a>
                .
            </p>
        </>
    );
};

export default FirefoxInstructions;
