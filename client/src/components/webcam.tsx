"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";

interface ApiResponse {
  ambiance: string;
  humancount: string;
  soundlevel: string;
  recommended_genre: string;
}

const WebcamComponent: React.FC = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm;codecs=vp8,opus",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
      setTimeout(() => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          setCapturing(false);
        }
      }, 5000); // stop recording after 5 seconds
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  useEffect(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm;codecs=vp8,opus",
      });
      // send the blob to your backend API
      // you can use the fetch API to do this
      const formData = new FormData();
      formData.append("video", blob, "temp_video.webm");

      fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => setApiResponse(data));
      setRecordedChunks([]);
      console.log(blob);
    }
  }, [recordedChunks]);

  return (
    <div>
      <Webcam audio={true} ref={webcamRef} muted />

      <button onClick={handleStartCaptureClick}>Start Capture</button>
      {apiResponse && (
        <div>
          <p>Ambiance: {apiResponse.ambiance}</p>
          <p>Human Count: {apiResponse.humancount}</p>
          <p>Sound Level: {apiResponse.soundlevel}</p>
          <p>Recommended Genre: {apiResponse.recommended_genre}</p>
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
