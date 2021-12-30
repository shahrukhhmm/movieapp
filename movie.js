const api_url='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1' 
const img_path='https://image.tmdb.org/t/p/w1280'
const search_api='https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form=document.getElementById('form')
const main=document.getElementById('main')
//get data

 getmovies(api_url)

async function getmovies(url){
    const res=await fetch(url)
    const data=await res.json()

    show_movie(data.results)
}
function show_movie(movies){
    main.innerHTML=''

    movies.forEach((movie)=>{
        const {title,poster_path,vote_average,overview} = movie

        const movieel=document.createElement('div')
        movieel.classList.add('movie')

        movieel.innerHTML=`
        <img src="${img_path + poster_path}" alt="">
     
        <div class="movie-info">
         <h3>${title}</h3>
         <span class="${getrate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
           ${overview}
        </div>
        `
        main.appendChild(movieel)
    })

    
}
function getrate(vote){
    if(vote>=9){
        return 'green'

    }
    else if(vote>=5){
        return 'orange'
    }
    else{
        return 'red'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const searchterm=search.value

    if(searchterm&&searchterm!==''){
        getmovies(search_api+searchterm)
        search.value=''
    }
    else{
        window.location.reload()
    }
})