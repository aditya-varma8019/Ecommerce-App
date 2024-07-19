import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/user/Dashboard';
import { PrivateRoute } from './components/routes/PrivateRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';


function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' index element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/dashboard' element={<PrivateRoute />} >
            <Route path='' element={<Dashboard />} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout >
    </div>
  );
}

export default App;
