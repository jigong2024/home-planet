"use client";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2C3E50" }} className="text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} 집플래닛. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
