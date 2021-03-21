import React,{useEffect} from 'react';
import { 
  CardContent, 
  Collapse, 
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const _ = require('lodash');

const useStyles = makeStyles(()=>({
  collapse:{
    maxWidth:315
  },
}));

export default function DisplayCocktailRecipe({cocktailData,expanded,fromRandom=false}){
  const classes = useStyles();
  const [ingredient, setIngredient]=React.useState(null);
  const [measure, setMeasure]=React.useState(null);

  useEffect(()=>{
    const ingredientObj = _.pickBy(cocktailData,(value,key)=>{
      return key.includes('strIngredient')});
    const measureObj = _.pickBy(cocktailData,(value,key)=>{
      return key.includes('strMeasure')});
    const ingredientArr=_.transform({...ingredientObj},(result,value)=>{
      if (value!==null)result.push(value)
      return result
    },[]);
    const measureArr = _.transform({...measureObj},(result,value)=>{
      if (value!==null)result.push(value)
      return result
    },[]);

    setIngredient(ingredientArr)
    setMeasure(measureArr)
  },[])

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

  const topText = (<span>
    <Typography paragraph>{cocktailData.strAlcoholic}</Typography>
    <Typography variant='subtitle2'>{cocktailData.strCategory}</Typography>
  </span>)

  return(
    <Collapse
      in={expanded}
      timeout="auto"
      className={classes.collapse}
    >
      {cocktailData!==null?(
        <CardContent>
          {!fromRandom?topText:''}
          <Typography paragraph variant='subtitle2'>{cocktailData.strGlass}</Typography>
          <Typography paragraph>Ingredient:</Typography>
          {ingredientList}
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{cocktailData.strInstructions}</Typography>
        </CardContent>):(
          <CardContent>
            <Typography paragraph> loading </Typography>
          </CardContent>
        )}
    </Collapse>
  )
}