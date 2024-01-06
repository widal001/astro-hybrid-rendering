import React from "react";

interface TileButtonProps {
  text: string;
  onClick: () => void;
  active?: boolean;
}

const TileButton: React.FC<TileButtonProps> = ({
  text,
  onClick,
  active = false,
}) => {
  const baseClasses = "px-4 py-2 rounded-full text-sm font-medium";
  const activeClasses = active
    ? "bg-indigo-600 text-white hover:bg-indigo-700"
    : "bg-gray-200 text-gray-600 hover:bg-gray-300";

  return (
    <button
      type="button"
      className={`${baseClasses} ${activeClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default TileButton;
