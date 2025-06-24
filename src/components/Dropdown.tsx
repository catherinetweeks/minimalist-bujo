import { useState } from "react";

interface DropdownProps<T extends string> {
  label?: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

const Dropdown = <T extends string>({
  label,
  options,
  value,
  onChange,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {label && <label className="block text-sm mb-1">{label}</label>}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-white border border-black text-black px-3 py-2 rounded shadow-sm text-sm w-40 text-left"
      >
        {value[0].toUpperCase() + value.slice(1)}
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-40 rounded shadow bg-white border border-black z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;