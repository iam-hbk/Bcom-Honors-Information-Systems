import * as querystring from "querystring";

const client_id = "4b3d49bbd0344789bac30c95b8f2626c";
const client_secret = "d0ab06b7de4b4af3a9a999d125aaa451";
const redirect_uri = "http://localhost:8888/callback";

const server = Bun.serve({
  port: 8888,

  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;
    switch (path) {
      case "/login":
        var scope =
          "user-read-private user-read-recently-played user-read-email";

        return Response.redirect(
          "https://accounts.spotify.com/authorize?" +
            querystring.stringify({
              response_type: "code",
              client_id: client_id,
              scope: scope,
              redirect_uri: redirect_uri,
            }),
          302
        );
      case "/callback":
        var code = url.searchParams.get("code") || null;
        Bun.write("codes.json", JSON.stringify({ code: code }));

        var authOptions = {
          url: "https://accounts.spotify.com/api/token",
          form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: "authorization_code",
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(client_id + ":" + client_secret).toString("base64"),
          },
          json: true,
        };
        const res = fetch(authOptions.url, {
          ...authOptions,
        });
        const data = getAccessToken(code ? code : "");
    }
    return new Response(`Hello, ${method} ${path}!`);
  },
});

const getAccessToken = async (code: string) => {
  const response = await fetch("co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      redirect_uri,
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();
  console.log("DATA:", data);
  Bun.write("tokens-scope.json", JSON.stringify(data));
  return data;
};

console.log(`Listening on http://localhost:${server.port} ...`);

// http://localhost:8888/callback?code=AQCXL_Gbdpm036eyzOgGPsCNQ-AFB6oFSQP3qfR_x4UrBsOKbnvRFiUsP7bLoDepYWqy5hgZV_3dEhdkKhlm0ThMFgGtskXaNys_hJSLlTzSgyoWgl_GzkmGlWTvc2W_mrENN_Nr-g56-qayPowo89Bhiri2Wx5vq7Tw0znkBtIhqwYKUc3dQXQq49vTxsGbDdo6wAa7nGHMyxTOQtYS1348jdF1Vssbof8DrqBK9aewHFZwp_73A8xHXLtev-cFkQ

interface SpotifyTrackHistoryItem {
  trackId: string;
  trackName: string;
  artists: Array<{
    artistId: string;
    artistName: string;
  }>;
  album: {
    albumId: string;
    albumName: string;
    releaseDate: string; // ISO 8601 format
  };
  trackDurationMs: number;
  trackPopularity: number;
  explicit: boolean;
  playedAt: string; // ISO 8601 date-time format
  context: {
    type: string; // e.g., "playlist", "album"
    contextUri: string; // URI of the context
  } | null; // Context might not always be available
  genres: Array<string>; // This requires an additional request to the artist's endpoint
  market: string;
}
interface SpotifyTrackAudioFeatures {
  acousticness: number; // 0.0 to 1.0, likelihood of being acoustic
  danceability: number; // 0.0 to 1.0, suitability for dancing
  energy: number; // 0.0 to 1.0, intensity and activity level
  instrumentalness: number; // 0.0 to 1.0, likelihood of no vocals
  liveness: number; // 0.0 to 1.0, presence of audience sound
  loudness: number; // dB, overall loudness of track
  speechiness: number; // 0.0 to 1.0, presence of spoken words
  tempo: number; // BPM, overall estimated tempo
  valence: number; // 0.0 to 1.0, musical positiveness conveyed
}

interface SpotifyTrackHistoryItem {
  // Existing fields...
  audioFeatures: SpotifyTrackAudioFeatures;
  // Additional calculated or fetched fields can be added here
}
