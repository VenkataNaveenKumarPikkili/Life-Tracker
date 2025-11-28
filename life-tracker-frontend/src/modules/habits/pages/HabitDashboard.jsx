import React, { useState, useEffect } from "react";
import AnalyticsPro from "../components/AnalyticsPro";
import AICoachV3 from "../components/AICoachV3";
import "../styles/habits.css";

const today = new Date();

// Compare YYYY/MM
function compare(y1,m1,y2,m2){
  if(y1<m2) return -1;
  if(y1>y2) return 1;
  if(m1<m2) return -1;
  if(m1>m2) return 1;
  return 0;
}

export default function HabitDashboard(){

  const [month,setMonth]=useState(today.getMonth());
  const [year,setYear]=useState(today.getFullYear());
  const [input,setInput]=useState("");

  const [start,setStart]=useState(()=>JSON.parse(localStorage.getItem("habitStart")||"null"));

  const key=`habit-${year}-${month}`;
  const [habits,setHabits]=useState(()=>JSON.parse(localStorage.getItem(key)||"[]"));

  const days=new Date(year,month+1,0).getDate();
  const label=new Date(year,month).toLocaleString("en",{month:"long",year:"numeric"});

  // load month change
  useEffect(()=>{
    setHabits(JSON.parse(localStorage.getItem(key)||"[]"));
  },[key]);

  // save month state
  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(habits));
  },[habits])

  const addHabit=()=>{
    if(!input.trim()) return;

    // Set starting month only once
    if(!start){
      const s={year,month};
      setStart(s);
      localStorage.setItem("habitStart",JSON.stringify(s));
    }

    setHabits(p=>[...p,{name:input,tracker:{}}]);
    setInput("");
  };

  const toggle=(i,day)=>{
    const futureMonth = compare(year,month,today.getFullYear(),today.getMonth())===1;
    if(futureMonth) return;

    const futureDay = (month===today.getMonth() && year===today.getFullYear() && day>today.getDate());
    if(futureDay) return;

    setHabits(p=>{
      let list=[...p];
      let h={...list[i]};
      let t={...(h.tracker||{})};
      t[day]=!t[day];
      h.tracker=t;
      list[i]=h;
      return list;
    });
  };

  const remove=i=>setHabits(p=>p.filter((_,x)=>x!==i));

  const minStart=start? compare(year,month,start.year,start.month)>=0 : true;
  const maxToday=compare(year,month,today.getFullYear(),today.getMonth())<=0;

  return(
    <div className="wrapper">
      
      {/* HEADER */}
      <h1>🔥 Habit Dashboard PRO</h1>
      <p>Input left • Month selector beside it • Track only present+future months • Analytics on right</p>

      {/* INPUT + MONTH SIDE-BY-SIDE */}
      <div className="topControls">
        
        <div className="leftInput">
          <input value={input} placeholder="Add new habit..." onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addHabit()}/>
          <button onClick={addHabit}>Add +</button>
        </div>

        <div className="rightMonth">
          <button disabled={!minStart} onClick={()=>setMonth(m=>m===0?(setYear(y=>y-1),11):m-1)}>◀</button>
          <h2>{label}</h2>
          <button disabled={!maxToday} onClick={()=>setMonth(m=>m===11?(setYear(y=>y+1),0):m+1)}>▶</button>
        </div>

      </div>

      <div className="layout">

        {/* HABIT GRID */}
        <main className="tableBox">

          {/* HEADER COLUMNS */}
          <div className="row head">
            <div className="nameCell">Habit</div>
            {Array.from({length:days},(_,i)=>(<div key={i} className="day">{i+1}</div>))}
            <div></div>
          </div>

          {/* HABIT ROWS */}
          {habits.map((h,i)=>(
            <div className="row" key={i}>
              <div className="nameCell">{h.name}</div>

              {Array.from({length:days},(_,d)=>{
                const day=d+1;
                const done=h.tracker?.[day];

                // disable future
                const futureDay = (year===today.getFullYear() && month===today.getMonth() && day>today.getDate());

                return(
                  <div key={d}
                    className={`cell ${done?"ok":""} ${futureDay?"block":""}`}
                    onClick={()=>!futureDay && toggle(i,day)}
                  >
                    {done?"✔":""}
                  </div>
                )
              })}

              <button className="del" onClick={()=>remove(i)}>✖</button>
            </div>
          ))}

        </main>

        {/* RIGHT PANEL FIXED + CLEAN */}
        <aside className="rightPanel">
          <AnalyticsPro habits={habits} days={days}/>
          <AICoachV3 habits={habits} days={days}/>
        </aside>

      </div>
    </div>
  )
}
