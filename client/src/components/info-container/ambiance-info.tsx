"use client";
import React, { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRecordWebcam } from "@/lib/packages/react-record-webcam";
import ysFixWebmDuration from "fix-webm-duration";
import { Select } from "./select";
import { createHistoryEntry } from "@/lib/utils/feedback";
import { useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { UserHistory } from "../user-history";
import { getRecommendedGenre } from "@/lib/utils/music";

interface ApiResponse {
  ambiance: string;
  humancount: string;
  soundlevel: string;
}

const AmbianceInfo = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const fileInput = useRef(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recommendedGenre, setRecommendedGenre] = useState<string[]>([]);

  const { data: session } = useSession();
  const {
    activeRecordings,
    cancelRecording,
    clearAllRecordings,
    clearError,
    clearPreview,
    closeCamera,
    createRecording,
    devicesById,
    devicesByType,
    download,
    errorMessage,
    muteRecording,
    openCamera,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording,
  } = useRecordWebcam();

  const startSession = () => {
    setSessionActive(true);
    startRecord();
  };

  const [videoDeviceId, setVideoDeviceId] = React.useState<string>("");
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>("");

  const handleSelect = async (event: any) => {
    const { deviceid: deviceId } =
      event.target.options[event.target.selectedIndex].dataset;
    if (devicesById?.[deviceId].type === "videoinput") {
      setVideoDeviceId(deviceId);
    }
    if (devicesById?.[deviceId].type === "audioinput") {
      setAudioDeviceId(deviceId);
    }
  };

  const [recording, setRecording] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const recording = await createRecording(videoDeviceId, audioDeviceId);
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
      ysFixWebmDuration(temp_blob, 5000, function (blob) {
        const formData = new FormData();
        formData.append("video", blob, "temp_video.webm");

        fetch("http://localhost:8080/api/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setApiResponse(data);
            setRecommendedGenre(getRecommendedGenre(data.ambiance));
          });
      });
    }
  };

  useEffect(() => {
    const createEntry = async () => {
      if (session?.user.id) {
        await createHistoryEntry(
          session?.user?.id,
          apiResponse?.ambiance ?? "Not Available",
          apiResponse?.humancount ?? "Not Available",
          apiResponse?.soundlevel ?? "Not Available"
        );
      }
    };

    if (apiResponse) {
      createEntry();
    }
  }, [apiResponse]);

  const stopSession = () => {
    // clearAllRecordings();
    // clearError();
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
        const formData = new FormData();
        formData.append("video", selectedFile);

        const response = await fetch("http://localhost:8080/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setApiResponse(data);
        setRecommendedGenre(getRecommendedGenre(data.ambiance));
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

      {apiResponse ? (
        <div className=" grow">
          <div className="flex flex-col items-center justify-center p-4">
            <p>Current Ambiance</p>
            <h1 className="text-2xl">{apiResponse.ambiance}</h1>
          </div>
          <Separator />
          <div className="flex items-center justify-between p-2">
            <div>
              <p>Human Count: {apiResponse.humancount}</p>
              <p>Sound Level: {apiResponse.soundlevel}</p>
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
