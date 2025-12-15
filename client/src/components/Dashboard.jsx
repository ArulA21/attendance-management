import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AddStudents } from './AddStudents';
import { MarkAttendance } from './MarkAttendance';
import { Analytics } from './Analytics';

export const Dashboard = () => {
  const [active, setActive] = useState('add');

  return (
    <div>
      <Header />

      <div className="flex w-full">
        <div className='w-[15%]'>
          <Sidebar active={active} setActive={setActive} />
        </div>

        <div className="p-6 w-[85%]">
          {active === 'add' && <AddStudents />}
          {active === 'attendance' && <MarkAttendance />}
          {active === 'analytics' && <Analytics />}
        </div>
      </div>
    </div>
  );
};
