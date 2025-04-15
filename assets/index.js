async function loadSpotifyTrack(spotifyUrl) {
  try {
    const trackId = spotifyUrl.split("/track/")[1].split("?")[0];
    const res = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`);
    const data = await res.json();

    const songImage = document.querySelector(".spotify-now-playing img");
    const songTitle = document.querySelector(".spotify-now-playing .song-title");
    songImage.src = data.thumbnail_url;
    songImage.parentElement.href = spotifyUrl;
    songTitle.textContent = data.title || "Không rõ tên bài hát";
    songTitle.href = spotifyUrl;
  } catch (err) {
    console.error("Không lấy được bài hát Spotify:", err);
    document.querySelector(".song-title").textContent = "Không tải được bài hát";
  }
}

window.onload = function () {
  const spotifyLink = "https://open.spotify.com/track/5kqIPrATaCc2LqxVWzQGbk?si=29cbe4fcdc454e61";
  loadSpotifyTrack(spotifyLink);

  const audio = new Audio('/assets/music/7y.mp3');
  document.body.addEventListener('click', () => {
    audio.play().catch(err => console.error("Error playing audio:", err));
  });
};

document.addEventListener('DOMContentLoaded', () => {
  AOS.init();
});
