import axios from "axios";
import Notiflix, { Loading } from "notiflix";
import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import $ from "jquery";
import {fetchPictures}  from "./fatch-pictures";



const form = document.querySelector('.search-form')
const input=document.querySelector('.input')
const container=document.querySelector('.gallery')


let currentPage =1;


const onSerch=async(event)=>{
    event.preventDefault();
    
    const inputValue= input.value.trim().toLowerCase()

    if (input.value.trim() === '') {
      Notiflix.Notify.info('Please enter something');
      
      return;
    }

  try{
    const picturesData= await fetchPictures(inputValue)
    console.log(picturesData);
    clearForm()
    renderPictures(picturesData.hits)
    
   
    if (picturesData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(
          `Hooray! We found ${picturesData.totalHits} images.`
          );
        }

  } catch(err){
    Notiflix.Notify.failure(err)
    throw new Error()
  }
    }



 const renderPictures=picturesData=> {
      console.log(picturesData);
    
      const newPictures = picturesData
        .map(elem => {
          const {
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          } = elem;
          return `
            <a href="${largeImageURL}" class="photo-card">
              <img class='img' src="${webformatURL}" alt="${tags}" loading="lazy" data-src="${largeImageURL}" />
              <div class="info">
                <p class="info-item">
                  <b>Likes <span class="span">${likes}</span> </b>
                </p>
                <p class="info-item">
                  <b>Views <span class="span">${views}</span> </b>
                </p>
                <p class="info-item">
                  <b>Coments <span class="span">${comments}</span> </b>
                </p>
                <p class="info-item">
                  <b>Downloads <span class="span">${downloads}</span> </b>
                </p>
              </div>
            </a>
          `;
        })
        .join('');
    
      container.insertAdjacentHTML('beforeend', newPictures);
    
      const lightbox = new simpleLightbox('.gallery a');
    }

 const clearForm=()=>{
  container.innerHTML=''
 }   
        
 const pageScrolling=()=> {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}



const infiniteІcroll=()=> {
  $(window).on('scroll', async function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      
      loadMorePictures()
    }
  });
}

const loadMorePictures = async () => {
  const inputValue = input.value.trim().toLowerCase();
  
 try{
   const picturesData = await fetchPictures(inputValue,currentPage + 1);
   currentPage += 1;
  
  renderPictures(picturesData.hits);

  if (picturesData.hits.length === 0) {
    Notiflix.Notify.info(
      "We're sorry, but there are no more pictures to load."
    );
    return;
  }
  
  pageScrolling();
 }catch (error) {
  Notiflix.Notify.failure(error);
  throw error;
}
};

   
infiniteІcroll()



    
form.addEventListener('submit',onSerch)
