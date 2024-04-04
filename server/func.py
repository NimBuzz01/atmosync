# Standard library imports
import os
import glob

# Third-party library imports
import numpy as np
from PIL import Image
from keras.preprocessing import image
import shutil

# Import EfficientNet preprocess_input function
from keras.applications.efficientnet import preprocess_input as preprocess_input_efficientnet
# Import ResNetV2 preprocess_input function
from keras.applications.resnet_v2 import preprocess_input as preprocess_input_resnet_v2

from util import extract_frames, extract_spectrogram_and_mfcc


def preprocess_video_for_prediction(video_path, frame_path, spectrogram_path, mfcc_path):
    # Remove previous directories if they exist
    for path in [frame_path, spectrogram_path, mfcc_path]:
        if os.path.exists(path):
            shutil.rmtree(path)
            
    # Ensure directories for saving extracted data exist
    os.makedirs(frame_path, exist_ok=True)
    os.makedirs(spectrogram_path, exist_ok=True)
    os.makedirs(mfcc_path, exist_ok=True)

    video_filename = os.path.basename(video_path)
    video_base = os.path.splitext(video_filename)[0]

    frame_loc = os.path.join(frame_path, video_base)
    spectrogram_loc = os.path.join(spectrogram_path, video_base)
    mfcc_loc = os.path.join(mfcc_path, video_base)

    print('preprocessing video...')

    extract_frames(video_path, frame_loc)
    extract_spectrogram_and_mfcc(video_path, spectrogram_loc, mfcc_loc)

    # Load preprocessed data
    X_frames, X_spectrograms, X_mfccs = load_preprocessed_data(frame_path, spectrogram_path, mfcc_path)

    return X_frames, X_spectrograms, X_mfccs

def load_preprocessed_data(frame_path, spectrogram_path, mfcc_path):
    X_frames, X_spectrograms, X_mfccs = [], [], []
    # Load frames
    frame_files = glob.glob(os.path.join(frame_path, '*.png'))
    frames = []
    for frame_file in frame_files:        
        frame_path = os.path.join(frame_file)  # Construct full frame file path
        frame = Image.open(frame_path)  # Open the frame image
        frame = frame.resize((224, 224))
        frame = np.array(frame)
        frames.append(frame)
    # Convert frames list to a numpy array and append it to X_frames
    X_frames.append(np.array(frames))
    # Convert X_frames to a numpy array
    X_frames = np.array(X_frames)

    # Load spectrograms
    spectrogram_files = glob.glob(os.path.join(spectrogram_path, '*.png'))
    X_spectrograms = []
    for spectrogram_file in spectrogram_files:
        spectrogram = image.load_img(spectrogram_file, target_size=(224, 224))
        spectrogram = image.img_to_array(spectrogram)
        spectrogram = preprocess_input_resnet_v2(spectrogram)
        X_spectrograms.append(spectrogram)
    X_spectrograms = np.array(X_spectrograms)

    # Load MFCCs
    mfcc_files = glob.glob(os.path.join(mfcc_path, '*.png'))
    X_mfccs = []
    for mfcc_file in mfcc_files:
        mfcc = image.load_img(mfcc_file, target_size=(224, 224))
        mfcc = image.img_to_array(mfcc)
        mfcc = preprocess_input_efficientnet(mfcc)
        X_mfccs.append(mfcc)
    X_mfccs = np.array(X_mfccs)

    return X_frames, X_spectrograms, X_mfccs

def predict_ambiance(model, X_frames, X_spectrograms, X_mfccs):
    # Make predictions using the model
    predictions = model.predict([X_frames, X_spectrograms, X_mfccs])
    return predictions
