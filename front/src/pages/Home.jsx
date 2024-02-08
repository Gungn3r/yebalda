import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
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
					{posts.items.map((obj, index) => {
						return (
							<div key={index}>
								<h2>{obj.productName}</h2>
								<p>Posted by: {obj.user.fullName}</p>
							</div>
						);
					})}
				</Grid>
			</Grid>
		</>
	);
};
