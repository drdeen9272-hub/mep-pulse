import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  {
    label: "Dashboard",
    children: [
      { label: "Overview", to: "/dashboard" },
      { label: "Epidemiology", to: "/dashboard/epidemiology" },
      { label: "Entomology & Vector Control", to: "/dashboard/entomology" },
      { label: "Diagnostics & Treatment", to: "/dashboard/diagnostics" },
      { label: "Commodities & Supply Chain", to: "/dashboard/commodities" },
      { label: "Chemoprevention", to: "/dashboard/chemoprevention" },
      { label: "Financing", to: "/dashboard/financing" },
      { label: "Data Quality", to: "/dashboard/data-quality" },
    ],
  },
  {
    label: "Surveillance",
    children: [
      { label: "Case-Based Surveillance", to: "/surveillance/case-based" },
      { label: "Aggregate Reporting", to: "/surveillance/aggregate" },
      { label: "Outbreak Detection", to: "/surveillance/outbreak-detection" },
      { label: "PPMV Network", to: "/surveillance/ppmv-network" },
    ],
  },
  {
    label: "Applications",
    children: [
      { label: "Product Authentication", to: "/applications/authentication" },
      { label: "AI RDT Reader", to: "/applications/rdt-reader" },
      { label: "Health Surveys", to: "/applications/surveys" },
      { label: "AISHA Chat", to: "/applications/aisha-chat" },
      { label: "WhatsApp Bot", to: "/applications/whatsapp" },
      { label: "Conditional Transfers", to: "/applications/transfers" },
    ],
  },
  {
    label: "Reports",
    children: [
      { label: "Export Data", to: "/reports/export" },
      { label: "Automated Reports", to: "/reports/automated" },
      { label: "Custom Analysis", to: "/reports/custom-analysis" },
    ],
  },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (item: (typeof navItems)[0]) => {
    if ("to" in item) return location.pathname === item.to;
    return item.children?.some((c) => location.pathname.startsWith(c.to));
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-heading text-xl font-bold tracking-tight text-primary">
            SPROXIL
          </span>
          <span className="text-[10px] font-medium text-muted-foreground">
            Powering Health Intelligence
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            "children" in item && item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                    isActive(item) && "text-secondary"
                  )}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full min-w-[220px] rounded-md border bg-card p-1 shadow-lg"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={cn(
                            "block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-muted",
                            location.pathname === child.to &&
                              "bg-muted font-medium text-secondary"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                to={(item as any).to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  isActive(item) && "text-secondary"
                )}
              >
                {item.label}
              </Link>
            )
          )}
          <button
            onClick={() => supabase.auth.signOut()}
            className="ml-2 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-md p-2 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-card lg:hidden"
          >
            <div className="container py-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b py-2">
                  {"children" in item && item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          )
                        }
                        className="flex w-full items-center justify-between py-2 text-base font-semibold"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openDropdown === item.label && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.to}
                                to={child.to}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                  "block py-2 pl-4 text-sm text-muted-foreground hover:text-foreground",
                                  location.pathname === child.to &&
                                    "font-medium text-secondary"
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={(item as any).to}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-base font-semibold"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
