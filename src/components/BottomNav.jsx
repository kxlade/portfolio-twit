import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icons'
import { profile } from '../data/posts'

const items = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'About', icon: 'user', href: '/about' },
  { label: 'GitHub', icon: 'github', href: profile.github, external: true },
]

const DRAG_THRESHOLD = 6 // px of sideways movement before a touch counts as a glide, not a tap

// Which item is "current" for the page we're on (post pages live under Home)
const indexForPath = (pathname) => (pathname === '/about' ? 1 : 0)

export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const activeIndex = indexForPath(pathname)

  const [hotIndex, setHotIndex] = useState(null) // item under the lens while gliding

  const navRef = useRef(null)
  const lensRef = useRef(null)
  const itemRefs = useRef([])
  const engine = useRef(null)
  const activeRef = useRef(activeIndex)
  const drag = useRef({ id: null, startX: 0, moved: false })
  const swallowClick = useRef(false)
  const lastHot = useRef(null)

  /* ---------------------------------------------------------------
     The "liquid" engine: a spring that chases a target position.
     - while you drag, the target is your finger
     - when you let go, the target is the nearest button
     Speed also stretches the lens sideways and squashes it vertically,
     which is what makes it feel like a drop of liquid.
     --------------------------------------------------------------- */
  useEffect(() => {
    const s = { x: 0, v: 0, target: 0, raf: 0, last: 0, dragging: false }
    let slots = []
    let width = 0
    let ready = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const paint = (sx = 1, sy = 1) => {
      const lens = lensRef.current
      if (lens) lens.style.transform = `translate3d(${s.x}px, 0, 0) scale(${sx}, ${sy})`
    }

    const tick = (now) => {
      const dt = Math.min((now - s.last) / 1000 || 0.016, 0.032)
      s.last = now

      // a little more springy when released, a little tighter while dragging
      const stiffness = s.dragging ? 380 : 220
      const damping = s.dragging ? 34 : 20
      s.v += (stiffness * (s.target - s.x) - damping * s.v) * dt
      s.x += s.v * dt

      const speed = Math.abs(s.v)
      const stretch = Math.min(speed / 2600, 0.4)
      const lift = s.dragging ? 1.08 : 1
      paint((1 + stretch) * lift, (1 - stretch * 0.45) * lift)

      const settled = !s.dragging && Math.abs(s.target - s.x) < 0.15 && speed < 4
      if (settled) {
        s.x = s.target
        s.v = 0
        s.raf = 0
        paint()
        return
      }
      s.raf = requestAnimationFrame(tick)
    }

    const run = () => {
      if (reduceMotion.matches) {
        s.x = s.target
        s.v = 0
        paint()
        return
      }
      if (!s.raf) {
        s.last = performance.now()
        s.raf = requestAnimationFrame(tick)
      }
    }

    const measure = () => {
      const lens = lensRef.current
      const els = itemRefs.current.filter(Boolean)
      if (!lens || els.length !== items.length) return
      slots = els.map((el) => el.offsetLeft)
      width = els[0].offsetWidth
      lens.style.width = `${width}px`
      lens.style.height = `${els[0].offsetHeight}px`
      lens.style.top = `${els[0].offsetTop}px`

      // first measure, or a resize: place the lens without animating
      if (!ready || !s.dragging) {
        s.target = slots[activeRef.current]
        s.x = s.target
        s.v = 0
        paint()
      }
      if (!ready) {
        ready = true
        lens.style.opacity = '1'
      }
    }

    const nearest = () => {
      let best = 0
      let bestDistance = Infinity
      slots.forEach((slotX, index) => {
        const distance = Math.abs(slotX - s.target)
        if (distance < bestDistance) {
          bestDistance = distance
          best = index
        }
      })
      return best
    }

    engine.current = {
      goTo(index) {
        if (!ready) return
        s.dragging = false
        s.target = slots[index]
        run()
      },
      dragTo(clientX) {
        const nav = navRef.current
        if (!ready || !nav) return 0
        const rect = nav.getBoundingClientRect()
        const wanted = clientX - rect.left - width / 2
        s.dragging = true
        s.target = Math.min(slots[slots.length - 1], Math.max(slots[0], wanted))
        run()
        return nearest()
      },
      nearest,
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (navRef.current) observer.observe(navRef.current)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(s.raf)
      engine.current = null
    }
  }, [])

  // Route changed (tap, back button, link inside a post...): glide the lens to the new page
  useEffect(() => {
    activeRef.current = activeIndex
    engine.current?.goTo(activeIndex)
  }, [activeIndex])

  /* ---------------------------------------------------------------
     Touch / mouse gestures on the whole bar
     --------------------------------------------------------------- */
  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = { id: event.pointerId, startX: event.clientX, moved: false }
  }

  const handlePointerMove = (event) => {
    const d = drag.current
    if (d.id !== event.pointerId || !engine.current) return

    if (!d.moved) {
      if (Math.abs(event.clientX - d.startX) < DRAG_THRESHOLD) return
      d.moved = true
      navRef.current?.setPointerCapture(event.pointerId)
      navRef.current?.classList.add('is-gliding')
    }

    const index = engine.current.dragTo(event.clientX)
    if (index !== lastHot.current) {
      lastHot.current = index
      setHotIndex(index)
      navigator.vibrate?.(6) // tiny tick on Android
    }
  }

  const finishDrag = (event, cancelled) => {
    const d = drag.current
    if (d.id !== event.pointerId) return
    drag.current = { id: null, startX: 0, moved: false }
    if (!d.moved) return // it was a plain tap: the link handles it

    // a drag can end with a stray click on a link: ignore it
    swallowClick.current = true
    window.setTimeout(() => { swallowClick.current = false }, 60)

    navRef.current?.classList.remove('is-gliding')
    lastHot.current = null
    setHotIndex(null)

    const target = cancelled ? activeIndex : engine.current.nearest()
    const item = items[target]

    if (item.external) {
      // GitHub is another website, so the lens returns to the current page
      engine.current.goTo(activeIndex)
      window.open(item.href, '_blank', 'noopener,noreferrer')
      return
    }

    engine.current.goTo(target)
    if (target !== activeIndex) navigate(item.href)
  }

  const lit = hotIndex ?? activeIndex

  return (
    <nav
      ref={navRef}
      className="bottom-nav"
      aria-label="Main"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event, false)}
      onPointerCancel={(event) => finishDrag(event, true)}
      onClickCapture={(event) => {
        if (swallowClick.current) {
          event.preventDefault()
          event.stopPropagation()
        }
      }}
    >
      {items.map((item, index) => {
        const className = index === lit ? 'is-hot' : undefined
        const content = (
          <>
            <Icon name={item.icon} size={21} />
            <span>{item.label}</span>
          </>
        )

        return item.external ? (
          <a
            key={item.label}
            ref={(el) => { itemRefs.current[index] = el }}
            className={className}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            draggable={false}
          >
            {content}
          </a>
        ) : (
          <NavLink
            key={item.label}
            ref={(el) => { itemRefs.current[index] = el }}
            className={className}
            to={item.href}
            end={item.href === '/'}
            aria-label={item.label}
            draggable={false}
            onClick={() => engine.current?.goTo(index)}
          >
            {content}
          </NavLink>
        )
      })}
      <span ref={lensRef} className="bottom-nav-lens" aria-hidden="true" />
    </nav>
  )
}
