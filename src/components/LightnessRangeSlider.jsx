import React, { useState, useEffect, useRef } from 'react';

const LightnessRangeSlider = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(null);
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = (handle) => (e) => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newValue = Math.max(0, Math.min(Math.round(position * 100), 100));

    if (isDragging === 'min') {
      onChange({ ...value, min: Math.min(newValue, value.max) });
    } else {
      onChange({ ...value, max: Math.max(newValue, value.min) });
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isDragging]);

  const gradientStyle = {
    background: `linear-gradient(to right,
      hsl(141, 73%, 0%),
      hsl(141, 73%, 50%),
      hsl(141, 73%, 100%))`
  };

  return (
    <div className="lightness-range-slider" ref={sliderRef} style={gradientStyle}>
      <div
        className="handle min"
        style={{ left: `${value.min}%` }}
        onMouseDown={handleMouseDown('min')}
      />
      <div
        className="handle max"
        style={{ left: `${value.max}%` }}
        onMouseDown={handleMouseDown('max')}
      />
    </div>
  );
};

export default LightnessRangeSlider;