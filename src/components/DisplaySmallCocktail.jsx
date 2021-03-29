import React, { useEffect , useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoritlistContext from '../context/FavoritlistContext';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
  Popover,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import DisplayCocktailRecipe from './DisplayCocktailRecipe';

const _ = require('lodash');


const useStyles = makeStyles((theme) => ({
  preCountiner: {
    display: 'flex',
    maxWidth:315,
    minWidth:315,
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
  favbtn:{
    color:"#ef9a9a"
  },
  // typography: {
  //   padding: theme.spacing(2),
  // },
}));

export default function DisplaySmallCocktail({cocktailName,cocktailImage,cocktailId}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [fullDrinkData,setFullDrinkData] = React.useState(null);
  const {localFavorit,addToFavorit,removeFromFavorit} = useContext(FavoritlistContext);
  const [isInFavList,setIsInFavList] = React.useState(false);
  const [anchorEl , setAnchorEl] = React.useState(null);

  
  const chakeifinfavorit =()=>{
    const tempCocktailIndex = _.find(localFavorit,(obj)=>{
      return obj.idDrink === cocktailId
    })
    if (tempCocktailIndex){
      setIsInFavList(true)
    }
  }

  const callDrinkFullData = async (drinkId)=>{
    const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    const tempRandomCoctail=_.pickBy(res.data.drinks[0], (ingredient)=>{
      if (ingredient!==''){
        return ingredient !== null
      }
    });
    setFullDrinkData(tempRandomCoctail);
  }

  useEffect(()=>{
    chakeifinfavorit();
  },[])
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
    // CREATE CALL ONLY WHEN TRUE
    callDrinkFullData(cocktailId);
  };

  const handleFav = (e)=>{
    console.log('handle favorit')
    const tempCocktailToHandle = {
      idDrink:cocktailId,
      strDrink:cocktailName,
      strDrinkThumb:cocktailImage
    }

    if (!isInFavList){
      addToFavorit(tempCocktailToHandle);
      setIsInFavList(true)
    }else{
      setAnchorEl(e.currentTarget);
    }
  }

  const handleClose = () =>{setAnchorEl(null);};
  const open = Boolean(anchorEl);
  const id = open ? 'are-you-shor' : undefined;
  const handleRemoveBtn = ()=>{
    removeFromFavorit(cocktailId);
    setIsInFavList(false)
    handleClose()
  }

  const popOver = (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div style={{padding:20,textAlign:'center'}}>
        <Typography > are you sore to remove ?</Typography>
        <Button 
          size="small" 
          variant="outlined" 
          color="secondary"
          onClick={handleRemoveBtn}>Yes</Button>
        <Button 
          size="small" 
          variant="outlined" 
          color="secondary" 
          style={{marginLeft:5}}
          onClick={handleClose}>No</Button>
      </div>
    </Popover>
  )

  const displayFavBtn=(
    <IconButton 
      aria-label="add to favorites" 
      onClick={handleFav}
      className={classes.favbtn}
    >
      {isInFavList?<FavoriteIcon/>:<FavoriteBorderOutlinedIcon/>}
    </IconButton>
  )
  
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
            {displayFavBtn}
            {popOver}
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
      {fullDrinkData!==null?
        <DisplayCocktailRecipe cocktailData={fullDrinkData} expanded={expanded} />:
        <Collapse
        in={expanded}
        timeout="auto"
        className={classes.collapse}
        >
          <CardContent>
            <Typography paragraph> loading </Typography>
          </CardContent>
        </Collapse>
      }
    </Card>
  );
}
