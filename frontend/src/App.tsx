
import './App.css';
import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation.component';
import Login from './pages/login';
import RequireAuth from './components/auth/requireAuth';
import MyList from './pages/my-list';
import Register from './pages/register';
import Search from './pages/search';
import Genre from './components/genre/genre';
import Discover from './pages/discover';
import Stat from './pages/stat';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search/:keyword' element={<Search />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/mylist' element={<MyList />}/>
          <Route path='/discover' element={<Discover />}/>
          <Route path='/stat' element={<Stat />}/>
        </Route>
      </Route>

    </Routes>
    
  );
}

export default App;
