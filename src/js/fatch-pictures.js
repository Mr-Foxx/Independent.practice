import axios from "axios";
import Notiflix from "notiflix";

const URL = 'https://pixabay.com/api/'
const KEY='34551974-263ab9c7e5b8efeaa679c471a'


// let page = 1;
let itemsPerPage = 40;

const  fetchPictures= async(inputValue,page)=>{
    try{
        const response= await axios.get(`${URL}`,{
            params:{
                key : KEY,
                q: inputValue,
                image_type:'photo',
                orientation:'horizontal',
                safesearch :true,
                per_page:itemsPerPage,
                page:page,
            }
        })

        return response.data
    } catch(err){
        Notiflix.Notify.failure(err)
        throw new Error()
    }
}


export  {fetchPictures}