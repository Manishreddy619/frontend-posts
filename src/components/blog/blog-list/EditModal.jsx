import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';

const EditModal = ({ id }, props) => {
	const [show, setShow] = useState(false);
	const [cover, setcover] = useState(null);
	const [avatar, setavatar] = useState(null);
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [category, setcategory] = useState('');
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();

			formData.append('profilepic', cover);
			formData.append('title', title);
			formData.append('category', category);
			formData.append('profilepic', avatar);
			formData.append('description', description);

			const response = await fetch('http://localhost:3002/blogposts/' + id, {
				method: 'PUT',
				body: formData,
			});
			if (response.ok) {
				console.log('hello');
				// props.fetchVideos();
				props.getPosts();
			} else {
				console.log('not sent');
			}
		} catch (error) {
			console.log(error);
		} finally {
			handleClose();
		}
	};
	return (
		<div>
			<Button
				onClick={handleShow}
				style={{ marginTop: '-2rem', marginLeft: '-2rem' }}>
				update
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modify </Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'>
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
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								required
								onChange={(e) => setDescription(e.target.value)}
								placeholder=' blog Description'
								as='textarea'
								rows={3}
							/>
						</Form.Group>

						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button style={{ marginLeft: 10 }} type='submit' variant='primary'>
							Upload
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</div>
	);
};

export default EditModal;
