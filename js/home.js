const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

const heroCover = document.getElementById("heroCover")
const heroTitle = document.getElementById("heroTitle")
const heroArtist = document.getElementById("heroArtist")
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

const getAlbum = async () => {
    heroTitle.textContent = "Caricamento album..."
    heroArtist.textContent = "Attendi un momento"

    try {
        const response = await fetch(url + "fedez")
        const data = await response.json()
        console.log(data)

        const firstTrack = data.data[20]

        const img = document.createElement("img")
        img.src = firstTrack.album.cover_big
        img.alt = firstTrack.album.title
        img.classList.add("art__img")

        heroCover.innerHTML = ""
        heroCover.appendChild(img)
        heroTitle.textContent = firstTrack.album.title
        heroArtist.textContent = firstTrack.artist.name


    } catch (error) {
        console.log(error)
        heroTitle.textContent = "Errore di caricamento"
        heroArtist.textContent = "Album non disponibile"
    }
}
getAlbum()
