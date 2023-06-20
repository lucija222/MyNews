import './NewsCard.scss';

interface NewsCardProps {
    imgSrc: string,
    categoryName: string,
    title: string,
    author?: string
}

const NewsCard = ({imgSrc, categoryName, title, author}: NewsCardProps) => {

    return (
        <article className='news-card'>
            <img src={imgSrc} alt="Article image" />
            <p>{categoryName}</p>
            <h3>{title}</h3>
            {author && <p>{author}</p>}
        </article>
    );
};

export default NewsCard;