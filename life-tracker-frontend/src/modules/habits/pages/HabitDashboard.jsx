import { useState, useEffect } from "react";
import "../styles/habits.css";

const days = [...Array(30)].map((_, i) => i + 1);
const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function HabitDashboard() {
  const [habits, setHabits] = useState(() =>
    JSON.parse(localStorage.getItem("habit_app_v5") || "[]")
  );
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    localStorage.setItem("habit_app_v5", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits([...habits, { name: newHabit, days: Array(30).fill(false) }]);
    setNewHabit("");
  };

  const toggleDay = (hi, di) => {
    const clone = structuredClone(habits);
    clone[hi].days[di] = !clone[hi].days[di];
    setHabits(clone);
  };

  const remove = (i) => setHabits(habits.filter((_,x)=>x!==i));
  const progress = arr => ((arr.filter(Boolean).length / 30) * 100).toFixed(0);

  return (
    <div className="wrap">

      <header>
        <h1>Habit Dashboard</h1>
        <p>Clean • Balanced • PRO Productivity UI</p>
      </header>

      <div className="inputRow">
        <input placeholder="Add habit..." 
          value={newHabit}
          onChange={e=>setNewHabit(e.target.value)}
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>

      {/* -------- TABLE -------- */}
      <div className="habitGrid">

        {/* HEADER */}
        <div className="row head">
          <div className="habitNameCol">Habit</div>
          {days.map((d,i)=>(
            <div key={i} className="dayHead">
              <span>{week[i%7]}</span>
              <b>{d}</b>
            </div>
          ))}
          <div></div>
        </div>

        {/* BODY */}
        {habits.map((h,i)=>(
          <div key={i} className="row">
            <div className="habitNameCol">{h.name}</div>

            {h.days.map((v,d)=>(
              <div key={d} className="dayCell">
                <input type="checkbox" checked={v} onChange={()=>toggleDay(i,d)} />
              </div>
            ))}

            <button className="del" onClick={()=>remove(i)}>✕</button>
          </div>
        ))}

      </div>


      {/* -------- ANALYTICS -------- */}
      <section className="analytics">
        <h2>📊 Analytics Overview</h2>

        {habits.length===0 && <p>No habits yet</p>}

        {habits.map((h,i)=>(
          <div className="stat" key={i}>
            <span>{h.name}</span>
            <div className="bar"><div style={{width:`${progress(h.days)}%`}} /></div>
            <p>{progress(h.days)}%</p>
          </div>
        ))}
      </section>

    </div>
  );
}
