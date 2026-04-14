
//recupero params//

/* console.log(window.location.search)
const params= new URLSearchParams(window.location.search)
const artistId= params.get("") */

//--------------//


//vars e const//

const hero=document.getElementById("heroBannerArtist")

const heroTitle=document.querySelector(".heroTitle")
const fanNumP=document.querySelector(".fanNum")

const trackList=document.querySelector(".trackList")

//------------//


//get di controllo artist//

const getDataArtist=async()=>{

    try{
        const rawData=await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/119`)
        const data= await rawData.json()
        return data

    }catch(error){
        console.log(error)
    }

}

getDataArtist()
    .then(res=>{
        console.log(res)
        populateHero(res.name,res.nb_fan,res.picture_big)
    })

//----------------//


//get di controllo tracks//

const getDataTracks=async()=>{

    try{
        const rawData=await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/119/top?limit=50`)
        const data= await rawData.json()
        return data

    }catch(error){
        console.log(error)
    }

}

getDataTracks()
    .then(res=>{
        console.log(res)
        //md5_image
        populatePopTracks(res.data)
    })

//---------------//

//populate functions//

const populateHero=(name,fans,image)=>{
    hero.style.backgroundImage=`url(${image})`
    heroTitle.innerHTML=name
    fanNumP.innerHTML=fans+" fans"
}

const populatePopTracks=(tracksArray)=>{

    tracksArray.forEach(track=> {

        //track.duration

        trackList.innerHTML+=`<li>
                                    <div class="popItemCont">
                                        <div class="popItemImgCont">
                                            <img src="${track.album.cover_small}" alt="">
                                        </div>
                                        <div class="popItemTrackCont">
                                            <div class="trackTitleCont">
                                                <p class="trackTitle">${track.title_short}</p>
                                            </div>
                                            <p class="numOfViews">${track.rank}</p>
                                            <p class="trackDuration">${track.duration}</p>
                                        </div>
                                        <div class="onlySPItemMenu d-none">
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </div>
                                    </div>
                                </li>`
    });
}

//-----------------//