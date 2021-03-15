import React,{useEffect,useContext} from 'react';
import FavoritlistContext from '../context/FavoritlistContext';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
} from '@material-ui/core';
import DisplayCocktailRecipe from './DisplayCocktailRecipe';

const _ = require('lodash');

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: '100%', 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  
  // avatar: {
  //   backgroundColor: red[500],
  // },
}));

export default function DisplayRandomCocktail({cocktailData}) {
  const classes = useStyles();
  const {localFavorit,addToFavorit,removeFromFavorit} = useContext(FavoritlistContext);
  const [isInFavList,setIsInFavList] = React.useState(false);
  
  const chakeifinfavorit =()=>{
    const tempCocktailIndex = _.find(localFavorit,(obj)=>{
      return obj.idDrink === cocktailData.idDrink
    })
    if (tempCocktailIndex){
      setIsInFavList(true)
    }
  }

  useEffect(()=>{
    chakeifinfavorit();
  },[]);

  const cardHeader = (
    <CardHeader
      title={cocktailData.strDrink}
      subheader={`${cocktailData.strAlcoholic} ${cocktailData.strCategory}`}
    />
  )

  const cardMedia = (
    <CardMedia
      className={classes.media}
      image={cocktailData.strDrinkThumb}
      title={cocktailData.strDrink}
    />
  )

  const handleFav = ()=>{
    console.log('handle favorit')
    const tempCocktailToHandle = {
      idDrink:cocktailData.idDrink,
      strDrink:cocktailData.strDrink,
      strDrinkThumb:cocktailData.strDrinkThumb
    }

    if (!isInFavList){
      addToFavorit(tempCocktailToHandle);
      setIsInFavList(true)
    }else{
      removeFromFavorit(cocktailData.idDrink);
      setIsInFavList(false)
    }
  }


  const cardActions = (
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites" onClick={handleFav}>
        {isInFavList?<FavoriteIcon/>:<FavoriteBorderOutlinedIcon/>}
      </IconButton>
    </CardActions>
  )

  return (
    <Card className={classes.root}>
      {cardHeader}
      {cardMedia}
      {cardActions}
      <DisplayCocktailRecipe cocktailData={cocktailData} expanded={true} fromRandom={true} />
    </Card>
  );
}
