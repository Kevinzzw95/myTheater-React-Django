
import './App.css';
import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation.component';
import Login from './pages/login';
import RequireAuth from './components/Auth/requireAuth';
import MyList from './pages/my-list';
import Register from './pages/register';
import Search from './pages/search';
import Genre from './pages/genre';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} >
          <Route path="/:genre" element={<Genre />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search/:keyword' element={<Search />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/mylist' element={<MyList />}/>
          <Route path='/discover' element={<MyList />}/>
        </Route>
      </Route>

    </Routes>
    
  );
}

export default App;
