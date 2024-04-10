"use client";
import React, { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRecordWebcam } from "react-record-webcam";
import ysFixWebmDuration from "fix-webm-duration";
import { UserHistory } from "../user-history";
import { getAmbianceData } from "@/lib/utils/flask";
import { useAmbianceContext } from "@/contexts/ambiance-context";
import { ApiResponse } from "@/lib/types";
import { useMusicPlayerContext } from "@/contexts/music-player-context";

const AmbianceInfo = () => {
  // Refs
  const fileInput = useRef<HTMLInputElement | null>(null);

  // States
  const [sessionActive, setSessionActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recording, setRecording] = useState<any>();
  const [fetching, setFetching] = useState(false);

  // Contexts
  const { ambiance, setAmbiance, recommendedGenre } = useAmbianceContext();
  const { spotifyApi, setSongs, currentPlaying, setCurrentPlaying } =
    useMusicPlayerContext();

  // Webcam hooks
  const {
    activeRecordings,
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
  } = useRecordWebcam();

  // Effects
  useEffect(() => {
    // Fetch data on mount
    const fetchData = async () => {
      const recording = await createRecording();
      setRecording(recording);
      if (recording) await openCamera(recording.id);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch data when selectedFile changes
    const fetchData = async () => {
      if (selectedFile) {
        setFetching(true);
        const data: ApiResponse = await getAmbianceData("file", selectedFile);
        setAmbiance(data.ambiance);
        setFetching(false);
      }
    };

    fetchData();
  }, [selectedFile]);

  const startRecord = async () => {
    if (!recording) {
      return;
    }

    await startRecording(recording.id);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const recorded = await stopRecording(recording.id);

    if (recorded) {
      const temp_blob = recorded.blobChunks[0] as Blob;
      ysFixWebmDuration(temp_blob, 5000, async function (blob) {
        setFetching(true);
        const data: ApiResponse = await getAmbianceData("blob", blob);
        setAmbiance(data.ambiance);
        setFetching(false);
      });
    }
  };

  useEffect(() => {
    // Start recording 30 seconds before the current song ends
    let timeoutId: NodeJS.Timeout;
    if (sessionActive && currentPlaying) {
      const songDurationInSeconds = currentPlaying.duration_ms / 1000;
      const delayBeforeRecording = (songDurationInSeconds - 15) * 1000; // Convert to milliseconds
      timeoutId = setTimeout(() => {
        startRecord();
      }, delayBeforeRecording);
    }
    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the dependencies change
    };
  }, [sessionActive, currentPlaying, startRecord]);

  useEffect(() => {
    // Search tracks when recommendedGenre changes
    if (recommendedGenre) {
      if (spotifyApi) {
        spotifyApi
          .searchTracks(`genre:${recommendedGenre}`, { limit: 20 })
          .then(
            function (data) {
              if (data.body.tracks) {
                setSongs(data.body.tracks.items);
                setCurrentPlaying(data.body.tracks.items[0]);
              } else {
                console.error("No tracks found");
              }
            },
            function (err) {
              console.error(err);
            }
          );
      }
    }
  }, [recommendedGenre]);

  // Handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (fileInput.current) {
      (fileInput.current as HTMLInputElement).click();
    }
  };

  return (
    <div className="flex flex-col pt-2 grow">
      {activeRecordings?.map((recording) => (
        <div
          key={recording.id}
          className="relative flex justify-center w-full bg-black "
        >
          <div className="absolute flex flex-col gap-2 text-white top-2 left-2">
            <small>Status: {recording.status}</small>
          </div>
          <video ref={recording.webcamRef} autoPlay playsInline muted />
        </div>
      ))}

      {ambiance ? (
        <div className=" grow">
          <div className="flex items-center justify-around p-4">
            <div className="text-center">
              <p>Current Ambiance</p>
              <h1 className="text-2xl">{ambiance}</h1>
            </div>
            <div className="text-center">
              <p>Playing Recommended Genre</p>
              <h1 className="text-2xl capitalize">{recommendedGenre}</h1>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between p-2">
            <p className={`text-lg ${fetching ? "opacity-100" : "opacity-0"}`}>
              Fetching New Ambiance...
            </p>
            <UserHistory />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-4 grow">
          <p>You have no sessions active. Start a session to begin.</p>
          <UserHistory />
        </div>
      )}
      <div className="flex w-full gap-2 pt-2">
        <Button className="w-full" variant="outline" onClick={startRecord}>
          Refresh Ambiance
        </Button>

        <Button
          variant={`${sessionActive ? "destructive" : "default"}`}
          className="w-full"
          onClick={() => {
            setSessionActive(!sessionActive);
          }}
        >
          {sessionActive ? <>Stop Session</> : <>Start Session</>}
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={handleUploadClick}
        >
          Upload File
        </Button>
        <Input
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          accept="video/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AmbianceInfo;
