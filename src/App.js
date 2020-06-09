import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import './bootstrap/bootstrap.min.css';
import Navigation from './components/Navigation';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NotificationContainer/>
      <Navigation></Navigation>
      <Content></Content>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
