# Define constants
DATASET_PATH = 'dataset'
FRAME_PATH = 'output/frames'
SPECTROGRAM_PATH = 'output/spectrograms'
MFCC_PATH = 'output/mfccs'
CLASSES = ['Quiet and Calm', 'Lively and Energetic', 'Cozy and Intimate', 'Busy and Bustling']
FRAME_INPUT_SHAPE = (10, 224, 224, 3)  # 10 frames, each frame of shape 224x224x3
SPECTROGRAM_INPUT_SHAPE = (224, 224, 3)
MFCC_INPUT_SHAPE = (224, 224, 3)
BATCH_SIZE = 16
EPOCHS = 20
TEST_SIZE = 0.3