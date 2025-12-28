import React from 'react';
import Header from '../components/header/Header';

const Home = () => {

    // dynamic title
    document.title = "Beauty & Care | Home";

    return (
        <div>
            <Header />
        </div>
    );
};

export default Home;