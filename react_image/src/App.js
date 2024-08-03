import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
      fetchImages();
  }, []);

  const fetchImages = async () => {
      try {
          const response = await axios.get('http://localhost:5000/images');
          setImages(response.data);
      } catch (error) {
          console.error('Error fetching images', error);
      }
  };

  const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
          const response = await axios.post('http://localhost:5000/upload', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          setUploadedImage(response.data.filePath);
          fetchImages(); // Refresh the list of images after upload
      } catch (error) {
          console.error('Error uploading the image', error);
      }
  };

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Upload Image
                        </label>
                        <input type="file" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Upload
                    </button>
                </form>
                {uploadedImage && (
                    <div className="bg-white p-6 rounded shadow-md mb-6">
                        <h3 className="text-gray-700 text-lg font-bold mb-2">Uploaded Image:</h3>
                        <img src={`http://localhost:5000/${uploadedImage}`} alt="Uploaded" className="mt-2 max-w-full" />
                    </div>
                )}
                <div className="bg-white p-6 rounded shadow-md w-full">
                    <h3 className="text-gray-700 text-lg font-bold mb-2">All Images:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                        <div
                            key={image._id}
                            className="bg-gray-100 p-4 rounded shadow-md flex justify-center"
                            onClick={() => handlePreview(`http://localhost:5000/${image.filename}`)}
                        >
                            <img
                            src={`http://localhost:5000/${image.filename}`}
                            alt={image.originalName}
                            className="w-64 h-64 object-cover rounded-md"
                            style={{ width: '250px', height: '250px' }}
                            />
                        </div>
                        ))}
                    </div>
                    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    </div>
            </div>
        </div>
    );
}

export default App;

