import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import NotFound from './pages/notFound/NotFound';
import Layout from './components/layout/Layout';
import AdminPage from './pages/admin/adminPage/AdminPage';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>


    </>
  )
}

export default App
