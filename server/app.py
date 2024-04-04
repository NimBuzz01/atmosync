from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import keras
import numpy as np

from func import predict_ambiance, preprocess_video_for_prediction
from constants import CLASSES, FRAME_PATH, MFCC_PATH, SPECTROGRAM_PATH
from util import return_ambiance

#app instance
app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_video():
    video_file = request.files['video']
    # Ensure the directory exists
    os.makedirs('uploads', exist_ok=True)
    os.makedirs('output', exist_ok=True)
    # Save the video to a temporary location
    video_path = os.path.join('uploads', 'temp_video.webm')
    video_file.save(video_path)
    print('video saved...')

    # Define your model
    test_model = keras.saving.load_model("fusion_model.keras")

    # Preprocess the video for prediction
    X_frames, X_spectrograms, X_mfccs = preprocess_video_for_prediction(video_path, FRAME_PATH, SPECTROGRAM_PATH, MFCC_PATH)
    print('video preprocessed...')

    # Predict ambiance
    predictions = predict_ambiance(test_model, X_frames, X_spectrograms, X_mfccs)

    # Display the predicted probabilities for each class
    for i, probability in enumerate(predictions[0]):
        ambiance = CLASSES[i]
        print(f"Probability of {ambiance}: {probability}")

    # Get the index with the highest probability
    predicted_index = np.argmax(predictions)
    # Get the predicted ambiance label
    predicted_ambiance = CLASSES[predicted_index]

    predicted_ambiance = return_ambiance(predicted_ambiance)
    # Print the predicted ambiance label
    print("Predicted ambiance:", predicted_ambiance)

    # Return results as JSON
    return jsonify({
        'ambiance': predicted_ambiance,
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)
