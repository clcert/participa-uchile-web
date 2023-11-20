import logo from './assets/images/logo.svg';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

// Data
import { menuItems } from './data/menuItems';

// Pages
import Home from './pages/Home';
import Video from './pages/Video';
import FAQ from './pages/FAQ';
import People from './pages/People';
import PastElections from './pages/PastElections';
import News from './pages/News';
import NotFound from './pages/NotFound';

// Components
import NavBar from './components/Navbar/NavBar';
import Footer from './components/Footer';
import EntryPage from './components/MarkdownEntries/EntryPage';

import NewsBreadcrumb from './pages/News/Breadcrumb';

// Markdown entries JSON
import NewsJSON from './markdown/News/entries.json';

import './assets/css/styles.css';

export const App = () => {

	const newsEntries = NewsJSON.entries.filter( (entry) => entry.route !== undefined && entry.file !== undefined);

  return (
		<Router>
			<div className='main-container'>
				<NavBar />
				<Routes>
					<Route exact path='/' element={<Home/>} />
					{ // Pages in Navbar
						menuItems.map( ({url, component}) => (
							<Route exact path={url} element={component} key={url} />
						))
					}
					{ // News publications
						newsEntries.map( (entry) => (
							<Route exact path={entry.route} element={<EntryPage entry={entry} breadcrumb={<NewsBreadcrumb />}/>} key={entry.route} />
						))
					}
					{/* Others */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
			<Footer />
		</Router>
  )
}

export default App;
