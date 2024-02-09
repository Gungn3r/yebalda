import React from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import axios from '../axios.js';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.warn(err);
                alert('Ошибка при получении заявки');
            });
    }, [id]);

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost />;
    }
    
    return (
        <>
            <Post
                id={data._id}
                action={data.action}
                productName={data.productName}
                user={data.user}
                createdAt={data.createdAt}
                isFullPost
                volume={data.volume}
                priceWithVAT={data.priceWithVAT}
                deliveryBasis={data.deliveryBasis}
                deliveryPlace={data.deliveryPlace}
                counterpartyOption={data.counterpartyOption}
                binIin={data.binIin}
                additionalInfo={data.additionalInfo}
            >
                <ReactMarkdown children={data.text} />
            </Post>
        </>
    );
};
