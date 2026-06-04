import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { input_text, language } = await req.json();

    if (!input_text || input_text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Input text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      const brd = generateFallbackBRD(input_text, language || "en");
      return new Response(
        JSON.stringify({ brd }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `You are an expert Business Analyst AI. Generate a comprehensive Business Requirement Document (BRD) based on the following input. The input may be in any Indian language (Hindi, Tamil, Bengali, Marathi, Hinglish, etc.) - analyze it and produce the BRD in English.

Input: "${input_text}"

Generate a JSON object with EXACTLY this structure (no markdown, pure JSON only):
{
  "overview": {
    "projectName": "string",
    "description": "string",
    "targetUsers": "string",
    "businessValue": "string"
  },
  "objectives": ["string"],
  "functionalRequirements": [
    {"name": "string", "description": "string", "priority": "High|Medium|Low"}
  ],
  "nonFunctionalRequirements": [
    {"name": "string", "description": "string", "category": "Performance|Security|Scalability|Usability"}
  ],
  "userStories": [
    {"id": "US-001", "story": "string", "acceptance": ["string"], "confidence": 95}
  ],
  "userRoles": [
    {"role": "string", "description": "string", "permissions": ["string"]}
  ],
  "architecture": {
    "components": ["string"],
    "dataFlow": "string",
    "diagramDescription": "string"
  },
  "techStack": {
    "frontend": ["string"],
    "backend": ["string"],
    "database": ["string"],
    "thirdParty": ["string"]
  },
  "timeline": [
    {"phase": "string", "duration": "string", "tasks": ["string"]}
  ],
  "riskAnalysis": [
    {"risk": "string", "impact": "High|Medium|Low", "mitigation": "string"}
  ],
  "successMetrics": [
    {"metric": "string", "target": "string"}
  ]
}

Generate comprehensive, realistic content. Be specific about technologies, features, and timelines.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
        }),
      }
    );

    if (!response.ok) {
      const brd = generateFallbackBRD(input_text, language || "en");
      return new Response(
        JSON.stringify({ brd }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let brd;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        brd = JSON.parse(jsonMatch[0]);
      } else {
        brd = generateFallbackBRD(input_text, language || "en");
      }
    } catch {
      brd = generateFallbackBRD(input_text, language || "en");
    }

    return new Response(
      JSON.stringify({ brd }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function generateFallbackBRD(input: string, _language: string) {
  const projectType = detectProjectType(input);
  const projectName = extractProjectName(input) || projectType.name;

  return {
    overview: {
      projectName,
      description: projectType.description,
      targetUsers: projectType.targetUsers,
      businessValue: projectType.businessValue,
    },
    objectives: projectType.objectives,
    functionalRequirements: projectType.features.map((f: any, i: number) => ({
      name: f.name,
      description: f.description,
      priority: f.priority || (i < 3 ? "High" : "Medium"),
    })),
    nonFunctionalRequirements: [
      { name: "Response Time", description: "API responses under 200ms for 95th percentile", category: "Performance" },
      { name: "Data Encryption", description: "All data encrypted at rest and in transit", category: "Security" },
      { name: "Horizontal Scaling", description: "Support 10x user growth without architecture changes", category: "Scalability" },
      { name: "Accessibility", description: "WCAG 2.1 AA compliance for all interfaces", category: "Usability" },
    ],
    userStories: projectType.features.slice(0, 5).map((f: any, i: number) => ({
      id: `US-${String(i + 1).padStart(3, "0")}`,
      story: `As a user, I want ${f.name.toLowerCase()} so that ${f.description.toLowerCase()}`,
      acceptance: [`Given the app is open`, `When I access ${f.name}`, `Then ${f.description}`],
      confidence: 85 + Math.floor(Math.random() * 15),
    })),
    userRoles: projectType.roles,
    architecture: projectType.architecture,
    techStack: projectType.techStack,
    timeline: projectType.timeline,
    riskAnalysis: [
      { risk: "Scope creep during development", impact: "High", mitigation: "Clear MVP definition and sprint planning" },
      { risk: "Third-party API changes", impact: "Medium", mitigation: "Abstract external dependencies behind adapters" },
      { risk: "Performance under load", impact: "Medium", mitigation: "Load testing and caching strategies" },
    ],
    successMetrics: [
      { metric: "User adoption rate", target: "10,000 users in 3 months" },
      { metric: "Document generation time", target: "Under 5 seconds" },
      { metric: "User satisfaction score", target: "4.5/5 or higher" },
    ],
  };
}

function detectProjectType(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes("grocery") || lower.includes("delivery") || lower.includes("food")) return deliveryAppProject;
  if (lower.includes("ecommerce") || lower.includes("e-commerce") || lower.includes("shop") || lower.includes("store")) return ecommerceProject;
  if (lower.includes("education") || lower.includes("learn") || lower.includes("course")) return edtechProject;
  if (lower.includes("bank") || lower.includes("fintech") || lower.includes("payment") || lower.includes("finance")) return fintechProject;
  if (lower.includes("health") || lower.includes("hospital") || lower.includes("doctor")) return healthcareProject;
  return genericProject;
}

function extractProjectName(input: string): string | null {
  const patterns = [
    /(?:banana|bana|banana hai|banana h)\s+(\w+(?:\s+\w+){0,3})/i,
    /(?:make|build|create|develop)\s+(?:a\s+|an\s+)?(\w+(?:\s+\w+){0,3})/i,
  ];
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1].replace(/\s+(hai|ho|chahiye|ka|ke|ki|mein|men|me|ke).*$/i, "").trim();
  }
  return null;
}

const deliveryAppProject = {
  name: "Grocery Delivery Platform",
  description: "A comprehensive grocery delivery platform with real-time tracking, multi-payment support, and store management for the Indian market.",
  targetUsers: "Urban households, working professionals, and elderly users who prefer home grocery delivery.",
  businessValue: "Connect local grocery stores with customers, reduce delivery time to 30 minutes, capture the growing Indian quick-commerce market valued at $5B.",
  objectives: ["Enable seamless grocery ordering from local stores", "Provide real-time delivery tracking", "Support UPI and card payments", "Reduce delivery time to under 30 minutes"],
  features: [
    { name: "User Authentication", description: "Phone OTP and social login for secure access", priority: "High" },
    { name: "Location-Based Store Discovery", description: "GPS-powered nearby store listing within 5km", priority: "High" },
    { name: "Product Catalog & Search", description: "Category browsing with intelligent search and filters", priority: "High" },
    { name: "Shopping Cart", description: "Add/remove items with quantity management", priority: "High" },
    { name: "Live Order Tracking", description: "Real-time GPS tracking with ETA updates", priority: "High" },
    { name: "Multiple Payment Options", description: "UPI, cards, wallets, and COD support", priority: "High" },
    { name: "Order Management", description: "Order history, reordering, and cancellation", priority: "Medium" },
    { name: "Ratings & Reviews", description: "Rate products and delivery experience", priority: "Low" },
  ],
  roles: [
    { role: "Customer", description: "End user who orders groceries", permissions: ["Browse", "Order", "Track", "Pay", "Review"] },
    { role: "Delivery Partner", description: "Delivers orders to customers", permissions: ["Accept orders", "Update status", "Navigation"] },
    { role: "Store Manager", description: "Manages store inventory and orders", permissions: ["Manage products", "Process orders", "View analytics"] },
    { role: "Admin", description: "Platform administrator", permissions: ["Full access", "Manage users", "View reports"] },
  ],
  architecture: {
    components: ["Mobile App (iOS/Android)", "Web PWA", "API Gateway", "User Service", "Order Service", "Delivery Tracking Service", "Payment Gateway", "Notification Service"],
    dataFlow: "Customer → Mobile App → API Gateway → Order/Tracking Services → Database. Delivery tracking via WebSocket for real-time updates.",
    diagramDescription: "Microservices architecture with API Gateway routing to User, Order, Delivery, Payment, and Notification services.",
  },
  techStack: {
    frontend: ["React Native", "TypeScript", "Redux Toolkit", "Google Maps SDK"],
    backend: ["Node.js", "Express", "GraphQL", "Socket.io", "Redis"],
    database: ["PostgreSQL", "MongoDB", "Redis"],
    thirdParty: ["Razorpay API", "Twilio SMS", "Firebase Push", "AWS S3", "Google Maps API"],
  },
  timeline: [
    { phase: "Phase 1 - MVP", duration: "6 weeks", tasks: ["Auth setup", "Store listing", "Basic ordering", "UPI payments"] },
    { phase: "Phase 2 - Core", duration: "8 weeks", tasks: ["Live tracking", "Multi-payment", "Order management", "Push notifications"] },
    { phase: "Phase 3 - Polish", duration: "4 weeks", tasks: ["Reviews", "Store management", "Analytics dashboard", "Performance"] },
    { phase: "Phase 4 - Scale", duration: "4 weeks", tasks: ["Multi-city", "Load testing", "Admin tools", "Marketing"] },
  ],
};

const ecommerceProject = {
  name: "E-Commerce Platform",
  description: "A full-featured e-commerce platform with product management, cart, checkout, and order management.",
  targetUsers: "Online shoppers and merchants looking to sell products digitally.",
  businessValue: "Enable digital commerce for businesses, reduce operational costs by 40%.",
  objectives: ["Enable online product sales", "Streamline checkout process", "Provide order management", "Support multiple payment methods"],
  features: [
    { name: "Product Management", description: "CRUD operations for product catalog", priority: "High" },
    { name: "Shopping Cart & Checkout", description: "Full cart experience with checkout flow", priority: "High" },
    { name: "Payment Integration", description: "Secure payment processing", priority: "High" },
    { name: "Order Management", description: "Order tracking and fulfillment", priority: "High" },
    { name: "User Accounts", description: "Registration, profiles, and order history", priority: "High" },
    { name: "Search & Filtering", description: "Product discovery with advanced search", priority: "Medium" },
  ],
  roles: [
    { role: "Customer", description: "Shopper", permissions: ["Browse", "Buy", "Review", "Track"] },
    { role: "Merchant", description: "Product seller", permissions: ["Manage products", "View orders"] },
    { role: "Admin", description: "Platform administrator", permissions: ["Full access"] },
  ],
  architecture: {
    components: ["Web App", "API Gateway", "Product Service", "Order Service", "Payment Service", "User Service"],
    dataFlow: "Customer → Web App → API Gateway → Services → Database",
    diagramDescription: "Microservices with API Gateway and event-driven order processing.",
  },
  techStack: {
    frontend: ["React", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Prisma ORM", "Bull Queue"],
    database: ["PostgreSQL", "Redis", "S3 Bucket"],
    thirdParty: ["Stripe/Razorpay", "SendGrid", "CloudFront CDN"],
  },
  timeline: [
    { phase: "Phase 1 - MVP", duration: "6 weeks", tasks: ["Products", "Cart", "Checkout", "Auth"] },
    { phase: "Phase 2 - Core", duration: "8 weeks", tasks: ["Payments", "Orders", "Search", "Notifications"] },
    { phase: "Phase 3 - Growth", duration: "4 weeks", tasks: ["Analytics", "Reviews", "Recommendations"] },
  ],
};

const edtechProject = {
  name: "EdTech Platform",
  description: "An online learning platform with courses, assessments, and progress tracking.",
  targetUsers: "Students, educators, and institutions.",
  businessValue: "Democratize education access, support 100K+ concurrent learners.",
  objectives: ["Enable online course delivery", "Track learning progress", "Support assessments"],
  features: [
    { name: "Course Management", description: "Create and organize courses", priority: "High" },
    { name: "Video Streaming", description: "On-demand and live video", priority: "High" },
    { name: "Assessments", description: "Quizzes, assignments, and grading", priority: "High" },
    { name: "Progress Tracking", description: "Dashboard showing learning progress", priority: "High" },
    { name: "Certificates", description: "Auto-generated completion certificates", priority: "Medium" },
  ],
  roles: [
    { role: "Student", description: "Learner", permissions: ["Enroll", "Watch", "Assess", "Track"] },
    { role: "Instructor", description: "Teaches courses", permissions: ["Create courses", "Grade"] },
    { role: "Admin", description: "Platform admin", permissions: ["Full access"] },
  ],
  architecture: {
    components: ["Web App", "Mobile App", "API Gateway", "Course Service", "Assessment Service", "Video Service"],
    dataFlow: "Student → App → API → Services → DB",
    diagramDescription: "Microservices with CDN for video and WebSocket for live sessions.",
  },
  techStack: {
    frontend: ["React", "TypeScript", "Tailwind", "Video.js"],
    backend: ["Node.js", "Express", "Socket.io", "Bull"],
    database: ["PostgreSQL", "MongoDB", "Redis", "S3"],
    thirdParty: ["AWS CloudFront", "Stripe", "Twilio"],
  },
  timeline: [
    { phase: "Phase 1 - MVP", duration: "8 weeks", tasks: ["Auth", "Courses", "Video player", "Assessments"] },
    { phase: "Phase 2 - Core", duration: "8 weeks", tasks: ["Live sessions", "Grading", "Progress tracking"] },
    { phase: "Phase 3 - Scale", duration: "6 weeks", tasks: ["Certificates", "Analytics", "Mobile app"] },
  ],
};

const fintechProject = {
  name: "Fintech Application",
  description: "A financial technology platform with digital payments and transaction processing.",
  targetUsers: "Banked and underbanked users needing digital financial services.",
  businessValue: "Enable financial inclusion, process 1M+ daily transactions.",
  objectives: ["Enable digital payments", "Secure transaction processing", "Provide financial analytics"],
  features: [
    { name: "Digital Wallet", description: "Store and manage digital funds", priority: "High" },
    { name: "UPI Payments", description: "Send and receive via UPI", priority: "High" },
    { name: "Transaction History", description: "Complete transaction ledger", priority: "High" },
    { name: "KYC Verification", description: "Identity verification", priority: "High" },
    { name: "Analytics Dashboard", description: "Spending insights", priority: "Medium" },
  ],
  roles: [
    { role: "User", description: "Performs transactions", permissions: ["Pay", "Receive", "View history"] },
    { role: "Merchant", description: "Accepts payments", permissions: ["Receive payments", "Reports"] },
    { role: "Admin", description: "Platform admin", permissions: ["Full access"] },
  ],
  architecture: {
    components: ["Mobile App", "API Gateway", "Auth Service", "Payment Service", "Ledger Service", "KYC Service"],
    dataFlow: "User → App → API → Payment/Ledger Services → DB",
    diagramDescription: "Event-sourced architecture with audit trail and encryption at rest.",
  },
  techStack: {
    frontend: ["React Native", "TypeScript", "Redux"],
    backend: ["Node.js", "Express", "Event Sourcing", "Kafka"],
    database: ["PostgreSQL", "Redis", "Elasticsearch"],
    thirdParty: ["Razorpay", "DigiLocker", "AWS KMS"],
  },
  timeline: [
    { phase: "Phase 1 - MVP", duration: "8 weeks", tasks: ["Auth", "Wallet", "UPI payments", "History"] },
    { phase: "Phase 2 - Core", duration: "10 weeks", tasks: ["KYC", "Fraud detection", "Analytics"] },
    { phase: "Phase 3 - Compliance", duration: "6 weeks", tasks: ["RBI compliance", "Audit logging", "Security audit"] },
  ],
};

const healthcareProject = {
  name: "Healthcare Platform",
  description: "A telemedicine platform with appointments, consultations, and records.",
  targetUsers: "Patients, doctors, and healthcare facilities.",
  businessValue: "Improve healthcare access, reduce wait times by 60%.",
  objectives: ["Enable teleconsultations", "Digital health records", "Appointment management"],
  features: [
    { name: "Appointment Booking", description: "Schedule doctor appointments", priority: "High" },
    { name: "Video Consultations", description: "Secure video calls", priority: "High" },
    { name: "Health Records", description: "Digital patient records", priority: "High" },
    { name: "Prescriptions", description: "Digital prescriptions", priority: "Medium" },
    { name: "Billing", description: "Payment and insurance claims", priority: "Medium" },
  ],
  roles: [
    { role: "Patient", description: "Book appointments and consult", permissions: ["Book", "View records", "Pay"] },
    { role: "Doctor", description: "Consult and prescribe", permissions: ["View patients", "Prescribe"] },
    { role: "Admin", description: "Facility admin", permissions: ["Full access"] },
  ],
  architecture: {
    components: ["Web App", "Mobile App", "API Gateway", "Appointment Service", "Consultation Service", "Records Service"],
    dataFlow: "Patient → App → API → Services → DB. Video via WebRTC.",
    diagramDescription: "HIPAA-compliant architecture with encryption and audit logging.",
  },
  techStack: {
    frontend: ["React", "React Native", "TypeScript", "WebRTC"],
    backend: ["Node.js", "Express", "Socket.io", "FHIR API"],
    database: ["PostgreSQL", "MongoDB", "Redis", "S3"],
    thirdParty: ["Twilio Video", "Stripe"],
  },
  timeline: [
    { phase: "Phase 1 - MVP", duration: "8 weeks", tasks: ["Auth", "Appointments", "Profiles", "Basic consults"] },
    { phase: "Phase 2 - Core", duration: "10 weeks", tasks: ["Video calls", "Records", "Prescriptions"] },
    { phase: "Phase 3 - Compliance", duration: "6 weeks", tasks: ["HIPAA audit", "Security", "Mobile app"] },
  ],
};

const genericProject = {
  name: "Custom Application",
  description: "A custom application based on the provided requirements.",
  targetUsers: "Target users as described in requirements.",
  businessValue: "Automate processes and deliver measurable business outcomes.",
  objectives: ["Deliver core functionality", "Ensure scalability", "Provide excellent UX"],
  features: [
    { name: "User Authentication", description: "Secure login and registration", priority: "High" },
    { name: "Dashboard", description: "Central hub for features and data", priority: "High" },
    { name: "Data Management", description: "CRUD operations for core entities", priority: "High" },
    { name: "Search & Filter", description: "Content discovery", priority: "Medium" },
    { name: "Notifications", description: "Real-time alerts", priority: "Medium" },
    { name: "Analytics", description: "Usage insights and reports", priority: "Low" },
  ],
  roles: [
    { role: "User", description: "Primary application user", permissions: ["Browse", "Create", "Edit own data"] },
    { role: "Admin", description: "System administrator", permissions: ["Full access", "Manage users"] },
  ],
  architecture: {
    components: ["Web Frontend", "API Server", "Database", "Cache Layer", "Background Workers"],
    dataFlow: "User → Frontend → API → Database. Cache layer for performance.",
    diagramDescription: "Standard 3-tier architecture with caching and background processing.",
  },
  techStack: {
    frontend: ["React", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Prisma"],
    database: ["PostgreSQL", "Redis"],
    thirdParty: ["AWS S3", "SendGrid", "Stripe"],
  },
  timeline: [
    { phase: "Phase 1 - Foundation", duration: "6 weeks", tasks: ["Auth", "Core CRUD", "Dashboard"] },
    { phase: "Phase 2 - Features", duration: "8 weeks", tasks: ["Search", "Notifications", "Analytics"] },
    { phase: "Phase 3 - Polish", duration: "4 weeks", tasks: ["Performance", "Testing", "Security"] },
  ],
};
