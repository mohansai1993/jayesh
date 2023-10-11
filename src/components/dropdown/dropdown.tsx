import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const HeaderDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center space-x-1 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
      >
        <span>Dropdown</span>
        <FaChevronDown />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg"
          onClick={() => setIsOpen(false)}
        >
          {/* Dropdown content */}
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Option 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Option 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
