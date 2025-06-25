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
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);

  const textRef = useRef<HTMLSpanElement>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      const width = textRef.current.offsetWidth;
      setButtonWidth(width + 32); // padding
    }
  }, [value]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 200); // delay opening
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);

    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // delay closing
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label && <label className="block text-sm mb-1">{label}</label>}

      <span
        ref={textRef}
        className="absolute opacity-0 pointer-events-none whitespace-nowrap"
      >
        {value[0].toUpperCase() + value.slice(1)}
      </span>

      <button
        className="bg-white hover:bg-gray-50 border text-black px-3 py-2 rounded-xl text-sm text-left"
        style={{ width: buttonWidth }}
      >
        {value[0].toUpperCase() + value.slice(1)}
      </button>

      {isOpen && (
        <div className="absolute mt-1 min-w-full rounded-xl bg-white border z-10 shadow-sm">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-xl text-sm hover:bg-gray-50"
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