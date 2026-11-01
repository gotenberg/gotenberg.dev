import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";

export function Section({ id, children }) {
  return (
    <section className={cx("cb-sec")} id={id}>
      <div className={cx("g9-wrap")}>{children}</div>
    </section>
  );
}

export function SectionHead({ n, kicker, title, accent, lede, children }) {
  return (
    <div className={cx("xb-head")}>
      <div>
        <span className={cx("xb-kicker")}>
          <b className={cx("xb-kicker__n")}>{n}</b>
          {kicker}
        </span>
        <h2 className={cx("cb-h2")}>
          {title} <span>{accent}</span>
        </h2>
      </div>
      <div>
        <p className={cx("xb-head__lede")}>{lede}</p>
        <p className={cx("xb-head__p")}>{children}</p>
      </div>
    </div>
  );
}

const RadioContext = createContext(null);

const KEYS = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

// Options where exactly one is on, as a radio group: Tab stops on the
// checked option, the arrow keys move the choice. A disabled group checks
// nothing.
export function RadioGroup({
  label,
  value,
  onChange,
  disabled,
  className,
  children,
}) {
  const onKeyDown = (event) => {
    const radios = [
      ...event.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)'),
    ];
    const i = radios.indexOf(document.activeElement);
    if (i < 0) return;
    let to;
    if (event.key === "Home") to = 0;
    else if (event.key === "End") to = radios.length - 1;
    else if (KEYS[event.key]) {
      to = (i + KEYS[event.key] + radios.length) % radios.length;
    } else return;
    event.preventDefault();
    radios[to].focus();
    radios[to].click();
  };

  return (
    <div
      className={cx(className) || undefined}
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      onKeyDown={onKeyDown}
    >
      <RadioContext.Provider value={{ value, onChange, disabled }}>
        {children}
      </RadioContext.Provider>
    </div>
  );
}

export function Radio({ value, label, className, children }) {
  const group = useContext(RadioContext);
  const on = !group.disabled && value === group.value;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      aria-label={label}
      tabIndex={on ? 0 : -1}
      disabled={group.disabled}
      className={cx(className, on && "is-on") || undefined}
      onClick={() => group.onChange(value)}
    >
      {children}
    </button>
  );
}

// A row of buttons where exactly one is on. Options are [value, label].
export function Segmented({ label, options, value, onChange, className }) {
  return (
    <RadioGroup
      label={label}
      value={value}
      onChange={onChange}
      className={["xb-seg", className]}
    >
      {options.map(([v, text]) => (
        <Radio key={String(v)} value={v}>
          {text}
        </Radio>
      ))}
    </RadioGroup>
  );
}

export function Switch({ on, onToggle, className, children }) {
  return (
    <button
      type="button"
      className={cx(className, on && "is-on")}
      aria-pressed={on}
      onClick={onToggle}
    >
      <span className={cx("xb-switch")} aria-hidden="true" />
      {children}
    </button>
  );
}

export function StartButton() {
  return (
    <Link
      className={cx("xb-btn xb-btn--primary")}
      to="/docs/getting-started/introduction"
    >
      Getting started
      <span className={cx("xb-btn__icon")}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function StarIcon({ size }) {
  return (
    <svg
      className={cx("xb-btn__star")}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
    </svg>
  );
}

export function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1400);
  };

  return (
    <button
      type="button"
      className={cx("xb-copy", done && "is-done")}
      onClick={copy}
      aria-label={done ? "Copied" : "Copy the command"}
    >
      <svg
        className={cx("xb-copy__i")}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="11" height="11" rx="2.5" />
        <path d="M5 15V6.5A1.5 1.5 0 0 1 6.5 5H15" />
      </svg>
      <svg
        className={cx("xb-copy__ok")}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
      <span className={cx("xb-copy__tip")} aria-hidden="true">
        Copied
      </span>
    </button>
  );
}

const RUN = 'docker run --rm -p "3000:3000" gotenberg/gotenberg:9';

// The command that starts Gotenberg, with its copy button.
export function RunCommand() {
  return (
    <div className={cx("xb-run")}>
      <div className={cx("g9-code")}>
        <div className={cx("ln pr wrap")}>
          <span className={cx("t-c")}>docker run</span>{" "}
          <span className={cx("t-f")}>--rm -p</span>{" "}
          <span className={cx("t-s")}>"3000:3000"</span> gotenberg/gotenberg:9
        </div>
      </div>
      <CopyButton text={RUN} />
    </div>
  );
}

// Highlighted lines from requests.js.
export function CodeLines({ lines }) {
  return (
    <div className={cx("g9-code")}>
      {lines.map((line, i) => (
        <div key={i} className={cx(line.cls)}>
          {line.parts.map((p, j) => (
            <span key={j} className={cx(p.c) || undefined}>
              {p.t}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function CodeBar({ title, copy }) {
  return (
    <div className={cx("xb-code__bar")}>
      <span>{title}</span>
      {copy && <CopyButton text={copy} />}
    </div>
  );
}

// A request, with its copy button, and its response when given.
export function CodePanel({ title, request, res }) {
  return (
    <div className={cx("xb-code")}>
      <CodeBar title={title} copy={request.text} />
      <CodeLines lines={request.lines} />
      {res && (
        <>
          <div className={cx("xb-sep")}>Response</div>
          <CodeLines lines={res} />
        </>
      )}
    </div>
  );
}
