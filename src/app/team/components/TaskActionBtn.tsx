import React from 'react';

const TaskActionBtn = ({ actions }) => {
  const buttonStyles = {
    approve: 'bg-blue-500 text-white py-2 px-4 rounded',
    reject: 'bg-red-500 text-white py-2 px-4 rounded',
    report: 'bg-gray-300 text-black py-2 px-4 rounded',
    write: 'bg-yellow-300 text-black py-2 px-4 rounded',
    send: 'bg-blue-500 text-white py-2 px-4 rounded',
    cancel: 'bg-red-500 text-white py-2 px-4 rounded',
  };

  return (
    <div className="flex gap-2">
      {actions.map((action, index) => (
        <button
          key={index}
          className={buttonStyles[action.type]}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default TaskActionBtn;
