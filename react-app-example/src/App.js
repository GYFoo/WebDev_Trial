import React from 'react';
import './App.css';

// Setup Routes with React-Router-DOM
import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';
import NoScreen from './screens/NoScreen';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import SignUp from './screens/SignUp';
import LoginScreen from './screens/Login';

function App() {
  return (
    <div>
      <NavBar />

      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomeScreen/>}/>
          <Route path="/products" element={<ProductsScreen/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path='/login' element={<LoginScreen/>}/>
          <Route path='*' element={<NoScreen/>}/>
        </Routes>
      </BrowserRouter>
      <FooterBar />
    </div>
  )
}

export default App;
