import React,{ useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DisplayCocktailBar from '../components/DisplayBarCocktail';
import Pagination from '@material-ui/lab/Pagination';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tabs: {
    '& button': {
      minWidth: 50
    }
  },
  pagination:{
    paddingTop:16,
    color:'red'
  }
});

const upperCaseAlp = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export default function CocktailPage(){
  const classes = useStyles();
  const [tabValue, setValue] = React.useState(0);
  const [loading , setLoading] = React.useState(false);
  const [alcoholData, setAlcoholData] = useState([]);
  const [currentPage,setCorrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const fatchAlcoholeData = async (char)=>{
    setLoading(true);
    const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${upperCaseAlp[char]}`);
    setAlcoholData(res.data.drinks);
    setLoading(false);
  }

  useEffect(()=>{
    fatchAlcoholeData(0);
  },[])

  const handleTabsChange = (e,newValue)=>{
    setValue(newValue)
    fatchAlcoholeData(newValue);
    setCorrentPage(1);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = alcoholData!==null?alcoholData.slice(indexOfFirstPost,indexOfLastPost):[];

  const handlePageChange=(e,v)=>{
    setCorrentPage(v)
  }

  const displayTabs=(
    upperCaseAlp.map((char,key)=>{
      return<Tab key={key} label={char} />
    })
  )

  const mainDisplay = (
    <div>
      <DisplayCocktailBar data={currentPosts} loading={loading}/>
      
      <Pagination 
        className={classes.pagination}
        count={alcoholData!==null?Math.ceil(alcoholData.length/postsPerPage):0} 
        variant="outlined" 
        color="secondary"
        onChange={handlePageChange}
        defaultPage={1}
        page={currentPage}
      />
    </div>
  )

  const noCocktail = (
    <div>
      <Typography>no cocktail :(</Typography>
    </div>
  )

  return (
    <div style={{marginTop:2}}>
      <Paper className={classes.root}>
        <Tabs 
          value = {tabValue}
          className={classes.tabs}
          onChange = {handleTabsChange}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="secondary"
        >
          {displayTabs}
        </Tabs>
      </Paper>
      {alcoholData!==null?(mainDisplay):(noCocktail)}
    </div>
  )

}