import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/foodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import ChatBot from '../../components/ChatBot/chatBot';

const Home = () => {
  
  const [category,setCategory] = useState("All");
  
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
      <ChatBot/>
    </div>
  )
}

export default Home
