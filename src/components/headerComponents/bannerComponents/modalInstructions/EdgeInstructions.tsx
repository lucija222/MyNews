import { RightArrowSvg, SettingsSvg } from "../../../../assets/svg/svgImports";

const EdgeInstructions = () => {
    return (
        <>
            <ol>
                <li className="settings-li-modal">
                    Select
                    <b> Settings and More . . . <RightArrowSvg /> Settings <SettingsSvg /></b>
                </li>
                <li>
                    Select <b>Appearance</b>
                </li>
                <li>
                    Turn on <b>Show Home</b> button
                </li>
                <li>
                    You can either choose <b>New tab page</b> or select
                    <b> Enter URL</b> for a page that you want to use as your
                    home page
                </li>
            </ol>
            <p>
                If you encounter any issues, please refer to the <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/change-your-browser-home-page-a531e1b8-ed54-d057-0262-cc5983a065c6"
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

export default EdgeInstructions;
