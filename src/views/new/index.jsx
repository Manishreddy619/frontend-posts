import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import './styles.css';
const NewBlogPost = () => {
	const [cover, setcover] = useState(null);
	const [avatar, setavatar] = useState(null);
	const [content, setcontent] = useState('');
	const [title, setTitle] = useState('');
	const [category, setcategory] = useState('');
	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();

			formData.append('profilepic', cover);
			formData.append('title', title);
			formData.append('category', category);
			formData.append('profilepic', avatar);
			formData.append('content', content);

			const response = await fetch(process.env.REACT_APP_API_URL, {
				method: 'POST',
				body: formData,
			});
			if (response.ok) {
				console.log('hello');
				// props.fetchVideos();
			} else {
				console.log('not sent');
			}
		} catch (error) {
			console.log(error);
		}
	};

	console.log('hello');
	return (
		<Container className='new-blog-container'>
			<Form onSubmit={submitForm}>
				<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
					<Form.Label>Cover photo</Form.Label>
					<Form.Control
						onChange={(e) => {
							const file = e.target.files[0];
							setcover(file);
						}}
						type='file'
						placeholder='cover photo'
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						onChange={(e) => setTitle(e.target.value)}
						type='text'
						placeholder='Video title'
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
					<Form.Label>Category</Form.Label>
					<Form.Control
						required
						onChange={(e) => setcategory(e.target.value)}
						placeholder='category , eg:food'
						as='textarea'
						rows={3}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
					<Form.Label>Avatar</Form.Label>
					<Form.Control
						onChange={(e) => {
							const file = e.target.files[0];
							setavatar(file);
						}}
						type='file'
						placeholder='avatar your image'
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
					<Form.Label>content</Form.Label>
					<Form.Control
						required
						onChange={(e) => setcontent(e.target.value)}
						placeholder=' blog content'
						as='textarea'
						rows={3}
					/>
				</Form.Group>

				<Button style={{ marginLeft: 10 }} type='submit' variant='primary'>
					Upload
				</Button>
			</Form>
		</Container>
	);
};

export default NewBlogPost;
