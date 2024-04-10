"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import SpotifyWebApi from "spotify-web-api-node";
// @ts-ignore
import SpotifyWebApiServer from "spotify-web-api-node/src/server-methods";

// Define the type of the context
interface MusicPlayerContextType {
  spotifyApi: SpotifyWebApi | null;
  setSpotifyApi: (api: SpotifyWebApi) => void;
  songs: SpotifyApi.TrackObjectFull[] | null;
  setSongs: (songs: SpotifyApi.TrackObjectFull[]) => void;
  currentPlaying: SpotifyApi.TrackObjectFull | null;
  setCurrentPlaying: (song: SpotifyApi.TrackObjectFull) => void;
}

// Define the context
const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

// Define the provider component
export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi | null>(null);
  const [songs, setSongs] = useState<SpotifyApi.TrackObjectFull[] | null>(null);
  const [currentPlaying, setCurrentPlaying] =
    useState<SpotifyApi.TrackObjectFull | null>(null);

  useEffect(() => {
    (
      SpotifyWebApi as unknown as { _addMethods: (fncs: unknown) => void }
    )._addMethods(SpotifyWebApiServer);
    const spotify = new SpotifyWebApi({
      clientId: "aa5b06ea1b1343bb82a4338af4630688",
      clientSecret: "129e7122b0ed4a5e801bdc854dcc9b3f",
      redirectUri: "http://localhost:3000/dashboard",
    });

    // Retrieve an access token
    spotify.clientCredentialsGrant().then(
      function (data) {
        // console.log("The access token expires in " + data.body["expires_in"]);
        // console.log("The access token is " + data.body["access_token"]);

        // Save the access token so that it's used in future calls
        spotify.setAccessToken(data.body["access_token"]);
        setSpotifyApi(spotify);

        // Refresh the token a few seconds before it expires
        setTimeout(() => {
          spotify.refreshAccessToken().then(
            function (data) {
              console.log("The access token has been refreshed!");

              // Save the access token so that it's used in future calls
              spotify.setAccessToken(data.body["access_token"]);
            },
            function (err) {
              console.log("Could not refresh the access token!", err);
            }
          );
        }, (data.body["expires_in"] - 60) * 1000); // 60 seconds before expiry
      },
      function (err) {
        console.log(
          "Something went wrong when retrieving an access token",
          err.message
        );
      }
    );
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        spotifyApi,
        setSpotifyApi,
        songs,
        setSongs,
        currentPlaying,
        setCurrentPlaying,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

// Custom hook that shorthands the context!
export const useMusicPlayerContext = (): MusicPlayerContextType => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error(
      "useMusicPlayerContext must be used within a MusicPlayerProvider"
    );
  }
  return context;
};
