"use client";
import { useRouter } from "next/navigation";
import Guard from "@/components/Guard";
import { useApp } from "@/lib/app";

function Inner() {
  const { user, events, rsvp, read, liked, logout } = useApp();
  const router = useRouter();
  const mine = events.filter((e) => rsvp[e.id]);
  return (
    <main className="container">
      <div className="page-title"><h1>👤 내 프로필</h1></div>
      <section className="card">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p style={{ color: "var(--muted)" }}>{user.role === "ADMIN" ? "관리자" : "청년부원"}</p>
        <p style={{ marginTop: 12 }}>읽은 공지 {read.length}개 · 좋아요한 사진 {liked.length}장</p>
        <button className="btn" style={{ marginTop: 16 }} onClick={() => { logout(); router.push("/"); }}>로그아웃</button>
      </section>
      <section className="card" style={{ marginTop: 20 }}>
        <h2>내 참석 응답</h2>
        {mine.length === 0 && <p style={{ color: "var(--muted)" }}>아직 응답한 일정이 없어요.</p>}
        {mine.map((e) => (
          <p key={e.id} style={{ padding: "6px 0" }}>{rsvp[e.id] === "yes" ? "✅ 참석" : "❌ 불참"} · {e.title} ({e.date})</p>
        ))}
      </section>
    </main>
  );
}
export default function Profile() { return <Guard><Inner /></Guard>; }
