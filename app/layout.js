import "./globals.css";
export const metadata = {
  title: "Tight Week OS — NORTHLINE",
  description: "48-hour cash triage for irregular-income operators. $19/month."
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
