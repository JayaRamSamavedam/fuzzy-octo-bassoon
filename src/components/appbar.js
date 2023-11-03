import React, { useState } from 'react';
import Switcher from './Switcher';

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='dark:bg-black'>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com" className="flex items-center">
            {/* Your logo and title */}
          </a>
          <div className="flex">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3"
              onClick={openModal}
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Your navigation content here */}
      
      {isModalOpen && (
        <div id="authentication-modal" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative w-full max-w-md max-h-full">
            {/* Your modal content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
