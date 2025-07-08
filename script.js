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

const purse = async (url) => {
    let unpersed = await fetch(url);
    let persed = await unpersed.text();
    return persed;
}

// main function is the main JS code
const main = async () => {

    // this block creates an array of every playlist link
    let html = document.createElement('div');
    html.innerHTML = await purse('Playlists');
    let elements = html.querySelectorAll('a');
    elements = Array.from(elements);
    elements = elements.slice(1, elements.length);

    // element is each and every folder/playlist
    for await (let element of elements) {
        let thumbnail, title, description, songArr = [];
        let link = element.href;

        //this block creates an array of every file in a folder/playlist
        let eleLink = element.href;
        let html2 = document.createElement('div');
        html2.innerHTML = await purse(eleLink);
        let elements2 = html2.querySelectorAll('a');
        elements2 = Array.from(elements2);
        elements2 = elements2.slice(1, elements2.length);

        for await (let element2 of elements2) {

            // element2 is each and every file/json/mp3/mp4 in a folder/playlist
            let ele2Link = element2.href;

            if (ele2Link.endsWith('.json')) {
                let unpersed = await fetch(ele2Link);
                let pursed = await unpersed.json();
                title = pursed.title;
                description = pursed.description;
            }

            if (ele2Link.endsWith('.jpg') || ele2Link.endsWith('.jpeg')) {
                thumbnail = ele2Link;
            }

            if (ele2Link.endsWith('.mp3') || ele2Link.endsWith('.m4a')) {
                songArr.push(ele2Link);
            }
        }

        //this block creates and appends a playlist card in HTML
        let playlistCard = document.createElement('div');
        playlistCard.classList.add('playlist');
        playlistCard.classList.add('card');
        playlistCard.innerHTML = `<span></span><div class="content"><img src="${thumbnail}" alt="thumbnail"><h2>${title}</h2></div>`;
        let playlistContainer = document.querySelector('.playlist-container');
        playlistContainer.append(playlistCard);
        playlistCard.addEventListener('click', () => {

        })
    }
}


(async () => {
    main();
})()