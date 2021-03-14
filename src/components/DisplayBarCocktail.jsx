import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import DisplaySmallCocktail from './DisplaySmallCocktail';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:20,
    marginLeft:10,
    width:'98%',
  },
}));


export default function DisplayCocktailBar ({data,loading}){
  const classes = useStyles();

  const mapData = data.map((drinkData)=>{
    return <Grid item sx={6} key={drinkData.idDrink}>
      <DisplaySmallCocktail 
        cocktailName={drinkData.strDrink}
        cocktailImage={drinkData.strDrinkThumb}
        cocktailId={drinkData.idDrink}/>
    </Grid>
  })
  
  if (loading){
    return <h3>loading...</h3>
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>   
        <Grid container item xs={12} spacing={3}justify="space-around">
          {mapData}
        </Grid>
      </Grid>
    </div>
  );
}