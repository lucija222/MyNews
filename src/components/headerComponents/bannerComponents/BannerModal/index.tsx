import "./BannerModal.scss";
import "../modalInstructions/ModalInstructions.scss";
import { Dispatch, SetStateAction, ChangeEventHandler, useState, MouseEventHandler } from "react";
import { ChromeInstructions, EdgeInstructions, FirefoxInstructions, SafariInstructions, OperaInstructions } from "../modalInstructions/imports";

interface BannerModalProps {
    setIsBannerModalOpen: Dispatch<SetStateAction<boolean>>
}

const BannerModal = ({setIsBannerModalOpen}: BannerModalProps) => {
    const [chosenBrowser, setChosenBrowser] = useState("Chrome");
    const handleBrowserSelection: ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.stopPropagation();
        const target = e.target as HTMLSelectElement;
        setChosenBrowser(target.value);
    };

    const renderCorrectInstructions = () => {
        switch (chosenBrowser) {
            case "Chrome":
                return <ChromeInstructions />;

            case "Edge":
                return <EdgeInstructions />;

            case "Firefox":
                return <FirefoxInstructions />;

            case "Safari":
                return <SafariInstructions />;

            case "Opera":
                return <OperaInstructions />;
        }
    };

    const handleClosingModal: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsBannerModalOpen(false);
    };

    return (
        <div className="banner-modal">
            <div className="banner-modal__content">
            <div>
            <label htmlFor="browsers">Choose your browser:</label>
            <select name="browsers" id="browsers" onChange={handleBrowserSelection}>
                <option value="Chrome">Chrome</option>
                <option value="Edge">Edge</option>
                <option value="Firefox">Firefox</option>
                <option value="Safari">Safari</option>
                <option value="Opera">Opera</option>
            </select>
            </div>

            {renderCorrectInstructions()}

            <button aria-label="Close instructions modal" onClick={handleClosingModal}>CLOSE</button>
            </div>
        </div>
    );
};

export default BannerModal;
