"use client";
import { useState, useEffect } from "react";
import Guard from "@/components/Guard";
import { useApp } from "@/lib/app";
import { categoryColor } from "@/lib/mock";
import { todayStr, daysBetween, ddayLabel } from "@/lib/util";
import styles from "./calendar.module.css";

const pad = (n) => String(n).padStart(2, "0");
const key = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

function Inner() {
  const { events, rsvp, setRsvp } = useApp();
  const [cursor, setCursor] = useState({ y: 2026, m: 9 });
  const [selectedId, setSelectedId] = useState(null);
  const [today, setToday] = useState(null);
  useEffect(() => setToday(todayStr()), []);

  const selected = events.find((e) => e.id === selectedId);
  const first = new Date(cursor.y, cursor.m, 1).getDay();
  const days = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const on = (d) => events.filter((e) => key(cursor.y, cursor.m, d) >= e.date && key(cursor.y, cursor.m, d) <= e.end);
  const shift = (d) => setCursor(({ y, m }) => { const t = new Date(y, m + d, 1); return { y: t.getFullYear(), m: t.getMonth() }; });
  const monthEvents = events.filter((e) => e.date.startsWith(`${cursor.y}-${pad(cursor.m + 1)}`)).sort((a, b) => a.date.localeCompare(b.date));
  const yes = (e) => e.yes + (rsvp[e.id] === "yes" ? 1 : 0);

  return (
    <main className="container">
      <div className="page-title">
        <h1>📅 청년부 일정</h1>
        <div className={styles.legend}>
          {Object.entries(categoryColor).map(([k, c]) => <span key={k}><i style={{ background: c }} />{k}</span>)}
        </div>
      </div>

      <div className="card">
        <div className={styles.head}>
          <button className="btn ghost" onClick={() => shift(-1)}>‹</button>
          <h2 style={{ margin: 0 }}>{cursor.y}년 {cursor.m + 1}월</h2>
          <button className="btn ghost" onClick={() => shift(1)}>›</button>
        </div>
        <div className={styles.grid}>
          {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => <div key={d} className={styles.dow} style={i === 0 ? { color: "#d84315" } : {}}>{d}</div>)}
          {cells.map((d, i) => {
            const es = d ? on(d) : [];
            const isToday = d && today === key(cursor.y, cursor.m, d);
            return (
              <div key={i} className={`${styles.cell} ${d ? "" : styles.empty}`}>
                {d && <span className={isToday ? styles.today : ""}>{d}</span>}
                {es.map((e) => (
                  <button key={e.id} className={styles.ev} style={{ background: categoryColor[e.category] }} onClick={() => setSelectedId(e.id)}>{e.title}</button>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h2>이번 달 일정</h2>
        {monthEvents.length === 0 && <p style={{ color: "var(--muted)" }}>등록된 일정이 없어요.</p>}
        {monthEvents.map((e) => (
          <button key={e.id} className={styles.row} onClick={() => setSelectedId(e.id)}>
            <i style={{ background: categoryColor[e.category] }} />
            <strong>{e.title}</strong>
            {today && e.end >= today && <em className={styles.dd}>{ddayLabel(daysBetween(today, e.date))}</em>}
            <time>{e.date.slice(5)}{e.end !== e.date && ` ~ ${e.end.slice(5)}`}</time>
          </button>
        ))}
      </div>

      {selected && (
        <div className={styles.modalBg} onClick={() => setSelectedId(null)}>
          <div className={`card ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
            <span className={styles.tag} style={{ background: categoryColor[selected.category] }}>{selected.category}</span>
            <h2 style={{ marginTop: 8 }}>{selected.title}</h2>
            <p>📆 {selected.date}{selected.end !== selected.date && ` ~ ${selected.end}`}</p>
            <p>📍 {selected.place}</p>
            <p style={{ marginTop: 8 }}>{selected.desc}</p>
            <p className={styles.count}>✅ 참석 {yes(selected)}명</p>
            <div className={styles.rsvp}>
              <button className={rsvp[selected.id] === "yes" ? styles.yes : ""} onClick={() => setRsvp(selected.id, "yes")}>참석</button>
              <button className={rsvp[selected.id] === "no" ? styles.no : ""} onClick={() => setRsvp(selected.id, "no")}>불참</button>
            </div>
            <button className="btn ghost" style={{ marginTop: 14 }} onClick={() => setSelectedId(null)}>닫기</button>
          </div>
        </div>
      )}
    </main>
  );
}
export default function Calendar() { return <Guard><Inner /></Guard>; }
