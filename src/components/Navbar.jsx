import { useEffect, useState } from 'react'
import { profile, categories, buildSubcategories } from '../data/posts'
import {
  LiquidGlassButton,
} from '@tinymomentum/liquid-glass-react';
import '@tinymomentum/liquid-glass-react/dist/components/LiquidGlassBase.css';


export default function Navbar({ active, onChange, activeBuildFilter, onBuildFilterChange }) {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const updateCompactState = () => setIsCompact(window.scrollY > 40)

    updateCompactState()
    window.addEventListener('scroll', updateCompactState, { passive: true })
    return () => window.removeEventListener('scroll', updateCompactState)
  }, [])

  return (
    <header className={`navbar${isCompact ? ' is-compact' : ''}`}>
      <div className="navbar-top" aria-hidden={isCompact}>
        <div className="mark" aria-hidden="true">{profile.handle[0]}</div>
        <strong>@{profile.handle}</strong>
      </div>
      <div className="tabs" role="group" aria-label="Filter feed by category">
        {categories.map((category) => (
          <LiquidGlassButton
            width={Math.max(64, category.length * 7 + 28)}
            height={36}
            borderRadius={28}
            innerShadowColor="rgba(255, 255, 255, 0.72)"
            innerShadowBlur={12}
            innerShadowSpread={-7}
            glassTintColor="255, 255, 255"
            glassTintOpacity={0.1}
            frostBlurRadius={12}
            noiseFrequency={0.008}
            noiseStrength={18}
            key={category}
            type="button"
            className="tab"
            aria-pressed={active === category}
            onClick={() => onChange(category)}
          >
            {category}
          </LiquidGlassButton>
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
