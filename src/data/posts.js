// To edit MY portfolio. Each project is a post
export const profile = {
  name: 'Kolade',
  handle: 'k.dev',
  bio: 'Software engineering student. I build web apps and ship them before the semester ends.',
  status: 'Open to internships',
  stack: ['React', 'JavaScript', 'TypeScript', 'Node', 'C#', 'Python', 'C', 'Java', 'SQL', 'Linux'],
  email: 'kolade525@gmail.com',
  github: 'https://github.com/kxlade',
}

export const categories = ['All', 'Web', 'Backend', 'Case studies', 'Personal', 'Reading']


export const posts = [
  {
    id: 1,
    type: 'project',
    category: 'Web',
    title: 'OrigamiForAll',
    date: '2026-10-28T14:30:00',
    timestamp: 'Recently',
    content: 'An interactive origami learning platform designed to make discovering and learning paper-folding techniques more accessible.',
    image: 'src/assets/Origami-Screenshot.png',
    technologies: ['React Js', 'Vite', 'CSS'],
    live: 'https://origami-folder.vercel.app/',
    github: '',
    pinned: true,
  },
  {
    id: 2,
    type: 'project',
    category: 'Web',
    title: 'College Website',
    date: '2026-10-30T14:30:00',
    timestamp: 'Recently',
    content: 'A college website project focused on presenting institutional information through a structured web experience.',
    image: 'src/assets/College-Screenshot.png',
    technologies: ['React Js', 'Vite', 'CSS'],
    live: 'https://college-website-kxlade.netlify.app/',
    github: '',
    pinned: false,
  },

  {
    id: 3,
    type: 'project',
    category: 'Web',
    title: 'Pet Adoption Website',
    date: '2026-10-29T14:30:00',
    timestamp: 'Recently',
    content: 'A pet adoption website designed to make browsing available pets simple and intuitive.',
    image: 'src/assets/Pet-Adoption-Screenshot.png',
    technologies: ['React Js', 'Vite', 'CSS'],
    live: 'https://petadoption-by-kolade.netlify.app/',
    github: '',
    pinned: false,
  },
  {
  id: 4,
  type: 'thought',
  category: 'Personal',
  date: '2026-10-30T14:30:00',
  content: "Something I've been thinking about lately...",
},
{
  id: 5,
  type: 'book',
  category: 'Reading',
  date: '2026-10-30T15:00:00',
  title: 'A book title',
  author: 'Author name',
  content: 'My thoughts on this book...',
},
{
  id: 6,
  type: 'resource',
  category: 'Reading',
  date: '2026-10-30T16:00:00',
  title: 'An underrated learning resource',
  content: 'Why I use this website...',
  link: 'https://example.com',
}

]