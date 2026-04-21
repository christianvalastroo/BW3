const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

// Riferimenti DOM aggiornati dinamicamente dalla home
const heroCover = document.getElementById("heroCover")
const heroTitle = document.getElementById("heroTitle")
const heroArtist = document.getElementById("heroArtist")
const heroCoverLink = document.getElementById("heroCoverLink")
const heroTitleLink = document.getElementById("heroTitleLink")
const heroArtistLink = document.getElementById("heroArtistLink")
const heroPlayButton = document.getElementById("heroPlayButton")
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

const getAlbumHref = (albumId) => `./album.html?albumid=${albumId}`
let heroAlbumHref = ""

heroPlayButton.addEventListener("click", () => {
    if (!heroAlbumHref) return
    window.location.href = heroAlbumHref
})



// Hero principale con album e link all'artista
const getAlbum = async () => {
    heroTitle.textContent = "Caricamento album..."
    heroArtist.textContent = "Attendi un momento"
    heroAlbumHref = ""
    heroPlayButton.disabled = true
    heroCoverLink.removeAttribute("href")
    heroTitleLink.removeAttribute("href")
    heroCoverLink.setAttribute("aria-disabled", "true")
    heroTitleLink.setAttribute("aria-disabled", "true")
    heroArtistLink.removeAttribute("href")
    heroArtistLink.setAttribute("aria-disabled", "true")

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

        heroAlbumHref = getAlbumHref(firstTrack.album.id)
        heroPlayButton.disabled = false
        heroPlayButton.setAttribute("aria-label", `Apri l'album ${firstTrack.album.title}`)
        heroCoverLink.href = heroAlbumHref
        heroTitleLink.href = heroAlbumHref
        heroCoverLink.setAttribute("aria-label", `Apri l'album ${firstTrack.album.title}`)
        heroTitleLink.setAttribute("aria-label", `Apri l'album ${firstTrack.album.title}`)
        heroCoverLink.removeAttribute("aria-disabled")
        heroTitleLink.removeAttribute("aria-disabled")
        heroArtistLink.href = `./artist.html?artistId=${firstTrack.artist.id}`
        heroArtistLink.removeAttribute("aria-disabled")


    } catch (error) {
        console.log(error)
        heroTitle.textContent = "Errore di caricamento"
        heroArtist.textContent = "Album non disponibile"
        heroAlbumHref = ""
        heroPlayButton.disabled = true
        heroCoverLink.removeAttribute("href")
        heroTitleLink.removeAttribute("href")
        heroCoverLink.setAttribute("aria-disabled", "true")
        heroTitleLink.setAttribute("aria-disabled", "true")
        heroArtistLink.removeAttribute("href")
        heroArtistLink.setAttribute("aria-disabled", "true")
    }
}

const queries = ["fedez", "salmo", "blanco", "mahmood", "maneskin", "madame"]

// Sezione Buonasera: crea una card per ogni query
const getCards = async () => {
    greetingGrid.innerHTML = ""

    greetingSpinner.classList.remove("d-none")

    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        for (const query of queries) {

            const response = await fetch(url + query)
            const data = await response.json()

            const firstTrack = data.data[0]

            const link = document.createElement("a")
            link.href = getAlbumHref(firstTrack.album.id)
            link.classList.add("album-card-link")
            link.setAttribute("aria-label", `Apri l'album ${firstTrack.album.title}`)

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

            link.appendChild(card)
            greetingGrid.appendChild(link)


        }

    } catch (error) {
        console.log(error)

    } finally {
        greetingSpinner.classList.add("d-none")
    }
}

// Query usate per riempire la sezione consigliata
const recommendedQueries = ["italia", "internet", "pop","jazz", "triste", "trend", "rock", "hiphop", "queen", "metallica"]

// Sezione consigliata: cover, titolo album e artista
const getRecommended = async () => {
    recommendedSpinner.classList.remove("d-none")
    recommendedGrid.innerHTML = ""

    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        for (const query of recommendedQueries) {
            const response = await fetch(url + query)
            const data = await response.json()

            const track = data.data[0]

            const link = document.createElement("a")
            link.href = getAlbumHref(track.album.id)
            link.classList.add("album-card-link")
            link.setAttribute("aria-label", `Apri l'album ${track.album.title}`)

            const card = recommendedCardTemplate.content.cloneNode(true)

            const cover = card.querySelector(".recommended-card__cover")
            const title = card.querySelector(".recommended-card__title")
            const subtitle = card.querySelector(".recommended-card__subtitle")

            const img = document.createElement("img")
            img.src = track.album.cover_medium
            img.alt = track.album.title

            cover.appendChild(img)
            title.textContent = track.album.title
            subtitle.textContent = track.artist.name

            link.appendChild(card)
            recommendedGrid.appendChild(link)
        }
    } catch (error) {
        console.log(error)
    } finally {
        recommendedSpinner.classList.add("d-none")
    }
}

// Avvio iniziale della home
getCards()
getAlbum()
getRecommended()
