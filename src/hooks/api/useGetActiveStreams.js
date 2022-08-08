import { useState, useEffect } from "react";

const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&client_secret=${process.env.REACT_APP_TWITCH_SECRET}&grant_type=client_credentials&scope=`;

export const useGetActiveStreams = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [streamData, setStreamData] = useState({});
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getToken = async () => {
      try {
        const response = await fetch(tokenUrl, {
          method: "POST",
          redirect: "follow",
        });

        const data = await response.json();
        return data;
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    const getStreams = async () => {
      const token = await getToken();
      const { access_token } = token;
      try {
        const response = await fetch("https://api.twitch.tv/helix/streams/", {
          method: "GET",
          headers: {
            "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${access_token}`,
          },
          redirect: "follow",
        });

        const data = await response.json();
        console.log("stream data", data);
        setStreamData(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
        console.log("Get Streams error", error);
      }
    };

    getStreams();
  }, []);

  return { isLoading, streamData, serverError };
};
