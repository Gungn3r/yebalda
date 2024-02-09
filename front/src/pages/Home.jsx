import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post'
import { fetchPosts } from '../redux/slices/posts.js';

export const Home = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.posts);

	const isPostsLoading = posts.status === 'loading';

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	if (isPostsLoading) {
		return [...Array(5)].map((_, index) => <div key={index}>Loading...</div>);
	}

	return (
		<>
			<Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
				<Tab label="Новые" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={12} item>
					{( isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                        isPostsLoading ?  (
                            <Post key={index} isLoading={true} />
                        ) : (
                            <Post
                                id={obj._id}
                                user={obj.user} 
                                productName={obj.productName}
                                volume={obj.volume}
                                priceWithVAT={obj.priceWithVAT}
                                deliveryBasis={obj.deliveryBasis}
                                deliveryPlace={obj.deliveryPlace}
                                counterpartyOption={obj.counterpartyOption}
                                binIin={obj.binIin}
                                createdAt={obj.createdAt}
                            />
                        )

                    )}
				</Grid>
			</Grid>
		</>
	);
};
