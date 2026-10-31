import { profile } from '../data/posts'
import { Link } from 'react-router-dom'

export default function AboutMe() {
  return (
    <section className="about-page">
      <header className="about-header">
        <Link className="about-back" to="/" aria-label="Back to home">←</Link>
        <div>
          <h1>About</h1>
          <span>@{profile.handle}</span>
        </div>
      </header>
      <div className="about-content">
        <div className="about-avatar" aria-hidden="true">{profile.handle[0]}</div>
        <h2>{profile.name}</h2>
        <p className="about-handle">@{profile.handle}</p>
        <p>{profile.bio}</p>
        <p className="about-status">{profile.status}</p>
        <div className="chips" aria-label="Technologies">
          {profile.stack.map((item) => <span className="chip" key={item}>{item}</span>)}
        </div>
        <a className="btn about-contact" href={`mailto:${profile.email}`}>Get in touch</a>
      </div>
    </section>
  )
}
