import SpotifyWebApi from "spotify-web-api-node";
import SpotifyWebApiServer from "spotify-web-api-node/src/server-methods";

export const getMusicByGenre = async (genre: string) => {
  (
    SpotifyWebApi as unknown as { _addMethods: (fncs: unknown) => void }
  )._addMethods(SpotifyWebApiServer);
  const spotifyApi = new SpotifyWebApi({
    clientId: "aa5b06ea1b1343bb82a4338af4630688",
    clientSecret: "129e7122b0ed4a5e801bdc854dcc9b3f",
    redirectUri: "http://localhost:3000/dashboard",
  });
  // Retrieve an access token
  //   spotifyApi.clientCredentialsGrant().then(
  //     function (data) {
  //       console.log("The access token expires in " + data.body["expires_in"]);
  //       console.log("The access token is " + data.body["access_token"]);

  //       // Save the access token so that it's used in future calls
  //       spotifyApi.setAccessToken(data.body["access_token"]);
  //     },
  //     function (err) {
  //       console.log(
  //         "Something went wrong when retrieving an access token",
  //         err.message
  //       );
  //     }
  //   );

  spotifyApi.setAccessToken(
    "BQDYEj1Eo-TXGnm4wH3DUBxCKJ4F5pF9nX_77wTxL6u2hljd_Iixhy3NcTnxO7arAdaIN3rSTGGbtkbySq9Td5fsWMvlbjIJFYsAw8QSREpaoXhCvlM"
  );

  spotifyApi.searchTracks(`genre:${genre}`, { limit: 10 }).then(
    function (data) {
      console.log('Search tracks by "punk" in the track name: ', data.body);
    },
    function (err) {
      console.error(err);
    }
  );
};
