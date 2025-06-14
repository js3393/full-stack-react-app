import { useParams, useLoaderData } from 'react-router-dom';
import articles from '../article-content';

export default function ArticlePage() {
    const { name } = useParams();
    const { upvotes, comments } = useLoaderData();

    const article = articles.find(article => article.name === name);

    return ( 
        <>
        <h1>{article.title}</h1>
        <p>This article has {upvotes} upvotes!
            
        </p>
        {article.content.map(p => <p key= {p}> {p}</p>)}
        </>  
    );
}