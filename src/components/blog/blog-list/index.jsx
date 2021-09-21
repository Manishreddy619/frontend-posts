import React, { Component, useState } from 'react';

import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import BlogItem from '../blog-item';
import posts from '../../../data/posts.json';
import EditModal from './EditModal';
const BlogList = () => {
	// state = {
	// 	data: [],
	// };
	const [data, setData] = useState([]);

	const getPosts = async () => {
		try {
			const apiResp = await fetch('http://localhost:3002/blogPosts');
			if (apiResp.ok) {
				let bookList = await apiResp.json();
				return bookList;
			} else if (apiResp.status > 400 && apiResp.status < 500) {
				throw new Error('Client Side Error');
			} else if (apiResp.status > 500) {
				throw new Error('Server Side Error');
			}
		} catch (err) {
			throw err;
		}
	};
	const deletePosts = async (id) => {
		try {
			const apiResp = await fetch(
				'http://localhost:3002/blogPosts/' + id,

				{
					method: 'DELETE',
				},
			);
			if (apiResp.ok) {
				return `has been successfuly deleted`;
			} else if (apiResp.status > 400 && apiResp.status < 500) {
				throw new Error('Client Side Error');
			} else if (apiResp.status > 500) {
				throw new Error('Server Side Error');
			}
		} catch (err) {
			throw err;
		}
	};
	const updatePost = async (id, postData) => {
		try {
			const apiResp = await fetch('http://localhost:3002/blogPosts/' + id, {
				method: 'PUT',
				body: JSON.stringify(postData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (apiResp.ok) {
				let updatedPost = await apiResp.json();
				return updatedPost;
			} else if (apiResp.status > 400 && apiResp.status < 500) {
				throw new Error('Client Side Error');
			} else if (apiResp.status > 500) {
				throw new Error('Server Side Error');
			}
		} catch (err) {
			throw err;
		}
	};

	getPosts().then((data) => setData(data));
	return (
		<>
			<Row>
				{posts.map((post) => (
					<Col md={4} style={{ marginBottom: 50 }}>
						<BlogItem key={post.title} {...post} />
					</Col>
				))}
			</Row>
			<Row>
				{data.map((post) => (
					<Col md={4} style={{ marginBottom: 50 }}>
						<BlogItem key={post.title} {...post} />
						<Button key={post._id} onClick={() => deletePosts(post._id)}>
							Delete
						</Button>
						{/* <Button
								style={{ marginLeft: '20px' }}
								key={post.title}
								onClick={() => this.deletePosts(post._id)}>
								update
							</Button> */}
						<EditModal id={post._id} posts={getPosts} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default BlogList;
