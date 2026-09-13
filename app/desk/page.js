"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
const empty = {
  cash: "",
  rows: [
    { due: "", amt: "", must: "must" },
    { due: "", amt: "", must: "wait" },
    { due: "", amt: "", must: "wait" }
  ],
  chase: "",
  cut: "",
  ask: ""
};
export default function Desk() {
  const [data, setData] = useState(empty);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tightweek");
      if (raw) setData({ ...empty, ...JSON.parse(raw) });
    } catch (e) {}
  }, []);
  useEffect(() => {
    localStorage.setItem("tightweek", JSON.stringify(data));
  }, [data]);
  const dueMust = data.rows.reduce((s, r) => {
    const n = parseFloat(String(r.amt).replace(/[^0-9.]/g, ""));
    if (!n || r.must !== "must") return s;
    return s + n;
  }, 0);
  const cash = parseFloat(String(data.cash).replace(/[^0-9.]/g, "")) || 0;
  const gap = cash - dueMust;
  function setRow(i, key, val) {
    const rows = data.rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r));
    setData({ ...data, rows });
  }
  return (
    <div className="wrap">
      <nav className="top">
        <Link href="/">Northline Press</Link>
        <button className="btn ghost" onClick={() => window.print()} type="button">Print</button>
      </nav>
      <p className="brand">Tight Week OS</p>
      <h1>48 hours</h1>
      <label>Cash in the account right now</label>
      <input value={data.cash} onChange={(e) => setData({ ...data, cash: e.target.value })} placeholder="0" />
      <label>Due in 7 days</label>
      <table><tbody>
        {data.rows.map((r, i) => (
          <tr key={i}>
            <td><input value={r.due} placeholder="Bill" onChange={(e) => setRow(i, "due", e.target.value)} /></td>
            <td><input value={r.amt} placeholder="$" onChange={(e) => setRow(i, "amt", e.target.value)} /></td>
            <td><input value={r.must} placeholder="must / wait" onChange={(e) => setRow(i, "must", e.target.value)} /></td>
          </tr>
        ))}
      </tbody></table>
      <button className="btn ghost" type="button" onClick={() => setData({ ...data, rows: [...data.rows, { due: "", amt: "", must: "wait" }] })}>Add a line</button>
      <p className="gap">Gap vs cash: {gap < 0 ? "−" : ""}${Math.abs(gap).toFixed(0)}</p>
      <label>Invoice I chase today</label>
      <textarea value={data.chase} onChange={(e) => setData({ ...data, chase: e.target.value })} />
      <label>One thing I cut this week</label>
      <textarea value={data.cut} onChange={(e) => setData({ ...data, cut: e.target.value })} />
      <label>One ask in the next 24 hours</label>
      <textarea value={data.ask} onChange={(e) => setData({ ...data, ask: e.target.value })} />
      <p className="fine">Saved on this device. Not a bank.</p>
    </div>
  );
}
