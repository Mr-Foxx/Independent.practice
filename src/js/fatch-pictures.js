import axios from "axios";
import Notiflix from "notiflix";

URL = 'https://pixabay.com/api/'
KEY='34551974-263ab9c7e5b8efeaa679c471a'


const  fetchPictures= async(inputValue)=>{
    try{
        const response= await axios.get(`${URL}`,{
            params:{
                key : KEY,
                q: inputValue,
                image_type:'photo',
                orientation:'horizontal',
                safesearch :true,
                per_page:40,
                pege:1,
            }
        })

        return response.data
    } catch(err){
        Notiflix.Notify.failure(err)
        throw new error
    }
}


export default fetchPictures