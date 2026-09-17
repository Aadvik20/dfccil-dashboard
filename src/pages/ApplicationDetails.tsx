import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    CheckCircle2,
    CircleEllipsis,
    CircleX,
    Download,
    FileText,
    Package,
    PiggyBank,
    Plane,
    Search,
    ShieldCheck,
    Users,
    Wallet,
    Wind,
    X,
    Zap,
    Network,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import type {
    Application,
    RecordStatus,
} from "@/types/application";

import { applications } from "@/data/applications";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

/* =========================================================
   TYPES
========================================================= */

type StatusFilter =
    | "All"
    | RecordStatus;

type TrendPeriod =
    | "6months"
    | "ytd"
    | "quarter";

/* =========================================================
   ICON MAP
========================================================= */

const iconMap = {
    Plane,
    Package,
    Wallet,
    Network,
    Zap,
    Wind,
    PiggyBank,
    ShieldCheck,
};

type IconName = keyof typeof iconMap;

/* =========================================================
   MAIN COMPONENT
========================================================= */

const ApplicationDetails = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    /* -------------------------------------------------------
       Find application
    ------------------------------------------------------- */

    const application: Application | undefined =
        applications.find(
            (item) =>
                item.id === Number(id)
        );

    /* -------------------------------------------------------
       States
    ------------------------------------------------------- */

    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("All");

    const [selectedMonth, setSelectedMonth] =
        useState<string | null>(null);

    const [trendPeriod, setTrendPeriod] =
        useState<TrendPeriod>("6months");

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [pageSize, setPageSize] =
        useState(10);

    /* -------------------------------------------------------
       Application not found
    ------------------------------------------------------- */

    if (!application) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">
                        Application Not Found
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        The requested application does not exist.
                    </p>

                    <Button
                        className="mt-4"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    /* =======================================================
       DATA
    ======================================================= */

    const stats = application.stats;

    /* -------------------------------------------------------
       Approval Rate
    ------------------------------------------------------- */

    const approvalRate =
        stats.totalRequests > 0
            ? Math.round(
                (stats.approved /
                    stats.totalRequests) *
                100
            )
            : 0;

    /* =======================================================
       TREND DATA
    ======================================================= */

    const trendData = useMemo(() => {
        const data =
            application.monthlyTrends;

        if (
            trendPeriod ===
            "quarter"
        ) {
            return data.filter((item) =>
                ["Apr", "May", "Jun"].includes(
                    item.month
                )
            );
        }

        if (
            trendPeriod ===
            "ytd"
        ) {
            return data;
        }

        return data;
    }, [
        application.monthlyTrends,
        trendPeriod,
    ]);

    /* -------------------------------------------------------
       Maximum chart value
    ------------------------------------------------------- */

    const maxTrendValue = useMemo(() => {
        return Math.max(
            ...trendData.map(
                (item) => item.value
            ),
            1
        );
    }, [trendData]);

    /* =======================================================
       FILTER RECORDS
    ======================================================= */

    const filteredRecords = useMemo(() => {
        const periodMonths =
            trendPeriod ===
                "quarter"
                ? ["Apr", "May", "Jun"]
                : application.monthlyTrends.map(
                    (item) => item.month
                );

        return application.records.filter(
            (record) => {
                /* ---------------------------------------------
                   Search
                --------------------------------------------- */

                const searchText =
                    search.trim().toLowerCase();

                const matchesSearch =
                    !searchText ||
                    record.referenceNo
                        .toLowerCase()
                        .includes(searchText) ||
                    record.applicantName
                        .toLowerCase()
                        .includes(searchText) ||
                    record.department
                        .toLowerCase()
                        .includes(searchText);

                /* ---------------------------------------------
                   Status
                --------------------------------------------- */

                const matchesStatus =
                    statusFilter === "All" ||
                    record.status ===
                    statusFilter;

                /* ---------------------------------------------
                   Selected Month
                --------------------------------------------- */

                const matchesMonth =
                    selectedMonth
                        ? record.month ===
                        selectedMonth
                        : periodMonths.includes(
                            record.month
                        );

                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesMonth
                );
            }
        );
    }, [
        application.records,
        application.monthlyTrends,
        search,
        statusFilter,
        selectedMonth,
        trendPeriod,
    ]);

    /* =======================================================
       PAGINATION
    ======================================================= */

    const totalRecords =
        filteredRecords.length;

    const totalPages = Math.max(
        1,
        Math.ceil(
            totalRecords / pageSize
        )
    );

    const safeCurrentPage =
        Math.min(
            currentPage,
            totalPages
        );

    const startIndex =
        (safeCurrentPage - 1) *
        pageSize;

    const endIndex =
        startIndex + pageSize;

    const paginatedRecords =
        filteredRecords.slice(
            startIndex,
            endIndex
        );

    /* =======================================================
       HANDLERS
    ======================================================= */

    const handleStatusClick = (
        status: StatusFilter
    ) => {
        setStatusFilter(status);

        /*
         * Card click करने पर month selection हटेगा
         */
        setSelectedMonth(null);

        setCurrentPage(1);
    };

    const handleMonthClick = (
        month: string
    ) => {
        /*
         * Same month पर दोबारा click करने पर
         * filter remove हो जाएगा
         */

        if (
            selectedMonth === month
        ) {
            setSelectedMonth(null);
        } else {
            setSelectedMonth(month);
        }

        /*
         * Month click पर सभी status दिखाएं
         */
        setStatusFilter("All");

        setCurrentPage(1);
    };

    const handlePeriodChange = (
        value: TrendPeriod
    ) => {
        setTrendPeriod(value);

        setSelectedMonth(null);

        setStatusFilter("All");

        setCurrentPage(1);
    };

    const handleSearch = (
        value: string
    ) => {
        setSearch(value);

        setCurrentPage(1);
    };

    /* =======================================================
       TABLE TITLE
    ======================================================= */

    const tableTitle = selectedMonth
        ? `${selectedMonth} 2026 - Request Details`
        : statusFilter !== "All"
            ? `${statusFilter} Application Records`
            : trendPeriod ===
                "quarter"
                ? "Last Quarter - Request Details"
                : trendPeriod === "ytd"
                    ? "Year to Date - Request Details"
                    : "Request Details";

    /* =======================================================
       CLEAR FILTER
    ======================================================= */

    const hasFilter =
        statusFilter !== "All" ||
        selectedMonth !== null ||
        search !== "";

    const clearFilters = () => {
        setStatusFilter("All");
        setSelectedMonth(null);
        setSearch("");
        setTrendPeriod("6months");
        setCurrentPage(1);
    };

    /* =======================================================
       ICON
    ======================================================= */

    const ApplicationIcon =
        iconMap[
        application.icon as IconName
        ] ?? Plane;

    /* =======================================================
       EXPORT
    ======================================================= */

    const handleExport = () => {
        const headers = [
            "Reference No",
            "Applicant Name",
            "Department",
            "Submitted Date",
            "Month",
            "Status",
        ];

        const rows =
            filteredRecords.map(
                (record) => [
                    record.referenceNo,
                    record.applicantName,
                    record.department,
                    record.submittedDate,
                    record.month,
                    record.status,
                ]
            );

        const csv = [
            headers.join(","),
            ...rows.map((row) =>
                row
                    .map((value) =>
                        `"${String(value).replace(
                            /"/g,
                            '""'
                        )}"`
                    )
                    .join(",")
            ),
        ].join("\n");

        const blob =
            new Blob([csv], {
                type: "text/csv;charset=utf-8;",
            });

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `${application.name}-report.csv`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    /* =======================================================
       RENDER
    ======================================================= */

    return (
        <div className="space-y-6 p-4 md:p-8">

            {/* =================================================
          BREADCRUMB
      ================================================= */}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                    className="hover:text-primary"
                >
                    Home
                </button>

                <span>›</span>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                    className="hover:text-primary"
                >
                    Applications
                </button>

                <span>›</span>

                <span className="font-medium text-foreground">
                    {application.name}
                </span>

            </div>

            {/* =================================================
          APPLICATION HEADER
      ================================================= */}

            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                <div className="flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#c7c4d8] bg-[#eef0ff]">

                        <ApplicationIcon
                            className="h-9 w-9 text-[#4f46e5]"
                            strokeWidth={2}
                        />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold tracking-tight text-[#0b1c30]">
                            {application.name}
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {application.description}
                        </p>

                    </div>

                </div>

                <div className="flex gap-3">

                    <Button
                        variant="outline"
                        onClick={handleExport}
                        className="border-[#4f46e5] text-[#4f46e5] hover:bg-[#f2f1ff]"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                    </Button>

                    <Button
                        className="bg-[#4f46e5] hover:bg-[#4038c9]"
                        onClick={() => {
                            window.open(
                                "#",
                                "_blank"
                            );
                        }}
                    >
                        Open Application
                    </Button>

                </div>

            </div>

            {/* =================================================
          SUMMARY CARDS
      ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* Total Users */}

                {/* <SummaryCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<Users className="h-5 w-5" />}
                    borderClass="border-l-sky-500"
                    iconClass="text-sky-500"
                    activeBgClass="bg-sky-50"
                    subtitle="↗ 8.2%"
                    subtitleClass="text-sky-600"
                    active={false}
                    onClick={() => { }}
                /> */}

                {/* Total Requests */}

                <SummaryCard
                    title="Total Requests"
                    value={stats.totalRequests}
                    icon={<FileText className="h-5 w-5" />}
                    borderClass="border-l-indigo-600"
                    iconClass="text-indigo-600"
                    activeBgClass="bg-indigo-50"
                    subtitle="↗ 12.5%"
                    subtitleClass="text-indigo-600"
                    active={
                        statusFilter === "All" &&
                        selectedMonth === null
                    }
                    onClick={() =>
                        handleStatusClick("All")
                    }
                />

                {/* Approved */}

                <SummaryCard
                    title="Approved"
                    value={stats.approved}
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    borderClass="border-l-amber-600"
                    iconClass="text-amber-600"
                    activeBgClass="bg-amber-50"
                    subtitle={`${approvalRate}% Rate`}
                    subtitleClass="text-amber-600"
                    active={statusFilter === "Approved"}
                    onClick={() =>
                        handleStatusClick("Approved")
                    }
                />

                {/* Pending */}

                <SummaryCard
                    title="Pending"
                    value={stats.pending}
                    icon={<CircleEllipsis className="h-5 w-5" />}
                    borderClass="border-l-sky-700"
                    iconClass="text-sky-700"
                    activeBgClass="bg-sky-50"
                    subtitle="Average 2d"
                    subtitleClass="text-sky-700"
                    active={statusFilter === "Pending"}
                    onClick={() =>
                        handleStatusClick("Pending")
                    }
                />

                {/* Rejected */}

                <SummaryCard
                    title="Rejected"
                    value={stats.rejected}
                    icon={<CircleX className="h-5 w-5" />}
                    borderClass="border-l-red-600"
                    iconClass="text-red-600"
                    activeBgClass="bg-red-50"
                    subtitle="↘ 2.3%"
                    subtitleClass="text-red-600"
                    active={statusFilter === "Rejected"}
                    onClick={() =>
                        handleStatusClick("Rejected")
                    }
                />

            </div>

            {/* =================================================
          CHART + APPROVAL RATE
      ================================================= */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* =================================================
            REQUEST TRENDS
        ================================================= */}

                <Card className="border-[#c7c4d8] shadow-none lg:col-span-2">

                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                            <CardTitle className="text-lg text-[#0b1c30]">
                                Request Trends
                            </CardTitle>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Monthly volume overview for the current fiscal year
                            </p>

                        </div>

                        <Select
                            value={trendPeriod}
                            onValueChange={(value) =>
                                handlePeriodChange(
                                    value as TrendPeriod
                                )
                            }
                        >
                            <SelectTrigger className="w-[155px]">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="6months">
                                    Last 6 Months
                                </SelectItem>

                                <SelectItem value="ytd">
                                    Year to Date
                                </SelectItem>

                                <SelectItem value="quarter">
                                    Last Quarter
                                </SelectItem>

                            </SelectContent>
                        </Select>

                    </CardHeader>

                    <CardContent>

                        {/* Chart */}

                        <div className="w-full overflow-x-auto">

                            <div className="flex h-[310px] min-w-[600px] items-end gap-3 border-b border-[#c7c4d8] px-3 sm:gap-5">

                                {trendData.map(
                                    (item) => {
                                        const height =
                                            Math.max(
                                                30,
                                                (item.value /
                                                    maxTrendValue) *
                                                225
                                            );

                                        const isSelected =
                                            selectedMonth ===
                                            item.month;

                                        return (
                                            <button
                                                key={
                                                    item.month
                                                }
                                                type="button"
                                                onClick={() =>
                                                    handleMonthClick(
                                                        item.month
                                                    )
                                                }
                                                className="group flex h-full flex-1 flex-col justify-end outline-none"
                                            >

                                                {/* Value */}

                                                <div
                                                    className={`
                            mb-2 text-center text-xs font-semibold
                            transition-opacity
                            ${isSelected
                                                            ? "text-[#4f46e5] opacity-100"
                                                            : "opacity-0 group-hover:opacity-100"
                                                        }
                          `}
                                                >
                                                    {item.value.toLocaleString()}
                                                </div>

                                                {/* Bar */}

                                                <div
                                                    className={`
                            mx-auto w-full max-w-[150px]
                            rounded-t-lg
                            transition-all duration-300
                            ${isSelected
                                                            ? "bg-[#4f46e5] shadow-[0_0_0_3px_rgba(79,70,229,0.15)]"
                                                            : "bg-[#dcdffc] group-hover:bg-[#6366f1]"
                                                        }
                          `}
                                                    style={{
                                                        height: `${height}px`,
                                                    }}
                                                />

                                                {/* Month */}

                                                <div className={`mt-3 border-t border-[#c7c4d8] pt-2 text-center text-xs ${isSelected
                                                            ? "font-bold text-[#4f46e5]"
                                                            : "text-muted-foreground"
                                                        }
                                                        `}>
                                                    {item.month}
                                                </div>

                                            </button>
                                        );
                                    }
                                )}

                            </div>

                        </div>

                        {/* Selected month */}

                        {selectedMonth && (
                            <div className="mt-4 flex items-center justify-between rounded-lg bg-[#f3f3ff] px-4 py-3">

                                <div className="text-sm">
                                    Showing records for{" "}
                                    <span className="font-semibold text-[#4f46e5]">
                                        {selectedMonth} 2026
                                    </span>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        handleMonthClick(
                                            selectedMonth
                                        )
                                    }
                                >
                                    <X className="mr-1 h-4 w-4" />
                                    Clear
                                </Button>

                            </div>
                        )}

                    </CardContent>

                </Card>

                {/* =================================================
            APPROVAL RATE
        ================================================= */}

                <Card className="border-[#c7c4d8] shadow-none">

                    <CardHeader>

                        <CardTitle className="text-lg text-[#0b1c30]">
                            Approval Rate
                        </CardTitle>

                        <p className="text-sm text-muted-foreground">
                            Current application approval performance
                        </p>

                    </CardHeader>

                    <CardContent>

                        {/* Circular percentage */}

                        <div className="flex justify-center py-5">

                            <div
                                className="relative flex h-44 w-44 items-center justify-center rounded-full"
                                style={{
                                    background: `conic-gradient(
                    #4f46e5 ${approvalRate * 3.6}deg,
                    #e5e7eb 0deg
                  )`,
                                }}
                            >

                                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">

                                    <span className="text-3xl font-bold text-[#0b1c30]">
                                        {approvalRate}%
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        Approval Rate
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Stats */}

                        <div className="space-y-4">

                            <ApprovalRow
                                label="Approved"
                                value={stats.approved}
                                dotClass="bg-green-500"
                            />

                            <ApprovalRow
                                label="Pending"
                                value={stats.pending}
                                dotClass="bg-amber-500"
                            />

                            <ApprovalRow
                                label="Rejected"
                                value={stats.rejected}
                                dotClass="bg-red-500"
                            />

                        </div>

                    </CardContent>

                </Card>

            </div>

            {/* =================================================
          TABLE
      ================================================= */}


            <Card className="overflow-hidden border-0 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)]">

                <CardHeader className="border-b border-slate-100 bg-white px-5 py-5">

                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                        {/* Title */}

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">

                                    <FileText
                                        className="h-5 w-5 text-indigo-600"
                                    />

                                </div>

                                <div>

                                    <CardTitle className="text-lg font-bold text-slate-900">
                                        {tableTitle}
                                    </CardTitle>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Showing{" "}
                                        <span className="font-semibold text-slate-700">
                                            {totalRecords.toLocaleString()}
                                        </span>{" "}
                                        application records
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* =================================================
          SEARCH + FILTER
      ================================================= */}

                        <div className="flex flex-col gap-2 sm:flex-row">

                            {/* Search */}

                            <div className="relative">

                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                <Input
                                    value={search}
                                    onChange={(event) =>
                                        handleSearch(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Search applications..."
                                    className="
              h-10
              w-full
              rounded-lg
              border-slate-200
              bg-slate-50
              pl-9
              text-sm
              shadow-none
              transition
              focus:bg-white
              focus:ring-2
              focus:ring-indigo-100
              sm:w-[260px]
            "
                                />

                            </div>

                            {/* Clear Filter */}

                            {hasFilter && (

                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="
              h-10
              rounded-lg
              border-slate-200
              text-slate-600
              hover:bg-slate-50
            "
                                >

                                    <X className="mr-2 h-4 w-4" />

                                    Clear

                                </Button>

                            )}

                        </div>

                    </div>

                    {/* =================================================
        ACTIVE FILTERS
    ================================================= */}

                    {hasFilter && (

                        <div className="mt-4 flex flex-wrap items-center gap-2">

                            <span className="text-xs font-medium text-slate-500">
                                Active filters:
                            </span>

                            {statusFilter !== "All" && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleStatusClick("All")
                                    }
                                    className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-indigo-50
              px-3
              py-1.5
              text-xs
              font-semibold
              text-indigo-700
              transition
              hover:bg-indigo-100
            "
                                >

                                    Status: {statusFilter}

                                    <X className="h-3 w-3" />

                                </button>

                            )}

                            {selectedMonth && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleMonthClick(
                                            selectedMonth
                                        )
                                    }
                                    className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-blue-50
              px-3
              py-1.5
              text-xs
              font-semibold
              text-blue-700
              transition
              hover:bg-blue-100
            "
                                >

                                    Month: {selectedMonth}

                                    <X className="h-3 w-3" />

                                </button>

                            )}

                        </div>

                    )}

                </CardHeader>

                {/* =================================================
      TABLE
  ================================================= */}

                <CardContent className="p-0">

                    <div className="overflow-x-auto">

                        <Table>

                            {/* =================================================
            HEADER
        ================================================= */}

                            <TableHeader>

                                <TableRow
                                    className="
              border-b
              border-slate-200
              bg-slate-50/80
              hover:bg-slate-50/80
            "
                                >

                                    <TableHead
                                        className="
                h-12
                px-5
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
                                    >
                                        Reference
                                    </TableHead>

                                    <TableHead
                                        className="
                h-12
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
                                    >
                                        Applicant
                                    </TableHead>

                                    <TableHead
                                        className="
                h-12
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
                                    >
                                        Department
                                    </TableHead>

                                    <TableHead
                                        className="
                h-12
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
                                    >
                                        Submitted
                                    </TableHead>

                                    <TableHead
                                        className="
                h-12
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
                                    >
                                        Month
                                    </TableHead>

                                    <TableHead
                                        className="
                h-12
                text-[11px]
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
                                    >
                                        Status
                                    </TableHead>

                                </TableRow>

                            </TableHeader>

                            {/* =================================================
            BODY
        ================================================= */}

                            <TableBody>

                                {paginatedRecords.length > 0 ? (

                                    paginatedRecords.map(
                                        (record, index) => (

                                            <TableRow
                                                key={record.id}
                                                className="
                    group
                    border-b
                    border-slate-100
                    transition-all
                    duration-200
                    hover:bg-indigo-50/40
                  "
                                            >

                                                {/* ======================================
                      REFERENCE
                  ====================================== */}

                                                <TableCell className="">

                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-indigo-50
                          text-indigo-600
                          transition
                          group-hover:bg-indigo-100
                        "
                                                        >

                                                            <FileText className="h-4 w-4" />

                                                        </div>

                                                        <div>

                                                            <p
                                                                className="
                            text-sm
                            font-semibold
                            text-indigo-600
                            transition
                            group-hover:text-indigo-700
                          "
                                                            >
                                                                {record.referenceNo}
                                                            </p>

                                                            <p className="text-[11px] text-slate-400">
                                                                Application #{record.id}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </TableCell>

                                                {/* ======================================
                      APPLICANT
                  ====================================== */}

                                                <TableCell>

                                                    <div className="flex items-center gap-3">

                                                        {/* Avatar */}

                                                        <div
                                                            className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-gradient-to-br
                          from-indigo-500
                          to-violet-500
                          text-xs
                          font-bold
                          text-white
                          shadow-sm
                        "
                                                        >
                                                            {getInitials(
                                                                record.applicantName
                                                            )}
                                                        </div>

                                                        <div>

                                                            <p className="text-sm font-semibold text-slate-800">
                                                                {record.applicantName}
                                                            </p>

                                                            <p className="text-[11px] text-slate-400">
                                                                Applicant
                                                            </p>

                                                        </div>

                                                    </div>

                                                </TableCell>

                                                {/* ======================================
                      DEPARTMENT
                  ====================================== */}

                                                <TableCell>

                                                    <span
                                                        className="
                        inline-flex
                        items-center
                        rounded-lg
                        bg-slate-100
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-slate-600
                        transition
                        group-hover:bg-white
                        group-hover:shadow-sm
                      "
                                                    >
                                                        {record.department}
                                                    </span>

                                                </TableCell>

                                                {/* ======================================
                      DATE
                  ====================================== */}

                                                <TableCell>

                                                    <div>

                                                        <p className="text-sm font-medium text-slate-700">
                                                            {formatDate(
                                                                record.submittedDate
                                                            )}
                                                        </p>

                                                        <p className="mt-0.5 text-[11px] text-slate-400">
                                                            Submitted
                                                        </p>

                                                    </div>

                                                </TableCell>

                                                {/* ======================================
                      MONTH
                  ====================================== */}

                                                <TableCell>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleMonthClick(
                                                                record.month
                                                            )
                                                        }
                                                        className="
                        rounded-full
                        bg-blue-50
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-blue-600
                        transition
                        hover:bg-blue-100
                        hover:text-blue-700
                      "
                                                    >
                                                        {record.month}
                                                    </button>

                                                </TableCell>

                                                {/* ======================================
                      STATUS
                  ====================================== */}

                                                <TableCell>

                                                    <StatusBadge
                                                        status={
                                                            record.status
                                                        }
                                                    />

                                                </TableCell>

                                            </TableRow>

                                        )
                                    )

                                ) : (

                                    /* ==========================================
                                       EMPTY STATE
                                    ========================================== */

                                    <TableRow>

                                        <TableCell
                                            colSpan={6}
                                            className="h-[300px]"
                                        >

                                            <div className="flex flex-col items-center justify-center text-center">

                                                <div
                                                    className="
                      mb-4
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-100
                    "
                                                >

                                                    <FileText
                                                        className="
                        h-7
                        w-7
                        text-slate-400
                      "
                                                    />

                                                </div>

                                                <h3 className="text-base font-semibold text-slate-800">
                                                    No records found
                                                </h3>

                                                <p className="mt-1 max-w-sm text-sm text-slate-500">
                                                    We couldn't find any applications matching your current filters.
                                                </p>

                                                {hasFilter && (

                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="mt-4"
                                                        onClick={
                                                            clearFilters
                                                        }
                                                    >
                                                        Clear Filters
                                                    </Button>

                                                )}

                                            </div>

                                        </TableCell>

                                    </TableRow>

                                )}

                            </TableBody>

                        </Table>

                    </div>

                    {/* =================================================
        PAGINATION
    ================================================= */}

                    <div
                        className="
        flex
        flex-col
        gap-4
        border-t
        border-slate-100
        bg-slate-50/50
        px-5
        py-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
                    >

                        {/* LEFT */}

                        <div className="flex items-center gap-3">

                            <div className="text-xs text-slate-500">

                                Showing{" "}

                                <span className="font-semibold text-slate-700">
                                    {totalRecords === 0
                                        ? 0
                                        : startIndex + 1}
                                </span>

                                {" "}to{" "}

                                <span className="font-semibold text-slate-700">
                                    {Math.min(
                                        endIndex,
                                        totalRecords
                                    )}
                                </span>

                                {" "}of{" "}

                                <span className="font-semibold text-slate-700">
                                    {totalRecords}
                                </span>

                            </div>

                        </div>

                        {/* CENTER */}

                        <div className="flex items-center justify-center gap-1">

                            <Button
                                variant="outline"
                                size="icon"
                                className="
            h-8
            w-8
            rounded-lg
            border-slate-200
            bg-white
          "
                                disabled={
                                    safeCurrentPage <= 1
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        (page) =>
                                            Math.max(
                                                1,
                                                page - 1
                                            )
                                    )
                                }
                            >

                                <ChevronLeft className="h-4 w-4" />

                            </Button>

                            {Array.from(
                                {
                                    length: totalPages,
                                },
                                (_, index) =>
                                    index + 1
                            )
                                .slice(
                                    Math.max(
                                        0,
                                        safeCurrentPage - 3
                                    ),
                                    Math.min(
                                        totalPages,
                                        safeCurrentPage + 2
                                    )
                                )
                                .map((page) => (

                                    <Button
                                        key={page}
                                        variant={
                                            page ===
                                                safeCurrentPage
                                                ? "default"
                                                : "outline"
                                        }
                                        size="icon"
                                        className={`
                h-8
                w-8
                rounded-lg
                text-xs
                ${page ===
                                                safeCurrentPage
                                                ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                                            }
              `}
                                        onClick={() =>
                                            setCurrentPage(
                                                page
                                            )
                                        }
                                    >
                                        {page}
                                    </Button>

                                ))}

                            <Button
                                variant="outline"
                                size="icon"
                                className="
            h-8
            w-8
            rounded-lg
            border-slate-200
            bg-white
          "
                                disabled={
                                    safeCurrentPage >=
                                    totalPages
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        (page) =>
                                            Math.min(
                                                totalPages,
                                                page + 1
                                            )
                                    )
                                }
                            >

                                <ChevronRight className="h-4 w-4" />

                            </Button>

                        </div>

                        {/* RIGHT */}

                        <div className="flex items-center justify-end gap-2">

                            <span className="text-xs text-slate-500">
                                Rows
                            </span>

                            <Select
                                value={String(
                                    pageSize
                                )}
                                onValueChange={(
                                    value
                                ) => {

                                    setPageSize(
                                        Number(value)
                                    );

                                    setCurrentPage(1);

                                }}
                            >

                                <SelectTrigger
                                    className="
              h-8
              w-[70px]
              rounded-lg
              border-slate-200
              bg-white
              text-xs
            "
                                >
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="10">
                                        10
                                    </SelectItem>

                                    <SelectItem value="20">
                                        20
                                    </SelectItem>

                                    <SelectItem value="50">
                                        50
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
};

/* =========================================================
   SUMMARY CARD
========================================================= */

interface SummaryCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;

    borderClass: string;
    iconClass: string;

    activeBgClass: string;

    subtitle: string;
    subtitleClass: string;

    active: boolean;
    onClick: () => void;
}

const SummaryCard = ({
    title,
    value,
    icon,
    borderClass,
    iconClass,
    activeBgClass,
    subtitle,
    subtitleClass,
    active,
    onClick,
}: SummaryCardProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
        relative
        w-full
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        border-l-4
        ${borderClass}
        p-6
        text-left
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md

        ${active
                    ? `${activeBgClass} shadow-sm`
                    : "bg-white"
                }
      `}
        >
            <div className="flex items-start justify-between">

                <div>
                    <p className="text-xs font-semibold tracking-wider text-[#0b1c30]">
                        {title}
                    </p>

                    <p className="mt-6 text-2xl font-bold text-[#0b1c30]">
                        {value.toLocaleString()}
                    </p>

                    <p
                        className={`mt-2 text-xs font-semibold ${subtitleClass}`}
                    >
                        {subtitle}
                    </p>
                </div>

                <div className={iconClass}>
                    {icon}
                </div>

            </div>
        </button>
    );
};

/* =========================================================
   APPROVAL ROW
========================================================= */

const ApprovalRow = ({
    label,
    value,
    dotClass,
}: {
    label: string;
    value: number;
    dotClass: string;
}) => {
    return (
        <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

                <span
                    className={`h-2.5 w-2.5 rounded-full ${dotClass}`}
                />

                <span className="text-sm text-muted-foreground">
                    {label}
                </span>

            </div>

            <span className="font-semibold text-[#0b1c30]">
                {value.toLocaleString()}
            </span>

        </div>
    );
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
    status,
}: {
    status: RecordStatus;
}) => {

    if (status === "Approved") {
        return (
            <Badge className="border-0 bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                Approved
            </Badge>
        );
    }

    if (status === "Pending") {
        return (
            <Badge className="border-0 bg-amber-100 text-amber-700 hover:bg-amber-100">
                <CircleEllipsis className="mr-1 h-3.5 w-3.5" />
                Pending
            </Badge>
        );
    }

    return (
        <Badge className="border-0 bg-red-100 text-red-700 hover:bg-red-100">
            <CircleX className="mr-1 h-3.5 w-3.5" />
            Rejected
        </Badge>
    );
};

/* =========================================================
   DATE FORMAT
========================================================= */

const formatDate = (
    date: string
) => {
    const parsed =
        new Date(date);

    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {
        return date;
    }

    return parsed.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};

const getInitials = (
    name: string
) => {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(
            (word) =>
                word.charAt(0).toUpperCase()
        )
        .join("");
};

export default ApplicationDetails;