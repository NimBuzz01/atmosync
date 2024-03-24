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
  const fileInput = useRef(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    setAmbiance,
    setHumanCount,
    setSoundLevel,
    ambiance,
    humanCount,
    soundLevel,
    recommendedGenre,
  } = useAmbianceContext();
  const { spotifyApi, setSongs } = useMusicPlayerContext();

  useEffect(() => {
    if (recommendedGenre) {
      if (spotifyApi) {
        spotifyApi
          .searchTracks(`genre:${recommendedGenre}`, { limit: 20 })
          .then(
            function (data) {
              if (data.body.tracks) {
                setSongs(data.body.tracks.items);
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

  const {
    activeRecordings,
    createRecording,
    devicesById,
    openCamera,
    startRecording,
    stopRecording,
    // cancelRecording,
    // clearAllRecordings,
    // clearError,
    // clearPreview,
    // closeCamera,
    // devicesByType,
    // download,
    // errorMessage,
    // muteRecording,
    // pauseRecording,
    // resumeRecording,
  } = useRecordWebcam();

  const startSession = () => {
    setSessionActive(true);
    startRecord();
  };

  const [videoDeviceId, setVideoDeviceId] = React.useState<string>("");
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>("");

  // const handleSelect = async (event: any) => {
  //   const { deviceid: deviceId } =
  //     event.target.options[event.target.selectedIndex].dataset;
  //   if (devicesById?.[deviceId].type === "videoinput") {
  //     setVideoDeviceId(deviceId);
  //   }
  //   if (devicesById?.[deviceId].type === "audioinput") {
  //     setAudioDeviceId(deviceId);
  //   }
  // };

  const [recording, setRecording] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const recording = await createRecording();
      setRecording(recording);
      if (recording) await openCamera(recording.id);
    };

    fetchData();
  }, []);

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
        const data: ApiResponse = await getAmbianceData("blob", blob);
        setAmbiance(data.ambiance);
        setHumanCount(data.humancount);
        setSoundLevel(data.soundlevel);
      });
    }
  };

  const stopSession = () => {
    setSessionActive(false);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      if (selectedFile) {
        const data: ApiResponse = await getAmbianceData("file", selectedFile);
        setAmbiance(data.ambiance);
        setHumanCount(data.humancount);
        setSoundLevel(data.soundlevel);
      }
    };

    fetchData();
  }, [selectedFile]);

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
          <div className="flex flex-col items-center justify-center p-4">
            <p>Current Ambiance</p>
            <h1 className="text-2xl">{ambiance}</h1>
          </div>
          <Separator />
          <div className="flex items-center justify-between p-2">
            <div>
              <p>Human Count: {humanCount}</p>
              <p>Sound Level: {soundLevel}</p>
              <p>
                Recommended Genre:{" "}
                {recommendedGenre.map((genre, index) => (
                  <span key={index}>{genre}, </span>
                ))}
              </p>
            </div>
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
        {sessionActive ? (
          <Button
            variant="destructive"
            className="w-full"
            onClick={stopSession}
          >
            Stop Session
          </Button>
        ) : (
          <Button className="w-full" onClick={startSession}>
            Start Session
          </Button>
        )}
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
