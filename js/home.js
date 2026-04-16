const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

// Elementi della home che riempio con la API
const heroCover = document.getElementById("heroCover")
const heroTitle = document.getElementById("heroTitle")
const heroArtist = document.getElementById("heroArtist")
const heroArtistLink=document.getElementById("heroArtistLink")
const greetingGrid = document.getElementById("greetingGrid")
const recommendedGrid = document.getElementById("recommendedGrid")
const desktopNowPlayingCover = document.getElementById("desktopNowPlayingCover")
const desktopNowPlayingTitle = document.getElementById("desktopNowPlayingTitle")
const desktopNowPlayingArtist = document.getElementById("desktopNowPlayingArtist")
const mobileMiniPlayerCover = document.getElementById("mobileMiniPlayerCover")
const mobileMiniPlayerTitle = document.getElementById("mobileMiniPlayerTitle")
const mobileMiniPlayerArtist = document.getElementById("mobileMiniPlayerArtist")
const greetingCardTemplate = document.getElementById("greetingCardTemplate")
const recommendedCardTemplate = document.getElementById("recommendedCardTemplate")

const greetingSpinner = document.querySelector("#greetingSpinner")
const recommendedSpinner = document.querySelector("#recommendedSpinner")



// Album in evidenza dell'hero
const getAlbum = async () => {
    heroTitle.textContent = "Caricamento album..."
    heroArtist.textContent = "Attendi un momento"

    try {
        const response = await fetch(url + "Fedez")
        const data = await response.json()
        console.log(data)
        console.log(data.data[0].artist.id)

        const firstTrack = data.data[0]

        const img = document.createElement("img")
        img.src = firstTrack.album.cover_big
        img.alt = firstTrack.album.title
        img.classList.add("art__img")

        heroCover.innerHTML = ""
        heroCover.appendChild(img)
        heroTitle.textContent = firstTrack.album.title
        heroArtist.textContent = firstTrack.artist.name

        heroArtistLink.href=`./artist.html?artistId=${firstTrack.artist.id}`


    } catch (error) {
        console.log(error)
        heroTitle.textContent = "Errore di caricamento"
        heroArtist.textContent = "Album non disponibile"
    }
}

const queries = ["fedez", "salmo", "blanco", "mahmood", "maneskin", "madame"]

// Card miste della sezione Buonasera
const getCards = async () => {
    greetingGrid.innerHTML = ""

    greetingSpinner.classList.remove("d-none")

    try {
        queries.forEach(async (query) => {

            const response = await fetch(url + query)
            const data = await response.json()

            const firstTrack = data.data[0]

            const card = greetingCardTemplate.content.cloneNode(true)

            const cover = card.querySelector(".greeting-card__cover")
            const title = card.querySelector(".greeting-card__title")

            // Wrapper usato anche dal CSS per le cover
            const art = document.createElement("div")
            art.classList.add("art")

            // Immagine album della card
            const img = document.createElement("img")
            img.src = firstTrack.album.cover_medium
            img.alt = firstTrack.album.title
            img.classList.add("art__img")

            // Struttura finale della card
            art.appendChild(img)
            cover.appendChild(art)

            title.textContent = firstTrack.album.title

            greetingGrid.appendChild(card)


        })

    } catch (error) {
        console.log(error)

    }finally {
        greetingSpinner.classList.add("d-none")
    }
}
getCards()
getAlbum()
