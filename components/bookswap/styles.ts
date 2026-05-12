import type { BookCondition } from "@/lib/types";

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-OM", {
    style: "currency",
    currency: "OMR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(n);
}

export function conditionBadgeClass(condition: BookCondition): string {
  switch (condition) {
    case "New":
      return "bg-blue-600 text-white";
    case "Like New":
      return "bg-orange-100 text-orange-900";
    case "Used":
      return "bg-slate-200 text-slate-800";
    case "Good":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function conditionPillClass(condition: BookCondition): string {
  switch (condition) {
    case "Like New":
      return "bg-orange-100 text-orange-900";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
