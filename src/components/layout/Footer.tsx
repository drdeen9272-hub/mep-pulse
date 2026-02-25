import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="font-heading text-lg font-bold">SPROXIL</span>
            <p className="mt-1 text-xs opacity-80">Powering Health Intelligence</p>
            <p className="mt-3 text-sm opacity-70">
              Sproxil Inc. | Cambridge, Massachusetts | Lagos, Nigeria
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">Platform</h4>
            <div className="flex flex-col gap-1 text-sm opacity-70">
              <Link to="/dashboard" className="hover:opacity-100">Dashboard</Link>
              <Link to="/surveillance/case-based" className="hover:opacity-100">Surveillance</Link>
              <Link to="/applications/authentication" className="hover:opacity-100">Applications</Link>
              <Link to="/reports/export" className="hover:opacity-100">Reports</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Company</h4>
            <div className="flex flex-col gap-1 text-sm opacity-70">
              <Link to="/about" className="hover:opacity-100">About</Link>
              <span className="cursor-default">Privacy Policy</span>
              <span className="cursor-default">Terms of Service</span>
              <span className="cursor-default">API Documentation</span>
              <span className="cursor-default">Contact</span>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">Powered By</h4>
            <p className="text-sm opacity-70">
              AISHA (AI-Supported Healthcare Agent)
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-6">
          <p className="text-xs opacity-60">
            This platform displays simulated demonstration data for product showcase
            purposes. Actual deployment data is available through partnership with
            Sproxil and the National Malaria Elimination Programme.
          </p>
          <p className="mt-2 text-xs opacity-50">
            © 2025 Sproxil Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
