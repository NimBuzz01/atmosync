from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess

from func import get_ambiance, get_human_count, get_sound_level, get_music_genre

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

    # Call ML functions for ambiance, human count, and sound level
    human_count = get_human_count(video_path)
    sound_level = get_sound_level(video_path)

    ambiance_result = get_ambiance(human_count, sound_level)

    # Determine recommended music genre based on results
    recommended_genre = get_music_genre(ambiance_result)

    # Return results as JSON
    return jsonify({
        'ambiance': ambiance_result,
        'humancount': human_count,
        'soundlevel': sound_level,
        'recommended_genre': recommended_genre,
    })

# api/home
@app.route("/api/home", methods=["GET"])
def return_home():
    return jsonify({"message":"Hello World!"})

if __name__ == "__main__":
    app.run(debug=True, port=8080)
