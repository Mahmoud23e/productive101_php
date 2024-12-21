'use client';
import Taps from "../app/component/taps/taps";
import { useCallback, useState } from "react";
import ToDo from "../app/component/Todo/todo";
import Timer from "../app/component/timer/timer";
import Notes from "../app/component/note/note";

export default function Home() {

  const [selectedTab, setselectedTab]=useState('ToDo');
  const handleTabClick=useCallback((tabName)=>{
    setselectedTab(tabName); 
  },[]);
  return (
    <div className="grid grid-rows-[20px_500px_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Taps onTabClick={handleTabClick} />
        {selectedTab === 'ToDo' && <ToDo />}
        {selectedTab === 'Notes' && <Notes />}
        {selectedTab === 'Timer' && <Timer />}
        </main>
    </div>
  );
}
