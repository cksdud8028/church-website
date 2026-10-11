"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { notices as n0, events as e0, photos as p0, users } from "./mock";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const load = (k, f) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch { return f; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [notices, setN] = useState(n0);
  const [events, setE] = useState(e0);
  const [photos, setPhotos] = useState(p0); // 업로드한 사진은 새로고침 시 사라짐 (백엔드 전 단계)
  const [read, setR] = useState([]);
  const [rsvp, setRs] = useState({});
  const [liked, setL] = useState([]);

  useEffect(() => {
    setUser(load("sk_user", null));
    setN(load("sk_notices", n0));
    setE(load("sk_events", e0));
    setR(load("sk_read", []));
    setRs(load("sk_rsvp", {}));
    setL(load("sk_liked", []));
    setReady(true);
  }, []);

  const set = (setter, key) => (next) => { setter(next); save(key, next); };
  const setNotices = set(setN, "sk_notices");
  const setEvents = set(setE, "sk_events");

  const value = {
    ready, user, notices, events, photos, read, rsvp, liked,
    login(email, password) {
      const u = users.find((x) => x.email === email && x.password === password);
      if (!u) return false;
      const safe = { email: u.email, name: u.name, role: u.role };
      setUser(safe); save("sk_user", safe);
      return true;
    },
    logout() { setUser(null); save("sk_user", null); },
    addNotice(n) { setNotices([{ id: Date.now(), date: new Date().toISOString().slice(0, 10), ...n }, ...notices]); },
    removeNotice(id) { setNotices(notices.filter((n) => n.id !== id)); },
    togglePublic(id) { setNotices(notices.map((n) => (n.id === id ? { ...n, public: !n.public } : n))); },
    addEvent(ev) { setEvents([{ id: Date.now(), yes: 0, ...ev }, ...events]); },
    removeEvent(id) { setEvents(events.filter((e) => e.id !== id)); },
    markRead(id) { if (!read.includes(id)) { const r = [...read, id]; setR(r); save("sk_read", r); } },
    setRsvp(id, v) { const r = { ...rsvp, [id]: rsvp[id] === v ? undefined : v }; setRs(r); save("sk_rsvp", r); },
    toggleLike(id) { const l = liked.includes(id) ? liked.filter((x) => x !== id) : [...liked, id]; setL(l); save("sk_liked", l); },
    addPhotos(list) { setPhotos([...list, ...photos]); },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
