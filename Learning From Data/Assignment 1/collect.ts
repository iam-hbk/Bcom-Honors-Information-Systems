// Open the 8000_popular_tracks.csv file and read the data
const file = Bun.file("8000_popular_tracks.csv");
let records: any = [];
// file.text().then((text) => {
//   text.split("\n").forEach((line, index) => {
//     if (index > 0) {
//       const [id, name, popularity, artists] = line.split(",");
//       if (id.length < 1 || name.length < 1 || popularity.length < 1 || artists.length < 1)
//         return;
//       records.push({
//         id: id,
//         name: name,
//         popularity: popularity,
//         artists: artists,
//       });
//     }
//   });
//   console.log(records.length, records[0]);
// });
interface TrackAudioFeatures {
  id: string;
  name: string;
  artist: string;
  album: string;
  releaseDate: string;
  duration: number;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
}

const jsonFile = Bun.file("/Users/heritierkaumbu/Documents/Bcom Hons IS/Learning From Data/collect-data/authorization/authorization_code/recently_played.json");
const data = (await jsonFile.json());
console.log(data);
// data.map((d,_) => console.log(_,d.name));
