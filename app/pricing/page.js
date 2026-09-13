import Link from "next/link";
export default function Pricing() {
  return (
    <div className="wrap">
      <nav className="top">
        <Link href="/">Northline Press</Link>
        <Link href="/desk">Desk</Link>
      </nav>
      <h1>One product. One price.</h1>
      <div className="card">
        <div className="price">$19 / mo</div>
        <p>Tight Week OS. Instant access.</p>
        <Link className="btn" href="/desk">Use the desk now</Link>
      </div>
    </div>
  );
}
