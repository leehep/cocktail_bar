import React,{useEffect,useContext} from 'react';
import FavoritlistContext from '../context/FavoritlistContext';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardActions,
  IconButton,
  CardContent,
  Typography,
  Popover,
  Button,
} from '@material-ui/core';
import DisplayCocktailRecipe from './DisplayCocktailRecipe';

const _ = require('lodash');

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '100%', 
  },
  drinkPreview: {
    display: 'flex',
    flexDirection: 'column',
    width:'60%'
  },
  favbtn:{
    color:"#ef9a9a"
  },
  preCountiner: {
    display: 'flex',
    minWidth:315,
    maxHeight:120,
    justifyContent:'space-between'
  },
  cover: {
    width:128,
    height:128,
  },
  drinkTitle: {
    flex: '1 0 auto',
  },
  actionBtn:{
    padding:0
  },
}));

export default function DisplayRandomCocktail({cocktailData}) {
  const classes = useStyles();
  const {localFavorit,addToFavorit,removeFromFavorit} = useContext(FavoritlistContext);
  const [isInFavList,setIsInFavList] = React.useState(false);
  const [anchorEl , setAnchorEl] = React.useState(null);

  
  const handleClose = () =>{setAnchorEl(null);};
  

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

  const handleFav = (e)=>{
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
      setAnchorEl(e.currentTarget);
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'are-you-sure' : undefined;
  const handleRemoveBtn = ()=>{
    removeFromFavorit(cocktailData.idDrink);
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
        <Typography > Are you sure ?</Typography>
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

  const tempDisplat = (
    <Card>
      <div className={classes.preCountiner}> 
        <CardMedia
          className={classes.cover}
          image={cocktailData.strDrinkThumb}
          title={cocktailData.strDrink}
        />
        <div className={classes.drinkPreview}>
          <CardContent className={classes.drinkTitle}>
            <Typography>{cocktailData.strDrink}</Typography>
          </CardContent>
          <CardActions>
            <IconButton 
              aria-label="add to favorites" 
              onClick={handleFav}
              className={classes.favbtn}
            >
              {isInFavList?<FavoriteIcon/>:<FavoriteBorderOutlinedIcon/>}
            </IconButton>
          </CardActions>
        </div>
          {popOver}
      </div>
      <DisplayCocktailRecipe cocktailData={cocktailData} expanded={true} fromRandom={true} />
    </Card>
  )

  return (
    <div>
      {tempDisplat}
    </div>
  );
}
