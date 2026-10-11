"use client";
import { useState } from "react";
import Guard from "@/components/Guard";
import { useApp } from "@/lib/app";
import styles from "./gallery.module.css";

function Inner() {
  const { user, photos, liked, toggleLike, addPhotos } = useApp();
  const [open, setOpen] = useState(null);
  const [album, setAlbum] = useState("전체");
  const [target, setTarget] = useState("");

  const albums = [...new Set(photos.map((p) => p.album))];
  const shown = album === "전체" ? photos : photos.filter((p) => p.album === album);
  const likes = (p) => p.likes + (liked.includes(p.id) ? 1 : 0);

  function onUpload(e) {
    const files = Array.from(e.target.files || []);
    const dest = target || (album !== "전체" ? album : "기타");
    addPhotos(files.map((f, i) => ({
      id: Date.now() + i,
      caption: f.name.replace(/\.[^.]+$/, ""),
      album: dest,
      likes: 0,
      uploader: user.name,
      date: new Date().toISOString().slice(0, 10),
      url: URL.createObjectURL(f),
    })));
    e.target.value = "";
  }

  function newAlbum() {
    const n = window.prompt("새 앨범 이름");
    if (n && n.trim()) setTarget(n.trim());
  }

  const bg = (p) => p.url
    ? { backgroundImage: `url(${p.url})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` };
  const cur = shown.findIndex((p) => p.id === open);
  const move = (d) => setOpen(shown[(cur + d + shown.length) % shown.length].id);

  return (
    <main className="container">
      <div className="page-title">
        <h1>📷 사진첩</h1>
        <div className={styles.up}>
          <select value={target} onChange={(e) => (e.target.value === "__new" ? newAlbum() : setTarget(e.target.value))}>
            <option value="">업로드 앨범: {album === "전체" ? "기타" : album}</option>
            {[...new Set([...albums, target].filter(Boolean))].map((a) => <option key={a} value={a}>{a}</option>)}
            <option value="__new">+ 새 앨범…</option>
          </select>
          <label className="btn">
            + 사진 올리기
            <input type="file" accept="image/*" multiple hidden onChange={onUpload} />
          </label>
        </div>
      </div>

      <div className={styles.chips}>
        {["전체", ...albums].map((a) => (
          <button key={a} className={album === a ? styles.on : ""} onClick={() => setAlbum(a)}>{a}</button>
        ))}
      </div>

      <div className={styles.grid}>
        {shown.map((p) => (
          <button key={p.id} className={styles.thumb} style={bg(p)} onClick={() => setOpen(p.id)} aria-label={p.caption}>
            <span>{p.caption}<b>♥ {likes(p)}</b></span>
          </button>
        ))}
      </div>

      {cur >= 0 && (
        <div className={styles.overlay} onClick={() => setOpen(null)}>
          <button className={styles.nav} style={{ left: 12 }} onClick={(e) => { e.stopPropagation(); move(-1); }}>‹</button>
          <figure className={styles.view} onClick={(e) => e.stopPropagation()}>
            <div className={styles.big} style={bg(shown[cur])} />
            <figcaption>
              <div>
                <strong>{shown[cur].caption}</strong>
                <span>{shown[cur].album} · {shown[cur].uploader} · {shown[cur].date}</span>
              </div>
              <button className={`${styles.like} ${liked.includes(shown[cur].id) ? styles.liked : ""}`} onClick={() => toggleLike(shown[cur].id)}>
                ♥ {likes(shown[cur])}
              </button>
            </figcaption>
          </figure>
          <button className={styles.nav} style={{ right: 12 }} onClick={(e) => { e.stopPropagation(); move(1); }}>›</button>
          <button className={styles.close} onClick={() => setOpen(null)}>✕</button>
        </div>
      )}
    </main>
  );
}
export default function Gallery() { return <Guard><Inner /></Guard>; }
