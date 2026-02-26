import { useNavigate, useParams, useLocation } from "react-router-dom";
import { africanCountries } from "@/data/africaData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CountrySelector() {
  const navigate = useNavigate();
  const { countryCode } = useParams();
  const location = useLocation();
  const current = countryCode || (location.pathname === "/dashboard" ? "NG" : "AFRICA");

  const handleChange = (value: string) => {
    if (value === "AFRICA") navigate("/dashboard/africa");
    else if (value === "NG") navigate("/dashboard");
    else navigate(`/dashboard/country/${value}`);
  };

  const sorted = [...africanCountries].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectItem value="AFRICA">🌍 Africa Overview</SelectItem>
        {sorted.map(c => (
          <SelectItem key={c.code} value={c.code}>
            {c.flag} {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
