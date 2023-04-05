
import Notiflix, { Loading } from "notiflix";
import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import jQuery from "jquery";
import fetchPictures from "./fatch-pictures";



const form = document.querySelector('.search-form')
const input=document.querySelector('.input')
const container=document.querySelector('.gallery')



const onSerch=async(event)=>{
    event.preventDefault();
    
    const inputValue= input.value.trim().toLowerCase()
    
    const picturesData= await fetchPictures(inputValue)
    console.log(picturesData);
    
    renderPictures(picturesData.hits)
    }

 function renderPictures(picturesData) {
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

        
   
    
form.addEventListener('submit',onSerch)