
import './App.css';
import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation.component';
import Detail from './components/movie-detail/detail';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>

    </Routes>
    
  );
}

export default App;
