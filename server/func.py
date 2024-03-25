import librosa
import numpy as np
from util import AudioClassifier
import soundfile as sf
from ultralytics import YOLO
import torch
from constants import audio_classes, video_classes
import cv2
import statistics
from moviepy.editor import VideoFileClip

# ml_functions.py
def get_ambiance(num_people, audio_class):
    if audio_class in ['babble', 'tableforone'] and num_people <= 2:
        return 'Quiet and Calm'
    elif audio_class in ['cafeteria', 'chatter', 'cocktailparty', 'downstairs', 'soundproofed', 'waiting'] and num_people > 5:
        return 'Lively and Energetic'
    elif audio_class in ['patronsonly', 'tableinfront'] and num_people <= 5:
        return 'Cozy and Intimate'
    elif audio_class in ['cafeteria', 'chatter', 'cocktailparty', 'downstairs', 'soundproofed', 'waiting'] and num_people > 10:
        return 'Busy and Bustling'
    else:
        return 'Unclassified'

def get_human_count(video_path):
    # Your human count ML logic here
    # Load the YOLO model
    video_model = YOLO("yolov8n.pt")
    cap = cv2.VideoCapture(video_path)

    # Load the video
    video = VideoFileClip(video_path)
    # Frame rate of the video
    frame_rate = video.fps
    # Number of frames in 5 seconds
    frames_in_5_sec = int(5 * frame_rate)

    count = []

    for _ in range(int(frames_in_5_sec)):
        ret, frame = cap.read()
        if not ret:
            break

        if ret:
            og_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = og_frame.copy()

            # results = video_model(frame, device=0, classes=0, conf=0.8)
            results = video_model(frame, device='cpu', classes=0, conf=0.5)

            for result in results:
                boxes = result.boxes  # Boxes object for bbox outputs
                # probs = result.probs  # Class probabilities for classification outputs
                cls = boxes.cls.tolist()  # Convert tensor to list
                count.append(len(cls))
                # for class_index in cls:
                #     class_name = video_classes[int(class_index)]

    print(count)
    try:
        return statistics.mean(count)
    except statistics.StatisticsError:
        return None

def get_sound_level(video_path):
    video = VideoFileClip(video_path)
    audio_file = video.audio
    audio_file.write_audiofile('output/temp_audio.wav')
    # Your sound level ML logic here
    # Load the trained audio model
    audio_model = AudioClassifier()
    audio_model.load_state_dict(torch.load('audio_model.pth'))
    sound_level = process_audio('output/temp_audio.wav', audio_model)
    return sound_level

def process_audio(audio_path, model):
    # Read the audio file
    audio, sr = sf.read(audio_path)
    # If the audio has two channels (stereo), convert it to mono
    if len(audio.shape) > 1 and audio.shape[1] == 2:
        audio = np.mean(audio, axis=1)
    # Resample the audio to 8000 Hz
    audio = librosa.resample(y=audio, orig_sr=sr, target_sr=8000)
    # Define the maximum length of the audio: 5 seconds * 8000 Hz
    max_length = 5 * 8000
    # If the audio is shorter than the maximum length, pad it with zeros
    if len(audio) < max_length:
        audio = np.pad(audio, (0, max_length - len(audio)))
    # If the audio is longer than the maximum length, truncate it
    elif len(audio) > max_length:
        audio = audio[:max_length]
    # Reshape the audio to the shape expected by the model
    audio = audio.reshape(1, 1, -1)
    # Convert the audio to a PyTorch tensor
    audio_tensor = torch.Tensor(audio).unsqueeze(0)
    # Use the model to predict the audio level
    outputs = model(audio_tensor)
    # Get the class with the highest predicted probability
    _, predicted = torch.max(outputs.data, 1)
    # Convert the predicted class index to a class name
    audio_level = audio_classes[predicted.item()]
    return audio_level
