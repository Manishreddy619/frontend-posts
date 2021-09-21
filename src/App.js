import React from 'react';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Home from './views/home';
import Blog from './views/blog';
import NewBlogPost from './views/new';
import { BrowserRouter, Route } from 'react-router-dom';
import { getPosts } from './fetches';

function App() {
	const getData = async () => {
		console.log(getPosts());
		const data = await getPosts();
		console.log(data);
	};
	return (
		<BrowserRouter>
			<NavBar />
			<Route path='/' exact component={Home} />
			<Route path='/blog/:id' exact component={Blog} />
			<Route path='/new' exact component={NewBlogPost} />
			<Footer />
		</BrowserRouter>
	);
}

export default App;
