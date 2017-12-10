import React from 'react';
import Routes from '../routes';
import TopMenuComponent from './top-menu/top-menu.jsx';
import sample from '../assets/sample.mp4';

const App = () =>
    <div className="app-container">
        <video autoPlay muted loop>
            <source src={sample} type="video/mp4"/>
        </video>
        <TopMenuComponent/>
        <div className="content-container">
            {Routes}
        </div>
    </div>;

export default App;
