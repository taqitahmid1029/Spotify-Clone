const getLinks = async (url) => {
    let html = document.createElement('div');
    let unpersed = await fetch(url);
    html.innerHTML = await unpersed.text();
    let linkElements = html.querySelectorAll('a');
    linkElements = Array.from(linkElements);
    linkElements = linkElements.slice(1, linkElements.length);
    return linkElements;
}

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

const scanDatabase = async () => {
    let playlistLinkEs = await getLinks('/Playlists');
    let playlistArray = [];

    for (const playlistLinkE of playlistLinkEs) {
        let fileLinkEs = await getLinks(playlistLinkE.href);

        let playlist = {};
        let songs = [];
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

        let playlistCard = document.createElement('div');
        playlistCard.classList.add('playlist');
        playlistCard.innerHTML = `<div class="img-title-container">
                <img src="${playlist.thumbnail}" alt="thumbnail" class="thumbnail">
                <span class="title">${playlist.title}</span>
            </div>
            <button class="play-button">
                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"
                    style="fill: rgb(255, 255, 255); height: 16px; width: 16px;">
                    <path
                        d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z">
                    </path>
                </svg>
            </button>`
        let playlistContainer = document.querySelector('.playlist-container');
        playlistContainer.append(playlistCard);

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

    let playBtn = document.querySelector('#play-button');
    let pauseBtn = document.querySelector('#pause-button');
    let previousBtn = document.querySelector('#previous-song-button');
    let nextBtn = document.querySelector('#next-song-button');

    playBtn.addEventListener('click', () => {
        if (!track.src == '') {
            track.pause();
            playBtn.classList.add('disable');
            playBtn.classList.remove('enable');
            pauseBtn.classList.add('enable');
            pauseBtn.classList.remove('disable');
        }
    })

    pauseBtn.addEventListener('click', () => {
        if (!track.src == '') {
            pauseBtn.classList.add('disable');
            pauseBtn.classList.remove('enable');
            playBtn.classList.add('enable');
            playBtn.classList.remove('disable');
            track.play();
        }
    })

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

    let volume = document.querySelector('.volume-controller input');
    volume.addEventListener('change', () => {
        track.volume = volume.value / 100;
    })
})()