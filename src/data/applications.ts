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
  {
    "id": 12,
    "name": "Attendance Management",
    "hindi": "e-उपस्थिति",
    "icon": "Calendar",
    "description": "Records and monitors employee's online attendance efficiently and accurately.",
    "status": "Operational",
    "color": "text-success",
    "stats": {
      "totalUsers": 8234,
      "totalRequests": 4123,
      "total": 4123,
      "approved": 3711,
      "pending": 330,
      "rejected": 82
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 350},
      {"month": "Feb", "value": 410},
      {"month": "Mar", "value": 390},
      {"month": "Apr", "value": 520},
      {"month": "May", "value": 480},
      {"month": "Jun", "value": 600}
    ]
  },
  {
    "id": 14,
    "name": "Asset Management",
    "hindi": "e-संसाधन",
    "icon": "Box",
    "description": "Tracks & manages physical and digital assets.",
    "status": "Operational",
    "color": "text-info",
    "stats": {
      "totalUsers": 5432,
      "totalRequests": 1890,
      "total": 1890,
      "approved": 1607,
      "pending": 189,
      "rejected": 94
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 200},
      {"month": "Feb", "value": 240},
      {"month": "Mar", "value": 270},
      {"month": "Apr", "value": 310},
      {"month": "May", "value": 290},
      {"month": "Jun", "value": 350}
    ]
  },
  {
    "id": 15,
    "name": "Grievance Management",
    "hindi": "e-शिकायत निवारण",
    "icon": "AlertTriangle",
    "description": "Receive, track, and resolve complaints or issues raised by employees.",
    "status": "Operational",
    "color": "text-danger",
    "stats": {
      "totalUsers": 11045,
      "totalRequests": 3456,
      "total": 3456,
      "approved": 2938,
      "pending": 346,
      "rejected": 172
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 500},
      {"month": "Feb", "value": 550},
      {"month": "Mar", "value": 620},
      {"month": "Apr", "value": 580},
      {"month": "May", "value": 650},
      {"month": "Jun", "value": 700}
    ]
  },
  {
    "id": 18,
    "name": "Smriti",
    "hindi": "स्मृति",
    "icon": "Archive",
    "description": "Archives",
    "status": "Operational",
    "color": "text-secondary",
    "stats": {
      "totalUsers": 2589,
      "totalRequests": 987,
      "total": 987,
      "approved": 839,
      "pending": 99,
      "rejected": 49
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 150},
      {"month": "Feb", "value": 180},
      {"month": "Mar", "value": 160},
      {"month": "Apr", "value": 210},
      {"month": "May", "value": 200},
      {"month": "Jun", "value": 250}
    ]
  },
  {
    "id": 19,
    "name": "Recruitment",
    "hindi": "e-नियुक्ति",
    "icon": "Users",
    "description": "Recruitment module for automation of recruitment process.",
    "status": "Operational",
    "color": "text-primary",
    "stats": {
      "totalUsers": 14876,
      "totalRequests": 4879,
      "total": 4879,
      "approved": 4147,
      "pending": 488,
      "rejected": 244
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 420},
      {"month": "Feb", "value": 480},
      {"month": "Mar", "value": 510},
      {"month": "Apr", "value": 590},
      {"month": "May", "value": 550},
      {"month": "Jun", "value": 620}
    ]
  },
  {
    "id": 20,
    "name": "Floor Management",
    "hindi": "e-तल प्रबंधन",
    "icon": "Map",
    "description": "Directory and virtual map of corporate office.",
    "status": "Operational",
    "color": "text-warning",
    "stats": {
      "totalUsers": 1245,
      "totalRequests": 456,
      "total": 456,
      "approved": 388,
      "pending": 46,
      "rejected": 22
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 100},
      {"month": "Feb", "value": 120},
      {"month": "Mar", "value": 110},
      {"month": "Apr", "value": 140},
      {"month": "May", "value": 130},
      {"month": "Jun", "value": 160}
    ]
  },
  {
    "id": 21,
    "name": "Tax Declaration",
    "hindi": "e-शुल्क",
    "icon": "FileText",
    "description": "Related to TADK, Mobile expenses, Uniform allowance etc.",
    "status": "Operational",
    "color": "text-success",
    "stats": {
      "totalUsers": 9876,
      "totalRequests": 2980,
      "total": 2980,
      "approved": 2533,
      "pending": 298,
      "rejected": 149
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 600},
      {"month": "Feb", "value": 680},
      {"month": "Mar", "value": 720},
      {"month": "Apr", "value": 790},
      {"month": "May", "value": 850},
      {"month": "Jun", "value": 900}
    ]
  },
  {
    "id": 25,
    "name": "Payment Gateway",
    "hindi": "मूल्य भुगतान",
    "icon": "CreditCard",
    "description": "Payment gateway for employee to make payment to DFCCIL.",
    "status": "Operational",
    "color": "text-info",
    "stats": {
      "totalUsers": 13456,
      "totalRequests": 4999,
      "total": 4999,
      "approved": 4249,
      "pending": 500,
      "rejected": 250
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 800},
      {"month": "Feb", "value": 900},
      {"month": "Mar", "value": 850},
      {"month": "Apr", "value": 950},
      {"month": "May", "value": 1000},
      {"month": "Jun", "value": 1100}
    ]
  },
  {
    "id": 28,
    "name": "Salary",
    "hindi": "e-वेतन",
    "icon": "DollarSign",
    "description": "Download salary slip and Form 16",
    "status": "Operational",
    "color": "text-primary",
    "stats": {
      "totalUsers": 15000,
      "totalRequests": 5000,
      "total": 5000,
      "approved": 4500,
      "pending": 400,
      "rejected": 100
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 1200},
      {"month": "Feb", "value": 1200},
      {"month": "Mar", "value": 1250},
      {"month": "Apr", "value": 1250},
      {"month": "May", "value": 1300},
      {"month": "Jun", "value": 1300}
    ]
  },
  {
    "id": 51,
    "name": "Annexure Management System",
    "hindi": "अनुलग्नक प्रबंधन प्रणाली",
    "icon": "Paperclip",
    "description": "Annexure Management System",
    "status": "Operational",
    "color": "text-warning",
    "stats": {
      "totalUsers": 4321,
      "totalRequests": 1234,
      "total": 1234,
      "approved": 1049,
      "pending": 123,
      "rejected": 62
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 250},
      {"month": "Feb", "value": 280},
      {"month": "Mar", "value": 300},
      {"month": "Apr", "value": 320},
      {"month": "May", "value": 350},
      {"month": "Jun", "value": 380}
    ]
  },
  {
    "id": 54,
    "name": "Traction Distribution Management System",
    "hindi": "कर्षण विद्युत वितरण प्रबंधन प्रणाली (TDMS)",
    "icon": "Zap",
    "description": "A digital solution for streamlined traction power distribution operations.",
    "status": "Operational",
    "color": "text-danger",
    "stats": {
      "totalUsers": 3344,
      "totalRequests": 1122,
      "total": 1122,
      "approved": 954,
      "pending": 112,
      "rejected": 56
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 450},
      {"month": "Feb", "value": 470},
      {"month": "Mar", "value": 500},
      {"month": "Apr", "value": 530},
      {"month": "May", "value": 550},
      {"month": "Jun", "value": 580}
    ]
  },
  {
    "id": 64,
    "name": "SAP Cutover",
    "hindi": "एसएपी कटओवर",
    "icon": "Layers",
    "description": "SAP Cutover Templates",
    "status": "Operational",
    "color": "text-info",
    "stats": {
      "totalUsers": 2109,
      "totalRequests": 879,
      "total": 879,
      "approved": 747,
      "pending": 88,
      "rejected": 44
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 300},
      {"month": "Feb", "value": 320},
      {"month": "Mar", "value": 340},
      {"month": "Apr", "value": 370},
      {"month": "May", "value": 400},
      {"month": "Jun", "value": 420}
    ]
  },
  {
    "id": 67,
    "name": "No Objection Certificate",
    "hindi": "e-अनापत्ति",
    "icon": "CheckCircle",
    "description": "Apply and Track issuance of NOC",
    "status": "Operational",
    "color": "text-success",
    "stats": {
      "totalUsers": 7890,
      "totalRequests": 2345,
      "total": 2345,
      "approved": 1993,
      "pending": 235,
      "rejected": 117
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 700},
      {"month": "Feb", "value": 750},
      {"month": "Mar", "value": 800},
      {"month": "Apr", "value": 850},
      {"month": "May", "value": 900},
      {"month": "Jun", "value": 950}
    ]
  },
  {
    "id": 68,
    "name": "Vigilance Awareness Week 2026",
    "hindi": "सतर्कता जागरूकता सप्ताह 2026",
    "icon": "Eye",
    "description": "An online reporting format to ensure uniformity, transparency and ease of reporting.",
    "status": "Operational",
    "color": "text-primary",
    "stats": {
      "totalUsers": 1200,
      "totalRequests": 340,
      "total": 340,
      "approved": 289,
      "pending": 34,
      "rejected": 17
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 50},
      {"month": "Feb", "value": 60},
      {"month": "Mar", "value": 70},
      {"month": "Apr", "value": 80},
      {"month": "May", "value": 90},
      {"month": "Jun", "value": 100}
    ]
  },
  {
    "id": 70,
    "name": "Caretaker Reimbursement",
    "hindi": "कार्यवाहक प्रतिपूर्ति",
    "icon": "Heart",
    "description": "To fill and monitor the declaration of caretaker details",
    "status": "Operational",
    "color": "text-danger",
    "stats": {
      "totalUsers": 890,
      "totalRequests": 250,
      "total": 250,
      "approved": 212,
      "pending": 25,
      "rejected": 13
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 180},
      {"month": "Feb", "value": 200},
      {"month": "Mar", "value": 220},
      {"month": "Apr", "value": 240},
      {"month": "May", "value": 260},
      {"month": "Jun", "value": 280}
    ]
  },
  {
    "id": 71,
    "name": "E-Office",
    "hindi": "E-Office",
    "icon": "Briefcase",
    "description": "e-Office is a digital workplace solution designed to make government offices more efficient, transparent, and accountable by replacing manual with an electronic workflow system",
    "status": "Operational",
    "color": "text-info",
    "stats": {
      "totalUsers": 14500,
      "totalRequests": 4800,
      "total": 4800,
      "approved": 4080,
      "pending": 480,
      "rejected": 240
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 900},
      {"month": "Feb", "value": 950},
      {"month": "Mar", "value": 1000},
      {"month": "Apr", "value": 1050},
      {"month": "May", "value": 1100},
      {"month": "Jun", "value": 1150}
    ]
  },
  {
    "id": 72,
    "name": "Work Progress Report",
    "hindi": "कार्य प्रगति रिपोर्ट",
    "icon": "TrendingUp",
    "description": "Work Progress Report",
    "status": "Operational",
    "color": "text-success",
    "stats": {
      "totalUsers": 6789,
      "totalRequests": 2100,
      "total": 2100,
      "approved": 1785,
      "pending": 210,
      "rejected": 105
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 400},
      {"month": "Feb", "value": 420},
      {"month": "Mar", "value": 450},
      {"month": "Apr", "value": 480},
      {"month": "May", "value": 500},
      {"month": "Jun", "value": 530}
    ]
  },
  {
    "id": 73,
    "name": "EWDFC Communication Repository",
    "hindi": "संचार संग्रह",
    "icon": "MessageSquare",
    "description": "Repository of all communications made with respect to EWDFC",
    "status": "Operational",
    "color": "text-warning",
    "stats": {
      "totalUsers": 3210,
      "totalRequests": 1050,
      "total": 1050,
      "approved": 892,
      "pending": 105,
      "rejected": 53
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 220},
      {"month": "Feb", "value": 250},
      {"month": "Mar", "value": 280},
      {"month": "Apr", "value": 300},
      {"month": "May", "value": 320},
      {"month": "Jun", "value": 350}
    ]
  },
  {
    "id": 75,
    "name": "OutSource Management",
    "hindi": "आउटसोर्स प्रबंधन",
    "icon": "UserCheck",
    "description": "For managing outsourced manpower, contractors, contracts, attendance.",
    "status": "Operational",
    "color": "text-primary",
    "stats": {
      "totalUsers": 5678,
      "totalRequests": 1987,
      "total": 1987,
      "approved": 1689,
      "pending": 199,
      "rejected": 99
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 550},
      {"month": "Feb", "value": 580},
      {"month": "Mar", "value": 600},
      {"month": "Apr", "value": 630},
      {"month": "May", "value": 650},
      {"month": "Jun", "value": 680}
    ]
  },
  {
    "id": 77,
    "name": "Budget Planning",
    "hindi": "बजट योजना",
    "icon": "PieChart",
    "description": "Budget Planning",
    "status": "Operational",
    "color": "text-success",
    "stats": {
      "totalUsers": 4567,
      "totalRequests": 1500,
      "total": 1500,
      "approved": 1275,
      "pending": 150,
      "rejected": 75
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 320},
      {"month": "Feb", "value": 340},
      {"month": "Mar", "value": 360},
      {"month": "Apr", "value": 380},
      {"month": "May", "value": 400},
      {"month": "Jun", "value": 430}
    ]
  },
  {
    "id": 79,
    "name": "Payroll Hiring",
    "hindi": "वेतन निर्धारण",
    "icon": "UserPlus",
    "description": "A system for onboarding new employees, where they submit their email, bank details, etc. which are then verified and approved by Finance.",
    "status": "Operational",
    "color": "text-info",
    "stats": {
      "totalUsers": 9870,
      "totalRequests": 3123,
      "total": 3123,
      "approved": 2655,
      "pending": 312,
      "rejected": 156
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 280},
      {"month": "Feb", "value": 300},
      {"month": "Mar", "value": 320},
      {"month": "Apr", "value": 340},
      {"month": "May", "value": 360},
      {"month": "Jun", "value": 390}
    ]
  },
  {
    "id": 80,
    "name": "Enterprise Al: Gemini",
    "hindi": "Enterprise Al: Gemini",
    "icon": "Cpu",
    "description": "Your secure Al assistant for finding information, getting answers, creating content, and improving everyday productivity.",
    "status": "Operational",
    "color": "text-danger",
    "stats": {
      "totalUsers": 18000,
      "totalRequests": 7500,
      "total": 7500,
      "approved": 6375,
      "pending": 750,
      "rejected": 375
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 1000},
      {"month": "Feb", "value": 1100},
      {"month": "Mar", "value": 1200},
      {"month": "Apr", "value": 1300},
      {"month": "May", "value": 1400},
      {"month": "Jun", "value": 1500}
    ]
  },
  {
    "id": 81,
    "name": "Risk Managment",
    "hindi": "Risk Managment",
    "icon": "Shield",
    "description": "Risk Managment",
    "status": "Operational",
    "color": "text-warning",
    "stats": {
      "totalUsers": 4123,
      "totalRequests": 1345,
      "total": 1345,
      "approved": 1143,
      "pending": 135,
      "rejected": 67
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 180},
      {"month": "Feb", "value": 190},
      {"month": "Mar", "value": 200},
      {"month": "Apr", "value": 210},
      {"month": "May", "value": 220},
      {"month": "Jun", "value": 230}
    ]
  },
  {
    "id": 2,
    "name": "Tour Management",
    "hindi": "e-यात्रा",
    "icon": "Plane",
    "description": "Organizes and manages travel itineraries, bookings, and payment process.",
    "status": "Operational",
    "color": "text-primary",
    "stats": {
      "totalUsers": 12458,
      "totalRequests": 3241,
      "total": 3241,
      "approved": 2840,
      "pending": 324,
      "rejected": 77
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 420},
      {"month": "Feb", "value": 680},
      {"month": "Mar", "value": 540},
      {"month": "Apr", "value": 850},
      {"month": "May", "value": 940},
      {"month": "Jun", "value": 720}
    ]
  },
  {
    "id": 5,
    "name": "SPARROW",
    "hindi": "SPARROW",
    "icon": "Award",
    "description": "SPARROW is an online window for filing of annual performance appraisal report of the officers",
    "status": "Operational",
    "color": "text-success",
    "stats": {
      "totalUsers": 8765,
      "totalRequests": 2800,
      "total": 2800,
      "approved": 2380,
      "pending": 280,
      "rejected": 140
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 330},
      {"month": "Feb", "value": 350},
      {"month": "Mar", "value": 380},
      {"month": "Apr", "value": 400},
      {"month": "May", "value": 420},
      {"month": "Jun", "value": 450}
    ]
  },
  {
    "id": 11,
    "name": "IT Services Management",
    "hindi": "e-सेवा",
    "icon": "Server",
    "description": "Delivering, managing, IT services (ITSM) to meet business needs.",
    "status": "Operational",
    "color": "text-info",
    "stats": {
      "totalUsers": 6543,
      "totalRequests": 2200,
      "total": 2200,
      "approved": 1870,
      "pending": 220,
      "rejected": 110
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 650},
      {"month": "Feb", "value": 680},
      {"month": "Mar", "value": 700},
      {"month": "Apr", "value": 720},
      {"month": "May", "value": 750},
      {"month": "Jun", "value": 780}
    ]
  },
  {
    "id": 52,
    "name": "Fund Management System",
    "hindi": "कोष प्रबंधन प्रणाली",
    "icon": "DollarSign",
    "description": "Fund Management System (FMS) is a simplified digital platform used to release payments to beneficiaries in a timely and transparent manner. It",
    "status": "Operational",
    "color": "text-primary",
    "stats": {
      "totalUsers": 7890,
      "totalRequests": 3100,
      "total": 3100,
      "approved": 2635,
      "pending": 310,
      "rejected": 155
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 480},
      {"month": "Feb", "value": 500},
      {"month": "Mar", "value": 520},
      {"month": "Apr", "value": 550},
      {"month": "May", "value": 580},
      {"month": "Jun", "value": 600}
    ]
  },
  {
    "id": 4,
    "name": "Night Duty/National Holiday Allowance",
    "hindi": "रात्रि ड्यूटी / राष्ट्रीय अवकाश भत्ता",
    "icon": "Moon",
    "description": "Apply and Track payment for NDA/NHA.",
    "status": "Operational",
    "color": "text-secondary",
    "stats": {
      "totalUsers": 9234,
      "totalRequests": 2900,
      "total": 2900,
      "approved": 2465,
      "pending": 290,
      "rejected": 145
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 200},
      {"month": "Feb", "value": 210},
      {"month": "Mar", "value": 220},
      {"month": "Apr", "value": 230},
      {"month": "May", "value": 240},
      {"month": "Jun", "value": 250}
    ]
  },
  {
    "id": 13,
    "name": "Visitor Mangement",
    "hindi": "e-अतिथि",
    "icon": "User",
    "description": "Streamlines process of registering, tracking, and managing visitors.",
    "status": "Operational",
    "color": "text-warning",
    "stats": {
      "totalUsers": 10567,
      "totalRequests": 4100,
      "total": 4100,
      "approved": 3485,
      "pending": 410,
      "rejected": 205
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 350},
      {"month": "Feb", "value": 380},
      {"month": "Mar", "value": 400},
      {"month": "Apr", "value": 420},
      {"month": "May", "value": 450},
      {"month": "Jun", "value": 480}
    ]
  },
  {
    "id": 8,
    "name": "Task Management",
    "hindi": "e-प्रबंधन",
    "icon": "Clipboard",
    "description": "Assign, track, and & monitor task completion.",
    "status": "Operational",
    "color": "text-info",
    "stats": {
      "totalUsers": 7654,
      "totalRequests": 2890,
      "total": 2890,
      "approved": 2457,
      "pending": 289,
      "rejected": 144
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 500},
      {"month": "Feb", "value": 520},
      {"month": "Mar", "value": 550},
      {"month": "Apr", "value": 580},
      {"month": "May", "value": 600},
      {"month": "Jun", "value": 630}
    ]
  },
  {
    "id": 1,
    "name": "Device Claim",
    "hindi": "e-उपकरण",
    "icon": "Tablet",
    "description": "Submission, processing, and resolution of Laptop & Tablet.",
    "status": "Operational",
    "color": "text-danger",
    "stats": {
      "totalUsers": 3456,
      "totalRequests": 1100,
      "total": 1100,
      "approved": 935,
      "pending": 110,
      "rejected": 55
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 150},
      {"month": "Feb", "value": 160},
      {"month": "Mar", "value": 170},
      {"month": "Apr", "value": 180},
      {"month": "May", "value": 190},
      {"month": "Jun", "value": 200}
    ]
  },
  {
    "id": 69,
    "name": "Key Result Area",
    "hindi": "e-उद्देश्य",
    "icon": "Target",
    "description": "A streamlined KRA application designed to help employees and managers set, track, and evaluate performance goals effectively.",
    "status": "Operational",
    "color": "text-success",
    "stats": {
      "totalUsers": 8888,
      "totalRequests": 3200,
      "total": 3200,
      "approved": 2720,
      "pending": 320,
      "rejected": 160
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 400},
      {"month": "Feb", "value": 430},
      {"month": "Mar", "value": 450},
      {"month": "Apr", "value": 480},
      {"month": "May", "value": 500},
      {"month": "Jun", "value": 530}
    ]
  },
  {
    "id": 74,
    "name": "Beats Tracking",
    "hindi": "बीट्स ट्रैकिंग",
    "icon": "MapPin",
    "description": "Beats Tracking",
    "status": "Operational",
    "color": "text-warning",
    "stats": {
      "totalUsers": 2345,
      "totalRequests": 800,
      "total": 800,
      "approved": 680,
      "pending": 80,
      "rejected": 40
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 100},
      {"month": "Feb", "value": 110},
      {"month": "Mar", "value": 120},
      {"month": "Apr", "value": 130},
      {"month": "May", "value": 140},
      {"month": "Jun", "value": 150}
    ]
  },
  {
    "id": 50,
    "name": "Contract DMS",
    "hindi": "अनुबंध डेटा प्रबंधन प्रणाली",
    "icon": "File",
    "description": "Data Management System (DMS) for the Contract Cell",
    "status": "Operational",
    "color": "text-info",
    "stats": {
      "totalUsers": 5123,
      "totalRequests": 1700,
      "total": 1700,
      "approved": 1445,
      "pending": 170,
      "rejected": 85
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 250},
      {"month": "Feb", "value": 270},
      {"month": "Mar", "value": 290},
      {"month": "Apr", "value": 310},
      {"month": "May", "value": 330},
      {"month": "Jun", "value": 350}
    ]
  },
  {
    "id": 6,
    "name": "Organisation Management",
    "hindi": "संगठन प्रबंधन",
    "icon": "Users",
    "description": "Organisation Management",
    "status": "Operational",
    "color": "text-primary",
    "stats": {
      "totalUsers": 6789,
      "totalRequests": 2400,
      "total": 2400,
      "approved": 2040,
      "pending": 240,
      "rejected": 120
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 300},
      {"month": "Feb", "value": 320},
      {"month": "Mar", "value": 340},
      {"month": "Apr", "value": 360},
      {"month": "May", "value": 380},
      {"month": "Jun", "value": 400}
    ]
  },
  {
    "id": 61,
    "name": "GeM Report",
    "hindi": "सरकारी ई-मार्केटप्लेस विवरण",
    "icon": "ShoppingCart",
    "description": "GEM (Government e-Marketplace) report to manage details of procured goods and services",
    "status": "Operational",
    "color": "text-danger",
    "stats": {
      "totalUsers": 7456,
      "totalRequests": 2600,
      "total": 2600,
      "approved": 2210,
      "pending": 260,
      "rejected": 130
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 700},
      {"month": "Feb", "value": 740},
      {"month": "Mar", "value": 780},
      {"month": "Apr", "value": 820},
      {"month": "May", "value": 850},
      {"month": "Jun", "value": 900}
    ]
  },
  {
    "id": 59,
    "name": "Drawing",
    "hindi": "Drawing",
    "icon": "Edit",
    "description": "Drawings for CIVIL.",
    "status": "Operational",
    "color": "text-secondary",
    "stats": {
      "totalUsers": 1987,
      "totalRequests": 600,
      "total": 600,
      "approved": 510,
      "pending": 60,
      "rejected": 30
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 90},
      {"month": "Feb", "value": 100},
      {"month": "Mar", "value": 110},
      {"month": "Apr", "value": 120},
      {"month": "May", "value": 130},
      {"month": "Jun", "value": 140}
    ]
  },
  {
    "id": 65,
    "name": "Quarterly Progress Report (CVC)",
    "hindi": "त्रैमासिक प्रगति रिपोर्ट",
    "icon": "BarChart2",
    "description": "A Quarterly Progress Report (QPR) is a formal document detailing a project's accomplishments, milestones, and financial status over a three-",
    "status": "Operational",
    "color": "text-success",
    "stats": {
      "totalUsers": 4987,
      "totalRequests": 1600,
      "total": 1600,
      "approved": 1360,
      "pending": 160,
      "rejected": 80
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 180},
      {"month": "Feb", "value": 200},
      {"month": "Mar", "value": 220},
      {"month": "Apr", "value": 240},
      {"month": "May", "value": 260},
      {"month": "Jun", "value": 280}
    ]
  },
  {
    "id": 63,
    "name": "SMS Dashboard",
    "hindi": "संदेश प्रबंधन डैशबोर्ड",
    "icon": "MessageCircle",
    "description": "Manage and track SMS (Short Message Service) messages in a centralized way",
    "status": "Operational",
    "color": "text-info",
    "stats": {
      "totalUsers": 12345,
      "totalRequests": 4500,
      "total": 4500,
      "approved": 3825,
      "pending": 450,
      "rejected": 225
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 1000},
      {"month": "Feb", "value": 1050},
      {"month": "Mar", "value": 1100},
      {"month": "Apr", "value": 1150},
      {"month": "May", "value": 1200},
      {"month": "Jun", "value": 1250}
    ]
  },
  {
    "id": 66,
    "name": "Employee Management",
    "hindi": "कर्मचारी प्रबंधन",
    "icon": "Users",
    "description": "Manage contractual and permanent employees, along with other employee-related tasks.",
    "status": "Operational",
    "color": "text-primary",
    "stats": {
      "totalUsers": 10987,
      "totalRequests": 3900,
      "total": 3900,
      "approved": 3315,
      "pending": 390,
      "rejected": 195
    },
    "monthlyTrends": [
      {"month": "Jan", "value": 850},
      {"month": "Feb", "value": 880},
      {"month": "Mar", "value": 900},
      {"month": "Apr", "value": 920},
      {"month": "May", "value": 950},
      {"month": "Jun", "value": 980}
    ]
  },
];




/* =========================================================
   GENERATE 40 APPLICATIONS
========================================================= */

export const applications: Application[] =
  Array.from(
    {
      length: 40,
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