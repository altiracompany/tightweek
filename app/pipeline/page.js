"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const slot = () => ({ name: "", kind: "file", amount: "", fund: "", next: "", stuck: "" });

export default function Pipeline() {
  const [rows, setRows] = useState([slot(), slot(), slot()]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tw-pipe");
      if (raw) setRows(JSON.parse(raw));
    } catch (e) {}
  }, []);
  useEffect(() => {
    localStorage.setItem("tw-pipe", JSON.stringify(rows));
  }, [rows]);
  function set(i, k, v) {
    setRows(rows.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));
  }
  const total = rows.reduce((s, r) => {
    const n = parseFloat(String(r.amount).replace(/[^0-9.]/g, ""));
    return s + (n || 0);
  }, 0);
  return (
    <div className="wrap">
      <nav className="top">
        <Link href="/">Northline</Link>
        <Link href="/desk">Desk</Link>
      </nav>
      <p className="brand">Capacity: 3 files</p>
      <h1>This month only</h1>
      <p className="lede">If it is not one of these three, it is October or it is dead.</p>
      {rows.map((r, i) => (
        <div className="card" key={i}>
          <label>File {i + 1} — name</label>
          <input value={r.name} onChange={(e) => set(i, "name", e.target.value)} />
          <label>Kind (purchase / DSCR / assignment / invoice)</label>
          <input value={r.kind} onChange={(e) => set(i, "kind", e.target.value)} />
          <label>Dollars to you if it funds</label>
          <input value={r.amount} onChange={(e) => set(i, "amount", e.target.value)} />
          <label>Fund / pay date</label>
          <input value={r.fund} onChange={(e) => set(i, "fund", e.target.value)} />
          <label>Next human action (one sentence)</label>
          <input value={r.next} onChange={(e) => set(i, "next", e.target.value)} />
          <label>Stuck on</label>
          <input value={r.stuck} onChange={(e) => set(i, "stuck", e.target.value)} />
        </div>
      ))}
      <p className="gap">If all three pay: ${total.toFixed(0)}</p>
      <p className="fine">Not 20 apps. Not a second CRM. This is the book.</p>
    </div>
  );
}
