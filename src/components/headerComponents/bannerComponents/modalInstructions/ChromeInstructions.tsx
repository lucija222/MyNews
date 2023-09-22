import { RightArrowSvg } from "../../../../assets/svg/svgImports";

const ChromeInstructions = () => {
    return (
        <>
            <ol>
                <li>
                    At the top right of your browser, click <i>More</i>
                    <b> ⋮ <RightArrowSvg /> Settings</b>
                </li>
                <li>
                    Under "<i>Appearance</i>", turn on <b>Show Home button</b>
                </li>
                <li>
                    Below "<i>Show Home button</i>", choose to use the
                    <b> New Tab Page</b> or a <b>custom page</b>
                </li>
            </ol>
            <p>
                If you encounter any issues, please refer to the <a
                    href="https://support.google.com/chrome/answer/95314?hl=en&co=GENIE.Platform%3DDesktop"
                    target="_blank"
                    rel="noopener noreferrer"
                >support page</a>
                .
            </p>
        </>
    );
};

export default ChromeInstructions;
