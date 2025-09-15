import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import NotFound from './pages/notFound/NotFound';
import Layout from './components/layout/Layout';
import AdminPage from './pages/admin/adminPage/AdminPage';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Directory from './pages/user/directory/Directory';
import Map from './pages/user/map/Map';
import Forum from './pages/user/forum/Forum';
import Calendar from './pages/user/calendar/Calendar';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/directorio" element={<Directory />} />
          <Route path="/mapa" element={<Map />} />
          <Route path="/calendario" element={<Calendar />} />
          <Route path="/foro" element={<Forum />} />
        </Route>

        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>


    </>
  )
}

export default App
