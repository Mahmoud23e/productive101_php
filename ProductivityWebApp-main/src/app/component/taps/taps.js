'use client';
import React from 'react';
import '../taps/taps.css';

import { useState,useEffect } from "react";


export default function Notes({onTabClick}){
  
    
    
    return(
        <>

        <div className="header">
        <button className="container" onClick={()=>onTabClick('ToDo')}>To-Do</button>
        <button className="container" onClick={()=>onTabClick('Notes')}>Notes</button>
        <button className="container" onClick={()=>onTabClick('Timer')}>Pomodoro Timer</button>
        </div>

     </>
    );}