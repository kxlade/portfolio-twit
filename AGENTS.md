# AGENTS.md --- Personal Developer Portfolio

## Project direction

Build a personal developer website that feels like a living corner of
the internet, not a conventional résumé or a grid of project cards.

The interface is inspired by X/Twitter: a real, vertically scrolling
feed with a consistent visual identity and responsive desktop/mobile
layouts. The feed should communicate both the work and the person behind
it.

Projects are important evidence of what the owner can build, but they
must not dominate the experience. Include personal reflections,
interests, reading, learning resources, and development updates
alongside project showcases.

## Core content themes

-   **Projects:** websites, experiments, what was built, and lessons
    learned.
-   **Personal:** the owner's story, experiences, ambitions, life
    outside coding, and reflections.
-   **Thoughts:** ideas being explored and opinions about technology.
-   **Reading:** books read for enjoyment and personal recommendations.
-   **SWE bookshelf:** books studied to develop software-engineering
    knowledge.
-   **Learning resources:** useful or underrated websites and platforms
    used for studying.
-   **Development log:** current learning, experiments, challenges, and
    progress.

Do not make every post look like a project announcement. Use layouts
appropriate to each content type while keeping a coherent feed design.

## Confirmed technology and projects

-   Front end: **React, Vite, and CSS**.
-   All three projects below were built with React, Vite, and CSS:
    1.  College Website --- https://college-website-kxlade.netlify.app/
    2.  Pet Adoption Website ---
        https://petadoption-by-kolade.netlify.app/
    3.  OrigamiForAll --- https://origami-folder.vercel.app/
-   The owner has screenshots of all three projects. Use those real
    screenshots as project previews; do not use generic thumbnails once
    the screenshots are available.
-   OrigamiForAll's Vercel URL did not open when the owner last tested
    it. Verify the deployment before presenting it as a working live
    project. Do not assume the cause.
-   GitHub handle in the existing project data: `kxlade`.

Do not invent project features, technologies, descriptions, dates, or
achievements. Ask the owner or inspect the project when details are
needed.

## Visual design decisions

The design uses dark mixed surfaces with white as the accent.

Existing CSS design tokens in `global.css`:

``` css
--ink: #0d0e10;
--graphite: #17181b;
--raised: #212327;
--line: #2b2d32;
--paper: #ecebe6;
--paper-ink: #16171a;
--text: #f4f4f2;
--muted: #8d9098;
--accent: #ffffff;
--on-accent: #0d0e10;
--font-display: 'Bricolage Grotesque';
--font-body: 'Hanken Grotesk';
```

Existing radius tokens are also defined in `global.css`; preserve and
reuse them. Avoid introducing a competing visual system without a clear
reason.

## Known application structure

The following files have been discussed or inspected:

``` text
src/
├── App.jsx
├── components/
│   ├── Icons.jsx
│   ├── Navbar.jsx
│   ├── Post.jsx
│   ├── PostFeed.jsx
│   └── Sidebar.jsx
├── data/
│   └── posts.js
├── pages/
│   └── Home.jsx
└── styles/
    ├── global.css
    ├── layout.css
    └── posts.css
```

This is the known structure from the conversation, not a guarantee that
no other files exist. Inspect the repository before changing paths or
assuming the tree is complete.

### Existing component responsibilities

-   `App.jsx`: wraps the app in `BrowserRouter`; renders `Sidebar`, the
    main `.feed-col` with routes (`/` for `Home`, `/about` for
    `AboutMe`, fallback redirect), the right-side `ProfileCard` rail,
    and `BottomNav`. Imports `global.css`, `layout.css`, and
    `posts.css`.
-   `Navbar.jsx`: imports `profile` and `categories` from `data/posts`;
    displays the handle and category tabs; receives `active` and
    `onChange` props.
-   `Sidebar.jsx`: uses `Icon` and `profile`; provides Home/About
    navigation, GitHub link, Contact mailto, and a Hire Me button.
-   `Icons.jsx`: contains custom SVG icons (home, user, file, mail,
    reply, repost, heart, chart, pin, GitHub). Reuse it rather than
    adding an icon dependency without need.
-   `Home.jsx`: manages the active feed category, filters posts, keeps
    pinned posts visible, and sorts pinned posts before newer posts.
-   `PostFeed.jsx`: maps posts to `<Post key={p.id} post={p} />`;
    displays an empty-category message when there are no posts.
-   `Post.jsx`: currently contains only an empty
    `<article className="post">` shell. This is the next main component
    to implement.
-   `posts.js`: holds `profile`, `categories`, and `posts` data.
-   `posts.css`: currently holds bottom mobile navigation and responsive
    breakpoints; post-specific styles can be added here.

## Existing data and implementation notes

The current `profile` data in `src/data/posts.js` includes:

-   Name: `Kolade`
-   Handle: `k.dev`
-   Bio:
    `Software engineering student. I build web apps and ship them before the semester ends.`
-   Status: `Open to internships`
-   Stack: React, JavaScript, TypeScript, Node, C#, Python, C, Java,
    SQL, Linux
-   GitHub: `https://github.com/kxlade`

Use the values already in the repository as the source of truth. Do not
silently change the profile identity or resolve any apparent name
differences.

The current category list was
`['All', 'Web', 'Backend', 'Case studies']`. A sample post used
`category: 'Projects'`, which does not match the list. Fix category
mismatches so filters work. The content taxonomy may need to evolve to
include Personal, Reading, SWE bookshelf, Learning, and Development
themes. Decide whether to add these as feed filters or represent them
through post types/tags; keep navigation usable and avoid an overcrowded
tab bar.

The current `Home.jsx` sorting logic calls `.sort()` directly on the
filtered array derived from `posts`. Since `.sort()` mutates its array,
make a shallow copy before sorting (for example, `[...posts]`) so source
data is not mutated.

The sample post used a relative value such as `date: '2h'`, but sorting
expects a parseable date. Store a machine-readable ISO date for sorting
and a separate display value such as `timestamp: '2h'`. Do not use
placeholder dates as if they were real post dates.

Because this is currently a single-owner portfolio, post author details
can usually be read from `profile` rather than repeated in every post
object. Keep per-post authors only if guest or repost content is later
needed.

## Suggested content data model

Keep content data separate from rendering. `Post.jsx` should render the
appropriate presentation based on each post's `type`, while sharing
common feed structure and styling.

Illustrative project post (the copy and date below are placeholders, not
facts):

``` js
{
  id: 1,
  type: 'project',
  category: 'Web',
  date: '2026-10-30T14:30:00',
  timestamp: 'Recently',
  title: 'College Website',
  content: 'A description confirmed by the owner.',
  image: '/projects/college-website.png',
  technologies: ['React', 'Vite', 'CSS'],
  live: 'https://college-website-kxlade.netlify.app/',
  github: '',
  pinned: false,
}
```

Other content types can use appropriate fields:

``` js
{
  id: 2,
  type: 'thought',
  category: 'Personal',
  date: '2026-10-30T15:00:00',
  content: 'A personal thought written by the owner.',
}
```

``` js
{
  id: 3,
  type: 'book',
  category: 'Reading',
  date: '2026-10-30T16:00:00',
  title: 'Book title',
  author: 'Book author',
  content: 'The owner’s own thoughts about the book.',
}
```

Use real owner-provided content. Do not fabricate personal history,
opinions, book recommendations, or learning resources.

## Responsive and implementation constraints

-   Preserve the existing responsive desktop/mobile layout.
-   Existing breakpoints discussed:
    -   At `max-width: 1100px`: shell becomes two columns, `.rail` is
        hidden/removed from the layout, and sidebar becomes compact.
    -   At `max-width: 700px`: shell becomes block layout, sidebar is
        hidden, feed receives bottom padding, and `.navbar-top` plus
        `.bottom-nav` are shown.
-   Keep semantic HTML and accessible labels.
-   Reuse existing CSS variables and custom `Icon` component.
-   Prefer small, understandable changes over unnecessary dependencies
    or a rewrite.
-   The owner is learning front-end development. Explain meaningful
    architectural choices, show exact files/locations, and provide
    beginner-friendly implementation steps. Avoid dumping large amounts
    of unexplained code.

## Next steps

1.  Inspect the actual repository and confirm the current file tree and
    imports before editing.
2.  Review `posts.js`, `Home.jsx`, and `PostFeed.jsx`; fix category
    consistency and non-mutating sorting.
3.  Decide on a compact category/filter strategy that accommodates
    projects and personal/learning content without crowding navigation.
4.  Implement `Post.jsx` as a reusable, type-aware feed item. Start with
    project, thought, book, and resource posts; add other types when
    needed.
5.  Add post-specific styles in `posts.css`, preserving the established
    dark visual system and responsive behavior.
6.  Ask the owner to provide the three website screenshots and place
    them in public assets (confirm the actual asset path before
    referencing them).
7.  Populate the first three project posts using verified descriptions
    and the confirmed stack: React, Vite, CSS.
8.  Work with the owner to create authentic personal, reading, SWE
    bookshelf, learning-resource, and development-log posts. Do not
    invent their story or opinions.
9.  Verify the OrigamiForAll deployment before marking its live link as
    working.
10. Test category filtering, pinned-post ordering, date sorting, project
    links, image loading, and desktop/mobile layouts.

## Working agreement

Treat this file as project context, not permission to make broad
changes. Inspect existing code first, preserve working behavior, and
explain proposed structural changes before making them. When information
about the owner's life, opinions, books, or learning habits is missing,
ask rather than invent.
