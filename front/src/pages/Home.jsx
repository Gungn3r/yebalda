import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { fetchPosts } from '../redux/slices/posts.js';

export const Home = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
    console.log(posts)
    const isPostsLoading = posts.status === 'loading';

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const renderPosts = () => {
        console.log("Rendering posts:", posts.items);
        if (isPostsLoading) {
            return [...Array(5)].map((_, index) => <div key={index}>Loading...</div>);
        }
    
        return posts.items.map((obj, index) => {
            console.log(obj);
            return (
                <div key={index}>
                    <h2>{obj.productName}</h2>
                    <p>Posted by: {obj.user.fullName}</p>
                </div>
            );  
        });
    };

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="Новые" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={12} item>
                    {renderPosts()}
                </Grid>
            </Grid>
        </>
    );
};
