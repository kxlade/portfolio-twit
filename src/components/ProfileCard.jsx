import { profile } from '../data/posts'

export default function ProfileCard() {
  return (
    <aside className="profile-card" aria-label="About">
      <div>
        <h2>{profile.name}</h2>
        <span className="handle">@{profile.handle}</span>
      </div>
      <p>{profile.bio}</p>
      <div className="status">{profile.status}</div>
      <div className="chips">
        {profile.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
      </div>
      <a className="btn" href={`mailto:${profile.email}`}>Hire me</a>
    </aside>
  )
}