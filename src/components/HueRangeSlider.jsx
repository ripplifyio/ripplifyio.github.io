import React, { useState, useEffect, useRef } from 'react';

const HueRangeSlider = ({ value, onChange }) => {
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
    const newValue = Math.max(0, Math.min(Math.round(position * 360), 360));

    if (isDragging === 'start') {
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
      hsl(0, 85%, 60%),
      hsl(60, 85%, 60%),
      hsl(120, 85%, 60%),
      hsl(180, 85%, 60%),
      hsl(240, 85%, 60%),
      hsl(300, 85%, 60%),
      hsl(360, 85%, 60%))`
  };

  return (
    <div className="hue-range-slider" ref={sliderRef} style={gradientStyle}>
      <div
        className="handle start"
        style={{ left: `${(value.min / 360) * 100}%` }}
        onMouseDown={handleMouseDown('start')}
      />
      <div
        className="handle end"
        style={{ left: `${(value.max / 360) * 100}%` }}
        onMouseDown={handleMouseDown('end')}
      />
    </div>
  );
};

export default HueRangeSlider;