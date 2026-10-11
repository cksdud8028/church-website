"use client";
import { useState } from "react";
import Guard from "@/components/Guard";
import { useApp } from "@/lib/app";
import { categoryColor, siteInfo } from "@/lib/mock";
import styles from "./admin.module.css";

const today = () => new Date().toISOString().slice(0, 10);

function Inner() {
  const { notices, events, addNotice: add, removeNotice, togglePublic, addEvent: addEv, removeEvent } = useApp();
  const [tab, setTab] = useState("notice");
  const [nForm, setNForm] = useState({ title: "", body: "", pinned: false, public: false });
  const [eForm, setEForm] = useState({ title: "", date: today(), end: today(), place: "", category: "나들이", desc: "" });
  const [info, setInfo] = useState({ intro: siteInfo.intro, worship: siteInfo.worship.map((w) => `${w.name} | ${w.time} | ${w.place}`).join("\n") });
  const [toast, setToast] = useState("");

  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2000); };

  function addNotice(e) {
    e.preventDefault();
    add(nForm);
    setNForm({ title: "", body: "", pinned: false, public: false });
    flash("공지가 등록되었어요");
  }
  function addEvent(e) {
    e.preventDefault();
    addEv(eForm);
    setEForm({ ...eForm, title: "", place: "", desc: "" });
    flash("일정이 등록되었어요");
  }

  return (
    <main className="container">
      <div className="page-title">
        <h1>🛠 관리자</h1>
        <span className={styles.badge}>공지·일정은 이 브라우저에 저장돼요 (백엔드 연동 전)</span>
      </div>

      <div className={styles.tabs}>
        {[["notice", "공지 관리"], ["event", "일정 관리"], ["info", "교회 소개/예배시간"]].map(([k, l]) => (
          <button key={k} className={tab === k ? styles.on : ""} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "notice" && (
        <>
          <form className={`card ${styles.form}`} onSubmit={addNotice}>
            <h2>공지 작성</h2>
            <input placeholder="제목" required value={nForm.title} onChange={(e) => setNForm({ ...nForm, title: e.target.value })} />
            <textarea placeholder="내용" rows={5} required value={nForm.body} onChange={(e) => setNForm({ ...nForm, body: e.target.value })} />
            <label className={styles.check}><input type="checkbox" checked={nForm.pinned} onChange={(e) => setNForm({ ...nForm, pinned: e.target.checked })} /> 상단 고정</label>
            <label className={styles.check}><input type="checkbox" checked={nForm.public} onChange={(e) => setNForm({ ...nForm, public: e.target.checked })} /> 비로그인 방문자에게도 공개</label>
            <button className="btn" type="submit">등록</button>
          </form>
          <div className="card" style={{ marginTop: 20 }}>
            <h2>등록된 공지 ({notices.length})</h2>
            {notices.map((n) => (
              <details key={n.id} className={styles.notice}>
                <summary className={styles.item}>
                  <span>{n.pinned && <em className={styles.pin}>고정</em>}{n.title}</span>
                  <time>{n.date}</time>
                  <button className={n.public ? styles.pub : styles.priv} onClick={(e) => { e.preventDefault(); togglePublic(n.id); }}>{n.public ? "🌐 공개" : "🔒 멤버전용"}</button>
                  <button onClick={(e) => { e.preventDefault(); removeNotice(n.id); }}>삭제</button>
                </summary>
                <p className={styles.body}>{n.body}</p>
              </details>
            ))}
          </div>
        </>
      )}

      {tab === "event" && (
        <>
          <form className={`card ${styles.form}`} onSubmit={addEvent}>
            <h2>일정 등록</h2>
            <input placeholder="일정 제목" required value={eForm.title} onChange={(e) => setEForm({ ...eForm, title: e.target.value })} />
            <div className={styles.row}>
              <label>시작일<input type="date" required value={eForm.date} onChange={(e) => setEForm({ ...eForm, date: e.target.value, end: e.target.value > eForm.end ? e.target.value : eForm.end })} /></label>
              <label>종료일<input type="date" required min={eForm.date} value={eForm.end} onChange={(e) => setEForm({ ...eForm, end: e.target.value })} /></label>
            </div>
            <div className={styles.row}>
              <label>장소<input placeholder="장소" value={eForm.place} onChange={(e) => setEForm({ ...eForm, place: e.target.value })} /></label>
              <label>분류
                <select value={eForm.category} onChange={(e) => setEForm({ ...eForm, category: e.target.value })}>
                  {Object.keys(categoryColor).map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <textarea placeholder="설명" rows={3} value={eForm.desc} onChange={(e) => setEForm({ ...eForm, desc: e.target.value })} />
            <button className="btn" type="submit">등록</button>
          </form>
          <div className="card" style={{ marginTop: 20 }}>
            <h2>등록된 일정 ({events.length})</h2>
            {[...events].sort((a, b) => a.date.localeCompare(b.date)).map((ev) => (
              <div key={ev.id} className={styles.item}>
                <span><i className={styles.dot} style={{ background: categoryColor[ev.category] }} />{ev.title}</span>
                <time>{ev.date}</time>
                <button onClick={() => removeEvent(ev.id)}>삭제</button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "info" && (
        <form className={`card ${styles.form}`} onSubmit={(e) => { e.preventDefault(); flash("저장되었어요 (미리보기)"); }}>
          <h2>교회 소개</h2>
          <textarea rows={5} value={info.intro} onChange={(e) => setInfo({ ...info, intro: e.target.value })} />
          <h2 style={{ marginTop: 8 }}>예배 시간</h2>
          <p className={styles.hint}>한 줄에 하나씩: 예배명 | 시간 | 장소</p>
          <textarea rows={4} value={info.worship} onChange={(e) => setInfo({ ...info, worship: e.target.value })} />
          <button className="btn" type="submit">저장</button>
        </form>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </main>
  );
}

export default function Admin() { return <Guard admin><Inner /></Guard>; }
