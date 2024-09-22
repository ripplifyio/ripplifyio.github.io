import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const OptionGroup = ({ title, icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='option-group'>
      <div className='option-group-header' onClick={toggleExpand}>
        <FontAwesomeIcon icon={icon} />
        <h3>{title}</h3>
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
      </div>
      {isExpanded && (
        <div className='option-group-content'>
          {children}
        </div>
      )}
    </div>
  );
};

export default OptionGroup;