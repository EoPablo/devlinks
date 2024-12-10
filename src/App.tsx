import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';
import Network from './pages/network/Network';
import NotFound from './pages/notfound/NotFound';



import Private from './routes/Private';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/admin',
    element: <Private> <Admin/> </Private>
  },
  {
    path: '/admin/social',
    element: <Private> <Network/> </Private>
  },
  {
    path: '*',
    element: <NotFound/>
  }
])

export { router }