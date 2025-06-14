import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import axios from 'axios'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesList from './pages/ArticlesListPage';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';

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
      loader: async function( {params} ) {
        const response = await axios.get('/api/articles/${params.name}');
        const { upvotes, comments } = response.data;
        return {upvotes, comments};
      }
    }, {
      path: '/about',
      element: <AboutPage />
    }, {
      path: '/articles',
      element: <ArticlesList />
    }, {
      path: '*',
      element: <NotFoundPage />
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
