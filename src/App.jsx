import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import NotFound from './pages/notFound/NotFound';
import Layout from './components/layout/Layout';
import AdminPage from './pages/admin/adminPage/AdminPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        <Route path="/admin" element={<AdminPage />} />
      </Routes>


    </>
  )
}

export default App
