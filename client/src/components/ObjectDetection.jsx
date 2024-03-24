import React, { useState } from 'react';
import axios from 'axios';
import { toast , ToastContainer} from 'react-toastify';

function ObjectDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [objectCount, setObjectCount] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const [resp, setResp] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setUploadError("");
    setProcessedImage("");
    setObjectCount(null);
    setResp(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    const API_URL = 'http://localhost:5000';

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResp(false);

      // Update processed image and object count state
      setProcessedImage(response.data.processed_image);
      setObjectCount(response.data.object_count);
    } catch (error) {
      setResp(false);
      console.error('Error uploading file:', error);
      toast.error("Error uploading file", {
        position: "top-center"
      })
      setUploadError('Error uploading file. Please try again.');
    }
  };

  return (
    <div className='m-5 text-center'>
      <p className='text-xl my-4 font-semibold text-green-500'>Object Detection</p>
      <input type="file"  onChange={handleFileChange} className="file-input file-input-bordered file-input-accent w-full max-w-xs" /><br />
      <div className="flex flex-row justify-evenly">
        <div className="one m-4">
        {selectedFile && selectedFile instanceof File && (
        <div>
          <span className=' m-4 bg-primary text-black rounded p-2'>Original Image</span>
          {" "} <br />
          <img src={URL.createObjectURL(selectedFile)} alt="Original" className='my-3' style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
        </div>
        <div className="two m-4">
          {resp ? <span className="loading loading-ring loading-lg"></span>: <></>}
        {processedImage && (
        <div>
          <span className=' m-4 bg-secondary text-black rounded p-2'>Processed Image</span>
          <img src={`data:image/jpeg;base64,${processedImage}`} className='my-3' alt="Processed" />
          {objectCount !== null && <p>Object count: {objectCount}</p>}
        </div>
      )}
        </div>
      </div>
      <button onClick={handleUpload} className="btn btn-active btn-secondary my-3">Upload</button>

      

      {uploadError && <p> <span className='bg-red-500 m-2 text-black rounded p-2'>{uploadError}</span></p> }
    </div>
  );
}

export default ObjectDetection;
