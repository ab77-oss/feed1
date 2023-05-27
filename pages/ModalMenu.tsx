import React, { useState } from 'react';

const ModalCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
        onClick={toggleModal}
      >
        Open Modal
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            <p className="text-gray-800 mb-6">Modal content goes here.</p>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
              onClick={toggleModal}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalCard;