import "./WidgetCard.scss";

interface WidgetCardProps {
    timestamp: string;
    title: string;
}

const WidgetCard = ({ timestamp, title }: WidgetCardProps) => {
    return (
        <>
            <time>{timestamp}</time>
            <h3>{title}</h3>
        </>
    );
};

export default WidgetCard;
