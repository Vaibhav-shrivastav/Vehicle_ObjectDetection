from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app)

# Load YOLOv3 model and configuration
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")
classes = []
with open("coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]
layer_names = net.getLayerNames()

# If the output is a scalar, adjust the code to handle it appropriately
# For example:
output_layers = [layer_names[net.getUnconnectedOutLayers()[0] - 1]]

# Function to perform object detection
def detect_objects(image):
    height, width, channels = image.shape

    # Preprocess image for YOLOv3
    blob = cv2.dnn.blobFromImage(image, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    # Process detection results
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5 and class_id == 2:  # Class ID 2 represents vehicles in COCO dataset
                # Get bounding box coordinates
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                # Draw bounding box around the vehicle
                cv2.rectangle(image, (center_x - w // 2, center_y - h // 2), (center_x + w // 2, center_y + h // 2), (255, 0, 0), 2)
    
    return image

@app.route('/')
def home():
    return "Welcome to Vehicle Object Detection API"

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        # Read the image file
        image_stream = file.read()
        nparr = np.fromstring(image_stream, np.uint8)
        # Decode image
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Perform object detection
        processed_image = detect_objects(image)
        
        # Convert processed image back to bytes
        _, processed_image_stream = cv2.imencode('.jpg', processed_image)
        processed_image_bytes = processed_image_stream.tobytes()
        
        # Encode processed image bytes to base64
        processed_image_base64 = base64.b64encode(processed_image_bytes).decode('utf-8')
        
        # Send the processed image back to the frontend
        return jsonify({'processed_image': processed_image_base64})

if __name__ == '__main__':
    app.run(debug=True)
