import React,{useEffect,useContext} from 'react';
import FavoritlistContext from '../context/FavoritlistContext';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

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

export default function DisplayRandomCocktail({coctailData}) {
  const classes = useStyles();
  const [ingredient, setIngredient]=React.useState(null);
  const [measure, setMeasure]=React.useState(null);
  const {localFavorit,addToFavorit,removeFromFavorit} = useContext(FavoritlistContext);
  const [isInFavList,setIsInFavList] = React.useState(false);
  
  const chakeifinfavorit =()=>{
    const tempCocktailIndex = _.find(localFavorit,(obj)=>{
      return obj.idDrink === coctailData.idDrink
    })
    if (tempCocktailIndex){
      setIsInFavList(true)
    }
  }

 
  useEffect(()=>{
    const ingredientObj = _.pickBy(coctailData,(value,key)=>{
      return key.includes('strIngredient')});
    const measureObj = _.pickBy(coctailData,(value,key)=>{
      return key.includes('strMeasure')});
    const ingredientArr=_.transform({...ingredientObj},(result,value)=>{
      result.push(value)
      return result
    },[]);
    const measureArr = _.transform({...measureObj},(result,value)=>{
      result.push(value)
      return result
    },[]);

    setIngredient(ingredientArr)
    setMeasure(measureArr) 
    chakeifinfavorit();
  },[]);

  const cardHeader = (
    <CardHeader
      title={coctailData.strDrink}
      subheader={`${coctailData.strAlcoholic} ${coctailData.strCategory}`}
    />
  )

  const cardMedia = (
    <CardMedia
      className={classes.media}
      image={coctailData.strDrinkThumb}
      title={coctailData.strDrink}
    />
  )

  const handleFav = ()=>{
    console.log('handle favorit')
    const tempCocktailToHandle = {
      idDrink:coctailData.idDrink,
      strDrink:coctailData.strDrink,
      strDrinkThumb:coctailData.strDrinkThumb
    }

    if (!isInFavList){
      addToFavorit(tempCocktailToHandle);
      setIsInFavList(true)
    }else{
      removeFromFavorit(coctailData.idDrink);
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

  const ingredientList = (
    <List dense={true}>
      {ingredient!==null?ingredient.map((value,key)=>{
        return<ListItem key={key}>
          <ListItemText
            primary={`${measure[key]!==undefined?measure[key]+` - `:''}` + `${value}`}
          />  
        </ListItem>
      }):<ListItem>
          <ListItemText
            primary="loding"
          />
        </ListItem>
      }
    </List>
  )

  const collapseText = (
    <CardContent>
      <Typography>Ingredient:</Typography>
      {ingredientList}
      <Typography paragraph>Method:</Typography>
      <Typography paragraph>
        {coctailData.strInstructions}
      </Typography>
    </CardContent>
  )

  return (
    <Card className={classes.root}>
      {cardHeader}
      {cardMedia}
      {cardActions}
      {collapseText}
    </Card>
  );
}
