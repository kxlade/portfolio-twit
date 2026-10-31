import { NavLink } from 'react-router-dom'
import { profile, categories } from '../data/posts'

export default function Navbar({ active, onChange }) {
    return (
        <header className="navbar">
            <h2 style={{ textAlign: "center" }}>𝕂</h2>
            <div className="navbar-top">
                <div className="mark" aria-hidden="true">{profile.handle[0]}</div>
                <strong>@{profile.handle}</strong>
            </div>
            <div className="tabs" role="tablist" aria-label="Filter projects">
                {categories.map((c) => (
                    <NavLink className="nav-link">
                        <button
                            key={c}
                            type="button"
                            role="tab"
                            className="tab"
                            aria-selected={active === c}
                            onClick={() => onChange(c)}
                        >
                            {c}
                        </button>
                    </NavLink>

                ))}
            </div>
        </header>
    )
}
