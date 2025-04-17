console.log("Coded by xlocyeuem — All rights reserved");
console.log("https://xlocyeuem.github.io");
// coder by xlocyeuem
const spotifyTracks = [
  {
    url: "https://open.spotify.com/track/5kqIPrATaCc2LqxVWzQGbk",
    artist: "Lukas Graham",
    audio: "/assets/music/7y.mp3"
  },
  {
    url: "https://open.spotify.com/track/2fLnUa3pPr511oHESDJUlr?si=2157b44c229c4147",
    artist: "Duc Minh,Lê Phú,Hoàng Anh",
    audio: "/assets/music/laviai.mp3"
  },
  {
    url: "https://open.spotify.com/track/2sSsy51uNPKas6x0JWr0TN?si=2a5d1be882df404a",
    artist: "2T, Văn",
    audio: "/assets/music/lieugio.mp3"
  },
  {
    url: "https://open.spotify.com/track/0ThuBBxygY0NLCs4w2bkR6?si=f5c68ecd6d754550",
    artist: "刀酱,DJ铁柱",
    audio: "/assets/music/520am.mp3"
  },
  {
    url: "https://open.spotify.com/track/0NyrI1tMvqcK3vU5z9DMdI?si=36ba02d3a7bb447c",
    artist: "JustaTee",
    audio: "/assets/music/snk.mp3"
  },
  {
    url: "https://open.spotify.com/track/3ukrFH17Zl6iEZ2QJ1Zwiy?si=a737267e66ac41d6",
    artist: "RPT Orijinn,Ronboogz",
    audio: "/assets/music/dontcoi.mp3"
  },
  {
    url: "https://open.spotify.com/track/12DNdwLD9oZOPADqM10oyE?si=d14f14c56a864505",
    artist: "Fishy, Trí Dũng",
    audio: "/assets/music/fgmn.mp3"
  }
];

let audio; 

async function loadSpotifyTrack(spotifyObj) {
  try {
    const trackId = spotifyObj.url.split("/track/")[1].split("?")[0];
    const res = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`);
    const data = await res.json();

    const songImage = document.querySelector(".spotify-now-playing img");
    const songTitle = document.querySelector(".spotify-now-playing .song-title");
    const songArtist = document.querySelector(".spotify-now-playing .song-artist");

    songImage.src = data.thumbnail_url;
    songImage.parentElement.href = spotifyObj.url;
    songTitle.textContent = data.title || "Không rõ tên bài hát";
    songTitle.href = spotifyObj.url;
    songArtist.textContent = spotifyObj.artist;

    audio = new Audio(spotifyObj.audio);

  } catch (err) {
    console.error("Không lấy được bài hát Spotify:", err);
    document.querySelector(".song-title").textContent = "Không tải được bài hát";
  }
}

window.onload = function () {
  const randomTrack = spotifyTracks[Math.floor(Math.random() * spotifyTracks.length)];
  loadSpotifyTrack(randomTrack);

  document.body.addEventListener('click', () => {
    if (audio) {
      audio.play().catch(err => console.error("Error playing audio:", err));
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  AOS.init();
});
