const searchSongs = async () =>{
    const searchText = document.getElementById("search-query").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`
    toggleSpinner();
    //load data
    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
    
}
const displaySongs = songs =>{
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = '';
    songs.forEach(song => {
        //console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = ` 
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mp3">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner(false);
    });
}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    toggleSpinner();
    try{
        const res = await fetch(url);
        const data = await res.json();
       displayLyrics(data.lyrics);
    }
    catch(error){
        displayError("Sorry! Something went wrong!");
    }

}

const displayLyrics = lyrics =>{
    document.getElementById("error-message").innerText = "";
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
    toggleSpinner();

}

const displayError = (error) =>{
    document.getElementById("song-lyrics").innerText ='';
    const errorMsg = document.getElementById("error-message");
    errorMsg.innerText = error;
    toggleSpinner();
}

const toggleSpinner = () =>{
    const spinner = document.getElementById("loading-spinner");
    const songs = document.getElementById("song-container");
    
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
    // if(show){
    //     spinner.classList.remove('d-none');
    // }
    // else{
    //     spinner.classList.add('d-none');
    // }
    
}

const searchField = document.getElementById("search-query");
searchField.addEventListener("keypress", function(event){
    
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
})