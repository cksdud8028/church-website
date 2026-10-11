"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { siteInfo, members } from "@/lib/mock";
import { useApp } from "@/lib/app";
import { todayStr, daysBetween, daysToBirthday, ddayLabel } from "@/lib/util";
import NoticeList from "@/components/NoticeList";
import styles from "./home.module.css";

export default function Home() {
  const { user, notices, events } = useApp();
  const [today, setToday] = useState(null);
  useEffect(() => setToday(todayStr()), []);

  const visible = (user ? notices : notices.filter((n) => n.public))
    .slice().sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date)).slice(0, 4);
  const next = today && events.filter((e) => e.end >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
  const bdays = today
    ? members.map((m) => ({ ...m, d: daysToBirthday(m.birth, today) })).filter((m) => m.d <= 30).sort((a, b) => a.d - b.d)
    : [];

  return (
    <main>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>WELCOME</p>
          <h1 className={styles.title}>{siteInfo.name}</h1>
          <p className={styles.verse}>{siteInfo.verse}</p>
          <div className={styles.heroBtns}>
            {user ? (
              <>
                <Link href="/gallery" className="btn" style={{ background: "#fff", color: "var(--green)" }}>📷 사진첩 바로가기</Link>
                <Link href="/calendar" className="btn ghost">📅 일정 보기</Link>
              </>
            ) : (
              <Link href="/login" className="btn" style={{ background: "#fff", color: "var(--green)" }}>🔑 청년부원 로그인</Link>
            )}
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.grid}>
          <section className="card">
            <h2>교회 소개</h2>
            <p>{siteInfo.intro}</p>
          </section>
          <section className="card">
            <h2>예배 시간</h2>
            <ul className={styles.worship}>
              {siteInfo.worship.map((w) => (
                <li key={w.name}><strong>{w.name}</strong><span>{w.time} · {w.place}</span></li>
              ))}
            </ul>
          </section>
        </div>

        {user && (
          <div className={styles.cards}>
            <section className="card">
              <h2>다음 일정</h2>
              {next ? (
                <>
                  <div className={styles.dday}>{ddayLabel(daysBetween(today, next.date))}</div>
                  <strong>{next.title}</strong>
                  <p className={styles.sub}>{next.date} · {next.place}</p>
                </>
              ) : <p className={styles.sub}>예정된 일정이 없어요.</p>}
            </section>
            <section className="card">
              <h2>🎂 곧 생일이에요</h2>
              {bdays.length === 0 && <p className={styles.sub}>30일 이내 생일자가 없어요.</p>}
              <ul className={styles.bday}>
                {bdays.map((m) => (
                  <li key={m.name}><strong>{m.name}</strong><span className={styles.sub}>{m.birth.replace("-", "/")} · {ddayLabel(m.d)}</span></li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {(user || visible.length > 0) && (
          <section className="card" style={{ marginTop: 20 }}>
            <div className={styles.noticeHead}>
              <h2>공지사항</h2>
              <Link href="/notices">더보기 →</Link>
            </div>
            <NoticeList items={visible} />
          </section>
        )}

        {user ? (
          <Link href="/gallery" className={styles.galleryBanner}>
            <span>📷 우리의 소중한 순간들</span>
            <strong>사진첩 보러가기 →</strong>
          </Link>
        ) : (
          <section className={`card ${styles.lock}`} style={{ marginTop: 20 }}>
            <h2>🔒 청년부원 전용</h2>
            <p>사진첩, 일정, 멤버 공지는 로그인한 청년부원만 볼 수 있어요.</p>
            <Link href="/login" className="btn">로그인하기</Link>
          </section>
        )}
      </div>
    </main>
  );
}
