"use client";
import { useApp } from "@/lib/app";
import styles from "@/app/home.module.css";

export default function NoticeList({ items }) {
  const { user, read, markRead } = useApp();
  if (items.length === 0) return <p style={{ color: "var(--muted)" }}>공지가 없어요.</p>;
  return (
    <ul className={styles.notices}>
      {items.map((n) => (
        <li key={n.id}>
          <details onToggle={(e) => { if (e.currentTarget.open && user) markRead(n.id); }}>
            <summary>
              <span>
                {n.pinned && <em className={styles.pin}>고정</em>}
                {user && !read.includes(n.id) && <em className={styles.new}>NEW</em>}
                {n.title}
              </span>
              <time>{n.date}</time>
            </summary>
            <p className={styles.body}>{n.body}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
