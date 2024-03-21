import React from "react";
import { useRecordWebcam } from "@/lib/packages/react-record-webcam";
import { Button } from "./button";
import { Select } from "./select";

export function WebcamTest() {
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

  const quickDemo = async () => {
    try {
      const recording = await createRecording();
      if (!recording) return;
      await openCamera(recording.id);
      await startRecording(recording.id);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await stopRecording(recording.id);
      await closeCamera(recording.id);
    } catch (error) {
      console.log({ error });
    }
  };

  const start = async () => {
    const recording = await createRecording(videoDeviceId, audioDeviceId);
    if (recording) await openCamera(recording.id);
  };

  return (
    <div className="container p-4 mx-auto text-white">
      <h1 className="text-3xl font-bold">React Record Webcam demo</h1>
      <div className="my-4 space-y-2">
        <div className="flex">
          <h4>Select video input</h4>
          <Select
            items={devicesByType?.video || []}
            dataset="deviceid"
            onChange={handleSelect}
          />
        </div>
        <div className="flex">
          <h4>Select audio input</h4>
          <Select
            items={devicesByType?.audio || []}
            dataset="deviceid"
            onChange={handleSelect}
          />
        </div>
      </div>
      <div className="space-x-2">
        <Button onClick={quickDemo}>Record 3s video</Button>
        <Button onClick={start}>Open camera</Button>
        <Button onClick={() => clearAllRecordings()}>Clear all</Button>
        <Button onClick={() => clearError()}>Clear error</Button>
      </div>
      <div className="my-2">
        <p>{errorMessage ? `Error: ${errorMessage}` : ""}</p>
      </div>
      <div className="grid gap-4 my-4 grid-cols-custom">
        {activeRecordings?.map((recording) => (
          <div className="px-4 py-4 bg-white rounded-lg" key={recording.id}>
            <div className="grid grid-cols-1 text-black">
              <p>Live</p>
              <small>Status: {recording.status}</small>
              <small>Video: {recording.videoLabel}</small>
              <small>Audio: {recording.audioLabel}</small>
            </div>
            <video ref={recording.webcamRef} loop autoPlay playsInline muted />
            <div className="my-2 space-x-1 space-y-1">
              <Button
                inverted
                disabled={
                  recording.status === "RECORDING" ||
                  recording.status === "PAUSED"
                }
                onClick={() => startRecording(recording.id)}
              >
                Record
              </Button>
              <Button
                inverted
                disabled={
                  recording.status !== "RECORDING" &&
                  recording.status !== "PAUSED"
                }
                toggled={recording.status === "PAUSED"}
                onClick={() =>
                  recording.status === "PAUSED"
                    ? resumeRecording(recording.id)
                    : pauseRecording(recording.id)
                }
              >
                {recording.status === "PAUSED" ? "Resume" : "Pause"}
              </Button>
              <Button
                inverted
                toggled={recording.isMuted}
                onClick={() => muteRecording(recording.id)}
              >
                Mute
              </Button>
              <Button inverted onClick={() => stopRecording(recording.id)}>
                Stop
              </Button>
              <Button inverted onClick={() => cancelRecording(recording.id)}>
                Cancel
              </Button>
            </div>

            <div
              className={`${
                recording.previewRef.current?.src.startsWith("blob:")
                  ? "visible"
                  : "hidden"
              }`}
            >
              <p>Preview</p>
              <video ref={recording.previewRef} autoPlay loop playsInline />
              <div className="my-2 space-x-2">
                <Button inverted onClick={() => download(recording.id)}>
                  Download
                </Button>
                <Button inverted onClick={() => clearPreview(recording.id)}>
                  Clear preview
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
