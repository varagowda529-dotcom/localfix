export type Lang = "en" | "kn";

export const translations = {
  en: {
    // Brand
    brandFirst: "Local",
    brandSecond: "Fix",
    brandTagline: "See the problem. Track the response. Make it visible.",

    // Header / nav
    home: "Home",
    exploreProblems: "Explore Problems",
    locations: "Locations",
    map: "Map",
    about: "About",
    login: "Login",
    signup: "Sign Up",
    dashboard: "Dashboard",
    admin: "Admin",
    logout: "Log out",
    reportProblem: "Report a Problem",
    language: "Language",
    english: "English",
    kannada: "ಕನ್ನಡ",
    verificationPending: "Verification Pending",

    // Footer
    footerPlatform: "Platform",
    footerAccount: "Account",
    footerAbout: "About",
    footerHowItWorks: "How It Works",
    footerRolesVerify: "Roles & Verification",
    footerHierarchy: "Location Hierarchy",
    footerTagline:
      "A public civic issue reporting and transparency platform. See the problem, track the response, make it visible.",
    footerDemoGeo: "Demo geography: Tumakuru district, Karnataka",
    footerCopyright: "civic transparency demo (MVP).",
    footerDemoData: "Every record on this site is demo data.",

    // Home hero
    heroBadge: "Public civic transparency platform",
    heroTitle1: "See the problem.",
    heroTitle2: "Track the response.",
    heroTitle3: "Make it visible.",
    heroDesc:
      "LocalFix lets citizens report public problems — broken roads, overflowing drains, dark streets — and lets everyone watch how the system responds, step by step.",
    heroSearchPlaceholder:
      "Search your village, town or city — try Honnenahalli, Tiptur, Bengaluru",
    search: "Search",
    exploreProblemsBtn: "Explore Problems",
    coveredInDemo: "Covered in this demo",
    coveredList: "Tiptur · Tumakuru · Bengaluru",
    trendingNow: "Trending now",
    supporters: "supporters",
    resolved: "Resolved",
    problemsFixed: "problems fixed",

    // Home stats
    problemsReported: "Problems reported",
    citizenSupporters: "Citizen supporters",
    officialResponses: "Official responses",
    locationsCovered: "Locations covered",

    // Home trending
    trendingEyebrow: "Trending civic problems",
    trendingTitle: "What people are rallying behind",
    trendingDesc:
      "The most-supported problems right now. Every supporter makes the issue harder to ignore.",
    viewAllProblems: "View all problems",

    // Home how it works
    howEyebrow: "How LocalFix works",
    howTitle: "From a photo on your street to a government response",
    step1: "Step 1",
    step2: "Step 2",
    step3: "Step 3",
    step4: "Step 4",
    step1Title: "Report the problem",
    step1Body:
      "Snap a photo, pick the exact location — from state down to your village or ward — and describe what's wrong. You can stay anonymous.",
    step2Title: "People add support",
    step2Body:
      "Neighbours support the report with one click. Rising supporter counts push the problem up the public agenda.",
    step3Title: "Officials must respond",
    step3Body:
      "The responsible department's response is published publicly — acknowledged, work started, or an explanation of the delay.",
    step4Title: "Track it to completion",
    step4Body:
      "A public timeline shows every milestone: Reported → Verified → Awaiting Response → Work Started → Completed. Nothing hides.",

    // Home hierarchy
    hierarchyEyebrow: "Deep local coverage",
    hierarchyTitle: "Search every level — from Karnataka to your village",
    hierarchyDesc:
      "LocalFix understands the real administrative map: State → District → Taluk → Hobli → Gram Panchayat → Village for rural areas, and State → City → Ward for urban areas like Bengaluru.",
    searchLocation: "Search a location",
    openMap: "Open the map",
    exampleRuralHierarchy: "Example rural hierarchy",
    hierKarnataka: "Karnataka",
    hierTumakuru: "Tumakuru (District)",
    hierTiptur: "Tiptur (Taluk)",
    hierNonavinakere: "Nonavinakere Hobli",
    hierNagaraghatta: "Nagaraghatta Gram Panchayat",
    hierHonnenahalli: "Honnenahalli Village",

    // Home CTA
    ctaTitle: "Is something broken near you?",
    ctaDesc:
      "It takes two minutes to report — and the whole town can watch what happens next.",

    // About
    aboutEyebrow: "About LocalFix",
    aboutTitle: "Civic problems stay unsolved when nobody can see them.",
    aboutIntro:
      "LocalFix is a public civic issue reporting and transparency platform. Citizens report real problems in their streets; the whole community supports them; and every official response — or the lack of one — is visible to everyone, forever.",
    principleVisibilityT: "Radical visibility",
    principleVisibilityB:
      "Every report, supporter count, status change and official reply is public. Problems can't be quietly closed or forgotten.",
    principlePressureT: "Collective pressure",
    principlePressureB:
      "A single complaint is easy to ignore. A report with 1,240 supporters from your own town is not.",
    principleAccountT: "Accountable response",
    principleAccountB:
      "Departments answer on the record. Overdue issues are flagged red, automatically, for media and citizens to see.",
    rolesEyebrow: "Roles & verification",
    rolesTitle: "Different citizens, different dashboards",
    roleCitizenT: "Citizen",
    roleCitizenB:
      "Reports problems, supports others, tracks their own reports and notifications.",
    rolePoliticianT: "Politician",
    rolePoliticianB:
      "Watches constituency-level problems, what is pending and what has been resolved.",
    roleGovtT: "Government Employee",
    roleGovtB:
      "Sees the work queue: pending, in progress, completed and overdue problems.",
    roleMediaT: "Media",
    roleMediaB:
      "Monitors trending and high-attention problems worth investigating.",
    rolePublicT: "Public Figure",
    rolePublicB:
      "Amplifies high-attention and overdue problems to a wider audience.",
    verifPendingT: "Verification Pending",
    verifPendingB:
      "Non-citizen roles register instantly but display a “Verification Pending” badge until a moderator approves them in the site admin.",
    hierEyebrow: "Location hierarchy",
    hierTitle: "Built for how India is actually administered",
    hierDesc:
      "A pothole in Honnenahalli village is a Tiptur taluk problem and a Tumakuru district problem at the same time. LocalFix rolls reports up through the real administrative tree so responsibility is visible at every level.",
    tryLocationSearch: "Try the location search",
    ruralChainT: "Rural chain",
    ruralChainB:
      "Karnataka → Tumakuru (District) → Tiptur (Taluk) → Nonavinakere Hobli → Nagaraghatta Gram Panchayat → Honnenahalli Village",
    urbanChainT: "Urban chain",
    urbanChainB:
      "Karnataka → Bengaluru (City) → Ward — cities keep their own ward structure.",
    aboutCtaTitle: "Transparency starts with one report.",
    createAccount: "Create an account",
    exploreProblemsShort: "Explore problems",

    // Admin Dashboard
    adminDashboardTitle: "Platform Administration",
    adminDashboardDesc: "System overview, pending actions, and moderation.",
    adminRoleBadge: "Admin",
    staffBadge: "Staff",
    quickActions: "Quick Actions",
    needsAttention: "Needs Attention",
    pendingVerifications: "Pending Verifications",
    overdueProblems: "Overdue Problems",
    newReports: "New Reports",
    totalUsers: "Total Users",
    openProblems: "Open Problems",
    manageVerifications: "Manage Verifications",
    manageProblems: "Manage Problems",
    manageUsers: "Manage Users",
    manageCategories: "Manage Categories",
    manageLocations: "Manage Locations",
    manageComments: "Manage Comments",
    reviewAll: "Review All",
    noPendingVerifications: "No pending verifications. All clear!",
    noOverdueProblems: "No overdue problems. Excellent!",
    noNewReports: "No new reports.",
    goToAdminPanel: "Go to Admin Panel",

    // Login
    loginWelcome: "Welcome back",
    loginSubtitle: "Log in with your LocalFix account.",
    username: "Username",
    password: "Password",
    logIn: "Log in",
    newToApp: "New to LocalFix?",
    createAcc: "Create an account",
    demoAccounts: "Demo accounts",
    loginTagline: "“See the problem. Track the response. Make it visible.”",
    loginPanelDesc:
      "Log in to report problems, support your neighbours' reports and follow every official response from your dashboard.",

    // Signup
    signupTitle: "Create your account",
    signupSubtitle: "Join LocalFix and start making your locality visible.",
    fullName: "Full name",
    email: "Email",
    registeringAs: "I am registering as a…",
    createAccountBtn: "Create account",
    alreadyRegistered: "Already registered?",
    signupHint:
      "Politicians, government employees, media and public figures show “Verification Pending” until a moderator approves the account.",
    benefit1T: "Report problems in two minutes",
    benefit1B: "Photo, location, description — done.",
    benefit2T: "Support what matters",
    benefit2B: "One click adds your voice to any report.",
    benefit3T: "Follow the response",
    benefit3B: "Timelines and dashboards keep officials accountable.",
    signupFootnote:
      "Free for every citizen. Real names build trust; anonymity is available on every report.",

    // Report page
    reportEyebrow: "Citizen report",
    reportTitle: "Report a Problem",
    reportSubtitle:
      "Describe the civic problem clearly. Once submitted it becomes public and enters the tracking timeline as Reported.",
    problemTitle: "Problem title",
    problemTitlePlaceholder: "e.g. Damaged road near Honnenahalli Bus Stop",
    problemTitleHint: "Short and specific — mention what and where.",
    description: "Description",
    descriptionPlaceholder:
      "What is the problem? How long has it existed? Who does it affect?",
    category: "Category",
    chooseCategory: "Choose a category…",
    location: "Location",
    chooseLocation: "Choose the exact location…",
    locationHint: "Pick the deepest level you know — village or ward is best.",
    photo: "Photo",
    photoOptional: "(optional, max 3 MB)",
    showIdentity: "Show my identity publicly",
    showIdentityDesc:
      "Your name will appear as the reporter. If unchecked, this report is shown as filed by an Anonymous Citizen.",
    submitReport: "Submit report",
    goodReportsTitle: "Good reports get fixed faster",
    tip1: "Use the exact spot — a village or ward, not just the district.",
    tip2: "One problem per report. Two broken things = two reports.",
    tip3: "A clear daylight photo builds instant credibility.",
    tip4: "Mention how many people are affected — schools, buses, shops.",
    anonymousDefault: "Anonymous by default",
    anonymousDesc:
      "Unless you opt in, your report is published under Anonymous Citizen. Your account still gets status notifications privately.",
    whatHappensNext: "What happens next",
    happens1: "Report goes public immediately.",
    happens2: "Moderators verify it as genuine.",
    happens3: "The department is expected to respond.",
    happens4: "Everyone tracks work until completion.",
    seeLiveExamples: "See live examples",

    // Problems list
    publicRecord: "Public record",
    problemsListTitle: "Explore Problems",
    problemsListDesc:
      "Every civic problem reported by citizens, with live status and support counts.",
    filterAllLocations: "All locations",
    filterAllCategories: "All categories",
    filterAllStatuses: "All statuses",
    sortBy: "Sort by",
    sortNewest: "Newest",
    sortMostSupported: "Most supported",
    sortOldest: "Oldest",
    applyFilters: "Apply filters",
    reset: "Reset",
    problemsFound: "problems found",
    noProblemsMatch: "No problems match these filters",
    noProblemsDesc:
      "Try widening the location or clearing the status filter — or be the first to report.",
    clearFilters: "Clear filters",
    status: "Status",

    // Problem detail
    allProblems: "All problems",
    reportedSuccess:
      "Problem reported successfully. It is now public — share it to gather supporters.",
    overdueLabel: "This problem is overdue.",
    overdueDesc:
      "The responsible department has not acted within the expected time window.",
    publicTimeline: "Public timeline",
    timelineDesc:
      "Reported → Verified → Awaiting Official Response → Work Started → Completed",
    officialResponse: "Official response",
    noResponseYet: "No official response yet.",
    noResponseDesc:
      "When the responsible department replies, it will be published here.",
    comments: "Comments",
    addComment:
      "Add local information, an update, or a question for officials…",
    postComment: "Post comment",
    commentingAs: "Commenting as",
    logInToComment: "Log in",
    joinDiscussion: "to join the discussion.",
    noComments: "No comments yet. Be the first to add context.",
    supportButton: "Support this problem",
    supportedButton: "You supported this",
    supporterNote:
      "Supporters are counted publicly. More support = more pressure for an official response.",
    reportDetails: "Report details",
    reportedBy: "Reported by",
    anonymousCitizen: "Anonymous Citizen",
    lastUpdate: "Last update",
    staffActions: "Staff actions",
    updateStatus: "Update status",
    publicNoteOptional: "Public note (optional)",
    officialNameLabel: "Official name",
    departmentLabel: "Department",
    responseTextLabel: "Official response text…",
    publishResponse: "Publish official response",
    share: "Share",
    linkCopied: "Link copied",

    // Dashboard
    dashboardEyebrow: "Dashboard",
    hello: "Hello",
    welcomeUser: "Welcome to LocalFix",
    accountReady: "Your account is ready — this is your dashboard.",
    verificationPendingBanner: "Your account verification is pending.",
    verificationPendingDesc: "A moderator will review your account.",
    myReports: "My Reports",
    myReportsEmpty: "You haven't reported any problems yet.",
    supportedProblems: "Supported Problems",
    supportedEmpty: "Problems you support will appear here.",
    notifications: "Notifications",
    notificationsEmpty:
      "Nothing yet — notifications about your reports will appear here.",
    markAllRead: "Mark all read",
    pendingProblems: "Pending Problems",
    pendingEmpty: "No problems waiting for an official response.",
    inProgress: "In Progress",
    inProgressEmpty: "No work currently in progress.",
    completed: "Completed",
    completedEmpty: "Nothing completed yet.",
    overdue: "Overdue",
    overdueEmpty: "No overdue problems. Great!",
    yourConstituency: "Your constituency",
    constituencyProblems: "Constituency Problems",
    constituencyEmpty: "No problems reported in your constituency.",
    resolvedProblems: "Resolved Problems",
    resolvedEmpty: "No resolved problems yet.",
    trendingProblems: "Trending Problems",
    trendingEmpty: "Nothing trending yet.",
    highAttention: "High Attention Problems",
    highAttentionEmpty: "No high-attention problems right now.",
    overdueInvestigate: "No overdue problems to investigate.",

    // Map page
    mapEyebrow: "Geographic overview",
    mapTitle: "Live Problem Heatmap",
    mapDesc:
      "Interactive map of Karnataka. Darker districts have more reported issues. Click any district to zoom into its taluks.",
    problemCount: "Problem Count",
    mapInfo:
      "Map data powered by OpenStreetMap. Click any district to explore its taluks.",
    districtQuickLinks: "District Quick Links",

    // Locations page
    exploreKarnataka: "Explore Karnataka",
    allDistrictsTitle: "All 31 Districts of Karnataka",
    allDistrictsDesc:
      "Click any district to explore its taluks, hoblis, gram panchayats, villages, and wards.",
    locSearchPlaceholder:
      "Search any location — try Honnenahalli, Tiptur, Indiranagar…",
    popular: "Popular",
    noLocationMatches: "No location matches",
    noLocationDesc: "Try searching for a district, taluk, ward, or village name.",
    explore: "Explore",
    allDistricts: "All districts",
    districtsGridTitle: "31 Districts of Karnataka",
    districtsGridDesc:
      "Click any district to drill down into its taluks, hoblis, gram panchayats, villages, and urban wards.",
    problemsReportedShort: "problems reported",

    // Location detail
    breadcrumbAll: "All Districts",
    inThisArea: "problem(s) in this area",
    viewAllProblemsBtn: "View all problems",
    subAreasIn: "sub-areas in",
    clickToDrill: "Click any area to drill deeper into the hierarchy.",
    noSubAreas: "No sub-areas under",
    deepestLevel:
      "This is the deepest level in the hierarchy. View reported problems below.",
    problemsIn: "Problems in",
    topProblemsIn: "Showing top most-supported problems in this area.",
    viewAll: "View all",

    // Admin
    siteAdmin: "Site administration",
    overview: "Overview",
    problems: "Problems",
    users: "Users",
    categories: "Categories",
    locationsAdmin: "Locations",
    commentsAdmin: "Comments",
    verifications: "Verifications",
    records: "records",
    changeStatus: "Change status",
    user: "User",
    role: "Role",
    verification: "Verification",
    joined: "Joined",
    actions: "Actions",
    activate: "Activate",
    deactivate: "Deactivate",
    name: "Name",
    slug: "Slug",
    addCategory: "Add category",
    newCategoryName: "New category name",
    addLocation: "Add location",
    parentLoc: "Parent",
    topLevelState: "— top level (state) —",
    type: "Type",
    fullPath: "Full path",
    comment: "Comment",
    author: "Author",
    problem: "Problem",
    action: "Action",
    remove: "Remove",
    removed: "Removed",
    live: "Live",
    verificationRequests: "Verification requests",
    requestedRole: "Requested role",
    note: "Note",
    decision: "Decision",
    approve: "Approve",
    reject: "Reject",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    noVerifRequests: "No verification requests yet.",
  },

  kn: {
    // Brand
    brandFirst: "ಲೋಕಲ್",
    brandSecond: "ಫಿಕ್ಸ್",
    brandTagline:
      "ಸಮಸ್ಯೆಯನ್ನು ನೋಡಿ. ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ. ಅದನ್ನು ಗೋಚರಿಸುವಂತೆ ಮಾಡಿ.",

    // Header / nav
    home: "ಮುಖಪುಟ",
    exploreProblems: "ಸಮಸ್ಯೆಗಳನ್ನು ನೋಡಿ",
    locations: "ಸ್ಥಳಗಳು",
    map: "ನಕ್ಷೆ",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    login: "ಲಾಗಿನ್",
    signup: "ನೋಂದಣಿ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    admin: "ಅಡ್ಮಿನ್",
    logout: "ಲಾಗ್ ಔಟ್",
    reportProblem: "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ",
    language: "ಭಾಷೆ",
    english: "English",
    kannada: "ಕನ್ನಡ",
    verificationPending: "ಪರಿಶೀಲನೆ ಬಾಕಿ",

    // Footer
    footerPlatform: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
    footerAccount: "ಖಾತೆ",
    footerAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
    footerHowItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    footerRolesVerify: "ಪಾತ್ರಗಳು ಮತ್ತು ಪರಿಶೀಲನೆ",
    footerHierarchy: "ಸ್ಥಳದ ಶ್ರೇಣಿ",
    footerTagline:
      "ಸಾರ್ವಜನಿಕ ನಾಗರಿಕ ಸಮಸ್ಯೆ ವರದಿ ಮತ್ತು ಪಾರದರ್ಶಕತೆಯ ವೇದಿಕೆ. ಸಮಸ್ಯೆಯನ್ನು ನೋಡಿ, ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ಅದನ್ನು ಗೋಚರಿಸುವಂತೆ ಮಾಡಿ.",
    footerDemoGeo: "ಡೆಮೋ ಪ್ರದೇಶ: ತುಮಕೂರು ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ",
    footerCopyright: "ನಾಗರಿಕ ಪಾರದರ್ಶಕತೆಯ ಡೆಮೋ (MVP).",
    footerDemoData: "ಈ ಸೈಟ್‌ನ ಪ್ರತಿಯೊಂದು ದಾಖಲೆಯೂ ಡೆಮೋ ಡೇಟಾ.",

    // Home hero
    heroBadge: "ಸಾರ್ವಜನಿಕ ನಾಗರಿಕ ಪಾರದರ್ಶಕತೆಯ ವೇದಿಕೆ",
    heroTitle1: "ಸಮಸ್ಯೆಯನ್ನು ನೋಡಿ.",
    heroTitle2: "ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    heroTitle3: "ಅದನ್ನು ಗೋಚರಿಸುವಂತೆ ಮಾಡಿ.",
    heroDesc:
      "LocalFix ನಾಗರಿಕರಿಗೆ ಸಾರ್ವಜನಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ — ಒಡೆದ ರಸ್ತೆಗಳು, ತುಂಬಿ ಹರಿಯುವ ಚರಂಡಿಗಳು, ಕತ್ತಲಾದ ರಸ್ತೆಗಳು — ಮತ್ತು ಎಲ್ಲರಿಗೂ ವ್ಯವಸ್ಥೆ ಹೇಗೆ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಹಂತಹಂತವಾಗಿ ನೋಡಲು ಅವಕಾಶ ಮಾಡಿಕೊಡುತ್ತದೆ.",
    heroSearchPlaceholder:
      "ನಿಮ್ಮ ಹಳ್ಳಿ, ಪಟ್ಟಣ ಅಥವಾ ನಗರವನ್ನು ಹುಡುಕಿ — ಹೊನ್ನೇನಹಳ್ಳಿ, ತಿಪಟೂರು, ಬೆಂಗಳೂರು",
    search: "ಹುಡುಕಿ",
    exploreProblemsBtn: "ಸಮಸ್ಯೆಗಳನ್ನು ನೋಡಿ",
    coveredInDemo: "ಈ ಡೆಮೋದಲ್ಲಿ ಒಳಗೊಂಡಿದೆ",
    coveredList: "ತಿಪಟೂರು · ತುಮಕೂರು · ಬೆಂಗಳೂರು",
    trendingNow: "ಈಗ ಟ್ರೆಂಡಿಂಗ್",
    supporters: "ಬೆಂಬಲಿಗರು",
    resolved: "ಪರಿಹಾರಗೊಂಡಿದೆ",
    problemsFixed: "ಸಮಸ್ಯೆಗಳು ಸರಿಪಡಿಸಲಾಗಿದೆ",

    // Home stats
    problemsReported: "ವರದಿಯಾದ ಸಮಸ್ಯೆಗಳು",
    citizenSupporters: "ನಾಗರಿಕ ಬೆಂಬಲಿಗರು",
    officialResponses: "ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆಗಳು",
    locationsCovered: "ಒಳಗೊಂಡ ಸ್ಥಳಗಳು",

    // Home trending
    trendingEyebrow: "ಟ್ರೆಂಡಿಂಗ್ ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳು",
    trendingTitle: "ಜನರು ಯಾವುದಕ್ಕೆ ಬೆಂಬಲಿಸುತ್ತಿದ್ದಾರೆ",
    trendingDesc:
      "ಪ್ರಸ್ತುತ ಹೆಚ್ಚು ಬೆಂಬಲಿತ ಸಮಸ್ಯೆಗಳು. ಪ್ರತಿಯೊಬ್ಬ ಬೆಂಬಲಿಗನೂ ಸಮಸ್ಯೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದನ್ನು ಕಷ್ಟಗೊಳಿಸುತ್ತಾನೆ.",
    viewAllProblems: "ಎಲ್ಲಾ ಸಮಸ್ಯೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",

    // Home how it works
    howEyebrow: "LocalFix ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    howTitle: "ನಿಮ್ಮ ಬೀದಿಯ ಫೋಟೋದಿಂದ ಸರ್ಕಾರದ ಪ್ರತಿಕ್ರಿಯೆಯವರೆಗೆ",
    step1: "ಹಂತ 1",
    step2: "ಹಂತ 2",
    step3: "ಹಂತ 3",
    step4: "ಹಂತ 4",
    step1Title: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
    step1Body:
      "ಒಂದು ಫೋಟೋ ತೆಗೆಯಿರಿ, ನಿಖರ ಸ್ಥಳವನ್ನು ಆರಿಸಿ — ರಾಜ್ಯದಿಂದ ನಿಮ್ಮ ಹಳ್ಳಿ ಅಥವಾ ವಾರ್ಡ್‌ವರೆಗೆ — ಮತ್ತು ಏನು ತಪ್ಪಾಗಿದೆ ಎಂಬುದನ್ನು ವಿವರಿಸಿ. ನೀವು ಅಜ್ಞಾತರಾಗಿ ಉಳಿಯಬಹುದು.",
    step2Title: "ಜನರು ಬೆಂಬಲಿಸುತ್ತಾರೆ",
    step2Body:
      "ನೆರೆಹೊರೆಯವರು ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ವರದಿಯನ್ನು ಬೆಂಬಲಿಸುತ್ತಾರೆ. ಹೆಚ್ಚುತ್ತಿರುವ ಬೆಂಬಲಿಗರ ಸಂಖ್ಯೆಗಳು ಸಮಸ್ಯೆಯನ್ನು ಸಾರ್ವಜನಿಕ ಅಜೆಂಡಾಗೆ ತಳ್ಳುತ್ತವೆ.",
    step3Title: "ಅಧಿಕಾರಿಗಳು ಪ್ರತಿಕ್ರಿಯಿಸಬೇಕು",
    step3Body:
      "ಜವಾಬ್ದಾರಿಯ ಇಲಾಖೆಯ ಪ್ರತಿಕ್ರಿಯೆ ಸಾರ್ವಜನಿಕವಾಗಿ ಪ್ರಕಟವಾಗುತ್ತದೆ — ಒಪ್ಪಿಗೆ, ಕೆಲಸ ಆರಂಭ, ಅಥವಾ ವಿಳಂಬಕ್ಕೆ ವಿವರಣೆ.",
    step4Title: "ಪೂರ್ಣಗೊಳ್ಳುವವರೆಗೆ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    step4Body:
      "ಸಾರ್ವಜನಿಕ ಟೈಮ್‌ಲೈನ್ ಪ್ರತಿ ಮೈಲಿಗಲ್ಲನ್ನು ತೋರಿಸುತ್ತದೆ: ವರದಿ → ಪರಿಶೀಲನೆ → ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ → ಕೆಲಸ ಆರಂಭ → ಪೂರ್ಣಗೊಂಡಿದೆ. ಏನೂ ಮರೆಯಾಗುವುದಿಲ್ಲ.",

    // Home hierarchy
    hierarchyEyebrow: "ಆಳವಾದ ಸ್ಥಳೀಯ ವ್ಯಾಪ್ತಿ",
    hierarchyTitle: "ಪ್ರತಿ ಹಂತವನ್ನೂ ಹುಡುಕಿ — ಕರ್ನಾಟಕದಿಂದ ನಿಮ್ಮ ಹಳ್ಳಿಯವರೆಗೆ",
    hierarchyDesc:
      "LocalFix ನೈಜ ಆಡಳಿತಾತ್ಮಕ ನಕ್ಷೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತದೆ: ರಾಜ್ಯ → ಜಿಲ್ಲೆ → ತಾಲ್ಲೂಕು → ಹೋಬಳಿ → ಗ್ರಾಮ ಪಂಚಾಯಿತಿ → ಹಳ್ಳಿ, ಮತ್ತು ಬೆಂಗಳೂರಿನಂತಹ ನಗರ ಪ್ರದೇಶಗಳಿಗೆ ರಾಜ್ಯ → ನಗರ → ವಾರ್ಡ್.",
    searchLocation: "ಸ್ಥಳವನ್ನು ಹುಡುಕಿ",
    openMap: "ನಕ್ಷೆ ತೆರೆಯಿರಿ",
    exampleRuralHierarchy: "ಗ್ರಾಮೀಣ ಶ್ರೇಣಿಯ ಉದಾಹರಣೆ",
    hierKarnataka: "ಕರ್ನಾಟಕ",
    hierTumakuru: "ತುಮಕೂರು (ಜಿಲ್ಲೆ)",
    hierTiptur: "ತಿಪಟೂರು (ತಾಲ್ಲೂಕು)",
    hierNonavinakere: "ನೊಣವಿನಕೆರೆ ಹೋಬಳಿ",
    hierNagaraghatta: "ನಾಗರಘಟ್ಟ ಗ್ರಾಮ ಪಂಚಾಯಿತಿ",
    hierHonnenahalli: "ಹೊನ್ನೇನಹಳ್ಳಿ ಗ್ರಾಮ",

    // Home CTA
    ctaTitle: "ನಿಮ್ಮ ಸಮೀಪದಲ್ಲಿ ಏನಾದರೂ ತೊಂದರೆ ಇದೆಯೇ?",
    ctaDesc:
      "ವರದಿ ಮಾಡಲು ಎರಡು ನಿಮಿಷ ಸಾಕು — ಮತ್ತು ಇಡೀ ಊರು ಮುಂದೆ ಏನಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ನೋಡಬಹುದು.",

    // About
    aboutEyebrow: "LocalFix ಬಗ್ಗೆ",
    aboutTitle: "ಯಾರೂ ನೋಡದಿದ್ದಾಗ ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳು ಪರಿಹಾರವಾಗುವುದಿಲ್ಲ.",
    aboutIntro:
      "LocalFix ಸಾರ್ವಜನಿಕ ನಾಗರಿಕ ಸಮಸ್ಯೆ ವರದಿ ಮತ್ತು ಪಾರದರ್ಶಕತೆಯ ವೇದಿಕೆಯಾಗಿದೆ. ನಾಗರಿಕರು ತಮ್ಮ ಬೀದಿಗಳಲ್ಲಿನ ನೈಜ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡುತ್ತಾರೆ; ಇಡೀ ಸಮುದಾಯ ಬೆಂಬಲಿಸುತ್ತದೆ; ಮತ್ತು ಪ್ರತಿಯೊಂದು ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆ — ಅಥವಾ ಅದರ ಕೊರತೆ — ಎಲ್ಲರಿಗೂ ಶಾಶ್ವತವಾಗಿ ಗೋಚರಿಸುತ್ತದೆ.",
    principleVisibilityT: "ಪೂರ್ಣ ಗೋಚರತೆ",
    principleVisibilityB:
      "ಪ್ರತಿ ವರದಿ, ಬೆಂಬಲಿಗರ ಸಂಖ್ಯೆ, ಸ್ಥಿತಿ ಬದಲಾವಣೆ ಮತ್ತು ಅಧಿಕೃತ ಉತ್ತರ ಸಾರ್ವಜನಿಕವಾಗಿದೆ. ಸಮಸ್ಯೆಗಳನ್ನು ಮೌನವಾಗಿ ಮುಚ್ಚಲಾಗುವುದಿಲ್ಲ.",
    principlePressureT: "ಸಾಮೂಹಿಕ ಒತ್ತಡ",
    principlePressureB:
      "ಒಂದೇ ದೂರನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದು ಸುಲಭ. ನಿಮ್ಮ ಸ್ವಂತ ಊರಿನಿಂದ 1,240 ಬೆಂಬಲಿಗರೊಂದಿಗಿನ ವರದಿ ಅಲ್ಲ.",
    principleAccountT: "ಜವಾಬ್ದಾರಿಯುತ ಪ್ರತಿಕ್ರಿಯೆ",
    principleAccountB:
      "ಇಲಾಖೆಗಳು ದಾಖಲೆಯಲ್ಲಿ ಉತ್ತರಿಸುತ್ತವೆ. ವಿಳಂಬವಾದ ಸಮಸ್ಯೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕೆಂಪು ಬಣ್ಣದಿಂದ ಗುರುತಿಸಲಾಗುತ್ತದೆ.",
    rolesEyebrow: "ಪಾತ್ರಗಳು ಮತ್ತು ಪರಿಶೀಲನೆ",
    rolesTitle: "ವಿವಿಧ ನಾಗರಿಕರು, ವಿವಿಧ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು",
    roleCitizenT: "ನಾಗರಿಕ",
    roleCitizenB:
      "ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡುತ್ತಾರೆ, ಇತರರನ್ನು ಬೆಂಬಲಿಸುತ್ತಾರೆ, ತಮ್ಮ ವರದಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತಾರೆ.",
    rolePoliticianT: "ರಾಜಕಾರಣಿ",
    rolePoliticianB:
      "ಕ್ಷೇತ್ರಮಟ್ಟದ ಸಮಸ್ಯೆಗಳನ್ನು ವೀಕ್ಷಿಸುತ್ತಾರೆ, ಏನು ಬಾಕಿ ಇದೆ ಮತ್ತು ಏನು ಪರಿಹಾರವಾಗಿದೆ.",
    roleGovtT: "ಸರ್ಕಾರಿ ನೌಕರ",
    roleGovtB:
      "ಕೆಲಸದ ಸಾಲನ್ನು ನೋಡುತ್ತಾರೆ: ಬಾಕಿ, ಪ್ರಗತಿಯಲ್ಲಿ, ಪೂರ್ಣಗೊಂಡ ಮತ್ತು ವಿಳಂಬ ಸಮಸ್ಯೆಗಳು.",
    roleMediaT: "ಮಾಧ್ಯಮ",
    roleMediaB:
      "ತನಿಖೆಗೆ ಯೋಗ್ಯವಾದ ಟ್ರೆಂಡಿಂಗ್ ಮತ್ತು ಹೆಚ್ಚು ಗಮನದ ಸಮಸ್ಯೆಗಳನ್ನು ಗಮನಿಸುತ್ತಾರೆ.",
    rolePublicT: "ಸಾರ್ವಜನಿಕ ವ್ಯಕ್ತಿ",
    rolePublicB:
      "ಹೆಚ್ಚು ಗಮನ ಮತ್ತು ವಿಳಂಬ ಸಮಸ್ಯೆಗಳನ್ನು ವಿಶಾಲ ಪ್ರೇಕ್ಷಕರಿಗೆ ವರ್ಧಿಸುತ್ತಾರೆ.",
    verifPendingT: "ಪರಿಶೀಲನೆ ಬಾಕಿ",
    verifPendingB:
      "ನಾಗರಿಕರಲ್ಲದ ಪಾತ್ರಗಳು ತಕ್ಷಣ ನೋಂದಾಯಿಸುತ್ತವೆ ಆದರೆ ಮಾಡರೇಟರ್ ಅನುಮೋದಿಸುವವರೆಗೆ “ಪರಿಶೀಲನೆ ಬಾಕಿ” ತೋರಿಸುತ್ತವೆ.",
    hierEyebrow: "ಸ್ಥಳ ಶ್ರೇಣಿ",
    hierTitle: "ಭಾರತ ಹೇಗೆ ಆಡಳಿತ ನಡೆಸುತ್ತದೆ ಎಂಬುದಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ",
    hierDesc:
      "ಹೊನ್ನೇನಹಳ್ಳಿ ಗ್ರಾಮದಲ್ಲಿನ ಗುಂಡಿ ತಿಪಟೂರು ತಾಲ್ಲೂಕಿನ ಸಮಸ್ಯೆಯೂ ಆಗಿದೆ ಮತ್ತು ತುಮಕೂರು ಜಿಲ್ಲೆಯ ಸಮಸ್ಯೆಯೂ ಆಗಿದೆ. LocalFix ವರದಿಗಳನ್ನು ನೈಜ ಆಡಳಿತ ವೃಕ್ಷದ ಮೂಲಕ ಸುತ್ತಿಕೊಳ್ಳುತ್ತದೆ.",
    tryLocationSearch: "ಸ್ಥಳ ಹುಡುಕಾಟವನ್ನು ಪ್ರಯತ್ನಿಸಿ",
    ruralChainT: "ಗ್ರಾಮೀಣ ಸರಪಳಿ",
    ruralChainB:
      "ಕರ್ನಾಟಕ → ತುಮಕೂರು (ಜಿಲ್ಲೆ) → ತಿಪಟೂರು (ತಾಲ್ಲೂಕು) → ನೊಣವಿನಕೆರೆ ಹೋಬಳಿ → ನಾಗರಘಟ್ಟ ಗ್ರಾಮ ಪಂಚಾಯಿತಿ → ಹೊನ್ನೇನಹಳ್ಳಿ ಗ್ರಾಮ",
    urbanChainT: "ನಗರ ಸರಪಳಿ",
    urbanChainB:
      "ಕರ್ನಾಟಕ → ಬೆಂಗಳೂರು (ನಗರ) → ವಾರ್ಡ್ — ನಗರಗಳು ತಮ್ಮ ಸ್ವಂತ ವಾರ್ಡ್ ರಚನೆಯನ್ನು ಇಟ್ಟುಕೊಳ್ಳುತ್ತವೆ.",
    aboutCtaTitle: "ಪಾರದರ್ಶಕತೆ ಒಂದೇ ವರದಿಯಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.",
    createAccount: "ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    exploreProblemsShort: "ಸಮಸ್ಯೆಗಳನ್ನು ನೋಡಿ",

    // Admin Dashboard
    adminDashboardTitle: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಆಡಳಿತ",
    adminDashboardDesc: "ಸಿಸ್ಟಮ್ ಅವಲೋಕನ, ಬಾಕಿ ಇರುವ ಕಾರ್ಯಗಳು ಮತ್ತು ಮಾಡರೇಶನ್.",
    adminRoleBadge: "ಅಡ್ಮಿನ್",
    staffBadge: "ಸಿಬ್ಬಂದಿ",
    quickActions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
    needsAttention: "ಗಮನ ಅಗತ್ಯವಿದೆ",
    pendingVerifications: "ಬಾಕಿ ಇರುವ ಪರಿಶೀಲನೆಗಳು",
    overdueProblems: "ವಿಳಂಬವಾದ ಸಮಸ್ಯೆಗಳು",
    newReports: "ಹೊಸ ವರದಿಗಳು",
    totalUsers: "ಒಟ್ಟು ಬಳಕೆದಾರರು",
    openProblems: "ತೆರೆದ ಸಮಸ್ಯೆಗಳು",
    manageVerifications: "ಪರಿಶೀಲನೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    manageProblems: "ಸಮಸ್ಯೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    manageUsers: "ಬಳಕೆದಾರರನ್ನು ನಿರ್ವಹಿಸಿ",
    manageCategories: "ವರ್ಗಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    manageLocations: "ಸ್ಥಳಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    manageComments: "ಕಾಮೆಂಟ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    reviewAll: "ಎಲ್ಲವನ್ನೂ ಪರಿಶೀಲಿಸಿ",
    noPendingVerifications: "ಯಾವುದೇ ಪರಿಶೀಲನೆಗಳಿಲ್ಲ. ಎಲ್ಲಾ ಸ್ಪಷ್ಟವಾಗಿದೆ!",
    noOverdueProblems: "ಯಾವುದೇ ವಿಳಂಬವಾದ ಸಮಸ್ಯೆಗಳಿಲ್ಲ. ಅತ್ಯುತ್ತಮ!",
    noNewReports: "ಯಾವುದೇ ಹೊಸ ವರದಿಗಳಿಲ್ಲ.",
    goToAdminPanel: "ಅಡ್ಮಿನ್ ಪ್ಯಾನಲ್‌ಗೆ ಹೋಗಿ",

    // Login
    loginWelcome: "ಮತ್ತೆ ಸ್ವಾಗತ",
    loginSubtitle: "ನಿಮ್ಮ LocalFix ಖಾತೆಯೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ.",
    username: "ಬಳಕೆದಾರ ಹೆಸರು",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    logIn: "ಲಾಗಿನ್",
    newToApp: "LocalFix ಗೆ ಹೊಸಬರೇ?",
    createAcc: "ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    demoAccounts: "ಡೆಮೋ ಖಾತೆಗಳು",
    loginTagline:
      "“ಸಮಸ್ಯೆಯನ್ನು ನೋಡಿ. ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ. ಗೋಚರಿಸುವಂತೆ ಮಾಡಿ.”",
    loginPanelDesc:
      "ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಲು, ನಿಮ್ಮ ನೆರೆಹೊರೆಯವರ ವರದಿಗಳನ್ನು ಬೆಂಬಲಿಸಲು ಮತ್ತು ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಿಂದ ಪ್ರತಿ ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಅನುಸರಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ.",

    // Signup
    signupTitle: "ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    signupSubtitle:
      "LocalFix ಸೇರಿ ಮತ್ತು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಗೋಚರಿಸುವಂತೆ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ.",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    email: "ಇಮೇಲ್",
    registeringAs: "ನಾನು ನೋಂದಾಯಿಸುತ್ತಿದ್ದೇನೆ…",
    createAccountBtn: "ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    alreadyRegistered: "ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಿದ್ದೀರಾ?",
    signupHint:
      "ರಾಜಕಾರಣಿಗಳು, ಸರ್ಕಾರಿ ನೌಕರರು, ಮಾಧ್ಯಮ ಮತ್ತು ಸಾರ್ವಜನಿಕ ವ್ಯಕ್ತಿಗಳು ಮಾಡರೇಟರ್ ಅನುಮೋದಿಸುವವರೆಗೆ “ಪರಿಶೀಲನೆ ಬಾಕಿ” ತೋರಿಸುತ್ತಾರೆ.",
    benefit1T: "ಎರಡು ನಿಮಿಷಗಳಲ್ಲಿ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ",
    benefit1B: "ಫೋಟೋ, ಸ್ಥಳ, ವಿವರಣೆ — ಮುಗಿಯಿತು.",
    benefit2T: "ಮುಖ್ಯವಾದದನ್ನು ಬೆಂಬಲಿಸಿ",
    benefit2B: "ಒಂದೇ ಕ್ಲಿಕ್ ಯಾವುದೇ ವರದಿಗೆ ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಸೇರಿಸುತ್ತದೆ.",
    benefit3T: "ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಅನುಸರಿಸಿ",
    benefit3B:
      "ಟೈಮ್‌ಲೈನ್‌ಗಳು ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು ಅಧಿಕಾರಿಗಳನ್ನು ಜವಾಬ್ದಾರರನ್ನಾಗಿಸುತ್ತವೆ.",
    signupFootnote:
      "ಪ್ರತಿ ನಾಗರಿಕರಿಗೂ ಉಚಿತ. ನೈಜ ಹೆಸರುಗಳು ವಿಶ್ವಾಸವನ್ನು ನಿರ್ಮಿಸುತ್ತವೆ; ಪ್ರತಿ ವರದಿಯಲ್ಲಿ ಅನಾಮಿಕತೆ ಲಭ್ಯವಿದೆ.",

    // Report page
    reportEyebrow: "ನಾಗರಿಕ ವರದಿ",
    reportTitle: "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ",
    reportSubtitle:
      "ನಾಗರಿಕ ಸಮಸ್ಯೆಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸಿ. ಸಲ್ಲಿಸಿದ ನಂತರ ಇದು ಸಾರ್ವಜನಿಕವಾಗುತ್ತದೆ.",
    problemTitle: "ಸಮಸ್ಯೆಯ ಶೀರ್ಷಿಕೆ",
    problemTitlePlaceholder:
      "ಉದಾ: ಹೊನ್ನೇನಹಳ್ಳಿ ಬಸ್ ನಿಲ್ದಾಣದ ಬಳಿ ಹಾನಿಗೊಳಗಾದ ರಸ್ತೆ",
    problemTitleHint: "ಚಿಕ್ಕ ಮತ್ತು ನಿರ್ದಿಷ್ಟ — ಏನು ಮತ್ತು ಎಲ್ಲಿ ಎಂಬುದನ್ನು ಉಲ್ಲೇಖಿಸಿ.",
    description: "ವಿವರಣೆ",
    descriptionPlaceholder:
      "ಸಮಸ್ಯೆ ಏನು? ಎಷ್ಟು ಸಮಯದಿಂದ ಇದೆ? ಯಾರಿಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ?",
    category: "ವರ್ಗ",
    chooseCategory: "ಒಂದು ವರ್ಗವನ್ನು ಆರಿಸಿ…",
    location: "ಸ್ಥಳ",
    chooseLocation: "ನಿಖರವಾದ ಸ್ಥಳವನ್ನು ಆರಿಸಿ…",
    locationHint:
      "ನೀವು ತಿಳಿದಿರುವ ಆಳವಾದ ಮಟ್ಟವನ್ನು ಆರಿಸಿ — ಹಳ್ಳಿ ಅಥವಾ ವಾರ್ಡ್ ಉತ್ತಮ.",
    photo: "ಫೋಟೋ",
    photoOptional: "(ಐಚ್ಛಿಕ, ಗರಿಷ್ಠ 3 MB)",
    showIdentity: "ನನ್ನ ಗುರುತನ್ನು ಸಾರ್ವಜನಿಕವಾಗಿ ತೋರಿಸಿ",
    showIdentityDesc:
      "ನಿಮ್ಮ ಹೆಸರು ವರದಿಗಾರರಂತೆ ಕಾಣಿಸುತ್ತದೆ. ಇಲ್ಲದಿದ್ದರೆ ಅಜ್ಞಾತ ನಾಗರಿಕ ಎಂದು ತೋರಿಸಲಾಗುತ್ತದೆ.",
    submitReport: "ವರದಿ ಸಲ್ಲಿಸಿ",
    goodReportsTitle: "ಉತ್ತಮ ವರದಿಗಳು ವೇಗವಾಗಿ ಪರಿಹಾರವಾಗುತ್ತವೆ",
    tip1: "ನಿಖರವಾದ ಸ್ಥಳವನ್ನು ಬಳಸಿ — ಜಿಲ್ಲೆಯಲ್ಲ, ಹಳ್ಳಿ ಅಥವಾ ವಾರ್ಡ್.",
    tip2: "ಪ್ರತಿ ವರದಿಗೆ ಒಂದು ಸಮಸ್ಯೆ. ಎರಡು ಸಮಸ್ಯೆಗಳು = ಎರಡು ವರದಿಗಳು.",
    tip3: "ಸ್ಪಷ್ಟವಾದ ಹಗಲಿನ ಫೋಟೋ ವಿಶ್ವಾಸಾರ್ಹತೆಯನ್ನು ನೀಡುತ್ತದೆ.",
    tip4:
      "ಎಷ್ಟು ಜನರಿಗೆ ಪರಿಣಾಮವಿದೆ ಎಂದು ಉಲ್ಲೇಖಿಸಿ — ಶಾಲೆಗಳು, ಬಸ್‌ಗಳು, ಅಂಗಡಿಗಳು.",
    anonymousDefault: "ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಅಜ್ಞಾತ",
    anonymousDesc:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡದ ಹೊರತು, ವರದಿ ಅಜ್ಞಾತ ನಾಗರಿಕ ಹೆಸರಿನಲ್ಲಿ ಪ್ರಕಟವಾಗುತ್ತದೆ.",
    whatHappensNext: "ಮುಂದೆ ಏನಾಗುತ್ತದೆ",
    happens1: "ವರದಿ ತಕ್ಷಣ ಸಾರ್ವಜನಿಕವಾಗುತ್ತದೆ.",
    happens2: "ಮಾಡರೇಟರ್‌ಗಳು ಇದನ್ನು ನೈಜ ಎಂದು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.",
    happens3: "ಇಲಾಖೆ ಪ್ರತಿಕ್ರಿಯಿಸಬೇಕು.",
    happens4: "ಎಲ್ಲರೂ ಪೂರ್ಣಗೊಳ್ಳುವವರೆಗೆ ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತಾರೆ.",
    seeLiveExamples: "ನೇರ ಉದಾಹರಣೆಗಳನ್ನು ನೋಡಿ",

    // Problems list
    publicRecord: "ಸಾರ್ವಜನಿಕ ದಾಖಲೆ",
    problemsListTitle: "ಸಮಸ್ಯೆಗಳನ್ನು ನೋಡಿ",
    problemsListDesc:
      "ನಾಗರಿಕರು ವರದಿ ಮಾಡಿದ ಪ್ರತಿಯೊಂದು ನಾಗರಿಕ ಸಮಸ್ಯೆ, ನೇರ ಸ್ಥಿತಿ ಮತ್ತು ಬೆಂಬಲ ಎಣಿಕೆಗಳೊಂದಿಗೆ.",
    filterAllLocations: "ಎಲ್ಲಾ ಸ್ಥಳಗಳು",
    filterAllCategories: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    filterAllStatuses: "ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು",
    sortBy: "ಇದರ ಪ್ರಕಾರ ವಿಂಗಡಿಸಿ",
    sortNewest: "ಹೊಸತು",
    sortMostSupported: "ಹೆಚ್ಚು ಬೆಂಬಲಿತ",
    sortOldest: "ಹಳೆಯದು",
    applyFilters: "ಫಿಲ್ಟರ್ ಅನ್ವಯಿಸಿ",
    reset: "ಮರುಹೊಂದಿಸಿ",
    problemsFound: "ಸಮಸ್ಯೆಗಳು ಸಿಕ್ಕಿವೆ",
    noProblemsMatch: "ಈ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಸಮಸ್ಯೆಗಳು ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ",
    noProblemsDesc: "ಸ್ಥಳವನ್ನು ವಿಸ್ತರಿಸಿ ಅಥವಾ ಸ್ಥಿತಿ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ.",
    clearFilters: "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ",
    status: "ಸ್ಥಿತಿ",

    // Problem detail
    allProblems: "ಎಲ್ಲಾ ಸಮಸ್ಯೆಗಳು",
    reportedSuccess:
      "ಸಮಸ್ಯೆ ಯಶಸ್ವಿಯಾಗಿ ವರದಿಯಾಗಿದೆ. ಈಗ ಸಾರ್ವಜನಿಕವಾಗಿದೆ — ಬೆಂಬಲಿಗರನ್ನು ಒಟ್ಟುಗೂಡಿಸಲು ಹಂಚಿಕೊಳ್ಳಿ.",
    overdueLabel: "ಈ ಸಮಸ್ಯೆ ವಿಳಂಬವಾಗಿದೆ.",
    overdueDesc:
      "ಜವಾಬ್ದಾರಿಯ ಇಲಾಖೆ ನಿರೀಕ್ಷಿತ ಸಮಯದೊಳಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸಿಲ್ಲ.",
    publicTimeline: "ಸಾರ್ವಜನಿಕ ಟೈಮ್‌ಲೈನ್",
    timelineDesc:
      "ವರದಿ → ಪರಿಶೀಲನೆ → ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ → ಕೆಲಸ ಆರಂಭ → ಪೂರ್ಣಗೊಂಡಿದೆ",
    officialResponse: "ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆ",
    noResponseYet: "ಇನ್ನೂ ಯಾವುದೇ ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆ ಇಲ್ಲ.",
    noResponseDesc:
      "ಇಲಾಖೆ ಉತ್ತರಿಸಿದಾಗ, ಅದನ್ನು ಇಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ.",
    comments: "ಕಾಮೆಂಟ್‌ಗಳು",
    addComment:
      "ಸ್ಥಳೀಯ ಮಾಹಿತಿ, ನವೀಕರಣ ಅಥವಾ ಅಧಿಕಾರಿಗಳಿಗೆ ಪ್ರಶ್ನೆಯನ್ನು ಸೇರಿಸಿ…",
    postComment: "ಕಾಮೆಂಟ್ ಪೋಸ್ಟ್ ಮಾಡಿ",
    commentingAs: "ಎಂದು ಕಾಮೆಂಟ್ ಮಾಡುತ್ತಿದ್ದೀರಿ",
    logInToComment: "ಲಾಗಿನ್",
    joinDiscussion: "ಚರ್ಚೆಗೆ ಸೇರಲು.",
    noComments: "ಇನ್ನೂ ಯಾವುದೇ ಕಾಮೆಂಟ್‌ಗಳಿಲ್ಲ. ಸಂದರ್ಭವನ್ನು ಸೇರಿಸಲು ಮೊದಲಿಗರಾಗಿ.",
    supportButton: "ಈ ಸಮಸ್ಯೆಯನ್ನು ಬೆಂಬಲಿಸಿ",
    supportedButton: "ನೀವು ಇದನ್ನು ಬೆಂಬಲಿಸಿದ್ದೀರಿ",
    supporterNote:
      "ಬೆಂಬಲಿಗರನ್ನು ಸಾರ್ವಜನಿಕವಾಗಿ ಎಣಿಸಲಾಗುತ್ತದೆ. ಹೆಚ್ಚು ಬೆಂಬಲ = ಹೆಚ್ಚು ಒತ್ತಡ.",
    reportDetails: "ವರದಿ ವಿವರಗಳು",
    reportedBy: "ವರದಿ ಮಾಡಿದವರು",
    anonymousCitizen: "ಅಜ್ಞಾತ ನಾಗರಿಕ",
    lastUpdate: "ಕೊನೆಯ ನವೀಕರಣ",
    staffActions: "ಸಿಬ್ಬಂದಿ ಕ್ರಮಗಳು",
    updateStatus: "ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಿ",
    publicNoteOptional: "ಸಾರ್ವಜನಿಕ ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)",
    officialNameLabel: "ಅಧಿಕಾರಿಯ ಹೆಸರು",
    departmentLabel: "ಇಲಾಖೆ",
    responseTextLabel: "ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆ ಪಠ್ಯ…",
    publishResponse: "ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪ್ರಕಟಿಸಿ",
    share: "ಹಂಚಿಕೊಳ್ಳಿ",
    linkCopied: "ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ",

    // Dashboard
    dashboardEyebrow: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    hello: "ನಮಸ್ಕಾರ",
    welcomeUser: "LocalFix ಗೆ ಸ್ವಾಗತ",
    accountReady: "ನಿಮ್ಮ ಖಾತೆ ಸಿದ್ಧವಾಗಿದೆ — ಇದು ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.",
    verificationPendingBanner: "ನಿಮ್ಮ ಖಾತೆಯ ಪರಿಶೀಲನೆ ಬಾಕಿ ಇದೆ.",
    verificationPendingDesc: "ಮಾಡರೇಟರ್ ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.",
    myReports: "ನನ್ನ ವರದಿಗಳು",
    myReportsEmpty: "ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿಲ್ಲ.",
    supportedProblems: "ಬೆಂಬಲಿತ ಸಮಸ್ಯೆಗಳು",
    supportedEmpty: "ನೀವು ಬೆಂಬಲಿಸುವ ಸಮಸ್ಯೆಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
    notifications: "ಅಧಿಸೂಚನೆಗಳು",
    notificationsEmpty:
      "ಇನ್ನೂ ಏನೂ ಇಲ್ಲ — ಅಧಿಸೂಚನೆಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
    markAllRead: "ಎಲ್ಲವನ್ನೂ ಓದಿದಂತೆ ಗುರುತಿಸಿ",
    pendingProblems: "ಬಾಕಿ ಸಮಸ್ಯೆಗಳು",
    pendingEmpty: "ಅಧಿಕೃತ ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಕಾಯುತ್ತಿರುವ ಯಾವುದೇ ಸಮಸ್ಯೆಗಳಿಲ್ಲ.",
    inProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    inProgressEmpty: "ಪ್ರಸ್ತುತ ಪ್ರಗತಿಯಲ್ಲಿ ಯಾವುದೇ ಕೆಲಸವಿಲ್ಲ.",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    completedEmpty: "ಇನ್ನೂ ಏನೂ ಪೂರ್ಣಗೊಂಡಿಲ್ಲ.",
    overdue: "ವಿಳಂಬ",
    overdueEmpty: "ಯಾವುದೇ ವಿಳಂಬ ಸಮಸ್ಯೆಗಳಿಲ್ಲ. ಚೆನ್ನಾಗಿದೆ!",
    yourConstituency: "ನಿಮ್ಮ ಕ್ಷೇತ್ರ",
    constituencyProblems: "ಕ್ಷೇತ್ರದ ಸಮಸ್ಯೆಗಳು",
    constituencyEmpty: "ನಿಮ್ಮ ಕ್ಷೇತ್ರದಲ್ಲಿ ಯಾವುದೇ ಸಮಸ್ಯೆಗಳು ವರದಿಯಾಗಿಲ್ಲ.",
    resolvedProblems: "ಪರಿಹಾರವಾದ ಸಮಸ್ಯೆಗಳು",
    resolvedEmpty: "ಇನ್ನೂ ಯಾವುದೇ ಪರಿಹಾರವಾದ ಸಮಸ್ಯೆಗಳಿಲ್ಲ.",
    trendingProblems: "ಟ್ರೆಂಡಿಂಗ್ ಸಮಸ್ಯೆಗಳು",
    trendingEmpty: "ಇನ್ನೂ ಏನೂ ಟ್ರೆಂಡಿಂಗ್ ಇಲ್ಲ.",
    highAttention: "ಹೆಚ್ಚು ಗಮನಾರ್ಹ ಸಮಸ್ಯೆಗಳು",
    highAttentionEmpty: "ಈಗ ಹೆಚ್ಚು ಗಮನಾರ್ಹ ಸಮಸ್ಯೆಗಳಿಲ್ಲ.",
    overdueInvestigate: "ತನಿಖೆ ಮಾಡಲು ಯಾವುದೇ ವಿಳಂಬ ಸಮಸ್ಯೆಗಳಿಲ್ಲ.",

    // Map page
    mapEyebrow: "ಭೌಗೋಳಿಕ ಅವಲೋಕನ",
    mapTitle: "ನೇರ ಸಮಸ್ಯೆ ಹೀಟ್‌ಮ್ಯಾಪ್",
    mapDesc:
      "ಕರ್ನಾಟಕದ ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ. ಗಾಢ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ಹೆಚ್ಚು ಸಮಸ್ಯೆಗಳಿವೆ.",
    problemCount: "ಸಮಸ್ಯೆಗಳ ಸಂಖ್ಯೆ",
    mapInfo:
      "OpenStreetMap ನಿಂದ ನಕ್ಷೆ ಡೇಟಾ. ತಾಲ್ಲೂಕುಗಳನ್ನು ನೋಡಲು ಜಿಲ್ಲೆಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
    districtQuickLinks: "ಜಿಲ್ಲೆಯ ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",

    // Locations page
    exploreKarnataka: "ಕರ್ನಾಟಕವನ್ನು ಅನ್ವೇಷಿಸಿ",
    allDistrictsTitle: "ಕರ್ನಾಟಕದ ಎಲ್ಲಾ 31 ಜಿಲ್ಲೆಗಳು",
    allDistrictsDesc:
      "ತಾಲ್ಲೂಕುಗಳು, ಹೋಬಳಿಗಳು, ಗ್ರಾಮ ಪಂಚಾಯಿತಿಗಳು, ಹಳ್ಳಿಗಳು ಮತ್ತು ವಾರ್ಡ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ಯಾವುದೇ ಜಿಲ್ಲೆಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
    locSearchPlaceholder:
      "ಯಾವುದೇ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ — ಹೊನ್ನೇನಹಳ್ಳಿ, ತಿಪಟೂರು, ಇಂದಿರಾನಗರ…",
    popular: "ಜನಪ್ರಿಯ",
    noLocationMatches: "ಯಾವುದೇ ಸ್ಥಳ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ",
    noLocationDesc: "ಜಿಲ್ಲೆ, ತಾಲ್ಲೂಕು, ವಾರ್ಡ್ ಅಥವಾ ಹಳ್ಳಿಯ ಹೆಸರನ್ನು ಹುಡುಕಿ.",
    explore: "ಅನ್ವೇಷಿಸಿ",
    allDistricts: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
    districtsGridTitle: "ಕರ್ನಾಟಕದ 31 ಜಿಲ್ಲೆಗಳು",
    districtsGridDesc:
      "ತಾಲ್ಲೂಕುಗಳು, ಹೋಬಳಿಗಳು, ಗ್ರಾಮ ಪಂಚಾಯಿತಿಗಳು, ಹಳ್ಳಿಗಳು ಮತ್ತು ವಾರ್ಡ್‌ಗಳಿಗೆ ಯಾವುದೇ ಜಿಲ್ಲೆಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
    problemsReportedShort: "ಸಮಸ್ಯೆಗಳು ವರದಿಯಾಗಿವೆ",

    // Location detail
    breadcrumbAll: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
    inThisArea: "ಸಮಸ್ಯೆ(ಗಳು) ಈ ಪ್ರದೇಶದಲ್ಲಿ",
    viewAllProblemsBtn: "ಎಲ್ಲಾ ಸಮಸ್ಯೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    subAreasIn: "ಉಪ-ಪ್ರದೇಶಗಳು",
    clickToDrill: "ಶ್ರೇಣಿಯಲ್ಲಿ ಆಳವಾಗಿ ಡ್ರಿಲ್ ಮಾಡಲು ಯಾವುದೇ ಪ್ರದೇಶವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
    noSubAreas: "ಇದರ ಅಡಿಯಲ್ಲಿ ಯಾವುದೇ ಉಪ-ಪ್ರದೇಶಗಳಿಲ್ಲ",
    deepestLevel:
      "ಇದು ಶ್ರೇಣಿಯಲ್ಲಿ ಆಳವಾದ ಮಟ್ಟ. ಕೆಳಗಿನ ವರದಿಯಾದ ಸಮಸ್ಯೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
    problemsIn: "ಈ ಸ್ಥಳದ ಸಮಸ್ಯೆಗಳು",
    topProblemsIn: "ಈ ಪ್ರದೇಶದ ಅಗ್ರ ಬೆಂಬಲಿತ ಸಮಸ್ಯೆಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.",
    viewAll: "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ",

    // Admin
    siteAdmin: "ಸೈಟ್ ಆಡಳಿತ",
    overview: "ಅವಲೋಕನ",
    problems: "ಸಮಸ್ಯೆಗಳು",
    users: "ಬಳಕೆದಾರರು",
    categories: "ವರ್ಗಗಳು",
    locationsAdmin: "ಸ್ಥಳಗಳು",
    commentsAdmin: "ಕಾಮೆಂಟ್‌ಗಳು",
    verifications: "ಪರಿಶೀಲನೆಗಳು",
    records: "ದಾಖಲೆಗಳು",
    changeStatus: "ಸ್ಥಿತಿಯನ್ನು ಬದಲಾಯಿಸಿ",
    user: "ಬಳಕೆದಾರ",
    role: "ಪಾತ್ರ",
    verification: "ಪರಿಶೀಲನೆ",
    joined: "ಸೇರಿದ್ದು",
    actions: "ಕ್ರಮಗಳು",
    activate: "ಸಕ್ರಿಯಗೊಳಿಸಿ",
    deactivate: "ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ",
    name: "ಹೆಸರು",
    slug: "ಸ್ಲಗ್",
    addCategory: "ವರ್ಗ ಸೇರಿಸಿ",
    newCategoryName: "ಹೊಸ ವರ್ಗದ ಹೆಸರು",
    addLocation: "ಸ್ಥಳ ಸೇರಿಸಿ",
    parentLoc: "ಪೋಷಕ",
    topLevelState: "— ಉನ್ನತ ಮಟ್ಟ (ರಾಜ್ಯ) —",
    type: "ಪ್ರಕಾರ",
    fullPath: "ಪೂರ್ಣ ಮಾರ್ಗ",
    comment: "ಕಾಮೆಂಟ್",
    author: "ಲೇಖಕ",
    problem: "ಸಮಸ್ಯೆ",
    action: "ಕ್ರಮ",
    remove: "ತೆಗೆದುಹಾಕಿ",
    removed: "ತೆಗೆದುಹಾಕಲಾಗಿದೆ",
    live: "ಲೈವ್",
    verificationRequests: "ಪರಿಶೀಲನೆ ವಿನಂತಿಗಳು",
    requestedRole: "ವಿನಂತಿಸಿದ ಪಾತ್ರ",
    note: "ಟಿಪ್ಪಣಿ",
    decision: "ನಿರ್ಣಯ",
    approve: "ಅನುಮೋದಿಸಿ",
    reject: "ತಿರಸ್ಕರಿಸಿ",
    pending: "ಬಾಕಿ",
    approved: "ಅನುಮೋದಿಸಲಾಗಿದೆ",
    rejected: "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
    noVerifRequests: "ಇನ್ನೂ ಯಾವುದೇ ಪರಿಶೀಲನೆ ವಿನಂತಿಗಳಿಲ್ಲ.",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function tFor(lang: Lang) {
  return (key: TranslationKey) =>
    (translations[lang] as Record<string, string>)[key] ??
    (translations.en as Record<string, string>)[key] ??
    key;
}