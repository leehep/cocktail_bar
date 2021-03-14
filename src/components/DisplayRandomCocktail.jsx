import React,{useEffect} from 'react';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
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

  const cardActions = (
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
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
