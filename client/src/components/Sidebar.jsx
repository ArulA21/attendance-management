import React from 'react';

export const Sidebar = ({ active, setActive }) => {
  const itemClass = (name) =>
    `px-5 py-2 cursor-pointer transition
     ${active === name
       ? 'bg-gray-200 font-semibold border-l-4 border-black'
       : 'hover:bg-gray-100'}`;

  return (
    <div className="w-[300px] border-r min-h-screen pt-5">
      <div onClick={() => setActive('add')} className={itemClass('add')}>
        Students
      </div>

      <div onClick={() => setActive('attendance')} className={itemClass('attendance')}>
        Mark Attendance
      </div>

      <div onClick={() => setActive('analytics')} className={itemClass('analytics')}>
        Analytics
      </div>
    </div>
  );
};
