import { RightArrowSvg } from "../../../../assets/svg/svgImports";

const SafariInstructions = () => {
    return (
        <>
            <ol>
                <li>
                    Choose
                    <b> Safari <RightArrowSvg /> Settings</b>
                    , then click <b>General</b>
                </li>
                <li>
                    In the <b>Homepage field</b>, enter a webpage address. To
                    simply use the webpage you are currently viewing, click
                    <b> Set to Current Page</b>
                </li>
                <li>
                    Choose when your homepage is shown:
                    <ul>
                        <li>
                            Open <i>new windows</i> with your <i>homepage</i>:
                            Click the <b>New windows open with</b> pop-up menu,
                            then choose <b>Homepage</b>
                        </li>
                        <li>
                            Open <i>new tabs</i> with your <i>homepage</i>:
                            Click the <b>New tabs open with</b> pop-up menu,
                            then choose <b>Homepage</b>
                        </li>
                    </ul>
                </li>
            </ol>
            <p>
                If you encounter any problems, please refer to the <a
                    href="https://support.apple.com/guide/safari/change-your-homepage-ibrw1020/mac#:~:text=You%20can%20use%20any%20webpage,window%20or%20a%20new%20tab.&text=In%20the%20Safari%20app%20on,click%20Set%20to%20Current%20Page."
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

export default SafariInstructions;
