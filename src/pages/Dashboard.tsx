
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedCard from "@/components/common/AnimatedCard";

import {
  // Activity,
  CheckCircle2,
  LayoutDashboard,
  Search,
  X,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import ApplicationCard from "@/components/applications/ApplicationCard";

import { applications } from "@/data/applications";
import type { Application } from "@/types/application";

type FilterType =
  | "all"
  | "pending"
  | "active";

export default function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState<FilterType>("all");

  const handleApplicationClick = (
    application: Application
  ) => {
    navigate(
      `/applications/${application.id}`
    );
  };

  const totalApps =
    applications.length;

  // const pendingApps =
  //   applications.filter(
  //     (application) =>
  //       application.stats.pending > 0
  //   ).length;

  const activeApps =
    applications.filter(
      (application) =>
        application.status ===
        "Operational"
    ).length;

  const filteredApplications =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      return applications.filter(
        (application) => {

          const matchesSearch =
            !searchValue ||
            application.name
              .toLowerCase()
              .includes(searchValue) ||
            application.hindi
              .toLowerCase()
              .includes(searchValue) ||
            application.description
              .toLowerCase()
              .includes(searchValue);

          let matchesFilter = true;

          if (
            activeFilter ===
            "pending"
          ) {
            matchesFilter =
              application.stats.pending >
              0;
          }

          if (
            activeFilter ===
            "active"
          ) {
            matchesFilter =
              application.status ===
              "Operational";
          }

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      search,
      activeFilter,
    ]);

  const handleFilterClick = (
    filter: FilterType
  ) => {
    setActiveFilter(
      activeFilter === filter
        ? "all"
        : filter
    );
  };

  const clearFilters = () => {
    setSearch("");
    setActiveFilter("all");
  };

  const hasFilter =
    search.trim() !== "" ||
    activeFilter !== "all";

  return (
    <div className="flex min-h-screen bg-white">

      <Sidebar />

      <main className="min-h-screen flex-1 bg-white p-4 md:p-8">


        <div className="mb-8 flex flex-col gap-6">
          <div
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" >
            <div className="min-w-0">
              <h1 className="mb-1 text-2xl font-semibold leading-tight tracking-tight text-on-surface sm:text-3xl sm:leading-10">
                Application Ecosystem
              </h1>

              <p
                className="max-w-2xl text-xs leading-5 text-on-surface-variant sm:text-sm">
                Central control node for all enterprise
                vertical applications.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <div className="relative w-full md:w-80 lg:w-96">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search applications..."
                  className="searchTab h-11 w-full rounded-xl pl-4 border border-outline-variant bg-[#f8f9ff] text-sm text-on-surface outline-none transition-all placeholder:text-slate-400 focus:border-primary-container focus:bg-white focus:ring-2 focus:ring-primary-container/10"
                  style={{paddingLeft: "35px"}}
                  />

                {search && (
                  <button type="button"
                    onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                    <X className="h-4 w-4" />
                  </button>
                )}

              </div>

              {hasFilter && (
                <div className="mt-2 flex items-center justify-end gap-2">
                  <span className="text-xs text-slate-500">
                    {filteredApplications.length} applications found
                  </span>

                  <button type="button"
                    onClick={clearFilters} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50">
                    <X className="h-3.5 w-3.5" />
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">

            <button type="button" onClick={() => handleFilterClick("all")} className={`group relative flex min-h-27.5 w-full items-center gap-4 rounded-xl border border-outline-variant p-4 text-left shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]

        ${activeFilter === "all"
                ? "bg-primary/9 ring-2 ring-primary/10"
                : "bg-[#f8f9ff]"
              }
      `}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <LayoutDashboard
                  size={22}
                />
              </div>
              <div className="min-w-0">

                <div className="text-[11px] font-medium uppercase tracking-wider text-on-surface-variant sm:text-xs">
                  Total Apps
                </div>

                <div className="text-2xl font-bold leading-9 text-on-surface sm:text-[32px] sm:leading-10">
                  {totalApps}
                </div>
              </div>

            </button>

            {/* <button type="button" onClick={() => handleFilterClick("pending")} className={`group relative flex min-h-27.5 w-full items-center gap-4 rounded-xl border border-outline-variant p-4 text-left shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]

        ${activeFilter === "pending"
                ? "bg-orange-50 ring-2 ring-orange-200"
                : "bg-[#f8f9ff]"
              }
      `}>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 transition-transform duration-300 group-hover:scale-110">
                <Activity size={22} />
              </div>

              <div className="min-w-0">
                <div className="text-[11px] font-medium uppercase tracking-wider text-on-surface-variant sm:text-xs">
                  Pending Tasks
                </div>

                <div className="text-2xl font-bold leading-9 text-on-surface sm:text-[32px] sm:leading-10">
                  {pendingApps}
                </div>
                <div className="truncate text-[10px] text-orange-600 sm:text-[11px]">
                  Applications with pending requests
                </div>
              </div>
            </button> */}

            <button type="button" onClick={() =>
              handleFilterClick("active")
            } className={` group relative flex min-h-27.5 w-full items-center gap-4 rounded-xl border border-outline-variant p-4 text-left shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]

        ${activeFilter === "active"
                ? "bg-green-50 ring-2 ring-green-200"
                : "bg-[#f8f9ff]"
              }
      `}  >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-transform duration-300 group-hover:scale-110">
                <CheckCircle2
                  size={22}
                />
              </div>

              <div className="min-w-0">

                <div className=" text-[11px] font-medium uppercase tracking-wider text-on-surface-variant sm:text-xs">
                  System Status
                </div>

                <div className="text-xl font-boldtext-green-600 sm:text-[24px]">
                  Active
                </div>

                <div className="truncate text-[10px]text-green-600 sm:text-[11px]">
                  {activeApps} operational applications
                </div>

              </div>

            </button>

          </div>

        </div>

        {activeFilter !==
          "all" && (
            <div className="mb-5 flex items-center gap-2">
              <span className="text-sm text-slate-500">
                Showing:
              </span>
              <span className={`rounded-full px-3 py-1.5 text-xs font-semibold
                ${activeFilter ===
                  "pending"
                  ? "bg-orange-50 text-orange-700"
                  : "bg-green-50 text-green-700"
                }
              `}>
                {activeFilter ===
                  "pending"
                  ? "Pending Applications"
                  : "Operational Applications"}
              </span>

            </div>
          )}

        {filteredApplications.length >
          0 ? (

          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] items-stretch gap-4">
            {filteredApplications.map(
              (application, index) => (
                <AnimatedCard
                  key={application.id}
                  delay={(index % 6) * 80}
                >
                  <ApplicationCard
                    application={application as any}
                    onClick={
                      handleApplicationClick
                    }
                  />
                </AnimatedCard>
              )
            )}
          </div>

        ) : (

          <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
              <Search className="h-7 w-7  text-indigo-500" />
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              No applications found
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              No applications match your current search or filter.
            </p>

            <button
              type="button"
              onClick={
                clearFilters
              }
              className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
              Clear Filters
            </button>

          </div>

        )}

      </main>

    </div>
  );
}
