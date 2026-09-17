import {
  ArrowRight,
  Package,
  Plane,
  Network,
  Wallet,
  Zap,
  Wind,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";

import type { Application } from "@/types/application";

interface ApplicationCardProps {
  application: Application;
  onClick: (application: Application) => void;
}

const iconMap = {
  Plane,
  Package,
  Network,
  Wallet,
  Zap,
  Wind,
  PiggyBank,
  ShieldCheck,
};

export default function ApplicationCard({
  application,
  onClick,
}: ApplicationCardProps) {
  const Icon =
    iconMap[application.icon as keyof typeof iconMap] ?? Package;

  const statusClass =
    application.status === "Operational"
      ? "bg-green-100 text-green-700"
      : application.status === "Warning"
        ? "bg-amber-100 text-amber-700"
        : "bg-slate-100 text-slate-700";

  return (
    <div
      onClick={() => onClick(application)}
      className="group relative flex h-full min-h-60 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl border border-outline-variant bg-[#f8f9ff] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container ${application.color} transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={30} strokeWidth={1.8} />
        </div>

        <div className="flex items-center gap-3">
          {/* Total */}
          <div className="text-center">
            <div className="text-lg font-bold text-on-surface">
              {application.stats.totalRequests}
            </div>
            <div className="text-[9px] font-medium uppercase tracking-wider text-on-surface-variant">
              Total
            </div>
          </div>

          <div className="h-8 w-px bg-outline-variant" />

          {/* Pending */}
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">
              {application.stats.pending}
            </div>
            <div className="text-[9px] font-medium uppercase tracking-wider text-on-surface-variant">
              Pending
            </div>
          </div>

          <div className="h-8 w-px bg-outline-variant" />

          {/* Resolved */}
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {application.stats.approved + application.stats.rejected}
            </div>
            <div className="text-[9px] font-medium uppercase tracking-wider text-on-surface-variant">
              Resolved
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-1 flex items-baseline gap-2">
          <h3 className="text-lg font-semibold text-on-surface">
            {application.name}
          </h3>

          <span className="text-xs font-medium text-on-surface-variant">
            / {application.hindi}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-5 text-on-surface-variant">
          {application.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-outline-variant pt-4 text-primary duration-300">
        <span className="text-xs font-medium uppercase tracking-wider">
          Launch Instance
        </span>

        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>

      <div className="pointer-events-none absolute -bottom-4 -right-4 opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.07]">
        <Icon size={120} />
      </div>
    </div>
  );
}