import React from 'react';

interface PillProps {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const Pill: React.FC<PillProps> = ({ label, onClick, isActive = false }) => {
  return (
    <button 
      className={`pill ${isActive ? 'pill-active' : ''}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Pill;
