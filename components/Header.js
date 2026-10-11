"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/app";
import styles from "./Header.module.css";

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();
  const links = [
    { href: "/", label: "홈" },
    { href: "/notices", label: "공지" },
    ...(user ? [{ href: "/gallery", label: "사진첩" }, { href: "/calendar", label: "캘린더" }] : []),
    ...(user?.role === "ADMIN" ? [{ href: "/admin", label: "관리자" }] : []),
  ];
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>🌿 산울킹</Link>
        <nav className={styles.nav}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={path === l.href ? styles.active : ""}>{l.label}</Link>
          ))}
          {user ? (
            <>
              <Link href="/profile" className={path === "/profile" ? styles.active : ""}>👤 {user.name}</Link>
              <a href="#" className={styles.login} onClick={(e) => { e.preventDefault(); logout(); router.push("/"); }}>로그아웃</a>
            </>
          ) : (
            <Link href="/login" className={styles.login}>로그인</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
