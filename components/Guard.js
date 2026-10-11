"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app";

export default function Guard({ admin = false, children }) {
  const { ready, user } = useApp();
  const router = useRouter();
  useEffect(() => { if (ready && !user) router.replace("/login"); }, [ready, user, router]);
  if (!ready || !user) return null;
  if (admin && user.role !== "ADMIN") {
    return <main className="container"><div className="card">🔒 관리자만 접근할 수 있어요.</div></main>;
  }
  return children;
}
