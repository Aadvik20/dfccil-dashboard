import {
  Bell,
  CircleHelp,
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-[#f8f9ff] px-4 md:px-8">
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <div className="flex h-12 items-center justify-center">
            <img src="https://itsm.dfccil.com/assets/logo-BH51evyd.png" className="h-12" alt="DFCCIL Logo" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-low active:scale-95"
          type="button"
        >
          <Bell size={20} />
        </button>

        <button
          className="rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-low active:scale-95"
          type="button"
        >
          <CircleHelp size={20} />
        </button>

        

        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-outline-variant bg-surface-container-high">
          <span className="text-sm font-bold text-primary">
            DF
          </span>
        </div>
      </div>
    </header>
  );
}