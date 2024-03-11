import { SpotifyPaginationResponse } from "./types";

// get responses from recently_played.json file
const getRecentlyPlayed = async (): Promise<SpotifyPaginationResponse> => {
  const data = Bun.file("recently_played.json");
  return await data.json();
};

const data = await getRecentlyPlayed();

data.items.forEach((item, e) => {
  console.log(`${e + 1}-${item.track.name} \tPlayed at: ${item.played_at}`);
  console.log(``);
});
