"use client";
import { useApp } from "@/lib/app";
import NoticeList from "@/components/NoticeList";

export default function Notices() {
  const { user, notices } = useApp();
  const items = (user ? notices : notices.filter((n) => n.public))
    .slice().sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date));
  return (
    <main className="container">
      <div className="page-title"><h1>📢 공지사항</h1></div>
      <section className="card">
        <NoticeList items={items} />
        {!user && <p style={{ color: "var(--muted)", marginTop: 12, fontSize: ".9rem" }}>🔒 멤버 전용 공지는 로그인 후 볼 수 있어요.</p>}
      </section>
    </main>
  );
}
