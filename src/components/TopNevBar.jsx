import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import HomeIcon from '@material-ui/icons/Home';
import {Link, useLocation} from 'react-router-dom';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color:'#80cbc4',
    paddingLeft:10,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
  onFocos:{
    color:'#80cbc4',
    backgroundColor:'#ebf1af',
  },
  notFocos:{
    color:'#80cbc4'
  },
}));

export default function TopNevBar() {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);

  const menuId = 'primary-search-account-menu';

  const location = useLocation()

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const search = (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )

  const rightSideBtn = <div className={classes.sectionDesktop}>
    <Link to="/favorite">
      <IconButton 
        className={location.pathname==='/favorite'?classes.onFocos:classes.notFocos}
      >
        <FavoriteTwoToneIcon/>
      </IconButton>
    </Link>
    <IconButton
      edge="end"
      aria-controls={menuId}
      className={classes.notFocos}
      // disabled
      // onClick={handleProfileMenuOpen}
    >
      <AccountCircle/>
    </IconButton>
  </div>

  return (
    <div className={classes.grow}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <Link to="/" >
            <IconButton
              edge='start'
              className={location.pathname==='/'?classes.onFocos:classes.notFocos}
              color='inherit'
              aria-label="open drawer"
            >
              <HomeIcon/>
            </IconButton>
          </Link>
          <Link to='/cocktail'>
            <IconButton
              edge='start'
              className={location.pathname==='/cocktail'?classes.onFocos:classes.notFocos}
              color='inherit'
              aria-label="open drawer"
            >
              <LocalBarIcon/>
            </IconButton>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            cocktail bar
          </Typography>
          {search}
          <div className={classes.grow} />
          {rightSideBtn}
        </Toolbar>
      </AppBar>
    </div>
  );
}