const imgAlbum = document.querySelector(".imgAlbum")
const infoAlbum = document.querySelector('.infoAlbum')
const tracklistAlbum = document.querySelector('.tracklistAlbum')
const params = new URLSearchParams(window.location.search)
const albumid = params.get("albumid")

const getAlbum = async () => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumid}`)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

const resultAlbum = async () => {
    const album = await getAlbum()
    return album
}

const generateImg = (album) => {
    const imageAlbum = document.createElement('img')
    imageAlbum.src = album.cover_medium
    imageAlbum.classList.add("imgAlbum")

    imgAlbum.appendChild(imageAlbum)
}

const dateToYear = (date) => {
    const year = date.slice(0, 4);
    return year
}

const counterSongs = (album) => {
    let counter = 0
    album.tracks.data.forEach(song => {
        counter++
    });
    return counter
}

const secConverter = (seconds) => {
    let result
    if ((seconds / 60) >= 60) {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        if (hours === 1) {
            result = `${hours} ora ${minutes} min`
        } else {
            result = `${hours} ore ${minutes} min`
        }
    } else {
        const minutes = Math.floor((seconds % 3600) / 60)
        result = `${minutes} min`
    }

    return result
}

const generateInfoAlbum = (album) => {
    const recordTypeFirst = document.createElement("p")
    recordTypeFirst.innerText = 'ALBUM'
    recordTypeFirst.classList.add('recordTypeFirst')

    const nameAlbum = document.createElement("h3")
    nameAlbum.innerText = album.title
    nameAlbum.classList.add("nameAlbum")

    const detailsAlbum = document.createElement('div')
    detailsAlbum.classList.add("detailsAlbum")

    const infoAuthor = document.createElement('div')
    infoAuthor.classList.add("infoAuthor")

    const divImgAuthor = document.createElement("div")
    divImgAuthor.classList.add("divImgAuthor")

    const imgAuthor = document.createElement('img')
    imgAuthor.src = album.artist.picture_small

    divImgAuthor.appendChild(imgAuthor)

    const nameAuthor = document.createElement('a')
    nameAuthor.setAttribute('href', '#')
    nameAuthor.innerText = album.artist.name
    nameAuthor.classList.add('nameAuthor')

    infoAuthor.append(divImgAuthor, nameAuthor)

    const yearReleaseAlbum = document.createElement('div')
    yearReleaseAlbum.classList.add('yearReleaseAlbum')

    const recordType = document.createElement('p')
    recordType.innerText = 'Album'
    recordType.classList.add('recordType')

    const yearAlbum = document.createElement('p')
    const year = dateToYear(album.release_date)
    yearAlbum.innerText = year
    yearAlbum.classList.add('yearAlbum')

    const durationAlbum = document.createElement('p')
    durationAlbum.classList.add('durationAlbum')
    durationAlbum.innerHTML = `${counterSongs(album)} brani, <span>${secConverter(album.duration)}</span>`

    yearReleaseAlbum.append(recordType, yearAlbum, durationAlbum)
    detailsAlbum.append(infoAuthor, yearReleaseAlbum)
    infoAlbum.append(recordTypeFirst, nameAlbum, detailsAlbum)
}

const formatNumber = (num) => {
    return Number(num).toLocaleString('it-IT').toString()
}

const minConverter = (time) => {
    const min = Math.floor(time / 60)
    const sec = time % 60

    return `${min}:${sec}`
}
const generateListAlbum = (song, counter) => {
    const tr = document.createElement('tr')
    tr.classList.add("infoSong")

    const numberTd = document.createElement('td')
    numberTd.innerText = counter

    const td1 = document.createElement('td')
    td1.classList.add("divSongArtist")

    const titleSong = document.createElement('p')
    titleSong.innerText = song.title

    const author = document.createElement('p')
    author.innerText = song.artist.name

    td1.append(titleSong, author)

    const stream = document.createElement('td')
    stream.innerText = formatNumber(song.rank)
    stream.classList.add("streamsSong")

    const durationSong = document.createElement('td')
    durationSong.innerText = minConverter(song.duration)
    durationSong.classList.add('durationSong')

    tdBtn = document.createElement('td')
    tdBtn.classList.add('tdBtn')

    const dotsBtn = document.createElement('button')
    dotsBtn.type = 'button'
    dotsBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`
    dotsBtn.classList.add('actionSong')

    tdBtn.appendChild(dotsBtn)

    tr.append(numberTd, td1, stream, durationSong, tdBtn)
    tracklistAlbum.appendChild(tr)
}

getAlbum().then(res => {
    console.log(res)
    generateImg(res)
    generateInfoAlbum(res)
    let counter = 1
    res.tracks.data.forEach(song => {
        generateListAlbum(song, counter)
        counter++
    });
})
