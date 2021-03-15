import React,{ useState , useContext } from 'react';
import DisplayCocktailBar from '../components/DisplayBarCocktail';
import Pagination from '@material-ui/lab/Pagination';
import FavoritlistContext from '../context/FavoritlistContext';

export default function FavoritPage(){
  const [loading] = React.useState(false);
  const {localFavorit} = useContext(FavoritlistContext);
  const [currentPage,setCorrentPage] = useState(1);
  const [postsPerPage] = useState(9);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = localFavorit.slice(indexOfFirstPost,indexOfLastPost);

  const handlePageChange=(e,v)=>{
    setCorrentPage(v)
  }
  
  return(
    <div>
      <DisplayCocktailBar data={currentPosts} loading={loading}/>
      
      <Pagination 
        style={{paddingTop:16}}
        count={Math.ceil(localFavorit.length/postsPerPage)} 
        variant="outlined" 
        color="primary"
        onChange={handlePageChange}
        defaultPage={1}
        page={currentPage}
      />
    </div>
  )
}