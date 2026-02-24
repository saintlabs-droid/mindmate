# MASINDE MULIRO UNIVERSITY OF SCIENCE AND TECHNOLOGY

## FACULTY OF INFORMATION TECHNOLOGY

### DEPARTMENT OF COMPUTING AND INFORMATION TECHNOLOGY

---

# MINDMATE: EMOTIONAL TRACKING AND REFLECTION PLATFORM FOR KENYAN UNIVERSITY STUDENTS

**A Project Proposal Submitted in Partial Fulfillment of the Requirements for the Degree of Bachelor of Science in Information Technology**

---

**BIT 420: Final Year Project**

**Group 5**

---

**Submitted by:**

| Name | Registration Number | Signature | Date |
|------|---------------------|-----------|------|
| PETER AWORI | SIT/B/01-02911/2022 | _________ | _________ |
| [Student 2 Name] | [Reg Number] | _________ | _________ |
| [Student 3 Name] | [Reg Number] | _________ | _________ |
| [Student 4 Name] | [Reg Number] | _________ | _________ |

---

**Supervised by:**

Academic Supervisor: _______________________ Date: _______

Industry Supervisor: _______________________ Date: _______

---

**Submission Date: February 24, 2026**

---

## DECLARATION

We, the undersigned, declare that this project proposal is our original work and has not been submitted to any other institution for examination. All sources of information have been duly acknowledged.

**Group Members:**

1. PETER AWORI (SIT/B/01-02911/2022) _________ _________
2. [Student 2] ([Reg Number]) _________ _________
3. [Student 3] ([Reg Number]) _________ _________
4. [Student 4] ([Reg Number]) _________ _________


**Supervisors' Approval:**

We certify that this project proposal has been submitted with our approval as university supervisors.

Academic Supervisor: _______________________ Signature: _________ Date: _______

Industry Supervisor: _______________________ Signature: _________ Date: _______

---

## TABLE OF CONTENTS

1. [Abstract](#abstract)
2. [Chapter 1: Introduction](#chapter-1-introduction)
   - 1.1 [Background](#11-background)
   - 1.2 [Statement of the Problem](#12-statement-of-the-problem)
   - 1.3 [Objectives](#13-objectives)
   - 1.4 [Significance of the Study](#14-significance-of-the-study)
3. [Chapter 2: Literature Review](#chapter-2-literature-review)
   - 2.1 [Mental Health in Kenyan Universities](#21-mental-health-in-kenyan-universities)
   - 2.2 [Why Existing Apps Don't Work for MMUST Students](#22-why-existing-apps-dont-work-for-mmust-students)
   - 2.3 [What Researchers Found About Digital Mental Health Tools](#23-what-researchers-found-about-digital-mental-health-tools)
   - 2.4 [Mood Tracking and Writing About Feelings](#24-mood-tracking-and-writing-about-feelings)
   - 2.5 [AI Chatbots for Mental Health](#25-ai-chatbots-for-mental-health)
   - 2.6 [Privacy and Data Protection](#26-privacy-and-data-protection)
4. [Chapter 3: Methodology](#chapter-3-methodology)
   - 3.1 [Requirements Analysis](#31-requirements-analysis)
   - 3.2 [System Design](#32-system-design)
   - 3.3 [How Data Flows Through the System](#33-how-data-flows-through-the-system)
   - 3.4 [Error Handling and What Can Go Wrong](#34-error-handling-and-what-can-go-wrong)
   - 3.5 [Development Tools and Environment](#35-development-tools-and-environment)
   - 3.6 [Development Process](#36-development-process)
   - 3.7 [Development Schedule](#37-development-schedule)
   - 3.8 [Development Budget](#38-development-budget)
5. [References](#references)
6. [Appendices](#appendices)

---

## ABSTRACT

Mental health problems among university students are common worldwide. The World Health Organization says 14% of young people aged 10-19 have mental health issues. In Kenya, the situation is worse - we have only 1 mental health doctor for every 500,000 people, and 30-40% of university students show signs of depression and anxiety.

MindMate is a web-based platform where Kenyan university students can track their moods and reflect on their feelings. The system supports Sustainable Development Goal 3 (Good Health and Well-being) by giving students an accessible, private way to monitor their mental health. It doesn't replace counseling - it helps students understand their emotions better and know when to seek help.

Students can log their daily mood (1-5 scale) with stress categories (Academics, Finances, Relationships, Family, Career), see mood patterns through charts, chat with an AI assistant for reflection, and find mental health resources. We built it using React (frontend), Django (backend), and PostgreSQL (database), focusing on privacy, simplicity, and reliability.

The proposal covers component interactions, failure scenarios, data flow through the system, and design choices for MMUST students with limited data bundles and money.

The platform uses free tools with a realistic budget of KES 3,500-6,500 (just for domain name and backup funds), making it sustainable and easy to copy for other Kenyan universities.

**Keywords**: Mental health, university students, mood tracking, Kenya, emotional well-being, AI chatbot, system design

---

## CHAPTER 1: INTRODUCTION

### 1.1 Background

University students face serious mental health challenges worldwide. The World Health Organization reports that 14% of young people aged 10-19 have mental health conditions, but most don't get help (WHO, 2021). Moving to university is stressful - new environment, academic pressure, money problems, social changes, and career worries all hit at once.

In Kenya, the mental health situation is bad. We have only 1 mental health doctor for every 500,000 people - the WHO recommends 1 for every 10,000 (Ndetei et al., 2016). Studies show 30-40% of Kenyan university students have depression and anxiety symptoms. The main causes are academic stress, money problems, and relationship issues (Othieno et al., 2014). Dr. Othieno's research at University of Nairobi found that 22% of students had depression.

Even though many students struggle, few get help. Why?

- **Stigma**: Students fear being judged. Mental health is seen as weakness or "madness" in many Kenyan communities.
- **Limited services**: MMUST has 2 counselors for 8,000 students. You wait 3 weeks for an appointment.
- **Lack of awareness**: Many students don't know counseling services exist or how to access them.
- **Cost**: Private therapy costs KES 2,000-5,000 per session - impossible for most students.
- **Cultural barriers**: Talking about feelings is discouraged. "Be strong" and "pray about it" are common responses.

Digital mental health tools offer a solution. Studies of internet-based talking therapy programs show they work as well as face-to-face therapy for depression and anxiety (Andersson et al., 2014). Digital tools have advantages:

- **Always available**: Use them anytime, anywhere
- **Private**: No one knows you're using them
- **Scalable**: Can help thousands of students at once
- **Affordable**: Much cheaper than traditional therapy

MindMate addresses these problems by giving Kenyan university students a tool to:

- **Track emotions**: Log daily mood and identify what's causing stress
- **See patterns**: View mood trends over time through charts
- **Reflect**: Chat with an AI assistant that asks helpful questions
- **Find help**: Access campus counseling contacts, national hotlines, and online resources
- **Stay private**: Use the platform without anyone knowing

We designed MindMate specifically for MMUST students, considering:
- Cultural attitudes about mental health in Kenya
- Local support resources (MMUST counseling, Kenya helplines)
- Limited data bundles (500MB monthly is common)
- Low budgets (HELB delays, family financial pressure)
- Need to complement, not replace, professional counseling

### 1.2 Statement of the Problem

MMUST students face serious mental health challenges, but can't get the help they need. Here's what's actually happening on campus:

**Real Student Scenarios:**

1. **A third-year Computer Science student sleeps hungry because HELB delayed 4 months.** She's stressed about rent (KES 3,000 due), can't concentrate in class, and her grades are dropping. She knows she's depressed but the counseling office has a 3-week waiting list.

2. **A second-year student fails exams because his family keeps calling asking for money.** His father is sick, his sister needs school fees, and he's supposed to send KES 5,000 home monthly. He can't focus on studies. He won't talk to friends because "men don't cry" and he fears gossip.

3. **A final-year student has panic attacks before presentations.** She wants to see a counselor but the office is only open 9 AM - 4 PM when she has classes. She tried calling the Kenya helpline (1199) but it was busy. She downloaded Headspace app but it costs $13/month (KES 1,950) - she can't afford it.

4. **A first-year student from a village feels isolated and homesick.** He doesn't fit in, struggles with English, and spends nights crying. He's too ashamed to tell anyone. He doesn't know MMUST has counseling services.

**The Specific Problems:**

1. **Insufficient counselors**: MMUST has 2 counselors for 8,000 students. That's 1 counselor per 4,000 students. Even if you want help, you wait weeks.

2. **Stigma kills help-seeking**: Students fear being labeled "crazy" or "weak". Word spreads fast on campus. Many would rather suffer silently than risk gossip.

3. **No self-monitoring tools**: Students don't realize they're depressed until it's serious. They have no way to track their moods, identify patterns, or recognize warning signs.

4. **Limited campus resources**: Counseling office hours don't match student schedules. No after-hours support. No online booking system. Many students don't even know where the office is.

5. **Money problems**: Commercial mental health apps cost KES 750-1,950 monthly. Private therapy costs KES 2,000-5,000 per session. Students living on KES 5,000-10,000 monthly can't afford this.

6. **Existing apps don't fit Kenyan context**: They have American helplines (911), cost money, require heavy downloads (50MB+), and don't understand Kenyan student problems (HELB delays, family pressure to send money home, tribal tensions, etc.).

7. **Data bundle constraints**: Students use 500MB-1GB bundles monthly. Heavy apps (50MB download, video content) don't work. They need lightweight solutions.

**What's Needed:**

A free, lightweight, private tool where MMUST students can track their moods, understand their patterns, and find local help resources. It should work on 500MB bundles, cost nothing, protect privacy, and connect students to MMUST counseling and Kenyan helplines - not American resources.

### 1.3 Objectives

The main goal is to build a working web-based mood tracking platform for MMUST students. Here are the specific, measurable objectives:

**1. Build a mood logging system**

What it does: Students select mood (1-5), pick stress category (Academics, Finances, Relationships, Family, Career), add optional note (max 500 characters).

How it works: When student clicks "Save Mood", React form validates mood is 1-5 and category is selected. If valid, React sends POST request to Django API at /api/moods/. Django checks JWT token to confirm user identity, validates data again, then saves to PostgreSQL. Database insert takes under 100 milliseconds.

Success measured by:
- Form submits without errors
- Data appears in PostgreSQL database
- Student sees "Mood saved!" message within 2 seconds
- If internet cuts during save, form shows "Reconnecting..." and retries 3 times

**2. Create mood visualization features**

What it does: Display 7-day mood trend line chart, stress category breakdown bar chart, average mood calculation, pattern identification.

How it works: When student visits Insights page, React sends GET request to /api/moods/insights?days=7. Django queries PostgreSQL: `SELECT mood_level, stress_category, created_at FROM mood_entries WHERE user_id = {user_id} AND created_at >= NOW() - INTERVAL '7 days' ORDER BY created_at`. PostgreSQL uses index on user_id column so query runs in under 50 milliseconds even with 100,000 total entries. Django calculates average, groups by category, returns JSON. React passes data to Chart.js which draws graphs using HTML Canvas.

Success measured by:
- Charts load within 3 seconds
- Data matches database records (verified by manual check)
- Charts update when student changes time period (7/30/90 days)
- If no data exists, shows "No mood entries yet. Log your first mood!"

**3. Implement AI reflection assistant**

What it does: Chat interface where students type messages and get supportive responses. AI asks questions based on mood patterns.

How it works: Student types message in chat box, clicks Send. React sends POST to /api/chat/ with message text and last 10 messages for context. Django calls Gemini API (Google's free tier) with prompt: "You are a supportive mental health assistant for Kenyan university students. User said: {message}. Their recent moods show {pattern}. Respond with empathy and ask a helpful question." API returns response in 2-5 seconds. Django saves both user message and AI response to PostgreSQL, returns AI response to React. React displays it in chat bubble.

Success measured by:
- Response appears within 5 seconds
- AI mentions student's actual stress category (e.g., "I see you've been stressed about finances")
- If Gemini API is down, system shows "AI assistant is temporarily unavailable. Try again later" instead of crashing
- Conversation history persists (student can leave and come back, messages are still there)

**4. Build support resources directory**

What it does: List of mental health resources with contact info - MMUST counseling office, Kenya helplines (1199, 0800 720 990), online resources, emergency contacts.

How it works: Resources stored in PostgreSQL table with columns: name, category, phone, email, website, address, description. When student visits Resources page, React sends GET to /api/resources/. Django queries: `SELECT * FROM resources ORDER BY category, name`. Returns JSON array. React groups by category and displays as cards. Student can click phone number to call directly (tel: link), click email to send message (mailto: link), click website to open in new tab.

Success measured by:
- All resources display correctly
- Phone links work on mobile (clicking calls the number)
- Search box filters resources in real-time (type "MMUST" shows only MMUST counseling)
- "Crisis Mode" button at top shows emergency contacts immediately

**5. Ensure data privacy and security**

What it does: Protect student data so no one else can see it. Encrypt passwords. Isolate user data.

How it works:
- Registration: Student enters password, Django hashes it with bcrypt (12 rounds, automatic salt). Hash stored in database, never plain password.
- Login: Student enters password, Django hashes it and compares to stored hash. If match, generates JWT token with payload: {user_id: 123, exp: 24 hours}. Token signed with SECRET_KEY from environment variable.
- API requests: React includes token in header: `Authorization: Bearer {token}`. Django verifies signature using SECRET_KEY. If valid, extracts user_id from payload.
- Data isolation: Every database query filters by user_id. Example: `SELECT * FROM mood_entries WHERE user_id = {token_user_id}`. Student A with user_id=1 can NEVER see student B's data (user_id=2) because query filters by token user_id.
- HTTPS: All communication encrypted in transit. Render provides free SSL certificate.

Success measured by:
- Password "password123" stored as "$2b$12$KIXxLV..." (bcrypt hash) in database
- Student A cannot access Student B's moods (returns 403 Forbidden if they try to manipulate API)
- Token expires after 24 hours (student must login again)
- If someone steals database backup, they can't read passwords (bcrypt hashes are one-way)

**6. Design for cultural appropriateness**

What it does: Use language, images, and resources that make sense for Kenyan students.

How it works:
- Language: Simple English (no medical jargon). "Feeling down" not "experiencing depressive symptoms".
- Resources: Kenya helplines (1199), MMUST counseling, not American 911 or UK Samaritans.
- AI prompts: Understand Kenyan context. "I know HELB delays are stressful" not "Have you considered student loans?"
- Colors: Calm blues and greens, not aggressive reds.
- Images: African faces, Kenyan university settings, not stock photos of white Americans.

Success measured by:
- User testing with 10 MMUST students - 8/10 say "This feels like it's for me"
- Resources page has 0 international helplines, 100% Kenyan contacts
- AI never suggests solutions that cost money ("Try therapy" → "Talk to MMUST counseling - it's free")

**7. Demonstrate system engineering principles**

What it does: Document component interactions, failure handling, data flow, performance optimization, and user feedback mechanisms.

How it works: Document in this proposal:
- Component interactions: How React talks to Django, how Django talks to PostgreSQL, what happens at each step
- Failure handling: What happens when internet cuts, database is down, API is slow, user enters bad data
- Data flow: Trace a mood entry from button click → React → Django → PostgreSQL → back to React → displayed on screen
- Performance: Why we use indexes, how we optimize queries, why we chose PostgreSQL over MongoDB
- User feedback: How system tells user what's happening (loading spinners, success messages, error messages)

Success measured by:
- Sequence diagrams show exact API calls and database queries
- Error handling section lists 10+ failure scenarios and solutions
- Data flow section traces 3 complete user journeys with technical details

**8. Implement AI safety safeguards**

What it does: Detect crisis situations (suicide, self-harm) and immediately display emergency helplines without relying on AI responses, ensuring student safety is prioritized over AI functionality.

How it works:
- Before sending message to Gemini API, Django scans for crisis keywords
- Keywords: "suicide", "kill myself", "hurt myself", "end my life", "want to die", "no reason to live"
- If keyword detected, Django returns pre-written crisis response immediately (no AI delay)
- Response includes MMUST Counseling Office, Kenya National Crisis Hotline (1190), Befrienders Kenya (+254-722-178177)
- Message is logged for monitoring (anonymized)
- AI is bypassed completely in crisis situations

Success measured by:
- Test with phrases "I want to kill myself", "thinking about suicide" triggers crisis response
- Crisis response appears within 1 second (no AI delay)
- Correct helpline numbers are displayed
- Incident is logged with timestamp and keyword detected
- AI is NOT called when crisis keyword is detected

**9. Deploy a functional prototype**

What it does: Put the system online so people can actually use it.

How it works:
- Frontend: React app built with `npm run build`, creates static files (HTML, CSS, JS). Deployed to Render static site (free tier). Render serves files from CDN, loads fast globally.
- Backend: Django app deployed to Render web service (free tier). Render runs `gunicorn` server, handles API requests. Free tier gives 750 hours/month. App sleeps after 15 minutes idle, wakes up when request comes (takes 30 seconds to wake).
- Database: PostgreSQL on Render (free tier, 1GB storage). Persistent, doesn't sleep.
- Domain: Buy mindmate.co.ke from KeNIC (KES 3,500/year) or use free Render subdomain (mindmate.onrender.com).

Success measured by:
- Website loads at mindmate.onrender.com (or mindmate.co.ke if we buy domain)
- Students can register, login, log moods, see charts, chat with AI, view resources
- System handles 50 concurrent users without crashing (tested with Apache Bench)
- Uptime is 95%+ during business hours (8 AM - 10 PM EAT)
- Total cost is KES 0-3,500 (free tier + optional domain)

### 1.4 Significance of the Study

This project matters for several reasons:

**1. Supports Sustainable Development Goals**

MindMate directly supports SDG 3 (Good Health and Well-being), specifically target 3.4 which aims to promote mental health. By giving students a free tool to monitor their mental health, we contribute to reducing mental health problems among young people.

**2. Complements existing counseling services**

We're not replacing MMUST's 2 counselors - we're helping them. MindMate does early detection and self-monitoring. When students need professional help, the app directs them to MMUST counseling. This way, counselors see students who really need help, not students who just need to talk.

**3. Reduces stigma**

Students can track moods privately without anyone knowing. No judgment, no gossip. This makes it easier to acknowledge mental health struggles. Once students understand their patterns through the app, they're more likely to seek professional help.

**4. Increases self-awareness**

Many students don't realize they're depressed until it's serious. Daily mood tracking helps them notice patterns: "I'm always stressed on Mondays before CATs" or "My mood drops every time my family calls asking for money". This awareness is the first step to managing mental health.

**5. Scalable and replicable**

We're using free tools (React, Django, PostgreSQL, Render free tier). Total cost is KES 0-3,500. Other Kenyan universities can copy this model easily. Imagine if Maseno University, Moi University, Kenyatta University all had similar platforms - thousands of students helped.

**6. Advances digital health in Kenya**

Kenya is growing in tech. This project shows how technology can solve healthcare problems in resource-limited settings. It's a model for other digital health initiatives.

**7. Teaches us real engineering**

We're learning system design, API development, database optimization, deployment, security, user experience design. These skills prepare us for careers in software engineering and health tech.

**8. Addresses real MMUST problems**

This isn't a theoretical project. We're solving actual problems our fellow students face. The impact is immediate and measurable.

---

## CHAPTER 2: LITERATURE REVIEW

### 2.1 Mental Health in Kenyan Universities

Studies show mental health problems are common among Kenyan university students, but few get help.

**Dr. Othieno's 2014 Study at University of Nairobi:**
- Surveyed 506 students using PHQ-9 depression screening tool
- Found 22% had depression (110 students)
- Main causes: academic stress (68%), money problems (54%), relationship issues (41%)
- Only 15% of depressed students visited counseling services
**Barriers: stigma (73%), didn't know services existed (45%), long waiting times (38%)**

**Dr. Ndetei's 2016 Research on Kenya's Mental Health System:**
- Kenya has 1 mental health doctor per 500,000 people
- WHO recommends 1 per 10,000 people
- We're 50 times below the recommended level
- Most mental health doctors are in Nairobi - rural areas have almost none
- University counseling centers are overwhelmed

**Atwoli's 2017 Study on Stigma in Kenya:**
- Interviewed 200 university students about mental health attitudes
- 84% said they would hide mental health problems from friends
- 67% said "mental illness is a sign of weakness"
- 52% said "people with depression should just pray more"
- Stigma is the biggest barrier to help-seeking

### 2.2 Why Existing Apps Don't Work for MMUST Students

Many mental health apps exist, but they don't work for Kenyan university students. Here's why:

**Daylio - Mood Tracking App**
- Cost: $5/month (KES 750) for premium features
- Problem: MMUST students live on KES 5,000-10,000/month. KES 750 for an app is too much.
- Download size: 25MB
- Problem: Students with 500MB bundles can't afford 25MB downloads
- Resources: Generic mental health tips, no Kenyan helplines
- Problem: Doesn't connect to MMUST counseling or Kenya helplines (1199)
- Solution: FREE, lightweight (under 5MB), has MMUST counseling contact

**Moodpath - Depression Screening App**
- Cost: Free basic, $10/month (KES 1,500) for therapy features
- Problem: Therapy features are expensive
- Download size: 50MB
- Problem: Too heavy for limited data bundles
- Language: Medical terminology ("PHQ-9 score", "cognitive distortions")
- Problem: Confusing for students without psychology background
- Resources: German and American therapists
- Problem: Not relevant for Kenyan students
- Solution: Simple language, Kenyan resources, lightweight

**Sanvello - Anxiety and Depression App**
- Cost: $9/month (KES 1,350) for premium
- Problem: Too expensive
- Resources: American crisis hotlines (988, 911)
- Problem: These numbers don't work in Kenya
- Content: American health insurance information
- Problem: Kenya doesn't have this system
- Cultural context: Assumes Western therapy culture
- Problem: Doesn't understand Kenyan stigma, family dynamics, HELB delays
- Our solution: Kenya helplines (1199, 0800 720 990), understands Kenyan student life

**Wysa - AI Chatbot for Mental Health**
- Cost: Free basic, $15/month (KES 2,250) for human coaching
- Problem: Coaching is too expensive
- Good points: AI chatbot works well, private, available 24/7
- Problem: No Kenyan university counseling contacts
- Cultural context: Doesn't understand Kenyan stigma, family dynamics, HELB delays
- Solution: AI chatbot PLUS MMUST counseling contacts, understands Kenyan context

**Headspace - Meditation and Mindfulness App**
- Cost: $13/month (KES 1,950) or $70/year (KES 10,500)
- Problem: Way too expensive for students
- Download size: 100MB+ with video content
- Problem: Impossible on 500MB bundles
- Content: Video meditations, animations
- Problem: Videos use too much data
- Cultural context: Western mindfulness approach
- Problem: Doesn't resonate with Kenyan students
- Solution: Text-based (no videos), free, culturally appropriate

**Comparison Table:**

| Feature | Daylio | Moodpath | Sanvello | Wysa | Headspace | MindMate |
|---------|--------|----------|----------|------|-----------|----------|
| Free | No | Partial | No | Partial | No | Yes |
| Lightweight (<5MB) | No | No | No | Yes | No | Yes |
| Kenyan helplines | No | No | No | No | No | Yes |
| University counseling contacts | No | No | No | No | No | Yes |
| Understands Kenyan student life | No | No | No | No | No | Yes |
| Simple language | Yes | No | No | Yes | Yes | Yes |
| Works on 500MB bundles | No | No | No | Yes | No | Yes |

MindMate addresses the gaps: Free, lightweight, Kenyan resources, and designed for MMUST student needs.

### 2.3 What Researchers Found About Digital Mental Health Tools

**Andersson et al. 2014 - Internet-Based Talking Therapy Works**
- Analyzed 92 studies with 10,000+ participants
- Compared internet-based talking therapy to face-to-face therapy
- Key finding: Internet therapy works just as well as in-person therapy for depression and anxiety
- Effect size: d=0.78 (medium to large effect)
- Guided programs (with therapist support) work better than self-help alone
- Application: Digital tools can actually help, not just distract. The AI assistant provides guidance similar to therapist prompts.

**Lattie et al. 2019 - Comparing Mood Tracking Apps**
- Tested Moodpath, Sanvello, and Wysa with 300 university students
- Students used apps for 8 weeks
- Measured anxiety (GAD-7) and depression (PHQ-9) before and after
- Results: 
  - Moodpath: 28% reduction in anxiety symptoms
  - Sanvello: 32% reduction in anxiety symptoms
  - Wysa: 30% reduction in anxiety symptoms
  - Control group (no app): 8% reduction
- Key finding: Just tracking moods and reflecting reduces anxiety by 30%
- Application: Mood tracking alone helps, even without therapy. Visualization features help students see patterns.

**Torous et al. 2018 - Privacy Problems in Mental Health Apps**
- Analyzed 211 mental health apps on Google Play and Apple App Store
- Checked privacy policies and data practices
- Found:
  - 81% share data with third parties (advertisers, analytics companies)
  - 64% don't encrypt data
  - 29% don't have privacy policies at all
  - Only 3% are HIPAA compliant (US health privacy law)
- Key finding: Most mental health apps don't protect user privacy
- Application: Privacy is critical. The platform doesn't share data with anyone, encrypts everything, and lets users delete their data anytime.

**Pennebaker 1997 - Writing About Feelings Helps**
- Classic study on expressive writing
- Asked students to write about traumatic experiences for 15 minutes daily for 4 days
- Measured health outcomes 6 months later
- Results:
  - Writing group: 50% fewer doctor visits, better immune function, better grades
  - Control group: No change
- Key finding: Writing about emotions helps process them and improves mental and physical health
- Application: The optional note field in mood logging isn't just extra - it's therapeutic. Encouraging students to write about their feelings helps them process emotions.

**De Choudhury et al. 2013 - AI Can Detect Depression from Text**
- Analyzed 500,000 Twitter posts from 200 users
- Used machine learning to detect depression indicators
- Accuracy: 70% (could identify depressed users from their writing)
- Depression indicators: negative words, first-person pronouns ("I", "me"), past tense, health mentions
- Key finding: AI can understand emotional state from text
- Application: The AI assistant can analyze student messages for concerning patterns and suggest professional help when needed.

### 2.4 Mood Tracking and Writing About Feelings

**Why Mood Tracking Works:**

Research shows that tracking your mood daily helps you:
1. **Notice patterns**: "I'm always stressed on Mondays" or "My mood drops when my family calls"
2. **Identify triggers**: "Exams make me anxious" or "Money problems cause depression"
3. **Recognize progress**: "I was sad for 5 days last month, only 2 days this month"
4. **Communicate with counselors**: Show your mood chart to a counselor - it's easier than explaining

**The Science:**

When you track your mood, you're doing "self-monitoring" - a technique used in talking therapy. It works because:
- You become aware of your emotions (many people don't notice they're depressed until it's serious)
- You see connections between events and moods (exam stress → low mood)
- You feel more in control (tracking = taking action)

**Why Writing Helps:**

Pennebaker's research (1997) showed that writing about feelings for just 15 minutes improves mental health. Why?
- **Processing**: Writing forces you to organize chaotic thoughts
- **Distance**: Seeing feelings on screen creates psychological distance - you can analyze them objectively
- **Release**: Getting feelings out reduces their power over you

**What MindMate Does:**

Our mood logging has two parts:
1. **Structured tracking**: Select mood 1-5, pick category (Academics, Finances, etc.)
2. **Optional writing**: Add a note about what happened

The structured part gives data for charts. The writing part gives therapeutic benefit. Together, they help students understand and manage their emotions.

### 2.5 AI Chatbots for Mental Health

**How AI Chatbots Work:**

AI chatbots use Natural Language Processing (NLP) to understand text and generate responses. For mental health:
1. Student types message: "I'm stressed about exams"
2. AI analyzes sentiment: Detects negative emotion, stress keyword
3. AI checks context: Looks at recent mood entries (student logged mood=2, category=Academics)
4. AI generates response: "I see you've been stressed about academics. What specific part of exam prep feels most overwhelming?"

**Evidence That AI Chatbots Help:**

- Fitzpatrick et al. 2017: Tested Woebot (AI chatbot) with 70 college students. After 2 weeks, depression symptoms reduced by 22%.
- Inkster et al. 2018: Tested Wysa with 129 users. Anxiety reduced by 28% after 4 weeks.
- Key finding: AI chatbots work for mild to moderate symptoms. They don't replace therapists, but they help between therapy sessions.

**Why AI Chatbots Work for Students:**

1. **Always available**: 3 AM panic attack? AI is there. Counseling office is closed.
2. **No judgment**: AI doesn't gossip. Students feel safe sharing.
3. **Immediate response**: No waiting weeks for appointment.
4. **Scalable**: One AI can help thousands of students simultaneously.

**Limitations of AI:**

- Can't handle serious mental health crises (suicidal thoughts)
- Can't replace human empathy and understanding
- Can make mistakes or give inappropriate responses
- Needs human oversight

**MindMate's AI Assistant:**

Our AI assistant:
- Provides supportive responses and reflection prompts
- Analyzes mood patterns and asks relevant questions
- Suggests coping strategies
- **BUT** when it detects serious problems (suicidal thoughts, severe depression), it says: "I'm concerned about you. Please contact MMUST counseling immediately: [phone number]"

The AI is a tool, not a therapist. For serious problems, students need to talk to a human.

### 2.6 Privacy and Data Protection

**Why Privacy Matters in Mental Health Apps:**

Mental health data is extremely sensitive. If someone's mood logs leaked:
- Employers could discriminate ("Don't hire them, they're depressed")
- Insurance companies could deny coverage
- Family could judge or pressure them
- Friends could gossip and stigmatize them

Torous et al. (2018) found that 81% of mental health apps share data with third parties. This is dangerous.

**Privacy Principles We Follow:**

**1. Data Minimization**
- Collect only what's necessary
- We ask for: email, password
- We DON'T ask for: name, phone number, ID number, location, contacts

**2. User Control**
- Students can export their data anytime (JSON or CSV format)
- Students can delete their account and all data anytime
- Deletion is permanent - we don't keep backups of deleted accounts

**3. No Third-Party Sharing**
- We NEVER share data with advertisers, analytics companies, or anyone
- We don't use Google Analytics, Facebook Pixel, or tracking tools
- We don't sell data (we're not a business, we're a student project)

**4. Encryption**
- Passwords: Hashed with bcrypt (one-way encryption, can't be reversed)
- Communication: HTTPS encrypts all data in transit
- Database: Hosted on Render with encryption at rest

**5. Transparency**
- Clear privacy policy explaining what we collect and why
- No hidden data collection
- Open source code (anyone can verify we're not doing shady things)

**Legal Considerations:**

Kenya's Data Protection Act (2019) requires:
- Consent before collecting data (registration form has consent checkbox)
- Right to access data (export feature)
- Right to deletion (delete account feature)
- Data security measures (encryption, access controls)
- No unnecessary data collection (we only collect email and password)

**Privacy Implementation:**

Students can trust the platform because:
- Minimal data collection
- Everything encrypted
- No sharing with third parties
- Students control their data
- Complies with Kenyan law

Privacy is core to the design.

---

## CHAPTER 3: METHODOLOGY

### 3.1 Requirements Analysis

**What Students Need:**

We talked to 20 MMUST students about mental health and technology. Here's what they said:

**Must-Have Features:**
1. "I want to track my mood daily - something simple, not complicated" → Mood logging with 1-5 scale
2. "I want to see if I'm getting better or worse" → Charts showing mood trends
3. "I want to know why I'm stressed" → Stress categories (Academics, Finances, etc.)
4. "I want someone to talk to, but I'm scared of judgment" → AI chatbot (private, no judgment)
5. "I don't know where to get help" → Resources directory with MMUST counseling, Kenya helplines
6. "I can't afford expensive apps" → Free platform
7. "My data bundle is 500MB" → Lightweight, no videos or heavy downloads
8. "I don't want anyone to know I'm using this" → Privacy, no social features, no sharing

**Nice-to-Have Features:**
1. "Reminders to log my mood" → Daily notification (optional)
2. "Export my data to show my counselor" → Export to CSV
3. "See my most common stress sources" → Stress category breakdown chart

**Won't Have (Out of Scope):**
1. "Connect with other students" → No social features (privacy risk, gossip risk)
2. "Video calls with counselors" → Too complex, too expensive, MMUST counseling handles this
3. "Medication reminders" → We're not medical professionals, liability risk
4. "Diagnosis" → Only professionals can diagnose, we just track moods

**Functional Requirements:**

**FR1: User Registration and Login**
- Student enters email and password
- System checks email format is valid (contains @)
- System checks password is at least 8 characters
- System hashes password with bcrypt
- System saves user to database
- System generates JWT token (expires in 24 hours)
- Student can login with email and password
- System verifies password hash matches
- System returns JWT token

**FR2: Mood Logging**
- Student selects mood 1-5 (😢 😟 😐 🙂 😊)
- Student selects stress category (Academics, Finances, Relationships, Family, Career)
- Student optionally adds note (max 500 characters)
- System validates mood is 1-5
- System validates category is selected
- System saves mood entry to database with timestamp
- System allows only 1 mood entry per day (if student tries to log twice, system updates existing entry)

**FR3: Mood History**
- Student sees list of past mood entries (newest first)
- Each entry shows: date, mood emoji, category, note preview
- Student can click entry to see full details
- Student can edit or delete entries
- Student can filter by date range (last 7 days, last 30 days, custom)
- Student can filter by category

**FR4: Mood Insights**
- System shows 7-day mood trend line chart (x-axis: dates, y-axis: mood 1-5)
- System shows stress category breakdown bar chart (x-axis: categories, y-axis: count)
- System calculates average mood for selected period
- System identifies patterns: "Your mood is lowest on Mondays" or "You're stressed about finances 60% of the time"
- Student can change time period (7 days, 30 days, 90 days)

**FR5: AI Chat**
- Student types message in chat box
- System sends message to Gemini AI with context (recent mood entries, stress categories)
- AI responds within 5 seconds
- System saves conversation history
- Student can see past conversations
- If AI detects crisis keywords ("suicide", "kill myself"), system shows: "Please contact MMUST counseling immediately: 0712345678"

**FR6: Resources Directory**
- System shows list of mental health resources
- Categories: Campus Counseling, National Helplines, Online Resources, Emergency
- Each resource shows: name, phone, email, website, address, description
- Student can search resources
- Student can click phone to call, click email to send message, click website to open
- "Crisis Mode" button at top shows emergency contacts immediately

**FR7: User Profile**
- Student can view profile (email, account created date, total mood entries)
- Student can change password
- Student can export data (JSON or CSV)
- Student can delete account (with confirmation: "Are you sure? This cannot be undone")

**Non-Functional Requirements:**

**NFR1: Performance**
- Pages load within 3 seconds on 3G connection
- API responds within 500 milliseconds
- Charts render within 2 seconds
- System handles 100 concurrent users without slowing down

**NFR2: Security**
- All passwords hashed with bcrypt
- All communication over HTTPS
- JWT tokens expire after 24 hours
- User data isolated (Student A cannot see Student B's data)
- Protection against SQL injection, XSS, CSRF attacks

**NFR3: Usability**
- Simple interface, no training needed
- Clear error messages ("Password must be at least 8 characters")
- Loading indicators (spinner when saving mood)
- Success messages ("Mood saved successfully!")
- Mobile-friendly (works on phones, tablets, laptops)

**NFR4: Reliability**
- 95% uptime during business hours (8 AM - 10 PM EAT)
- Graceful error handling (if database is down, show "Service temporarily unavailable" not crash)
- Automatic retry for failed operations (if API call fails, retry 3 times)

**NFR5: Maintainability**
- Clean code with comments
- Version control with Git
- Clear commit messages
- Modular architecture (easy to add features later)

### 3.2 System Design

**Architecture Overview:**

MindMate uses a three-tier architecture:

**Layer 1: Frontend (React) - Runs in Student's Browser**
- UI Components (buttons, forms, charts)
- State Management (stores user data temporarily)
- API Client (sends requests to backend)
- Size: ~2MB (HTML, CSS, JavaScript)
- Hosted: Render Static Site (free tier)

**Communication Layer:**
- HTTPS (encrypted)
- JSON data format
- JWT token in header

**Layer 2: Backend (Django) - Runs on Render Server**
- Authentication (login, register, JWT tokens)
- Mood Service (create, read, update, delete moods)
- Insights Service (calculate averages, patterns)
- AI Service (chat, sentiment analysis)
- Resources Service (list resources, search)
- Language: Python 3.11
- Framework: Django 4.2 + Django REST Framework
- Hosted: Render Web Service (free tier, 750 hours/month)

**Database Layer:**
- SQL queries
- Connection pooling

**Layer 3: Database (PostgreSQL) - Runs on Render Server**
- Tables: users (id, email, password_hash, created_at)
- Tables: mood_entries (id, user_id, mood, category, note, date)
- Tables: chat_messages (id, user_id, message, sender, timestamp)
- Tables: resources (id, name, category, phone, email, website)
- Storage: 1GB (free tier)
- Hosted: Render PostgreSQL (free tier)

**Why This Architecture?**

1. **Separation of Concerns**: Frontend handles display, backend handles logic, database handles storage. Each layer has one job.

2. **Scalability**: If we get 1,000 users, we can upgrade backend to paid tier without changing code. Each layer scales independently.

3. **Security**: Frontend can't access database directly. All requests go through backend which checks JWT token and filters by user_id.

4. **Maintainability**: If we want to add a mobile app later, we just build new frontend. Backend and database stay the same.

**Technology Choices:**

**Frontend: React**
- Why: Component-based (reusable UI pieces), fast rendering, large community (easy to find help)
- Alternatives considered: Vue.js (simpler but smaller community), vanilla JavaScript (too much code)
- Libraries: Chart.js (for graphs), Axios (for API calls), React Router (for navigation)

**Backend: Django**
- Why: Python is easy to learn, Django has built-in authentication, Django REST Framework makes APIs simple
- Alternatives considered: Flask (too minimal, we'd have to build everything), Node.js (JavaScript on backend is confusing)
- Libraries: djangorestframework (API), djangorestframework-simplejwt (JWT tokens), psycopg2 (PostgreSQL connection)

**Database: PostgreSQL**
- Why: Reliable, supports complex queries, free tier available, good for structured data
- Alternatives considered: MongoDB (NoSQL is overkill for our simple data), SQLite (doesn't work on Render free tier), MySQL (PostgreSQL is better)

**Hosting: Render**
- Why: Free tier, easy deployment, automatic HTTPS, supports Django and PostgreSQL
- Alternatives considered: Heroku (no longer has free tier), AWS (too complex), DigitalOcean (costs money)

#### 3.2.2 User Flow Diagrams

**Note:** Generate diagram images from the mermaid code using https://mermaid.live/ and save them in the images/ folder before converting to Word/PDF.

The following sequence diagrams illustrate the main user interactions with the MindMate platform:

**Flow 1: User Registration and Onboarding**

![User Registration Flow](images/flow1-registration.png)

*Figure 1: User Registration and Onboarding Sequence*

**Flow 2: Mood Logging**

![Mood Logging Flow](images/flow2-mood-logging.png)

*Figure 2: Mood Logging Sequence*

**Flow 3: Viewing Insights and Patterns**

![Viewing Insights Flow](images/flow3-insights.png)

*Figure 3: Viewing Insights and Patterns Sequence*

**Flow 4: AI-Guided Reflection**

![AI Chat Flow](images/flow4-ai-chat.png)

*Figure 4: AI-Guided Reflection Sequence*

**3.3.1 Database Schema (Entity Relationship Diagram)**

The database has 5 main tables with relationships:

**Users Table**
- id (Primary Key, UUID)
- email (Unique, required)
- password_hash (bcrypt hashed, never plain text)
- date_joined (timestamp)
- last_login (timestamp)

**MoodEntries Table**
- id (Primary Key, UUID)
- user_id (Foreign Key → Users.id, CASCADE DELETE)
- mood_level (Integer, 1-5, required)
- stress_category (Text, one of: Academics, Finances, Relationships, Family, Career)
- note (Text, max 500 characters, optional)
- timestamp (Auto-generated)
- INDEX on (user_id, timestamp) for fast queries

**ChatMessages Table**
- id (Primary Key, UUID)
- user_id (Foreign Key → Users.id, CASCADE DELETE)
- sender (Text, either "user" or "ai")
- content (Text, required)
- sentiment_score (Float, -1.0 to 1.0, nullable)
- timestamp (Auto-generated)
- INDEX on (user_id, timestamp)

**ReflectionPrompts Table**
- id (Primary Key, UUID)
- user_id (Foreign Key → Users.id, CASCADE DELETE)
- mood_entry_id (Foreign Key → MoodEntries.id, CASCADE DELETE)
- prompt_text (Text, generated by AI)
- is_answered (Boolean, default False)
- created_at (timestamp)

**SupportResources Table**
- id (Primary Key, UUID)
- name (Text, required)
- resource_type (Text, one of: campus, national, hotline, online)
- description (Text)
- phone (Text, optional)
- email (Text, optional)
- website (Text, optional)
- availability (Text, e.g., "24/7", "Mon-Fri 9am-5pm")

**Relationships:**
- One User has many MoodEntries (1:N)
- One User has many ChatMessages (1:N)
- One User has many ReflectionPrompts (1:N)
- One MoodEntry has one ReflectionPrompt (1:1)
- SupportResources is independent (no foreign keys)

**Data Integrity:**
- CASCADE DELETE: When user deletes account, all their moods, chats, and prompts are deleted
- Foreign Key constraints prevent orphaned records
- Indexes on user_id and timestamp make queries fast even with 100,000+ records

### 3.3 How Data Flows Through the System

When a student logs their mood, the following happens:

**Scenario: Student Logs Mood**

**Step 1: Student Clicks "Log Mood" Button**
- Location: Browser (React app)
- What happens: React Router navigates to /log-mood page
- Time: Instant (no network call)

**Step 2: React Displays Mood Form**
- Location: Browser
- What happens: React renders MoodForm component with:
  - 5 emoji buttons (😢 😟 😐 🙂 😊)
  - Dropdown for category (Academics, Finances, Relationships, Family, Career)
  - Text area for optional note
- Time: Instant

**Step 3: Student Fills Form**
- Student clicks 😟 (mood = 2)
- Student selects "Finances" from dropdown
- Student types note: "HELB delayed again, can't pay rent"
- Location: Browser (data stored in React state, not sent yet)

**Step 4: Student Clicks "Save Mood"**
- Location: Browser
- What happens: React validates input
  - Check mood is 1-5
  - Check category is selected
  - Check note is under 500 characters
- If validation fails: Show error message, don't send to backend
- If validation passes: Continue to Step 5

**Step 4.5: SQL Injection Prevention**

Django uses parameterized queries (prepared statements) to prevent SQL injection attacks.

UNSAFE (vulnerable to SQL injection):
```python
query = f"SELECT * FROM mood_entries WHERE user_id = {user_id}"
```

SAFE (Django ORM automatically parameterizes):
```python
MoodEntry.objects.filter(user_id=user_id)
```

This becomes: `SELECT * FROM mood_entries WHERE user_id = %s` with user_id passed separately.

Even if an attacker tries to inject SQL (e.g., user_id = "1 OR 1=1"), Django treats it as a literal value, not executable code.

**Step 5: React Sends API Request**
- Location: Browser
- What happens: Axios (HTTP library) sends POST request
- URL: https://mindmate.onrender.com/api/moods/
- Headers: Authorization: Bearer [JWT token], Content-Type: application/json
- Body: JSON with mood_level: 2, stress_category: "Finances", note: "HELB delayed again, can't pay rent"
- Time: 200-500 milliseconds (depends on internet speed)

**Step 6: Request Travels Over Internet**
- Protocol: HTTPS (encrypted)
- What's encrypted: JWT token, mood data, note
- What's visible to ISP: Only that student is accessing mindmate.onrender.com, not the actual data
- Time: 100-300 milliseconds

**Step 7: Render Server Receives Request**
- Location: Render server (cloud)
- What happens: Nginx (web server) receives request, forwards to Gunicorn (Django server)
- Time: 10 milliseconds

**Step 8: Django Validates JWT Token**
- Location: Backend (Django)
- What happens:
  1. Extract token from Authorization header
  2. Split token into 3 parts: header.payload.signature
  3. Verify signature using SECRET_KEY from environment variable
  4. If signature is invalid: Return 401 Unauthorized, stop here
  5. If signature is valid: Decode payload to get user_id
  6. Check token expiration (exp field in payload)
  7. If expired: Return 401 Unauthorized, stop here
  8. If valid: Extract user_id = 123, continue
- Time: 5 milliseconds

**Step 9: Django Validates Mood Data**
- Location: Backend (Django serializer)
- What happens:
  1. Check mood_level is integer between 1-5
  2. Check stress_category is one of allowed values
  3. Check note is string under 500 characters
  4. If validation fails: Return 400 Bad Request with error message
  5. If validation passes: Continue
- Time: 2 milliseconds

**Step 10: Django Checks for Existing Entry Today**
- Location: Backend
- What happens: Query database with SQL: SELECT id FROM mood_entries WHERE user_id = 123 AND date = '2026-02-24'
- If entry exists: Update it (don't create duplicate)
- If no entry: Create new one (continue to Step 11)
- Time: 10 milliseconds (PostgreSQL uses index on user_id, very fast)

**Step 11: Django Saves to PostgreSQL**
- Location: Backend → Database
- What happens: Django ORM executes SQL INSERT INTO mood_entries with values (user_id=123, mood_level=2, stress_category='Finances', note='HELB delayed again, can't pay rent', created_at='2026-02-24 14:30:00')
- PostgreSQL:
  1. Validates data types
  2. Checks foreign key (user_id = 123 exists in users table)
  3. Writes to disk
  4. Returns new entry id = 456
- Time: 20 milliseconds

**Step 12: Django Triggers AI Prompt (Async)**
- Location: Backend
- What happens: Django sends task to background queue
  - Task: "Generate reflection prompt for user_id=123, mood=2, category=Finances"
  - This happens asynchronously (doesn't block the response)
  - Student doesn't wait for this
- Time: 5 milliseconds to queue task

**Step 13: Django Returns Success Response**
- Location: Backend → Browser
- What happens: Django sends HTTP 201 Created
- Body: JSON with id=456, user_id=123, mood_level=2, stress_category="Finances", note="HELB delayed again, can't pay rent", created_at="2026-02-24T14:30:00Z"
- Time: 200-500 milliseconds (travel back over internet)

**Step 14: React Receives Response**
- Location: Browser
- What happens:
  1. Axios receives response
  2. React updates state (adds new mood entry to local list)
  3. React shows success message: "Mood saved successfully!"
  4. React redirects to Insights page after 2 seconds
- Time: Instant

**Step 15: Background AI Task Runs**
- Location: Backend (background worker)
- What happens:
  1. Query recent mood entries for user_id=123
  2. Analyze pattern: "User has logged mood=2 (Finances) 3 times this week"
  3. Generate prompt: "I notice you've been stressed about finances lately. HELB delays are tough. What's your biggest financial worry right now?"
  4. Save prompt to database
- Time: 2-5 seconds (student doesn't wait for this)
- Student will see prompt next time they visit AI chat

**Total Time: ~1 second from click to success message**

**Data Size:**
- Request: ~200 bytes (JSON)
- Response: ~300 bytes (JSON)
- Total: ~500 bytes = 0.0005 MB
- With 500MB bundle, student can log mood 1,000,000 times (realistically, they log once per day = 365 times per year = 0.18 MB per year)

### 3.4 Error Handling and What Can Go Wrong

Good engineering requires thinking about failures, not just success. Here's what can go wrong and how the system handles it:

**Failure 1: Internet Cuts While Saving Mood**

What happens:
1. Student fills mood form, clicks "Save Mood"
2. React sends POST request to backend
3. Internet cuts (common in Kenya - Safaricom outages, airtime runs out)
4. Request never reaches backend

How we handle it:
- Axios (HTTP library) has 30-second timeout
- After 30 seconds with no response, Axios throws error
- React catches error, checks error type
- If network error: Show "Connection lost. Reconnecting..." message
- React automatically retries 3 times (wait 2 seconds between retries)
- If all retries fail: Show "Could not save mood. Check your internet and try again"
- Mood data stays in form (student doesn't lose what they typed)
- When internet returns, student clicks "Save Mood" again

**Failure 2: Student Tries to Access Another Student's Data**

What happens:
1. Student A (user_id=1) is logged in
2. Student A opens browser console (F12)
3. Student A manually sends request: GET /api/moods/?user_id=2 (trying to see Student B's moods)

How we handle it:
- Django IGNORES the user_id parameter from request
- Django extracts user_id from JWT token (user_id=1)
- Django queries: `SELECT * FROM mood_entries WHERE user_id = 1` (not user_id=2)
- Student A only sees their own moods
- Even if Student A tries to hack the API, they can't see other students' data
- User data isolation prevents unauthorized access

**Failure 3: Database Fills Up**

What happens:
- Render free tier gives 1GB database storage
- Each mood entry = ~500 bytes (mood_level, stress_category, note, timestamps)
- 1GB = 1,000,000,000 bytes
- 1,000,000,000 ÷ 500 = 2,000,000 mood entries
- If 1,000 students log mood daily for 1 year = 365,000 entries = 182 MB
- We're safe for 5+ years

But if database somehow fills up:
- PostgreSQL rejects new INSERT queries
- Django catches database error
- Django returns 503 Service Unavailable
- React shows: "Service temporarily unavailable. We're working on it."
- Render sends alerts when database is 80% full
- Solution: upgrade to paid tier ($7/month for 10GB) or delete old entries (entries older than 2 years)

**Failure 4: JWT Token Expires**

What happens:
1. Student logs in at 9 AM, gets JWT token (expires in 24 hours)
2. Student uses app normally
3. Next day at 10 AM (25 hours later), student tries to log mood
4. Token is expired

How we handle it:
- Django checks token expiration
- Django returns 401 Unauthorized
- React catches 401 error
- React deletes expired token from localStorage
- React redirects to login page
- React shows: "Your session expired. Please login again."
- Student logs in, gets new token, continues

**Failure 5: AI API is Down**

What happens:
1. Student sends chat message
2. Django calls Gemini API (Google)
3. API is down (Gemini has outages, network issues)
4. API request times out after 10 seconds

How we handle it:
- Django catches timeout error
- Django returns fallback response: "I'm having trouble connecting right now. Please try again in a few minutes. If you need immediate help, contact MMUST counseling: 0712345678"
- React displays fallback message
- Student can still use other features (mood logging, insights, resources)
- AI chat is temporarily unavailable, but app doesn't crash

**Failure 6: Student Enters Invalid Data**

What happens:
1. Student tries to log mood = 10 (should be 1-5)
2. Or student tries to log mood without selecting category
3. Or student types 1000-character note (limit is 500)

How we handle it:
- **Frontend validation (first line of defense)**:
  - React checks mood is 1-5 before sending
  - React checks category is selected
  - React checks note is under 500 characters
  - If invalid: Show error message, don't send to backend
  - Example: "Please select a stress category"
- **Backend validation (second line of defense)**:
  - Even if someone bypasses frontend (using browser console), Django validates again
  - Django serializer checks all fields
  - If invalid: Return 400 Bad Request with specific error
  - Example: `{"mood_level": ["Ensure this value is less than or equal to 5"]}`
- **Database validation (third line of defense)**:
  - PostgreSQL has constraints: mood_level INTEGER CHECK (mood_level >= 1 AND mood_level <= 5)
  - If somehow bad data reaches database, PostgreSQL rejects it
  - Django catches database error, returns 400 Bad Request

**Failure 7: Render Free Tier Sleeps**

What happens:
- Render free tier: App sleeps after 15 minutes of inactivity
- Student visits site after 1 hour of no activity
- Backend is asleep

How we handle it:
- Render free tier: App sleeps after 15 minutes of inactivity
- Student visits site after 1 hour of no activity
- Backend is asleep
- First request wakes up backend (takes 30-60 seconds)
- React shows loading spinner: "Waking up server... This takes 30 seconds on first visit"
- After backend wakes up, request completes normally
- Subsequent requests are fast (backend stays awake for 15 minutes)
- Students are informed: "First visit of the day is slow, then it's fast"

**Failure 8: Student Forgets Password**

What happens:
- Student can't remember password
- Student clicks "Forgot Password?"

How we handle it:
- React shows form: "Enter your email"
- Student enters email
- Django generates password reset token (random 32-character string)
- Django saves token to database with expiration (1 hour)
- Django sends email with reset link: https://mindmate.onrender.com/reset-password?token=abc123...
- Student clicks link, enters new password
- Django verifies token is valid and not expired
- Django hashes new password, updates database
- Student can login with new password

**Failure 9: Two Students Try to Use Same Email**

What happens:
1. Student A registers with email: peter@mmust.ac.ke
2. Student B tries to register with same email: peter@mmust.ac.ke

How we handle it:
- PostgreSQL has UNIQUE constraint on email column
- When Student B tries to register, Django tries to INSERT
- PostgreSQL rejects: "duplicate key value violates unique constraint"
- Django catches error
- Django returns 400 Bad Request: "This email is already registered"
- React shows: "This email is already in use. Try logging in or use a different email."

**Failure 10: Malicious User Tries SQL Injection**

What happens:
- Attacker tries to inject SQL in note field
- Note: `"; DROP TABLE mood_entries; --`
- Hoping to execute: `INSERT INTO mood_entries (note) VALUES ('"; DROP TABLE mood_entries; --')`

How we handle it:
- Django ORM uses parameterized queries (prepared statements)
- SQL is: `INSERT INTO mood_entries (note) VALUES ($1)`
- Parameter $1 = `"; DROP TABLE mood_entries; --` (treated as string, not SQL)
- PostgreSQL safely inserts the text, doesn't execute it as SQL
- Attack fails, data is safe

### 3.5 Development Tools and Environment

**Development Machines:**
- Laptops: Windows 10/11 or Ubuntu Linux
- RAM: 8GB minimum (16GB preferred for running database locally)
- Storage: 256GB SSD
- Internet: Required for API calls, deployment, research

**Frontend Development:**

**Node.js 18.x**
- Why: Required to run React development server
- Installation: Download from nodejs.org
- Verify: `node --version` should show v18.x

**React 18.2**
- Why: Modern UI library, component-based
- Create app: `npx create-react-app mindmate-frontend`
- Development server: `npm start` (runs on http://localhost:3000)

**Libraries:**
- axios: HTTP requests to backend
- react-router-dom: Navigation between pages
- chart.js + react-chartjs-2: Mood trend charts
- date-fns: Date formatting
- tailwindcss: Styling (utility-first CSS)

**Code Editor: VS Code**
- Extensions: ESLint (code quality), Prettier (code formatting), ES7+ React snippets

**Backend Development:**

**Python 3.11**
- Why: Django requires Python
- Installation: Download from python.org or use system package manager
- Verify: `python --version` should show 3.11.x

**Django 4.2**
- Why: Web framework with built-in authentication, ORM, admin panel
- Installation: `pip install django djangorestframework`
- Development server: `python manage.py runserver` (runs on http://localhost:8000)

**Libraries:**
- djangorestframework: Build REST APIs
- djangorestframework-simplejwt: JWT authentication
- django-cors-headers: Allow frontend to call backend (CORS)
- psycopg2-binary: PostgreSQL database driver
- python-dotenv: Load environment variables from .env file
- google-generativeai: Gemini API for AI chat

**Database:**

**PostgreSQL 15**
- Why: Reliable, supports complex queries, free tier on Render
- Local development: Install PostgreSQL locally or use Docker
- Docker command: `docker run --name mindmate-db -e POSTGRES_PASSWORD=dev123 -p 5432:5432 -d postgres:15`
- GUI tool: pgAdmin or DBeaver (to view tables, run queries)

**Version Control:**

**Git**
- Why: Track code changes, collaborate, deploy to Render
- Repository: GitHub (private repo for now, public after graduation)
- Branches: main (production), develop (testing), feature/* (new features)
- Commit messages: Clear and descriptive ("Add mood logging API endpoint" not "fix bug")

**Deployment:**

**Render**
- Why: Free tier, easy deployment, automatic HTTPS
- Services:
  - Static Site (frontend): Free, serves React build files
  - Web Service (backend): Free tier, 750 hours/month
  - PostgreSQL: Free tier, 1GB storage
- Deployment: Connect GitHub repo, Render auto-deploys on push to main branch

**Testing:**

**Frontend Testing:**
- Jest: Unit tests for React components
- React Testing Library: Test user interactions
- Example: Test that mood form validates input before sending

**Backend Testing:**
- Django TestCase: Unit tests for API endpoints
- pytest: Alternative test runner (faster than Django's)
- Example: Test that mood API requires authentication

**API Testing:**
- Postman: Manual API testing (send requests, check responses)
- Thunder Client: VS Code extension (like Postman but in editor)

**Performance Testing:**
- Apache Bench: Test how many concurrent users system can handle
- Command: `ab -n 1000 -c 100 https://mindmate.onrender.com/api/moods/`
- Measures: Requests per second, response time, failure rate

**Environment Variables:**

Sensitive data (passwords, API keys) stored in .env file, not in code. The file contains SECRET_KEY, DATABASE_URL, GEMINI_API_KEY, and DEBUG settings. This file is NOT committed to Git for security. Production environment variables are set in Render dashboard.

### 3.6 Development Process

We're using Agile methodology with 2-week sprints. Here's how we work:

**Team Roles:**

- **Peter Awori**: Backend lead (Django, PostgreSQL, API design)
- **[Student 2]**: Frontend lead (React, UI/UX, charts)
- **[Student 3]**: AI/ML specialist (chatbot, sentiment analysis, prompts)
- **[Student 4]**: Testing and deployment (testing, Render deployment, documentation)

Everyone does code review for everyone else's work.

**Sprint Structure (2 weeks):**

**Week 1:**
- Monday: Sprint planning meeting (2 hours)
  - Review last sprint
  - Pick tasks for this sprint
  - Assign tasks to team members
- Tuesday-Friday: Development
  - Daily standup (15 minutes, 9 AM): What did you do yesterday? What will you do today? Any blockers?
  - Code, test, commit to Git
  - Create pull requests for code review
- Weekend: Catch up if needed

**Week 2:**
- Monday-Thursday: Development continues
  - Daily standups
  - Code review (review each other's pull requests)
  - Merge approved code to develop branch
- Friday: Sprint review and demo (2 hours)
  - Demo working features to supervisors
  - Get feedback
  - Plan next sprint

**Git Workflow:**

1. Create feature branch: `git checkout -b feature/mood-logging`
2. Write code, commit frequently: `git commit -m "Add mood validation"`
3. Push to GitHub: `git push origin feature/mood-logging`
4. Create pull request on GitHub
5. Team member reviews code, suggests changes
6. Fix issues, push again
7. Reviewer approves, merge to develop branch
8. After sprint review, merge develop to main (production)

**Code Review Checklist:**

- Does code work? (test it locally)
- Is code readable? (clear variable names, comments)
- Is code secure? (no hardcoded passwords, validates user input)
- Is code efficient? (no unnecessary database queries)
- Are there tests? (unit tests for new features)

**Testing Strategy:**

**Unit Tests:**
- Test individual functions
- Example: Test that `validate_mood(mood=6)` returns error
- Run: `pytest` (backend) or `npm test` (frontend)
- Goal: 80% code coverage

**Integration Tests:**
- Test multiple components together
- Example: Test that mood logging API saves to database correctly
- Run: `pytest tests/integration/`

**Manual Testing:**
- Test in browser like a real user
- Test on different devices (laptop, phone, tablet)
- Test on different browsers (Chrome, Firefox, Safari)
- Test with slow internet (Chrome DevTools can simulate 3G)

**User Acceptance Testing:**
- Give app to 10 MMUST students
- Watch them use it (don't help)
- Ask: "What's confusing? What's missing? What do you like?"
- Fix issues based on feedback

**Documentation:**

**Code Documentation:**
- Comments in code explaining complex logic
- Docstrings for functions (what it does, parameters, return value)
- Example: calculate_mood_average function includes docstring describing it calculates average mood for a user over specified days, with parameters user_id (int) and days (int, default 7), returning float average mood (1.0 to 5.0) or None if no entries

**API Documentation:**
- List all endpoints, methods, parameters, responses
- Example: POST /api/moods/ - Create mood entry
- Tool: Swagger/OpenAPI (auto-generates API docs from code)

**User Documentation:**
- Help page in app explaining how to use features
- FAQ: "How do I delete my account?" "Is my data private?"

**Project Documentation:**
- This proposal
- Final report (after project completion)
- README.md in GitHub repo (how to run project locally)

### 3.9 AI Safety and Crisis Detection

**Critical Safety Feature: Keyword Trigger System**

Mental health apps must detect crisis situations and provide immediate help. MindMate implements a keyword trigger system.

**How It Works:**

1. **Crisis Keywords Detection**
   - Before sending message to Gemini API, Django scans for crisis keywords
   - Keywords: "suicide", "kill myself", "hurt myself", "end my life", "want to die", "no reason to live"
   - Case-insensitive matching (e.g., "SUICIDE", "Suicide", "suicide" all trigger)

2. **Immediate Response**
   - If keyword detected, Django DOES NOT call Gemini API
   - Instead, returns pre-written crisis response immediately (no AI delay)
   - Response includes:
     - "We're concerned about you. Please reach out for immediate help."
     - MMUST Counseling Office: [phone number]
     - Kenya National Crisis Hotline: 1190 (toll-free, 24/7)
     - Befrienders Kenya: +254-722-178177 (24/7)
   - Message is logged for monitoring (anonymized, no personal details)

3. **Why This Matters**
   - AI responses can be unpredictable. We cannot risk AI giving wrong advice in crisis.
   - Pre-written responses are reviewed by mental health professionals.
   - Immediate response (no API delay) is critical in crisis situations.

**Code Implementation:**

When student sends chat message:
1. Django receives message
2. Check for crisis keywords FIRST (before AI)
3. If crisis keyword found:
   - Return crisis response immediately
   - Log incident (user_id, timestamp, keyword detected)
   - Skip Gemini API call
4. If no crisis keyword:
   - Proceed with normal Gemini API call
   - Generate supportive response

**Testing:**
- Test with phrases: "I want to kill myself", "thinking about suicide", "no reason to live"
- Verify crisis response appears within 1 second (no AI delay)
- Verify correct helpline numbers are displayed
- Verify incident is logged for monitoring

This is a CRITICAL safety feature for any mental health application.

### 3.7 Development Schedule

**28-Week Timeline (February 2026 - August 2026)**

**GANTT CHART - 28 WEEKS**

SEMESTER 1 (Weeks 1-14) - COMPLETED
════════════════════════════════════════════════════════════════════════════════
Week 1-2   | Requirements Gathering        |████████|
Week 3-4   | System Design                 |        |████████|
Week 5-6   | Backend Setup & Auth          |                |████████|
Week 7-8   | Mood Logging API              |                        |████████|
Week 9-10  | Insights & Analytics API      |                                |████████|
Week 11-12 | AI Chat API                   |                                        |████████|
Week 13-14 | Frontend Setup & Auth UI      |                                                |████████|

SEMESTER 2 (Weeks 15-28) - IN PROGRESS (Currently Week 18)
════════════════════════════════════════════════════════════════════════════════
Week 15-16 | Mood Logging UI               |████████|
Week 17-18 | Insights & Visualization UI   |        |████████| ← CURRENT WEEK
Week 19-20 | AI Chat & Resources UI        |                |████████|
Week 21    | Integration Testing           |                        |████|
Week 22    | User Testing & Feedback       |                            |████|
Week 23    | Bug Fixes & Improvements      |                                |████|
Week 24    | Performance Optimization      |                                    |████|
Week 25    | Security Audit                |                                        |████|
Week 26    | Deployment to Production      |                                            |████|
Week 27    | Documentation & User Manual   |                                                |████|
Week 28    | Final Presentation Prep       |                                                    |████|

Legend: ████ = Work period    ← = Current position

**SUMMARY TABLE**

| Phase | Weeks | Duration | Status |
|-------|-------|----------|--------|
| Phase 1: Planning & Design | 1-4 | 4 weeks | Complete |
| Phase 2: Backend Development | 5-12 | 8 weeks | Complete |
| Phase 3: Frontend Development | 13-20 | 8 weeks | In Progress (Week 18) |
| Phase 4: Integration & Testing | 21-24 | 4 weeks | Planned |
| Phase 5: Deployment & Documentation | 25-28 | 4 weeks | Planned |
| **Total** | **1-28** | **28 weeks** | **64% Complete** |

**Phase 1: Planning and Design (Weeks 1-4)**

**Week 1-2: Requirements Gathering**
- Interview 20 MMUST students about mental health needs
- Research existing apps (Daylio, Moodpath, Sanvello, Wysa, Headspace)
- Document functional and non-functional requirements
- Create user personas (typical MMUST students)
- Deliverable: Requirements document

**Week 3-4: System Design**
- Design database schema (users, mood_entries, chat_messages, resources tables)
- Design API endpoints (list all routes, methods, parameters)
- Create UI mockups (8 screens: landing, register, login, dashboard, log mood, insights, chat, resources)
- Design system architecture diagram
- Deliverable: Design document with diagrams

**Phase 2: Backend Development (Weeks 5-12)**

**Week 5-6: Project Setup and Authentication**
- Set up Django project structure
- Create PostgreSQL database locally
- Implement user registration API (POST /api/auth/register)
- Implement login API (POST /api/auth/login)
- Implement JWT token generation and verification
- Write tests for authentication
- Deliverable: Working authentication system

**Week 7-8: Mood Logging API**
- Create mood_entries table in database
- Implement create mood API (POST /api/moods/)
- Implement get moods API (GET /api/moods/)
- Implement update mood API (PUT /api/moods/{id}/)
- Implement delete mood API (DELETE /api/moods/{id}/)
- Add validation (mood 1-5, category required)
- Add user data isolation (filter by user_id from JWT)
- Write tests for mood APIs
- Deliverable: Working mood CRUD APIs

**Week 9-10: Insights and Analytics API**
- Implement insights API (GET /api/moods/insights?days=7)
- Calculate mood average
- Group moods by stress category
- Identify patterns (recurring lows, most common category)
- Optimize queries with database indexes
- Write tests for insights
- Deliverable: Working insights API

**Week 11-12: AI Chat API**
- Set up Gemini API integration (Google)
- Implement chat API (POST /api/chat/)
- Implement sentiment analysis
- Generate contextual prompts based on mood patterns
- Store conversation history
- Handle AI API failures gracefully
- Write tests for chat API
- Deliverable: Working AI chat API

**Phase 3: Frontend Development (Weeks 13-20)**

**Week 13-14: Project Setup and Authentication UI**
- Set up React project with Create React App
- Install libraries (axios, react-router, tailwindcss)
- Create landing page
- Create registration form
- Create login form
- Implement JWT token storage (localStorage)
- Implement protected routes (redirect to login if not authenticated)
- Deliverable: Working authentication UI

**Week 15-16: Mood Logging UI**
- Create mood logging form (emoji buttons, category dropdown, note textarea)
- Implement form validation
- Connect to mood API (POST /api/moods/)
- Show success/error messages
- Create mood history page (list past moods)
- Implement edit and delete mood
- Deliverable: Working mood logging UI

**Week 17-18: Insights and Visualization UI**
- Install Chart.js library
- Create insights page
- Implement 7-day mood trend line chart
- Implement stress category breakdown bar chart
- Display average mood
- Display patterns
- Add time period selector (7/30/90 days)
- Deliverable: Working insights UI with charts

**Week 19-20: AI Chat and Resources UI**
- Create chat interface (message list, input box, send button)
- Connect to chat API (POST /api/chat/)
- Display conversation history
- Show loading indicator while AI responds
- Create resources page
- Display resources grouped by category
- Implement search functionality
- Add "Crisis Mode" button
- Deliverable: Working chat and resources UI

**Phase 4: Integration and Testing (Weeks 21-24)**

**Week 21: Integration**
- Connect frontend to backend (update API URLs)
- Test all features end-to-end
- Fix integration bugs
- Ensure CORS is configured correctly
- Test on different browsers (Chrome, Firefox, Safari)
- Deliverable: Fully integrated system

**Week 22: Testing**
- Write unit tests for remaining components
- Run integration tests
- Perform security testing (try SQL injection, XSS, unauthorized access)
- Test performance (Apache Bench with 100 concurrent users)
- Test on slow internet (simulate 3G)
- Fix bugs found during testing
- Deliverable: Test report with 80%+ code coverage

**Week 23: User Acceptance Testing**
- Recruit 10 MMUST students for testing
- Give them access to staging site
- Observe them using the app (don't help)
- Collect feedback (survey + interviews)
- Identify usability issues
- Deliverable: User feedback report

**Week 24: Bug Fixes and Improvements**
- Fix issues found in user testing
- Improve UI based on feedback
- Add missing features if time allows
- Optimize performance
- Deliverable: Improved system ready for deployment

**Phase 5: Deployment and Documentation (Weeks 25-28)**

**Week 25: Deployment**
- Create Render account
- Deploy PostgreSQL database
- Deploy Django backend (configure environment variables)
- Deploy React frontend
- Configure custom domain (if budget allows)
- Test production site
- Set up monitoring (error alerts)
- Deliverable: Live site at mindmate.onrender.com

**Week 26: Documentation**
- Write user guide (how to use the app)
- Write developer guide (how to run locally, how to deploy)
- Write API documentation (Swagger)
- Update README.md
- Create video demo (5 minutes showing all features)
- Deliverable: Complete documentation

**Week 27: Final Report**
- Write final project report (50+ pages)
- Include: introduction, literature review, methodology, results, discussion, conclusion
- Add screenshots of working system
- Add test results and user feedback
- Add code snippets (key algorithms)
- Deliverable: Final report draft

**Week 28: Presentation Preparation**
- Create PowerPoint presentation (20 slides)
- Practice presentation (15 minutes)
- Prepare demo (show live site)
- Prepare for questions from examiners
- Submit final report
- Deliverable: Final presentation and defense

**Milestones:**

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| 4 | Design Complete | Design document with mockups and diagrams |
| 12 | Backend Complete | All APIs working and tested |
| 20 | Frontend Complete | All UI screens working |
| 24 | Testing Complete | Bug-free system ready for deployment |
| 25 | Deployment Complete | Live site accessible online |
| 28 | Project Complete | Final report and presentation |

**Risk Management:**

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Team member drops out | Low | High | Cross-train team members, document everything |
| Render free tier limits exceeded | Medium | Medium | Monitor usage, upgrade to paid tier if needed ($7/month) |
| Gemini API rate limits exceeded | Medium | Medium | Use TextBlob for sentiment analysis (free, basic) |
| Internet outages delay work | High | Low | Work offline when possible, use mobile hotspot |
| Scope creep (too many features) | Medium | High | Stick to requirements, say no to new features |
| Bugs found late in project | Medium | Medium | Test continuously, don't wait until end |

### 3.8 Development Budget

**Total Budget: KES 0 - 6,500**

We're using free and open-source tools to keep costs at zero or near-zero. Here's the detailed breakdown:

**Software and Tools: KES 0**

| Item | Cost | Why Free |
|------|------|----------|
| React | KES 0 | Open source (MIT license) |
| Django | KES 0 | Open source (BSD license) |
| PostgreSQL | KES 0 | Open source (PostgreSQL license) |
| Python | KES 0 | Open source (PSF license) |
| Node.js | KES 0 | Open source (MIT license) |
| VS Code | KES 0 | Free from Microsoft |
| Git | KES 0 | Open source (GPL license) |
| GitHub | KES 0 | Free for public repos, free private repos for students |

**Hosting: KES 0**

| Service | Free Tier | Usage Estimate | Cost |
|---------|-----------|----------------|------|
| Render Static Site (Frontend) | Unlimited | 2MB React build | KES 0 |
| Render Web Service (Backend) | 750 hours/month | ~100 hours/month (sleeps when idle) | KES 0 |
| Render PostgreSQL | 1GB storage | ~200MB (10,000 mood entries) | KES 0 |

**Why Render Free Tier Works:**

**Frontend (Static Site):**
- React build creates static files (HTML, CSS, JS)
- Total size: ~2MB
- Render serves from CDN (fast globally)
- No limits on bandwidth or requests
- Cost: KES 0 forever

**Backend (Web Service):**
- Free tier: 750 hours/month
- App sleeps after 15 minutes idle
- Wake up time: 30 seconds
- Usage calculation:
  - 100 students use app 30 minutes/day = 50 hours/month total
  - App is awake ~100 hours/month (multiple students keep it awake)
  - 100 hours < 750 hours - We're safe
- Cost: KES 0

**Database (PostgreSQL):**
- Free tier: 1GB storage
- Each mood entry: ~500 bytes (mood_level, stress_category, note, timestamps)
- 1GB = 1,000,000,000 bytes
- 1,000,000,000 ÷ 500 = 2,000,000 mood entries
- Usage estimate:
  - 1,000 students × 365 days/year = 365,000 entries/year
  - 365,000 entries × 500 bytes = 182 MB/year
  - 182 MB < 1GB - We're safe for 5+ years
- Cost: KES 0

**AI Chat: KES 0**

| Option | Cost | Pros | Cons |
|--------|------|------|------|
| **Gemini API (Google)** | **KES 0 (free tier)** | **Free, good responses, 60 requests/minute** | **Rate limits** |
| TextBlob/NLTK (Local) | KES 0 | Free, no API limits, works offline | Basic sentiment only, no chat |
| Ollama (Local) | KES 0 | Free, private, no API limits | Requires powerful server, slower |

**Our Choice: Gemini API (Google's Free Tier)**
- Free tier: 60 requests/minute, 1,500 requests/day
- Usage: 100 students × 5 messages/day = 500 requests/day
- 500 < 1,500 - We're safe
- Cost: KES 0

If we exceed limits, we'll use TextBlob for sentiment analysis (free but basic).

**Domain Name: KES 0 - 3,500**

| Option | Cost | Pros | Cons |
|--------|------|------|------|
| Free Render subdomain | KES 0 | Free, automatic HTTPS | Long URL (mindmate.onrender.com) |
| .co.ke domain from KeNIC | KES 3,500/year | Professional (mindmate.co.ke), Kenyan | Costs money |
| .com domain from Namecheap | KES 1,500/year | Cheaper, global | Not Kenyan TLD |

**Our Choice: Start with free subdomain, buy .co.ke if project succeeds**
- Phase 1 (development): mindmate.onrender.com (KES 0)
- Phase 2 (after launch): mindmate.co.ke (KES 3,500)

**Contingency: KES 3,000**

Buffer for unexpected costs:
- Render paid tier if free tier limits exceeded (KES 1,000/month)
- Domain renewal (KES 3,500/year)
- SMS for password reset (KES 1 per SMS, ~100 SMS = KES 100)

**Total Budget Summary:**

| Category | Cost |
|----------|------|
| Software and Tools | KES 0 |
| Hosting (Render) | KES 0 |
| AI Chat (Gemini API) | KES 0 |
| Domain Name | KES 0 - 3,500 |
| Contingency | KES 3,000 |
| **TOTAL** | **KES 3,000 - 6,500** |

**Realistic Scenario: KES 0 for first 6 months**

We can run the entire project for free for 6 months:
- Use Render free tier (enough for 100-500 students)
- Use Gemini API free tier (enough for 100 students)
- Use free subdomain (mindmate.onrender.com)
- Total cost: KES 0

**If project grows to 1,000+ students:**
- Upgrade Render backend to paid tier: KES 1,000/month
- Buy .co.ke domain: KES 3,500/year
- Total: KES 15,500/year (still very affordable)

**Why This Budget Works:**

1. **Free tier limits are generous**: Render gives 750 hours/month, usage is ~100 hours
2. **App sleeps when idle**: Saves hours, makes free tier sustainable
3. **Lightweight design**: 2MB frontend, 500 bytes per mood entry
4. **No third-party services**: No payment processors, no SMS APIs, no analytics tools
5. **Open source everything**: No license fees

**Comparison to Commercial Apps:**

- Headspace: $13/month × 100 students = $1,300/month = KES 195,000/month
- Sanvello: $9/month × 100 students = $900/month = KES 135,000/month
- MindMate: KES 0/month for 100 students

**3.8.1 Free Tier Limitations and Mitigation**

**Render.com Free Tier Limitations:**

1. **30-Second Spin-Up Time**
   - Problem: After 15 minutes of inactivity, the server "sleeps". First request takes 30 seconds to wake up.
   - Impact: First student to use the app after idle period waits 30 seconds.
   - Mitigation: Display loading message "Waking up server, please wait 30 seconds". Acceptable for student project.
   - Alternative: Use a cron job to ping the server every 14 minutes to keep it awake (free service: cron-job.org).

2. **750 Hours/Month Limit**
   - Problem: Free tier gives 750 hours/month. If server runs 24/7 = 720 hours/month.
   - Impact: We're safe with 30 hours buffer.
   - Mitigation: Monitor usage in Render dashboard. If we exceed, upgrade to paid tier (KES 1,000/month).

3. **PostgreSQL 1GB Storage**
   - Problem: Free database has 1GB storage limit.
   - Calculation: Each mood entry = ~500 bytes. 1GB = 2 million entries.
   - Impact: Even with 1,000 students logging daily for 5 years = 1.8 million entries = 900MB. We're safe.
   - Mitigation: If we approach 1GB, implement data retention policy (delete entries older than 2 years after user consent).

**Gemini API Free Tier Limitations:**

1. **60 Requests Per Minute**
   - Problem: Free tier allows 60 API calls/minute.
   - Impact: If 100 students chat simultaneously, some will hit rate limit.
   - Mitigation: Implement queue system. If rate limit hit, show "AI is busy, please wait 10 seconds" and retry.
   - Alternative: Use TextBlob for sentiment analysis (no API limits) and only call Gemini for complex responses.

2. **1,500 Requests Per Day**
   - Problem: Free tier allows 1,500 requests/day.
   - Impact: If 500 students each send 3 messages/day = 1,500 requests. We're at the limit.
   - Mitigation: Cache common AI responses. If student asks "How do I deal with exam stress?", cache the response for 24 hours.

---

## REFERENCES

Andersson, G., Cuijpers, P., Carlbring, P., Riper, H., & Hedman, E. (2014). Guided Internet-based vs. face-to-face cognitive behavior therapy for psychiatric and somatic disorders: a systematic review and meta-analysis. *World Psychiatry*, 13(3), 288-295.

Atwoli, L., Mungla, P. A., Ndung'u, M. N., Kinoti, K. C., & Ogot, E. M. (2017). Prevalence of substance use among college students in Eldoret, western Kenya. *BMC Psychiatry*, 11(1), 34.

Auerbach, R. P., Mortier, P., Bruffaerts, R., Alonso, J., Benjet, C., Cuijpers, P., ... & WHO WMH-ICS Collaborators. (2018). WHO World Mental Health Surveys International College Student Project: Prevalence and distribution of mental disorders. *Journal of Abnormal Psychology*, 127(7), 623-638.

De Choudhury, M., Gamon, M., Counts, S., & Horvitz, E. (2013). Predicting depression via social media. *Proceedings of the International AAAI Conference on Web and Social Media*, 7(1), 128-137.

Fitzpatrick, K. K., Darcy, A., & Vierhile, M. (2017). Delivering cognitive behavior therapy to young adults with symptoms of depression and anxiety using a fully automated conversational agent (Woebot): a randomized controlled trial. *JMIR Mental Health*, 4(2), e19.

Gulliver, A., Griffiths, K. M., & Christensen, H. (2010). Perceived barriers and facilitators to mental health help-seeking in young people: a systematic review. *BMC Psychiatry*, 10(1), 113.

Inkster, B., Sarda, S., & Subramanian, V. (2018). An empathy-driven, conversational artificial intelligence agent (Wysa) for digital mental well-being: real-world data evaluation mixed-methods study. *JMIR mHealth and uHealth*, 6(11), e12106.

Lattie, E. G., Adkins, E. C., Winquist, N., Stiles-Shields, C., Wafford, Q. E., & Graham, A. K. (2019). Digital mental health interventions for depression, anxiety, and enhancement of psychological well-being among college students: systematic review. *Journal of Medical Internet Research*, 21(7), e12869.

Ndetei, D. M., Khasakhala, L. I., Kingori, J., Oginga, A., & Raja, S. (2016). The complementary role of traditional and faith healers and potential liaisons with western-style mental health services in Kenya. *African Journal of Psychiatry*, 11(4), 223-227.

Othieno, C. J., Okoth, R. O., Peltzer, K., Pengpid, S., & Malla, L. O. (2014). Depression among university students in Kenya: Prevalence and sociodemographic correlates. *Journal of Affective Disorders*, 165, 120-125.

Pennebaker, J. W. (1997). Writing about emotional experiences as a therapeutic process. *Psychological Science*, 8(3), 162-166.

Torous, J., Andersson, G., Bertagnoli, A., Christensen, H., Cuijpers, P., Firth, J., ... & Arean, P. A. (2018). Towards a consensus around standards for smartphone apps and digital mental health. *World Psychiatry*, 18(1), 97-98.

World Health Organization. (2021). *Adolescent mental health*. Retrieved from https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health

---

## APPENDICES

### Appendix A: User Interface Mockups

[Note: UI mockups would be included here showing the 8 main screens: Landing Page, Registration, Login, Dashboard, Log Mood, Mood History, Insights, AI Chat, Resources]

### Appendix B: Database Schema

**Users Table:**
- Columns: id (primary key), email (unique, not null), password_hash (not null), created_at (timestamp), updated_at (timestamp)
- Index: idx_users_email on email column

**Mood Entries Table:**
- Columns: id (primary key), user_id (foreign key to users), mood_level (integer 1-5), stress_category (Academics/Finances/Relationships/Family/Career), note (text), created_at (timestamp), updated_at (timestamp)
- Indexes: idx_mood_entries_user_id on user_id, idx_mood_entries_created_at on created_at, unique index idx_mood_entries_user_date on (user_id, date)
- Constraint: mood_level must be between 1 and 5
- Constraint: stress_category must be one of the five allowed values
- On delete cascade: deleting user deletes their mood entries

**Chat Messages Table:**
- Columns: id (primary key), user_id (foreign key to users), message (text, not null), sender (user or ai), created_at (timestamp)
- Indexes: idx_chat_messages_user_id on user_id, idx_chat_messages_created_at on created_at
- Constraint: sender must be 'user' or 'ai'
- On delete cascade: deleting user deletes their chat messages

**Resources Table:**
- Columns: id (primary key), name (not null), category (Campus Counseling/National Helplines/Online Resources/Emergency), phone, email, website, address (text), description (text), created_at (timestamp)
- Index: idx_resources_category on category column
- Constraint: category must be one of the four allowed values

### Appendix C: API Endpoints

**Authentication Endpoints:**

POST /api/auth/register - Register new user with email and password, returns JWT token and user object

POST /api/auth/login - Login with email and password, returns JWT token and user object

POST /api/auth/refresh - Refresh expired token, takes refresh token and returns new access token

**Mood Endpoints:**

POST /api/moods/ - Create new mood entry (requires Authorization header with Bearer token), accepts mood_level, stress_category, and note, returns created mood entry with id and timestamp

GET /api/moods/ - Get user's mood entries (requires Authorization), supports query parameters for days and category filtering, returns array of mood entries

GET /api/moods/{id}/ - Get specific mood entry by id (requires Authorization), returns single mood entry

PUT /api/moods/{id}/ - Update mood entry (requires Authorization), accepts mood_level, stress_category, and note, returns updated mood entry

DELETE /api/moods/{id}/ - Delete mood entry (requires Authorization), returns 204 No Content

**Insights Endpoints:**

GET /api/moods/insights/ - Get mood analytics (requires Authorization), supports days query parameter, returns average_mood, mood_trend array with dates and moods, category_breakdown object with counts, and patterns array with insights

**Chat Endpoints:**

POST /api/chat/ - Send message to AI assistant (requires Authorization), accepts message text, returns AI response with message, sender, and timestamp

GET /api/chat/history/ - Get conversation history (requires Authorization), supports limit query parameter, returns array of messages with id, message, sender, and timestamp

**Resources Endpoints:**

GET /api/resources/ - Get mental health resources, supports category and search query parameters, returns array of resources with id, name, category, phone, email, website, address, and description

**User Endpoints:**

GET /api/users/profile/ - Get user profile (requires Authorization), returns id, email, created_at, total_mood_entries, days_tracked, and average_mood

PUT /api/users/profile/ - Update user profile (requires Authorization), accepts email, returns updated user object

POST /api/users/change-password/ - Change password (requires Authorization), accepts old_password and new_password, returns success message

GET /api/users/export/ - Export user data (requires Authorization), supports format query parameter (json or csv), returns user object with all mood_entries and chat_messages

DELETE /api/users/account/ - Delete user account permanently (requires Authorization), returns success message

### Appendix D: Sequence Diagrams

**Mood Logging Flow:**

1. Student clicks "Log Mood" button in browser
2. Browser displays mood form
3. Student selects mood=3, category=Academics, note="Studying hard"
4. Browser validates input (mood 1-5, category selected)
5. Browser sends POST request to backend: /api/moods/ with mood data
6. Backend verifies JWT token and extracts user_id
7. Backend sends INSERT query to database for mood_entries table
8. Database returns new entry_id
9. Backend triggers AI prompt generation (async, doesn't block response)
10. Backend returns response to browser with id, mood, category, note, created_at
11. Browser shows "Mood saved!" message to student
12. AI Service saves reflection prompt to database (background task)

**Authentication Flow:**

1. Student enters email and password in browser
2. Browser sends POST request to backend: /api/auth/login with credentials
3. Backend queries database: SELECT from users table WHERE email matches
4. Database returns user record
5. Backend verifies password hash using bcrypt
6. Backend generates JWT token (expires in 24 hours)
7. Backend returns token and user object to browser
8. Browser stores token in localStorage
9. Browser redirects student to dashboard

### Appendix E: Sample Mental Health Resources

**Campus Counseling:**
- MMUST Counseling Office: 0712345678, counseling@mmust.ac.ke, Student Affairs Building Room 101

**National Helplines:**
- Kenya Red Cross Counseling: 1199 (toll-free)
- Befrienders Kenya: 0722 178 177
- Amani Counseling Centre: 0734 104 106

**Online Resources:**
- Kenya Mental Health Portal: www.mentalhealthkenya.org
- Shining Hope for Communities: www.shofco.org

**Emergency:**
- Police: 999, 112
- Ambulance: 999
- Nearest Hospital: Kakamega County General Hospital, 0712345678

---

## END OF PROPOSAL

**Total Pages: 45**

**Word Count: ~12,000 words**

**Prepared by: Group 5**
- Peter Awori (SIT/B/01-02911/2022)
- [Student 2]
- [Student 3]
- [Student 4]

**Submission Date: February 24, 2026**

**Academic Supervisor: _______________________**

**Industry Supervisor: _______________________**

