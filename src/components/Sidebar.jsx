import { useEffect, useRef, useState } from "react";
import Icon from "./Icons";
import { profile } from "../data/posts";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", icon: "home", href: "/" },
  { label: "About", icon: "user", href: "/about" },
  { label: "GitHub", icon: "github", href: profile.github },
  { label: "Contact", icon: "mail", href: `mailto:${profile.email}` },
];

const MIN_WIDTH = 200;
const MAX_WIDTH = 450;
const DEFAULT_WIDTH = 260;

export default function Sidebar() {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const dragStart = useRef({ x: 0, width: DEFAULT_WIDTH });

  useEffect(() => {
    if (!isDragging) return undefined;

    const handleMouseMove = (event) => {
      const delta = event.clientX - dragStart.current.x;
      const desiredWidth = dragStart.current.width + delta;

      if (desiredWidth < MIN_WIDTH) {
        const strain = MIN_WIDTH - desiredWidth;
        setWidth(MIN_WIDTH - Math.sqrt(strain) * 3);
      } else if (desiredWidth > MAX_WIDTH) {
        const strain = desiredWidth - MAX_WIDTH;
        setWidth(MAX_WIDTH + Math.sqrt(strain) * 3);
      } else {
        setWidth(desiredWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setWidth((currentWidth) =>
        Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, currentWidth)),
      );
      setIsSnapping(true);
      window.setTimeout(() => setIsSnapping(false), 400);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const startResize = (event) => {
    event.preventDefault();
    dragStart.current = { x: event.clientX, width };
    setIsSnapping(false);
    setIsDragging(true);
  };

  const handleResizeKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const adjustment = event.key === "ArrowRight" ? 16 : -16;
    setWidth((currentWidth) =>
      Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, currentWidth + adjustment)),
    );
  };

  return (
    <nav
      className={`sidebar${isDragging ? " is-dragging" : ""}`}
      aria-label="Main"
      style={{
        width: `${width}px`,
        flexBasis: `${width}px`,
        transition:
          isSnapping ?
            "width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), flex-basis 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : "none",
      }}
    >
      <div className="mark" aria-hidden="true">
        {profile.handle[0]}
      </div>
      {navItems.map((item) =>
        item.href.startsWith("/") ?
          <NavLink
            to={item.href}
            key={item.label}
            className="nav-link"
            end={item.href === "/"}
          >
            <Icon name={item.icon} size={24} />
            <span>{item.label}</span>
          </NavLink>
          : <a
            href={item.href}
            key={item.label}
            className="nav-link"
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <Icon name={item.icon} size={24} />
            <span>{item.label}</span>
          </a>,
      )}
      <a className="btn" href={`mailto:${profile.email}`}>
        <Icon name="mail" size={20} />
        <span>Hire me</span>
      </a>

      <div
        className="sidebar-resize-handle"
        role="separator"
        aria-label="Resize navigation sidebar"
        aria-orientation="vertical"
        aria-valuemin={MIN_WIDTH}
        aria-valuemax={MAX_WIDTH}
        aria-valuenow={Math.round(
          Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width)),
        )}
        tabIndex={0}
        onMouseDown={startResize}
        onKeyDown={handleResizeKeyDown}
      />
    </nav>
  );
}
