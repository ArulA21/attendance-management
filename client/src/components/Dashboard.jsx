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

      <div className="flex">
        <Sidebar active={active} setActive={setActive} />

        <div className="flex-1 p-6">
          {active === 'add' && <AddStudents />}
          {active === 'attendance' && <MarkAttendance />}
          {active === 'analytics' && <Analytics />}
        </div>
      </div>
    </div>
  );
};
