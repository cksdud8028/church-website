"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app";
import styles from "./login.module.css";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [err, setErr] = useState("");
  const { login } = useApp();
  const router = useRouter();

  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (mode === "signup") { alert("가입 신청이 접수되었어요. 관리자 승인 후 이용할 수 있어요. (미리보기)"); setMode("login"); return; }
    if (login(f.get("email"), f.get("password"))) router.push("/");
    else setErr("이메일 또는 비밀번호가 올바르지 않아요.");
  }

  return (
    <main className="container">
      <form className={`card ${styles.form}`} onSubmit={submit}>
        <h1>🌿 {mode === "login" ? "로그인" : "가입 신청"}</h1>
        <p className={styles.sub}>청년부원만 사진첩과 일정을 볼 수 있어요.</p>
        {mode === "signup" && <input name="name" placeholder="이름" required />}
        <input name="email" type="email" placeholder="이메일" required />
        <input name="password" type="password" placeholder="비밀번호" required />
        {err && <p className={styles.err}>{err}</p>}
        <button className="btn" type="submit">{mode === "login" ? "로그인" : "가입 신청 (관리자 승인 후 이용)"}</button>
        <button type="button" className={styles.switch} onClick={() => { setErr(""); setMode(mode === "login" ? "signup" : "login"); }}>
          {mode === "login" ? "처음이신가요? 가입 신청" : "이미 계정이 있어요"}
        </button>
        {mode === "login" && (
          <div className={styles.demo}>
            <strong>테스트 계정 (비밀번호 1234)</strong>
            <span>멤버: member@test.com</span>
            <span>관리자: admin@test.com</span>
          </div>
        )}
      </form>
    </main>
  );
}
