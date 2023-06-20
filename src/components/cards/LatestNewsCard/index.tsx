import "./LatestNewsCard.scss";

interface LatestNewsCardProps {
    timestamp: string;
    title: string;
}

const LatestNewsCard = ({ timestamp, title }: LatestNewsCardProps) => {
    return (
        <article className="latest-news-card">
            <time>{timestamp}</time>
            <h3>{title}</h3>
        </article>
    );
};

export default LatestNewsCard;
