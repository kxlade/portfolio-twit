import origamiImage from '../assets/Origami-Screenshot.png'
import collegeImage from '../assets/College-Screenshot.png'
import petAdoptionImage from '../assets/Pet-Adoption-Screenshot.png'
import resturantImage from '../assets/Resturant.png'
import { bookCandidates } from './books'

export const profile = {
  name: 'Kolade',
  handle: 'k.dev',
  bio: 'Software engineering student. I build web apps and ship them before the semester ends.',
  status: 'Open to internships',
  stack: ['React', 'JavaScript', 'TypeScript', 'Node', 'C#', 'Python', 'C', 'Java', 'Racket', 'SQL', 'Linux', 'Firebase', 'Git', 'Tailwind'],
  email: 'kolade525@gmail.com',
  github: 'https://github.com/kxlade',
}

export const categories = ['All', 'Builds', 'Personal', 'Reading', 'Learning', 'Dev Log']
export const buildSubcategories = ['Web', 'Backend', 'Full-stack', 'Case Studies']

// Keep order explicit: no invented publication dates are needed for this portfolio feed.
const projects = [
  {
    id: 'origami-for-all',
    type: 'project',
    category: 'Builds',
    subcategory: 'Web',
    tags: ['React', 'Vite', 'CSS'],
    title: 'OrigamiForAll',
    content: 'An origami website made to share the art of paper folding. Built with React, Vite, and CSS.',
    image: origamiImage,
    technologies: ['React', 'Vite', 'CSS'],
    live: 'https://origami-folder.vercel.app/',
    github: '',
    pinned: true,
    order: 1,
  },
  {
    id: 'college-website',
    type: 'project',
    category: 'Builds',
    subcategory: 'Web',
    tags: ['React', 'Vite', 'CSS'],
    title: 'College Website',
    content: 'A website project for a college, built with React, Vite, and CSS.',
    image: collegeImage,
    technologies: ['React', 'Vite', 'CSS'],
    live: 'https://college-website-kxlade.netlify.app/',
    github: '',
    order: 2,
  },
  {
    id: 'pet-adoption-website',
    type: 'project',
    category: 'Builds',
    subcategory: 'Web',
    tags: ['React', 'Vite', 'CSS'],
    title: 'Pet Adoption Website',
    content: 'A pet adoption website project, built with React, Vite, and CSS.',
    image: petAdoptionImage,
    technologies: ['React', 'Vite', 'CSS'],
    live: 'https://petadoption-by-kolade.netlify.app/',
    github: '',
    order: 3,
  },
  {
    id: 'e-resturant',
    type: 'project',
    category: 'Builds',
    subcategory: 'Web',
    tags: ['React', 'Vite', 'CSS'],
    title: 'E. Resturant',
    content: 'A restaurant website project, built with React, Vite, and CSS.',
    technologies: ['React', 'Vite', 'CSS'],
    image: resturantImage,
    live: 'https://resturant-flame-eight.vercel.app/',
    github: '',
    order: 4,
  },
]

const readingPosts = bookCandidates.map((book, index) => ({
  ...book,
  order: projects.length + index + 1,
}))

// Resource visits below are based on study-related pages found in Chrome and
// Brave history. The copy is deliberately marked as a draft for review.
const learningResources = [
  {
    id: 'computer-science-course-start', type: 'thought', category: 'Learning', order: 0,
    date: '2026-10-18', timestamp: 'Oct 18',
    content: 'Started my computer science course almost two weeks ago. There’s a lot to take in, but I’m excited to keep learning.',
    draft: true,
  },
  {
    id: 'learning-discrete-maths', type: 'thought', category: 'Learning', order: 0,
    date: '2026-10-27', timestamp: '4 days ago',
    content: 'Learning discrete maths today 🥲 logic and proofs are a different kind of workout.',
    draft: true,
  },
  {
    id: 'learn-anything', type: 'resource', category: 'Learning', order: 0,
    date: '2026-10-27', timestamp: 'Oct 27', title: 'Learn Anything',
    content: 'I found this website today 😭 learn-anything.xyz. Damn, why didn’t I find this earlier?',
    url: 'https://learn-anything.xyz/computer-science', tags: ['Learning'], draft: true,
  },
  {
    id: 'freecodecamp-csharp', type: 'resource', category: 'Learning', order: 0,
    date: '2026-10-31', timestamp: 'Oct 31', title: 'freeCodeCamp · C#',
    content: 'Today’s study rabbit hole: learning the basics of storing data with C#.',
    url: 'https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/write-your-first-code-using-c-sharp/perform-basic-operations-on-numbers-in-c-sharp', tags: ['C#', 'Programming'], draft: true,
  },
  {
    id: 'microsoft-learn', type: 'resource', category: 'Learning', order: 0,
    date: '2026-10-31', timestamp: 'Oct 31', title: 'Microsoft Learn',
    content: 'Using Microsoft Learn to explore C# and .NET training material.',
    url: 'https://learn.microsoft.com/en-gb/training/browse/?levels=beginner&terms=c%23', tags: ['C#', '.NET'], draft: true,
  },
  {
    id: 'just-javascript', type: 'resource', category: 'Learning', order: 0,
    date: '2026-10-31', timestamp: 'Oct 31', title: 'Just JavaScript',
    content: 'A visual way to work through the mental models behind JavaScript.',
    url: 'https://justjavascript.com/', tags: ['JavaScript'], draft: true,
  },
  {
    id: 'sololearn', type: 'resource', category: 'Learning', order: 0,
    date: '2026-10-30', timestamp: 'Oct 30', title: 'SoloLearn',
    content: 'Back to bite-sized coding lessons when I want a quick practice session.',
    url: 'https://www.sololearn.com/', tags: ['Practice', 'Programming'], draft: true,
  },
  {
    id: 'w3schools-react-router', type: 'resource', category: 'Learning', order: 0,
    date: '2026-10-30', timestamp: 'Oct 30', title: 'W3Schools · React Router',
    content: 'A quick reference while working through React Router navigation.',
    url: 'https://www.w3schools.com/react/react_router.asp', tags: ['React', 'Routing'], draft: true,
  },
  {
    id: 'compscilib-discrete-math', type: 'resource', category: 'Learning', order: 0,
    date: '2026-10-28', timestamp: 'Oct 28', title: 'CompSciLib · Discrete Math',
    content: 'Practising propositional logic and discrete maths problems.',
    url: 'https://www.compscilib.com/calculate/intro-to-prop-logic?questions=5&tags=Statement+or+Not%3F&tags=Symbols&tags=Evaluate+Statements&difficulty=easy&difficulty=medium&types=multiplechoice&types=truefalse&types=input&view=practice', tags: ['Discrete math', 'Study'], draft: true,
  },
  {
    id: 'starting-out-with-racket', type: 'resource', category: 'Learning', order: 0,
    date: '2026-6-28', timestamp: 'Jun 28', title: 'Starting out with Racket',
    content: 'Working through an introduction to Racket and functional programming.',
    url: 'https://cs.uwaterloo.ca/~plragde/flane/FICS/Starting_out_with_Racket.html', tags: ['Racket', 'Programming'], draft: true,
  },
]

const orderedLearningPosts = learningResources.map((post, index) => ({
  ...post,
  order: projects.length + bookCandidates.length + index + 1,
}))

export const posts = [...projects, ...readingPosts, ...orderedLearningPosts]
