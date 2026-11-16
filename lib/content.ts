// Every fact on claireyouk.com, in one place. Sources (utopia-models/knowledge):
//   net/work/apply/candidates/claire/ground-truth.yaml, net/work/specs/13429-claire-youk-client/profile.json,
//   resume-internship.md, resume-server.md, source-resume.pdf.
// Rules: nothing here that those files do not say; no phone number or street address; never "lawyer"/"attorney".

export const SITE = {
  url: "https://claireyouk.com",
  name: "Claire Youk",
  email: "law@claireyouk.com",
  linkedin: "https://www.linkedin.com/in/claireyouk",
  title: "Claire Youk · Political Science, UC Santa Barbara",
  description:
    "Claire Youk studies Political Science at UC Santa Barbara on a pre-law track. Available for a paid summer 2027 internship in Northern Virginia and Washington, DC.",
  places: "Fairfax, VA · Santa Barbara, CA",
  resumePdf: "/Claire_Youk_resume.pdf",
  hospitalityPdf: "/Claire_Youk_resume_hospitality.pdf",
} as const;

export const STATS = [
  { value: 3000, suffix: "+", label: "classmates she represented on the county Student Advisory Council, 1 of 3 chosen" },
  { value: 70, suffix: "+", label: "student leaders she recruited into her school’s leadership program" },
  { value: 130, suffix: "+", label: "children ages 3–14 she has taught" },
  { value: 65, suffix: "", label: "community shows performed, 33 of them sold out" },
] as const;

export const FOCUS = [
  {
    numeral: "I",
    title: "Law",
    body: "Pre-law at UC Santa Barbara and a founding-class member of Kappa Alpha Pi, the pre-law and government professional fraternity. Interested in constitutional law. Seeking a law-firm or legal internship: legal assistant, file clerk, receptionist.",
  },
  {
    numeral: "II",
    title: "Government & policy",
    body: "Represented her high school to Fairfax County Public Schools leadership, presenting policy feedback to school board representatives and the Superintendent. Interested in local government and politics; looking at congressional, county and policy internships.",
  },
  {
    numeral: "III",
    title: "Hospitality, summer 2027",
    body: "Home in Fairfax July through September 2027 and also open to server, server assistant, host and food runner roles, evenings, weekends and doubles included. Years of working with the public, kids and big crowds.",
  },
] as const;

export type Role = { org: string; title: string; dates: string; where?: string; points: string[] };

export const EXPERIENCE: Role[] = [
  {
    org: "Utopia Models, Inc.",
    title: "Legal & Compliance Associate (part-time, remote)",
    dates: "November 2026 – Present",
    points: [
      "Supports contract review: reads client, vendor and service agreements and summarizes key terms, obligations and renewal dates",
      "Researches compliance requirements (business registration, privacy, consumer and employment rules) and writes short plain-language briefs",
      "Keeps the company’s legal filings calendar and a register of vendor terms and subscription agreements",
    ],
  },
  {
    org: "Fairfax County Public Schools, Student Advisory Council",
    title: "Student Representative, Chantilly High School",
    dates: "August 2025 – June 2026",
    where: "Fairfax, VA",
    points: [
      "Selected as 1 of 3 students to represent Chantilly High School’s student body of 3,000+ at the county level",
      "Researched student challenges in monthly council meetings and presented student concerns and policy feedback to school board representatives and the FCPS Superintendent, on policies affecting 181,000+ students",
    ],
  },
  {
    org: "Chantilly High School, Student Government Association",
    title: "Leadership Executive Board",
    dates: "August 2024 – June 2026",
    where: "Fairfax, VA",
    points: [
      "Led classes of 50+ students in planning and running school-wide events for a school of 3,000+",
      "Coordinated scheduling, budgets, supplies and volunteers with administrators and staff; advocated for students to the principal",
      "Recruited 70+ aspiring student leaders into the leadership program",
    ],
  },
  {
    org: "Encore Performers",
    title: "Social Media Marketing Manager",
    dates: "August 2024 – February 2026",
    where: "Nonprofit performing arts",
    points: [
      "Ran the nonprofit’s Instagram and four other platforms (6,480+ followers): 500,000+ interactions, 100,000+ viewers and six viral posts",
    ],
  },
  {
    org: "Encore Performers",
    title: "Teaching Assistant, Junior Demonstrator to Senior Teacher",
    dates: "Since June 2019",
    where: "Nonprofit performing arts",
    points: ["Taught 130+ students ages 3–14; led choreography and trained 60+ children into advanced classes"],
  },
];

export const LEADERSHIP: Role[] = [
  {
    org: "Kappa Alpha Pi, Pre-Law & Government Professional Fraternity",
    title: "Founding class, UC Santa Barbara chapter",
    dates: "September 2026 – Present",
    points: ["Weekly meetings, events with local legal professionals and organizations, community service"],
  },
  {
    org: "Kappa Kappa Gamma",
    title: "Active Member, UC Santa Barbara",
    dates: "October 2026 – Present",
    points: ["Chapter philanthropy supporting mental health and eating-disorder awareness"],
  },
  {
    org: "Encore Theatrical Arts Project",
    title: "Company Member",
    dates: "July 2022 – Present",
    points: [
      "One of 25 dancers in a selective company performing pre-Broadway community shows: 65 shows (33 sold out), about $45,000 raised per year, 1,000+ service hours",
    ],
  },
];

export const EDUCATION = [
  {
    school: "University of California, Santa Barbara",
    detail: "B.A. Political Science, expected June 2030",
    note: "Coursework: Intro to Comparative Government (POL S 6), Law in Everyday Life (RG ST 37)",
  },
  {
    school: "Northern Virginia Community College",
    detail: "Dual enrollment, 2023 – 2026 · GPA 4.0",
    note: "College Composition (ENG 111/112), Intermediate Spanish (SPA 201/202)",
  },
  {
    school: "Chantilly High School",
    detail: "Diploma, 2026 · GPA 4.0",
    note: "AP U.S. Government & Politics (4), AP U.S. History (5), AP World History (4)",
  },
] as const;

export const HONORS = [
  "AP Scholar with Distinction",
  "National Honor Society",
  "Spanish Honor Society",
  "Dance Honor Society",
  "1st Place, Chantilly High School Science Fair",
  "Georgetown University Pre-College Marketing Preparation Course (certificate)",
] as const;

export const LANGUAGES = "English; Spanish (intermediate, college level)";
export const SKILLS =
  "Legal and policy research, public speaking, writing, event planning, team leadership, social media";
export const INTERESTS = "Constitutional law, local government, politics";
