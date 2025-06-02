'use client';
import React, { useState } from 'react';
import Image from 'next/image';

function FileUpload({ setImages }) {
  const [imagePreview, setImagePreview] = useState([]);

  const handlerFileUpload = (e) => {
    const files = Array.from(e.target.files);

    // Update image preview
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);

    // Send formatted file objects to parent
    setImages(files); // This will be handled properly in the parent
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
              5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 
              4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG or JPEG (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          onChange={handlerFileUpload}
          className="hidden"
        />
      </label>

      {imagePreview.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imagePreview.map((preview, index) => (
            <Image
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              width={150}
              height={150}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
