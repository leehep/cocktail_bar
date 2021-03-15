import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,Collapse
} from '@material-ui/core'
import axios from 'axios';
const _ = require('lodash');

const useStyles = makeStyles((theme) => ({
  preCountiner: {
    display: 'flex',
    maxWidth:360,
    minWidth:360,
    maxHeight:120,
    justifyContent:'space-between'
  },
  drinkPreview: {
    display: 'flex',
    flexDirection: 'column',
    width:'60%'
  },
  drinkTitle: {
    flex: '1 0 auto',
  },
  actionBtn:{
    padding:0
    // border:'1px solid red',
  },
  cover: {
    width:128,
    height:128,
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
  collapse:{
      maxWidth:360
  },
}));

export default function DisplaySmallCocktail({cocktailName,cocktailImage,cocktailId}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [loading , setLoading] = React.useState(false);
  const [fullDrinkData,setFullDrinkData] = React.useState(null);
  const [ingredient, setIngredient]=React.useState(null);
  const [measure, setMeasure]=React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    // CREATE CALL ONLY WHEN TRUE
    callDrinkFullData(cocktailId);
  };

  const callDrinkFullData = async (drinkId)=>{
    setLoading(true);
    const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    console.log(res.data.drinks)
    setFullDrinkData(res.data.drinks[0]);
    setLoading(false);
  }
  
  useEffect(()=>{
    if(fullDrinkData&&expanded){
      const ingredientObj = _.pickBy(fullDrinkData,(value,key)=>{
        return key.includes('strIngredient')});
      const measureObj = _.pickBy(fullDrinkData,(value,key)=>{
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
    }
  },[fullDrinkData]);

  const ingredientList = (
    <List dense={true}>
      {ingredient!==null?ingredient.map((value,key)=>{
        return<ListItem key={key}>
          <ListItemText
            primary={`${measure[key]!==undefined&&measure[key]!==""?measure[key]+` - `:''}` + `${value}`}
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

  const moreDrinkData = 
  <Collapse 
      in={expanded}  
      timeout="auto" 
      // unmountOnExit
      className={classes.collapse}
      >
      {fullDrinkData!==null?(
        <CardContent>
          <Typography paragraph>{fullDrinkData.strAlcoholic}</Typography>
          <Typography variant='subtitle2'>{fullDrinkData.strCategory}</Typography>
          <Typography paragraph variant='subtitle2'>{fullDrinkData.strGlass}</Typography>
          <Typography paragraph>Ingredient:</Typography>
          {ingredientList}
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{fullDrinkData.strInstructions}</Typography>
        </CardContent>):(
          <CardContent>
            <Typography paragraph> loading </Typography>
          </CardContent>
        )}
    </Collapse>

  return (
    <Card >
      <div className={classes.preCountiner}>
        <CardMedia
          className={classes.cover}
          image={cocktailImage}
          title={cocktailName}
        />
        <div className={classes.drinkPreview}>
          <CardContent className={classes.drinkTitle}>
            <Typography >
              {cocktailName}
            </Typography>
          </CardContent>
          <CardActions className={classes.actionBtn} disableSpacing>
            <IconButton aria-label="add to favorites" disabled>
              <FavoriteIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            //   disabled
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </div>
      </div>
      {moreDrinkData}
    </Card>
  );
}
