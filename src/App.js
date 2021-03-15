import { useEffect, useState } from 'react';
import './App.css';
import MainPage from'./pages/MainPage.jsx';
import {FavListProvider} from './context/FavoritlistContext';

const _ = require('lodash');

function App() {
  const [localFavorit,setLocalFav] = useState([]);

  useEffect(()=>{
    const tempLocalfav = localStorage.getItem('favoritCocktailList');
    if (tempLocalfav!==null){
      setLocalFav(JSON.parse(tempLocalfav))
    }
  },[])

  const addToFavorit=(newCocktail)=>{
    console.log('handle add to favorit')
    if (localFavorit.length === 0){
      localStorage.setItem('favoritCocktailList',JSON.stringify([newCocktail]))
      setLocalFav([newCocktail])
    }else{
      let tempcocktailArray = [...localFavorit,newCocktail]
      localStorage.setItem('favoritCocktailList',JSON.stringify(tempcocktailArray))
      setLocalFav(tempcocktailArray);
    }
    console.log('end handle add to favorit')
  }

  const removeFromFavorit=(removeCocktailId)=>{
    console.log('handle remove from favorit')
    const tempcocktailArray = _.remove(localFavorit,(obj)=>{
      return obj.idDrink!==removeCocktailId;
    })
    localStorage.setItem('favoritCocktailList',JSON.stringify(tempcocktailArray))
    setLocalFav(tempcocktailArray)
    console.log('end handle remove from favorit')
  }

  return (
    <div className="App">
      <FavListProvider value={{localFavorit,addToFavorit,removeFromFavorit}}>
        <MainPage/>
      </FavListProvider>
    </div>
  );
}

export default App;
