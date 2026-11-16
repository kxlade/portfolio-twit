// Personal + Dev Log posts.
// Dates are ISO (YYYY-MM-DD) so the feed can sort them; `timestamp` is what people see.
// Edit the wording freely: these are written in your voice from what you've told me.

export const journalPosts = [
  // ---------------------------- Personal ----------------------------
  {
    id: 'birthday-nov-15', type: 'thought', category: 'Personal', order: 0,
    date: '2026-11-13', timestamp: 'Nov 13',
    content: 'My birthday is on the 15th of November 🎂\nSpending the days before it polishing this portfolio so it actually feels like mine.',
    draft: false,
  },
  {
    id: 'lagos-life-house', type: 'thought', category: 'Personal', order: 0,
    date: '2026-11-05', timestamp: 'Nov 5',
    content: 'Taking a break from code to decorate my house in Lagos Life 🏠\nRule of the project: use what I already own first, and only buy when I really have to.',
    draft: false,
  },
  {
    id: 'open-to-internships', type: 'thought', category: 'Personal', order: 0,
    date: '2026-10-05', timestamp: 'Oct 5',
    content: 'Software engineering student, open to internships.\nI like building web apps and getting them live before the semester is over.',
    draft: false,
  },
  {
    id: 'four-sites-this-year', type: 'thought', category: 'Personal', order: 0,
    date: '2026-09-16', timestamp: 'Sep 16',
    content: 'Four websites shipped this year, all with React, Vite and CSS: OrigamiForAll, a college site, a restaurant site and a pet adoption site.',
    draft: false,
  },

  // ----------------------------- Dev Log -----------------------------
  {
    id: 'devlog-liquid-glass-nav', type: 'dev-log', category: 'Dev Log', order: 0,
    date: '2026-11-13', timestamp: 'Nov 13',
    title: 'Liquid glass + a sliding mobile nav',
    workedOn: 'Rebuilding every button in this portfolio with an iOS-style liquid glass look, and a bottom nav on mobile where you glide a glass lens between pages.',
    learned: 'Blur alone looks flat. A bright edge, a thin rim light, an inner glow and a little squash when you press are what make it read as glass.',
    challenge: 'Getting it to feel like iOS and not like old Windows glass.',
    nextExplore: 'Testing how it feels as a home-screen app on my phone.',
    draft: false,
  },
  {
    id: 'devlog-express-api', type: 'dev-log', category: 'Dev Log', order: 0,
    date: '2026-11-10', timestamp: 'Nov 10',
    title: 'A small Express API for my projects',
    workedOn: 'An Express server that serves my project list at /api/projects, with the portfolio reading from it.',
    learned: 'The frontend can keep a bundled copy of the data, so the site still works on static hosting like Netlify when there is no API.',
    nextExplore: 'Postgres with Prisma. The folders are already waiting for it.',
    draft: false,
  },
  {
    id: 'devlog-mod-exam-5', type: 'dev-log', category: 'Dev Log', order: 0,
    date: '2026-11-06', timestamp: 'Nov 6',
    title: 'Mod Exam 5: Frontend Web Development with React',
    workedOn: 'Wrote my Aptech Mod Exam 5 on Frontend Web Development with React and scored 17/20.',
    nextExplore: 'Mod Exam 4: UI/UX for Responsive Web Design.',
    draft: false,
  },
  {
    id: 'devlog-ui-ux-sessions', type: 'dev-log', category: 'Dev Log', order: 0,
    date: '2026-11-04', timestamp: 'Nov 4',
    title: 'Studying UI and UX design',
    workedOn: 'Going through "Elegant and Effective Website Design with UI and UX": Session 1 (Introduction to User Interface Design) and Session 2 (Introduction to User Experience Design).',
    learned: 'Session 1 feels solid. Session 2 is where I am putting in the practice.',
    nextExplore: 'Applying what I learn to my own sites.',
    draft: false,
  },
  {
    id: 'devlog-router-and-logic', type: 'dev-log', category: 'Dev Log', order: 0,
    date: '2026-10-31', timestamp: 'Oct 31',
    title: 'Routing in React, logic in maths',
    workedOn: 'Navigation with React Router for this portfolio, and discrete maths on the side.',
    learned: 'Logic and proofs are a different kind of workout from writing code.',
    nextExplore: 'C# and .NET through Microsoft Learn.',
    draft: false,
  },
]
