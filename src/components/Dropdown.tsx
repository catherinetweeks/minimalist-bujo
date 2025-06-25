import { useState, useRef, useLayoutEffect } from "react";

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
  const textRef = useRef<HTMLSpanElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (textRef.current) {
      const width = textRef.current.offsetWidth;
      setButtonWidth(width + 32); // Add some padding
    }
  }, [value]);

  return (
    <div className="relative inline-block text-left">
      {label && <label className="block text-sm mb-1">{label}</label>}

      {/* Invisible span to measure text width */}
      <span
        ref={textRef}
        className="absolute opacity-0 pointer-events-none whitespace-nowrap"
      >
        {value[0].toUpperCase() + value.slice(1)}
      </span>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-white border text-black px-3 py-2 rounded-xl text-sm text-left"
        style={{ width: buttonWidth }}
      >
        {value[0].toUpperCase() + value.slice(1)}
      </button>

      {isOpen && (
        <div className="absolute mt-1 min-w-full rounded-xl bg-white z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-xl text-sm hover:bg-gray-100"
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