import './App.css';
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";

function App() {
    return (
        <div>
            <Header />
            <Search onSearch={(query) => console.log("Searching:", query)} />
            <Footer />
        </div>
    );
}

export default App;
