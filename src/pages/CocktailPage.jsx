import React,{ useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DisplayCocktailBar from '../components/DisplayBarCocktail';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CocktailPage(){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loading , setLoading] = React.useState(false);
  const [alcoholData, setAlcoholData] = useState([]);
  const [currentPage,setCorrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  
  useEffect(()=>{
    const fatchAlcoholeData = async ()=>{
      setLoading(true);
      const res = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
      setAlcoholData(res.data.drinks);
      setLoading(false);
    }

    fatchAlcoholeData();
  },[])

  const handleChange = (e,newValue)=>{
    setValue(newValue)
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = alcoholData.slice(indexOfFirstPost,indexOfLastPost);

  const handlePageChange=(e,v)=>{
    setCorrentPage(v)
  }

  return (
    <div style={{marginTop:2}}>
      <Paper className={classes.root}>
        <Tabs 
          value = {value}
          onChange = {handleChange}
          indicatorColor="primary"
          centered
        >
          <Tab label="alcole"/>
          <Tab label="non alcole"/>
        </Tabs>
      </Paper>
      <DisplayCocktailBar data={currentPosts} loading={loading}/>
      
      <Pagination 
        style={{paddingTop:16}}
        count={Math.ceil(alcoholData.length/postsPerPage)} 
        variant="outlined" 
        color="primary"
        onChange={handlePageChange}
      />

    </div>
  )
}