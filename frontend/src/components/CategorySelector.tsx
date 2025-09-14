import React from "react";

type Option = {
  label: string;
  icon: string;
};

type CategorySelectorProps = {
  title: string;
  options: Option[];
  onSelect: (value: string) => void;
  selected?: string;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ title, options, onSelect, selected }) => {
  return (
    <div className="bg-[#5b0aa0] rounded-xl overflow-hidden w-full max-w-xl mx-auto my-4">
      {/* Title Bar */}
      <div className="bg-yellow-400 text-black font-semibold text-lg py-2 text-center">
        {title}
      </div>

      {/* Options */}
      <div className="flex justify-between flex-wrap gap-6 py-6 px-4">
        {options.map((option, index) => {
          const isSelected = selected === option.label;
          return (
            <button
              key={index}
              onClick={() => onSelect(option.label)}
              className={`flex flex-col items-center transition-transform duration-200 ${
                isSelected ? "scale-105" : ""
              }`}
            >
              {/* Circle Icon */}
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full shadow-md text-3xl transition-colors duration-200 ${
                  isSelected ? "bg-yellow-400 text-purple-900" : "bg-white text-black"
                }`}
              >
                {option.icon}
              </div>

              {/* Label */}
              <p
                className={`mt-2 text-sm font-semibold transition-colors duration-200 ${
                  isSelected ? "text-white" : "text-white"
                }`}
              >
                {option.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
