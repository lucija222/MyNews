import {ElementType} from 'react';

interface StringSlicerProps {
    string: string;
    maxLength: number;
    asHTMLelement: ElementType;
}

const StringSlicer = ({ string, maxLength, asHTMLelement: Tag = "div" }: StringSlicerProps) => {
    const sliceString = (string: string) => {
        if (string.length <= maxLength) {
            return <Tag>{string}</Tag>;
        }

        let slicedString = string.slice(0, maxLength);
        const lastWhiteSpaceIndex = slicedString.lastIndexOf(" ");

        if (lastWhiteSpaceIndex !== -1) {
            slicedString = slicedString.slice(0, lastWhiteSpaceIndex);
        }

        const lastCharacter = slicedString.slice(-1);
        
        if (lastCharacter === (',' || ";" || ":")) {
            slicedString = slicedString.slice(0, -1);
        }

        return `${slicedString.trim()}...`;
    };

    const finalString = sliceString(string);

    return <Tag>{finalString}</Tag>;
};

export default StringSlicer;
