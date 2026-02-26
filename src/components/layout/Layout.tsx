import { Outlet, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

export default function Layout() {
  const location = useLocation();
  const showDisclaimer = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/surveillance");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {showDisclaimer && (
        <div className="border-b bg-accent/10 px-4 py-1.5 text-center text-xs text-accent-foreground">
          <AlertTriangle className="mr-1 inline h-3 w-3" />
          Simulated demonstration data — not actual surveillance records.{" "}
          <Link to="/about" className="underline hover:opacity-80">Learn more</Link>
        </div>
      )}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
