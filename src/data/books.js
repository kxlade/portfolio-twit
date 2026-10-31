const softwareBooks = [
  {
    title: 'Clean Code', author: 'Robert C. Martin',
    subject: 'A book about writing and maintaining readable software.',
    angle: 'Which practices feel useful in real projects, and where do they need context?',
    takeaway: 'A possible takeaway to consider is how naming and small functions affect code review.',
  },
  {
    title: 'The Pragmatic Programmer', author: 'Andrew Hunt and David Thomas',
    subject: 'A broad guide to practical habits and principles for software developers.',
    angle: 'Which principles still feel practical when applied to current tools and workflows?',
    takeaway: 'A possible takeaway to consider is how small daily habits shape long-term craft.',
  },
  {
    title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann',
    subject: 'An exploration of the foundations and trade-offs behind data systems.',
    angle: 'Which system-design trade-offs would be interesting to explore in a small project?',
    takeaway: 'A possible takeaway to consider is how reliability and scale influence design choices.',
  },
  {
    title: 'Code', author: 'Charles Petzold',
    subject: 'An introduction to how computers represent information and carry out computation.',
    angle: 'How does the book make abstract ideas about computers easier to picture?',
    takeaway: 'A possible takeaway to consider is how simple components build up into complex systems.',
  },
  {
    title: 'The Mythical Man-Month', author: 'Frederick P. Brooks',
    subject: 'Essays on software project management, teams, and complexity.',
    angle: 'Which observations about coordinating software work still resonate today?',
    takeaway: 'A possible takeaway to consider is why adding people can make a late project later.',
  },
  {
    title: 'Grokking Algorithms', author: 'Aditya Bhargava',
    subject: 'A visual, approachable introduction to common algorithms and data structures.',
    angle: 'Which visual explanation makes an algorithm easier to understand or remember?',
    takeaway: 'A possible takeaway to consider is how recognizing a problem pattern guides algorithm choice.',
  },
  {
    title: "You Don't Know JS Yet", author: 'Kyle Simpson',
    subject: 'A book series that examines JavaScript concepts and language behavior in depth.',
    angle: 'Which JavaScript behavior would be useful to test with a small code example?',
    takeaway: 'A possible takeaway to consider is how understanding language rules can prevent surprises.',
  },
]

const learningBooks = [
  {
    title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman',
    subject: 'A discussion of two modes of thought and research in judgment and decision-making.',
    angle: 'What questions does the book raise about intuition and deliberate reasoning?',
    takeaway: 'A possible takeaway to consider is when it helps to slow down a decision.',
  },
  {
    title: 'A Mind for Numbers', author: 'Barbara Oakley',
    subject: 'A guide to learning challenging subjects, including math and science.',
    angle: 'Which study strategy might be worth trying and evaluating?',
    takeaway: 'A possible takeaway to consider is how focused and diffuse attention support learning.',
  },
  {
    title: 'Deep Work', author: 'Cal Newport',
    subject: 'A case for focused work and strategies for protecting attention.',
    angle: 'How might focused work fit alongside collaboration and everyday interruptions?',
    takeaway: 'A possible takeaway to consider is how to make focused practice more deliberate.',
  },
  {
    title: 'The Art of Learning', author: 'Josh Waitzkin',
    subject: 'Reflections on learning and performance drawn from chess and martial arts.',
    angle: 'What does the book suggest about responding to setbacks while learning?',
    takeaway: 'A possible takeaway to consider is how practice can turn difficulty into feedback.',
  },
  {
    title: 'Atomic Habits', author: 'James Clear',
    subject: 'A practical approach to building habits through small, repeatable changes.',
    angle: 'Which habit-building idea could be tested in a study or coding routine?',
    takeaway: 'A possible takeaway to consider is how environment can make a habit easier to repeat.',
  },
  {
    title: 'The Psychology of Money', author: 'Morgan Housel',
    subject: 'Stories and lessons about behavior, risk, and decisions involving money.',
    angle: 'How does the book distinguish financial knowledge from financial behavior?',
    takeaway: 'A possible takeaway to consider is how personal goals shape financial decisions.',
  },
]

function makeCandidates(entries, bookCategory, offset) {
  return entries.map((book, index) => ({
    id: `book-${offset + index + 1}`,
    type: 'book',
    category: 'Reading',
    bookCategory,
    readingStatus: 'Needs Confirmation',
    recommendation: 'Needs Confirmation',
    reviewDraftLabel: 'Draft for review and personalization',
    tags: [bookCategory],
    ...book,
    reviewDraft: `${book.subject} ${book.angle} ${book.takeaway}`,
  }))
}

export const bookCandidates = [
  ...makeCandidates(softwareBooks, 'Software Engineering & Computer Science', 0),
  ...makeCandidates(learningBooks, 'Learning & Personal Development', softwareBooks.length),
]
