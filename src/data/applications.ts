import type {
  Application,
  ApplicationRecord,
  RecordStatus,
} from "@/types/application";

/* =========================================================
   MASTER DATA
========================================================= */

const departments = [
  "Finance",
  "HR",
  "Operations",
  "Engineering",
  "Administration",
];

const names = [
  "Raj Kumar",
  "Amit Sharma",
  "Ravi Singh",
  "Vikas Yadav",
  "Pankaj Kumar",
  "Sanjay Verma",
  "Anil Gupta",
  "Manoj Singh",
];

/* =========================================================
   MONTHS
========================================================= */

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
];

/* =========================================================
   CREATE MONTHLY TREND
========================================================= */

const createMonthlyTrends = (
  total: number,
  offset = 0
) => {
  const percentages = [
    0.09,
    0.14,
    0.11,
    0.18,
    0.21,
    0.16,
  ];

  return months.map((month, index) => {
    const percentage =
      percentages[
        (index + offset) %
          percentages.length
      ];

    return {
      month,

      value: Math.max(
        10,
        Math.round(total * percentage)
      ),
    };
  });
};

/* =========================================================
   CREATE APPLICATION RECORDS
========================================================= */

const createRecords = (
  applicationId: number,
  total: number,
  pending: number,
  approved: number,
): ApplicationRecord[] => {
  const records: ApplicationRecord[] = [];

  /*
   * Demo/testing के लिए 60 records.
   *
   * इससे pagination आसानी से test होगी।
   */

  const recordCount = 60;

  const pendingRatio =
    pending / total;

  const approvedRatio =
    approved / total;

  for (
    let index = 0;
    index < recordCount;
    index++
  ) {
    const position =
      index / recordCount;

    let status: RecordStatus;

    if (
      position < pendingRatio
    ) {
      status = "Pending";
    } else if (
      position <
      pendingRatio +
        approvedRatio
    ) {
      status = "Approved";
    } else {
      status = "Rejected";
    }

    /* ---------------------------------------------
       Month
    --------------------------------------------- */

    const monthIndex =
      index % months.length;

    const month =
      months[monthIndex];

    /* ---------------------------------------------
       Date
    --------------------------------------------- */

    const monthNumber =
      monthIndex + 1;

    const day =
      (index % 27) + 1;

    const submittedDate =
      `2026-${String(
        monthNumber
      ).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

    /* ---------------------------------------------
       Record
    --------------------------------------------- */

    records.push({
      id: index + 1,

      applicationId,

      referenceNo:
        `APP-${applicationId
          .toString()
          .padStart(2, "0")}-${(
          index + 1
        )
          .toString()
          .padStart(4, "0")}`,

      applicantName:
        names[
          index % names.length
        ],

      department:
        departments[
          index %
            departments.length
        ],

      submittedDate,

      month,

      status,
    });
  }

  return records;
};

/* =========================================================
   APPLICATION CONFIGURATION
========================================================= */

const applicationConfigs = [
  /* =======================================================
     1. e-Yatra
  ======================================================= */

  {
    id: 1,

    name: "e-Yatra",

    hindi: "ई-यात्रा",

    icon: "Plane",

    description:
      "Tour Management & Travel Itineraries System",

    status: "Operational" as const,

    color: "text-primary",

    stats: {
      totalUsers: 12458,

      totalRequests: 3241,

      total: 3241,

      approved: 2840,

      pending: 324,

      rejected: 77,
    },

    /*
     * आपके screenshot के अनुसार
     */

    monthlyTrends: [
      {
        month: "Jan",
        value: 420,
      },

      {
        month: "Feb",
        value: 680,
      },

      {
        month: "Mar",
        value: 540,
      },

      {
        month: "Apr",
        value: 850,
      },

      {
        month: "May",
        value: 940,
      },

      {
        month: "Jun",
        value: 720,
      },
    ],
  },

  /* =======================================================
     2. DigiLog
  ======================================================= */

  {
    id: 2,

    name: "DigiLog",

    hindi: "डिजीलॉग",

    icon: "Package",

    description:
      "Digital logistics and inventory tracking solution.",

    status: "Operational" as const,

    color: "text-secondary",

    stats: {
      totalUsers: 8240,

      totalRequests: 860,

      total: 860,

      pending: 120,

      approved: 650,

      rejected: 90,
    },

    monthlyTrends:
      createMonthlyTrends(860, 1),
  },

  /* =======================================================
     3. Kosh
  ======================================================= */

  {
    id: 3,

    name: "Kosh",

    hindi: "कोश",

    icon: "Wallet",

    description:
      "Treasury and centralized finance hub.",

    status: "Warning" as const,

    color: "text-orange-600",

    stats: {
      totalUsers: 6920,

      totalRequests: 720,

      total: 720,

      pending: 165,

      approved: 470,

      rejected: 85,
    },

    monthlyTrends:
      createMonthlyTrends(720, 2),
  },

  /* =======================================================
     4. Sampark
  ======================================================= */

  {
    id: 4,

    name: "Sampark",

    hindi: "संपर्क",

    icon: "Network",

    description:
      "Internal communications and connectivity platform.",

    status: "Operational" as const,

    color: "text-primary",

    stats: {
      totalUsers: 9100,

      totalRequests: 980,

      total: 980,

      pending: 210,

      approved: 690,

      rejected: 80,
    },

    monthlyTrends:
      createMonthlyTrends(980, 3),
  },

  /* =======================================================
     5. Shakti
  ======================================================= */

  {
    id: 5,

    name: "Shakti",

    hindi: "शक्ति",

    icon: "Zap",

    description:
      "Grid power monitoring and infrastructure management.",

    status: "Operational" as const,

    color: "text-amber-600",

    stats: {
      totalUsers: 5740,

      totalRequests: 640,

      total: 640,

      pending: 90,

      approved: 510,

      rejected: 40,
    },

    monthlyTrends:
      createMonthlyTrends(640, 4),
  },

  /* =======================================================
     6. Vayu
  ======================================================= */

  {
    id: 6,

    name: "Vayu",

    hindi: "वायु",

    icon: "Wind",

    description:
      "Environmental monitoring and air quality sensors.",

    status: "Maintenance" as const,

    color: "text-slate-500",

    stats: {
      totalUsers: 3420,

      totalRequests: 430,

      total: 430,

      pending: 150,

      approved: 220,

      rejected: 60,
    },

    monthlyTrends:
      createMonthlyTrends(430, 5),
  },

  /* =======================================================
     7. Nidhi
  ======================================================= */

  {
    id: 7,

    name: "Nidhi",

    hindi: "निधि",

    icon: "PiggyBank",

    description:
      "Pension and fund management gateway.",

    status: "Operational" as const,

    color: "text-primary",

    stats: {
      totalUsers: 10200,

      totalRequests: 1120,

      total: 1120,

      pending: 145,

      approved: 850,

      rejected: 125,
    },

    monthlyTrends:
      createMonthlyTrends(1120, 1),
  },

  /* =======================================================
     8. Raksha
  ======================================================= */

  {
    id: 8,

    name: "Raksha",

    hindi: "रक्षा",

    icon: "ShieldCheck",

    description:
      "Enterprise security and surveillance operations.",

    status: "Operational" as const,

    color: "text-green-600",

    stats: {
      totalUsers: 7840,

      totalRequests: 760,

      total: 760,

      pending: 100,

      approved: 590,

      rejected: 70,
    },

    monthlyTrends:
      createMonthlyTrends(760, 2),
  },
];

/* =========================================================
   GENERATE 38 APPLICATIONS
========================================================= */

export const applications: Application[] =
  Array.from(
    {
      length: 38,
    },
    (_, index) => {
      /*
       * 8 applications को repeat करके
       * total 38 applications बनाएंगे।
       */

      const config =
        applicationConfigs[
          index %
            applicationConfigs.length
        ];

      const applicationId =
        index + 1;

      return {
        ...config,

        /*
         * हर application की अपनी ID
         */

        id: applicationId,

        /*
         * हर application के अपने records
         */

        records: createRecords(
          applicationId,

          config.stats.total,

          config.stats.pending,

          config.stats.approved,
        ),
      };
    }
  );