import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ArticlePage, { loader as articleLoader} from './pages/ArticlePage';
import ArticlesList from './pages/ArticlesListPage';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';

const routes = [{
  path: '/',
  element: <Layout />, // Assuming you have a Layout component that includes NavBar 
  errorElement: <NotFoundPage />, // This will render if no route matches
  children: [{
      path: '/',
      element: <HomePage />
    }, {
      path: '/articles/:name',  //catch all routes that start with /articles/This will match any article name
      element: <ArticlePage />,
      loader: articleLoader,
    }, {
      path: '/about',
      element: <AboutPage />
    }, {
      path: '/articles',
      element: <ArticlesList />
    }, {
      path: '/login',
      element: <LoginPage />
    }, {
      path: "/create-account",
      element: <CreateAccountPage />
    }
    ]
}]
// This is the main entry point for the React application.
const router = createBrowserRouter(routes);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
    
  );
}

export default App
