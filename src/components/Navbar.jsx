import { profile, categories, buildSubcategories } from '../data/posts'

export default function Navbar({ active, onChange, activeBuildFilter, onBuildFilterChange }) {
  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="mark" aria-hidden="true">{profile.handle[0]}</div>
        <strong>@{profile.handle}</strong>
      </div>
      <div className="tabs" role="group" aria-label="Filter feed by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="tab"
            aria-pressed={active === category}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {active === 'Builds' && (
        <div className="build-filters" role="group" aria-label="Filter builds by type">
          <button
            type="button"
            className="build-filter"
            aria-pressed={activeBuildFilter === null}
            onClick={() => onBuildFilterChange(null)}
          >
            All builds
          </button>
          {buildSubcategories.map((subcategory) => (
            <button
              key={subcategory}
              type="button"
              className="build-filter"
              aria-pressed={activeBuildFilter === subcategory}
              onClick={() => onBuildFilterChange(subcategory)}
            >
              {subcategory}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
