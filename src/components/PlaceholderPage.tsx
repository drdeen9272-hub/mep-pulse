import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="container py-10"
    >
      <div className="mb-2 text-xs font-medium text-muted-foreground">
        {location.pathname}
      </div>
      <h1 className="font-heading text-3xl font-bold text-primary">{title}</h1>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
      <div className="mt-8 flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border">
        <p className="text-muted-foreground">Content coming soon</p>
      </div>
    </motion.div>
  );
}
