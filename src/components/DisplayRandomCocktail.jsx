import React from 'react';
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
 
  const cardHeader = (
    <CardHeader
      title={coctailData.strDrink}
      subheader={`${coctailData.strAlcoholic} ${coctailData.strCategory}`}
    />
  )

  const cardMedia = (
    <CardMedia 
      className={classes.media}
      image="https://www.thecocktaildb.com/images/media/drink/kztu161504883192.jpg"
      title="Grim Reaper"
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
      <ListItem>
        <ListItemText
          primary="1 oz - Kahlua"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="1 oz Bacardi - 151 proof rum"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="1 dash - Grenadine"
        />
      </ListItem>
    </List>
  )

  const collapseText = (
    <CardContent>
      <Typography>Ingredient:</Typography>
      {ingredientList}
      <Typography paragraph>Method:</Typography>
      <Typography paragraph>
        "Mix Kahlua and 151 in glass. Quickly add ice and pour grenadine over ice to give ice red tint.",
      </Typography>
    </CardContent>
  )

  console.log(coctailData)
  return (
    <Card className={classes.root}>
      {cardHeader}
      {cardMedia}
      {cardActions}
      {collapseText}
    </Card>
  );
}
