const fs = require("fs");

async function getToken() {
  //check if the tokens.json file exists
  if (fs.existsSync("tokens.json")) {
    //if it does, read the file and parse it into a json object
    const tokens = JSON.parse(fs.readFileSync("tokens.json"));
    //get the key of the most recent token from the object
    const mostRecentToken = Object.keys(tokens).sort().reverse()[0];
    //the key is a time stamp in milliseconds, compare it to the current time and if the difference is less than 3600 seconds, return the token
    if (Date.now() - mostRecentToken < 3600000) {
      console.log("Found a valid token in tokens.json... Using it !\n\n");
      return tokens[mostRecentToken];
    }
  }
  //if the token is expired or the file does not exist, get a new token
  console.log(
    "No valid token found in tokens.json... Fetching a new one !\n\n"
  );
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });
  const token = await response.json();
  //save the token to the tokens.json file, with the key being the current time in milliseconds
  fs.writeFileSync(
    "tokens.json",
    JSON.stringify({ [Date.now()]: token.access_token })
  );
  return token.access_token;
}

async function getRecentlyPlayed(access_token) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function getUserCurrentlyPlaying(access_token) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    const data = await response.json();
    console.log("Currently Playing:\n", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
}
getToken().then((response) => {
  // const data = getRecentlyPlayed(response);
  // //save the data to a recently_played.json file
  // fs.writeFileSync("recently_played.json", JSON.stringify(data));
  getUserCurrentlyPlaying(response);
});
