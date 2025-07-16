# Spotify Clone
Welcome to the Spotify Clone repository! This project is a minimalist music player website designed to showcase fundamental front-end development skills using HTML, CSS, and JavaScript. It provides a local music playback experience, treating local folders as playlists.

## 🚀 About the Project
This project aims to replicate the core functionality of a music player, allowing users to organise and play their local music files through a web interface. It's built entirely with client-side technologies: HTML for structure, CSS for styling, and JavaScript for interactivity and dynamic content loading.

**Important Note on Local File Access:** <br>
Due to browser security restrictions (specifically the Fetch API's inability to directly access local file system paths without user interaction or a server), this application must be run using a local development server (e.g., Live Server VS Code extension, Python's `http.server`, or Node.js `server`). Simply opening the `index.html` file directly in your browser will prevent the music files from loading correctly.

## ✨ Features
* **Playlist Management:** Automatically detects folders within a designated directory as individual playlists.

* **Local Music Playback:** Plays audio files directly from your local machine.

* **Customizable Playlists:** Supports adding custom images and descriptions for each playlist via a `JSON` file.

* **Simple UI:** Intuitive and clean user interface for a smooth music listening experience.

* **Client-Side Only:** No backend server required for music storage or playback (beyond the initial local server setup).

* **Data Privacy:** The application does not access or store any data from your device's general storage; it only interacts with the specific folders you designate for music.

## 🛠️ Installation
To get a copy of this project up and running on your local machine, follow these simple steps:

1. Prerequisites:

    * Git installed on your system.

    * A local development server (e.g., `Live Server VS Code Extension` or Python's built-in `HTTP server`).

2. Clone the repository:
Open your terminal or command prompt and paste the following command:

    ``` bash
    git clone https://github.com/taqitahmid1029/Spotify-Clone.git
    cd Spotify-Clone
    ```

3. Start a Local Server:

    * Using Live Server (VS Code): Open the `Spotify-Clone` folder in VS Code, right-click on `index.html`, and select "Open with Live Server."

    * Using Python (from the project root directory):

        ``` bash
        python -m http.server 8000
        ```

    Then, open your browser and navigate to `http://localhost:8000`.

## 🎵 Usage
This music player organises your music based on your local folder structure. Here's how to set up your music and playlists:

1. Create Your Music Library:

    * Inside the cloned `Spotify-Clone` directory, locate the `Playlists` folder (or create one if it doesn't exist).

    * Inside the `Playlists` folder, create new folders for each of your playlists. For example:

        ```
        Spotify-Clone/
        └── Playlists/
            ├── MyChillPlaylist/
            │   ├── song1.mp3
            │   ├── song2.wav
            │   └── playlist_info.json
            └── WorkoutMix/
                ├── upbeat_track.mp3
                └── another_song.mp3
        ```

2. Add Music Files:

    * Place your music files (e.g., `.mp3`, `.wav`) directly into these playlist folders.

3. Customise Playlists (Optional):

    * To add a custom title and description for a playlist, create a `playlist_info.json` file inside its respective playlist folder.

    * Example `playlist_info.json` content:

        ```
        {
        "title": "My Chill Playlist",
        "description": "Relaxing tunes for a calm evening."
        }
        ```

    * You can also add an image named cover.jpg (or .png) in the playlist folder to serve as the playlist cover.

4. Enjoy Your Music:

    * Once your folders are set up and the local server is running, open the application in your browser. Your folders will appear as selectable playlists, and you can start playing your music!

## 🤝 Contributing
Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please feel free to:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature/AmazingFeature`).

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).

4. Push to the branch (`git push origin feature/AmazingFeature`).

5. Open a Pull Request.

Please ensure your code adheres to a clean and readable style.


## 📧 Contact
If you have any questions or feedback, feel free to reach out:

[Github Profile](https://github.com/taqitahmid1029) <br>
[Facebook Profile](https://www.facebook.com/taqitahmid1029)