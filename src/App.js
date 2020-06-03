import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap/bootstrap.min.css';
import Navigation from './components/Navigation';
import Content from './components/Content';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Content></Content>
    </div>
  );
}

export default App;
