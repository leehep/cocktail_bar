import React,{useEffect , useContext} from 'react';
import TopNevBar from '../components/TopNevBar';
import DisplayRandomCocktail from '../components/DisplayRandomCocktail';
import CocktailPage from './CocktailPage';
import axios from 'axios';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router,
         Switch,
         Route } from 'react-router-dom';
import FavoritPage from './FavoritPage';

const _ = require('lodash');

// const useStyles = makeStyles((theme) => ({
//   p:{
//     display: "flex",
//     flexDirection: "column",
//     flexWrap: "nowrap",
//     justifyContent: "space-around",
//     alignItems: "center"
//   }
// }));

function MainPage(){
  // const classes = useStyles();
  const [randomCocatail, setRandomCocatail] = React.useState(null);
  const getRandomCocktail = async ()=>{
    const res = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const tempRandomCoctail=_.pickBy(res.data.drinks[0], (ingredient)=>{
      if (ingredient!==''){
        return ingredient !== null
      }
    });
    setRandomCocatail(tempRandomCoctail);
  };

  useEffect(()=>{
    getRandomCocktail();
  },[])

  return(
    <Router>
      <TopNevBar/>
      <Container>
        <Switch>
          <Route exact path="/">
            <div 
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "space-around",
                alignItems: "center",
                width: '70%',
                margin: 'auto'
              }}
            >
              
              <Typography variant="h5">Random Cocktail</Typography>
              {randomCocatail!==null?
                <DisplayRandomCocktail cocktailData = {randomCocatail}/>:
                "no display loading"
              }
            </div>
          </Route>
          <Route path="/cocktail">
            <CocktailPage/>
          </Route>
          <Route path="/favorite">
            <FavoritPage/>
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}


export default MainPage;