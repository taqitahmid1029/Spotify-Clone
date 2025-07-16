// For HTML & CSS

let menuIcon = document.querySelector('.menu-icon');
let hambergerIcon = document.querySelector('.hamberger-icon');
let crossIcon = document.querySelector('.cross-icon');
let dropDown = document.querySelector('.drop-down');

menuIcon.addEventListener('click', () => {
    hambergerIcon.classList.toggle('enable');
    hambergerIcon.classList.toggle('disable');
    crossIcon.classList.toggle('enable');
    crossIcon.classList.toggle('disable');
    dropDown.classList.toggle('enable');
    dropDown.classList.toggle('disable');
})

// JavaScript Code Begains

// this function takes a url/folder and returns all listing-link/files or folder without 1st one.
const getLinks = async (url) => {
    let html = document.createElement('div');
    let unpersed = await fetch(url);
    html.innerHTML = await unpersed.text();
    let linkElements = html.querySelectorAll('a');
    linkElements = Array.from(linkElements);
    linkElements = linkElements.slice(1, linkElements.length);
    return linkElements;
}

// this function takes number in second unit and converts into mm:ss format string.
const secondsToMMSS = (totalSeconds) => {
    let sec1, sec2, min1, min2;
    if (totalSeconds > 59) {
        sec1 = Math.floor(totalSeconds % 60);
        sec2 = String(sec1).padStart(2, 0);
        min1 = Math.floor(totalSeconds / 60)
        min2 = String(min1).padStart(2, 0);
    }

    if (totalSeconds < 60) {
        sec1 = Math.floor(totalSeconds);
        sec2 = String(sec1).padStart(2, 0);
        min2 = '00';
    }

    return `${min2}:${sec2}`;
}

// this function scans all the database.
const scanDatabase = async () => {
    let playlistLinkEs = await getLinks('/Playlists');
    let playlistArray = [];

    for (let playlistLinkE of playlistLinkEs) {
        let fileLinkEs = await getLinks(playlistLinkE.href);

        let playlist = {}, songs = [];
        for (let fileLinkE of fileLinkEs) {
            let fileLink = fileLinkE.href;

            if (fileLink.endsWith('.json')) {
                let x = await fetch(fileLink);
                let y = await x.json();
                playlist.title = y.title;
                playlist.description = y.description;
            }

            if (fileLink.endsWith('.jpg') || fileLink.endsWith('.jpeg')) {
                playlist.thumbnail = fileLink;
            }

            if (fileLink.endsWith('.mp3') || fileLink.endsWith('.m4a')) {
                let index = fileLink.lastIndexOf('/');
                let fileName = fileLink.substring(index + 1, fileLink.length - 4);
                fileName = fileName.replaceAll('%20', ' ');
                songs.push([fileName, fileLink]);
            }
        }
        playlist.songs = songs;
        playlistArray.push(playlist);
    }
    return playlistArray;
}

(async () => {
    let data = await scanDatabase();
    let track = new Audio();
    for (let index = 0; index < data.length; index++) {
        let playlist = data[index];

        // creates cards for every playlist in left side content
        let playlistCard = document.createElement('div');
        playlistCard.classList.add('playlist');
        playlistCard.innerHTML = `<div class="img-title-container">
                <img src="${playlist.thumbnail}" alt="thumbnail" class="thumbnail">
                <span class="title">${playlist.title}</span>
            </div>`;
        let playlistContainer = document.querySelector('.playlist-container');
        playlistContainer.append(playlistCard);

        // if user clicks playlist in left side, right side will show things.
        playlistCard.addEventListener('click', () => {
            let img = document.querySelector('.thumbnail-container img')
            img.src = playlist.thumbnail;
            img.classList.remove('disable');
            document.querySelector('.title h2').innerText = playlist.title;
            document.querySelector('.descprition p').innerText = playlist.description;
            let ul = document.querySelector('.song-list-container ul');
            ul.innerHTML = '';

            for (let song of playlist.songs) {
                let list = document.createElement('li');
                list.innerText = song[0];
                ul.append(list);

                list.addEventListener('click', () => {
                    document.querySelector('.song-name').innerText = song[0];
                    track.src = song[1];
                    track.play();
                    pauseBtn.classList.remove('enable');
                    pauseBtn.classList.add('disable');
                    playBtn.classList.remove('disable');
                    playBtn.classList.add('enable');
                })
            }
        })
    }

    let playPauseBtn = document.querySelector('.play-pause-button');
    let pauseBtn = document.querySelector('#pause-button');
    let playBtn = document.querySelector('#play-button');
    playPauseBtn.addEventListener('click', () => {
        if (track.src != '') {

            if (track.paused) {
                track.play();
                pauseBtn.classList.add('disable');
                pauseBtn.classList.remove('enable');
                playBtn.classList.add('enable');
                playBtn.classList.remove('disable');
            }

            else if (!track.paused) {
                track.pause();
                playBtn.classList.add('disable');
                playBtn.classList.remove('enable');
                pauseBtn.classList.add('enable');
                pauseBtn.classList.remove('disable');
            }
        }
    })

    // if user clicks previous button
    let previousBtn = document.querySelector('#previous-song-button');
    previousBtn.addEventListener('click', () => {
        for (const playlist of data) {
            for (let index = 0; index < playlist.songs.length; index++) {
                if (playlist.songs[index][0] == document.querySelector('.song-name').innerText) {
                    track.src = playlist.songs[index - 1][1];
                    track.play();
                    document.querySelector('.song-name').innerText = playlist.songs[index - 1][0];
                    break;
                }
            }
        }
    })

    // if user clicks next button
    let nextBtn = document.querySelector('#next-song-button');
    nextBtn.addEventListener('click', () => {
        for (const playlist of data) {
            for (let index = 0; index < playlist.songs.length; index++) {
                if (playlist.songs[index][0] == document.querySelector('.song-name').innerText) {
                    track.src = playlist.songs[index + 1][1];
                    track.play();
                    document.querySelector('.song-name').innerText = playlist.songs[index + 1][0];
                    break;
                }
            }
        }
    })

    // if user want to change volume
    let volume = document.querySelector('.volume-controller input');
    volume.addEventListener('change', () => {
        track.volume = volume.value / 100;
    })

    // changes in seekbar
    let currentTime = document.querySelector('.current-time');
    let duration = document.querySelector('.duration');
    let seekBar = document.querySelector('.seek-button input');

    seekBar.addEventListener('change', () => {
        track.currentTime = (track.duration * seekBar.value) / 100;
    })

    track.addEventListener('timeupdate', () => {
        currentTime.innerText = secondsToMMSS(track.currentTime);
        duration.innerText = secondsToMMSS(track.duration);
        seekBar.value = (track.currentTime / track.duration) * 100;
    })

    window.addEventListener('keypress', (e) => {
        if (e.code == 'Space' || track.src != '') {
            if (!track.paused) {
                track.play();
            }
            
            if (track.paused) {
                track.pause();
            }
        }
    })
})()