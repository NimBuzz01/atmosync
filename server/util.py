# Third-party library imports
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend (e.g., 'Agg') if working in a non-GUI environment

import matplotlib.pyplot as plt
import cv2
import librosa
import librosa.display
from PIL import Image

def extract_frames(video_path, frame_path):
    video = cv2.VideoCapture(video_path)
    frames = []
    last_frame = None
    fps = int(video.get(cv2.CAP_PROP_FPS))  # Get the frames per second of the video

    while video.isOpened() and len(frames) < 10:  # Only process the first 10 frames
        ret, frame = video.read()
        if not ret:
            break
        if int(video.get(cv2.CAP_PROP_POS_FRAMES)) % fps == 0:  # Only process a frame if it's a second mark
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
            frame = frame[:, :, :3]  # Ensure there are only 3 channels
            frame = cv2.resize(frame, (224, 224))  # Resize the frame to desired dimensions
            frames.append(frame)
            last_frame = frame

    video.release()

    # Fill up with previous frames if less than 10 frames are created
    while len(frames) < 10 and last_frame is not None:
        frames.append(last_frame)

    # Save each frame as a .png file
    for i, frame in enumerate(frames):
        image = Image.fromarray(frame)
        image.save(f"{frame_path}_{i}.png")
    
    print('frames extracted...')

def extract_spectrogram_and_mfcc(audio_file, spectrogram_file, mfcc_file, num_mfcc=13):
    y, sr = librosa.load(audio_file, sr=None)

    # Create the spectrogram
    fig, ax = plt.subplots()
    ms = librosa.feature.melspectrogram(y=y, sr=sr)
    log_ms = librosa.power_to_db(ms, ref=np.max)
    librosa.display.specshow(log_ms, sr=sr, ax=ax)
    fig.savefig(spectrogram_file)
    plt.close(fig)

    print('spectrogram extracted...')

    # Extract MFCCs
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=num_mfcc)

    # Save the MFCCs as a PNG file
    fig, ax = plt.subplots()
    img = librosa.display.specshow(mfccs, x_axis='time', ax=ax)
    fig.colorbar(img, ax=ax)
    fig.savefig(mfcc_file)
    plt.close(fig)

    print('mfcc extracted...')

def return_ambiance(ambiance):
    if ambiance == "Quiet and Calm":
        return "Busy and Bustling"
    elif ambiance == "Lively and Energetic":
        return "Cozy and Intimate"
    elif ambiance == "Cozy and Intimate":
        return "Lively and Energetic"
    elif ambiance == "Busy and Bustling":
        return "Quiet and Calm"
