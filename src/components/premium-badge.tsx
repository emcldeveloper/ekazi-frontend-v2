import { Crown } from "lucide-react";

const PremiumBadge = () => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-yellow-900 bg-yellow-300 rounded-full shadow">
      <Crown size={12} className="text-yellow-700" />
      featured
    </span>
  );
};

export default PremiumBadge;
