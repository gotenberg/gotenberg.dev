import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./styles.module.css";

const MODES = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function Icon({ name, className }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width="18"
    >
      {name === "system" && (
        <>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M8 22h8m-4-4v4" />
        </>
      )}
      {name === "light" && (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </>
      )}
      {name === "dark" && (
        <path d="M20.5 13.1A8.5 8.5 0 0 1 10.9 3.5a8.5 8.5 0 1 0 9.6 9.6Z" />
      )}
      {name === "chevron" && <path d="m6 9 6 6 6-6" />}
      {name === "check" && <path d="m5 12 4 4L19 6" />}
    </svg>
  );
}

export default function NavbarColorModeToggle({ className }) {
  const { colorModeChoice, setColorMode } = useColorMode();
  const selectedMode = colorModeChoice ?? "system";
  const selectedOption =
    MODES.find(({ value }) => value === selectedMode) ?? MODES[0];
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const menuId = useId();

  useEffect(() => {
    if (isOpen) optionRefs.current[activeIndex]?.focus();
  }, [isOpen, activeIndex]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
    };
  }, [isOpen]);

  const openMenu = () => {
    setActiveIndex(MODES.indexOf(selectedOption));
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const selectMode = (mode) => {
    setColorMode(mode === "system" ? null : mode);
    closeMenu();
  };

  const handleOptionKeyDown = (event, index) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index + 1) % MODES.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index + MODES.length - 1) % MODES.length);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(MODES.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        closeMenu();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={clsx(styles.container, className)}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={`Color theme: ${selectedOption.label}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu();
          } else if (event.key === "Escape" && isOpen) {
            event.preventDefault();
            closeMenu();
          }
        }}
      >
        <Icon name={selectedMode} className={styles.icon} />
        <span className={styles.triggerLabel}>{selectedOption.label}</span>
        <Icon name="chevron" className={styles.chevron} />
      </button>
      <div
        id={menuId}
        role="menu"
        aria-label="Color theme"
        className={styles.menu}
        hidden={!isOpen}
      >
        {MODES.map(({ value, label }, index) => {
          const selected = value === selectedMode;
          return (
            <button
              key={value}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={selected}
              tabIndex={isOpen && activeIndex === index ? 0 : -1}
              className={clsx(styles.option, selected && styles.selected)}
              onClick={() => selectMode(value)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              <Icon name={value} className={styles.icon} />
              <span>{label}</span>
              {selected && <Icon name="check" className={styles.check} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
