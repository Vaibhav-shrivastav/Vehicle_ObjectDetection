# Object Detection Web Application

This is a web application for performing object detection on images using a Flask backend and a React frontend.

## Overview

The application consists of two main components:
1. **Backend (Flask API)**: This component handles the object detection process using the YOLOv3 model. It receives images from the frontend, processes them, detects objects, and returns the processed images with bounding boxes around detected objects.
2. **Frontend (React)**: This component allows users to upload images and view the results of object detection. Users can select an image from their local machine, upload it to the backend for processing, and then view the processed image with bounding boxes around detected objects.

## Video Demo
You can watch a video demo of the application [here](https://drive.google.com/drive/folders/13LHShoeadLvC-ZokS6h7hdmmfyDoYQj-?usp=sharing).


## Prerequisites

Before running the application, make sure you have the following installed:
- Docker
- Docker Compose

## Usage

To run the application, follow these steps:

1. Clone this repository to your local machine:

    ```
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```
    cd object-detection-web-app
    ```

3. Build the Docker images:

    ```
    docker-compose build
    ```

4. Start the Docker containers:

    ```
    docker-compose up
    ```

5. Access the frontend in your web browser at [http://localhost:3000](http://localhost:3000).

## How to Use

1. Once the frontend is running, you'll see the Object Detection interface.
2. Click on the "Choose File" button to select an image from your local machine.
3. After selecting the image, click on the "Upload" button to start the object detection process.
4. Once the processing is complete, you'll see the processed image with bounding boxes around detected objects.
5. You can repeat the process with different images as needed.

## Additional Information

- The Flask backend exposes the `/upload` endpoint for handling image uploads and performing object detection.
- The React frontend sends image files to the backend for processing and displays the processed images with bounding boxes.
