import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import NotFound from './pages/notFound/NotFound'; 
import Layout from './components/layout/Layout';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      
    </>
  )
}

export default App
