import Link from "next/link";
export default function Home() {
  return (
    <div className="wrap">
      <nav className="top">
        <span className="brand">Northline Press</span>
        <Link href="/pricing">Pricing</Link>
      </nav>
      <p className="brand">For people whose income does not land on the 1st</p>
      <h1>The account is short. This is the next 48 hours.</h1>
      <p className="lede">
        Tight Week OS is one screen. Cash on hand, what is actually due,
        one invoice you chase, one thing you cut, one ask you send.
        Not a 40-page planner. $19 a month.
      </p>
      <div className="row">
        <Link className="btn" href="/desk">Open the desk</Link>
        <Link className="btn ghost" href="/pricing">$19 / month</Link>
      </div>
    </div>
  );
}
