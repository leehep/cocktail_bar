import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
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
    // border:'1px solid gold',
    width:'60%'
  },
  drinkTitle: {
    flex: '1 0 auto',
  },
  actionBtn:{
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
    // CREATE CALL ONLY WHEN TRUE
    callDrinkFullData(cocktailId);
  };

  const callDrinkFullData = async (drinkId)=>{
    setLoading(true);
    const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    setFullDrinkData(res.data.drinks[0]);
    setLoading(false);
  }
  

  const moreDrinkData = 
    <Collapse 
      in={expanded}  
      timeout="auto" 
      // unmountOnExit
      className={classes.collapse}
      >
      <CardContent>
        <Typography paragraph>isAlcoholick?</Typography>
        <Typography paragraph>Method:</Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
          minutes.
        </Typography>
      </CardContent>
    </Collapse>

  console.log(fullDrinkData)
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
