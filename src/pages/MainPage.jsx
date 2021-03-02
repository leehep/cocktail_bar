import React,{useEffect} from 'react';
import TopNevBar from '../components/TopNevBar';
import DisplayRandomCocktail from '../components/DisplayRandomCocktail'
import axios from 'axios';
const _ = require('lodash');


// const style = {
//   p:{
//     display: "flex",
//     flexDirection: "column",
//     flexWrap: "nowrap",
//     justifyContent: "space-around",
//     alignItems: "center"
//   }
// }

function MainPage(){
  const [randomCocatail, setRandomCocatail] = React.useState(null);
  
  useEffect(()=>{
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((res)=>{
        const tempRandomCoctail=_.pickBy(res.data.drinks[0], (ingredient)=>{
          if (ingredient!==''){
            return ingredient !== null
          }
        });
        setRandomCocatail(tempRandomCoctail)
      })
  },[])

  return(
    <div>
      <TopNevBar/>
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "space-around",
          alignItems: "center",
          // alignContent: 'c enter',
          width: '70%',
          margin: 'auto'
        }}
      >
        <p>
          {/* add css */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        {randomCocatail!==null?
          <DisplayRandomCocktail coctailData = {randomCocatail}/>:
          "no display loading"
        }
      </div>
    </div>
  )
}


export default MainPage;