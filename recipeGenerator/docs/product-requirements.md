\#  Product Requirements Document (PRD) – Resume Tailor



\##  Objective

To develop an AI-powered Resume Tailor web application that allows users to input a job description and receive a customized version of their resume tailored to that job.



---



\##  Users

\- \*\*Job Seekers\*\*: Upload their resume and paste a job description to tailor their resume.

\- \*\*Admins (Optional Future Scope)\*\*: Monitor usage, moderate abuse, manage logs.



---



\##  Key Features

\-  Magic link login (email-based authentication using Supabase)

\-  Upload or paste resume text

\-  Input job description

\-  AI tailoring logic (via n8n or static logic for MVP)

\-  Save tailored resume version in Supabase

\-  View previous tailored resumes (History)

\-  Copy/download tailored resume

\-  Export tailored resume as .pdf or .txt



---



\##  Tech Stack

\- \*\*Frontend\*\*: Next.js, Tailwind CSS, ShadCN UI

\- \*\*Backend/Logic\*\*: n8n (for AI logic via OpenAI API)

\- \*\*Database\*\*: Supabase (Auth + Storage), MongoDB (optional for resume versions)

\- \*\*Deployment\*\*: Vercel



---



\##  MVP Scope

\- Auth via magic link (Supabase)

\- Paste resume and job description

\- Static AI logic: Replace keywords/phrases in resume based on job description

\- Save tailored result in Supabase

\- View/Edit history



---



\##  Stretch Goals (Post-MVP)

\- Real AI via n8n and OpenAI API

\- Resume analysis score

\- Feedback or improvement suggestions

\- Professional templates



---



\##  Success Criteria

\- User can log in via email magic link

\- Can submit a resume and job description

\- Gets a tailored resume output

\- Can view/download previous versions



