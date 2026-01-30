import React from "react";
import styles from "./Stats.module.css";
import clsx from "clsx";

// --- Icons ---
const DockerIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 756.26 596.9"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M743.96,245.25c-18.54-12.48-67.26-17.81-102.68-8.27-1.91-35.28-20.1-65.01-53.38-90.95l-12.32-8.27-8.21,12.4c-16.14,24.5-22.94,57.14-20.53,86.81,1.9,18.28,8.26,38.83,20.53,53.74-46.1,26.74-88.59,20.67-276.77,20.67H.06c-.85,42.49,5.98,124.23,57.96,190.77,5.74,7.35,12.04,14.46,18.87,21.31,42.26,42.32,106.11,73.35,201.59,73.44,145.66.13,270.46-78.6,346.37-268.97,24.98.41,90.92,4.48,123.19-57.88.79-1.05,8.21-16.54,8.21-16.54l-12.3-8.27ZM189.67,206.39h-81.7v81.7h81.7v-81.7ZM295.22,206.39h-81.7v81.7h81.7v-81.7ZM400.77,206.39h-81.7v81.7h81.7v-81.7ZM506.32,206.39h-81.7v81.7h81.7v-81.7ZM84.12,206.39H2.42v81.7h81.7v-81.7ZM189.67,103.2h-81.7v81.7h81.7v-81.7ZM295.22,103.2h-81.7v81.7h81.7v-81.7ZM400.77,103.2h-81.7v81.7h81.7v-81.7ZM400.77,0h-81.7v81.7h81.7V0Z" />
  </svg>
);

const StarIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);

const LicenseIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

// --- Individual Card Component ---
const StatCard = ({ icon: Icon, number, label, highlight, colorClass }) => (
  <div className={clsx(styles.card, styles[colorClass])}>
    <div className={styles.iconWrapper}>
      <Icon />
    </div>
    <div className={styles.content}>
      <div className={styles.number}>{number}</div>
      <div className={styles.label}>
        {label}{" "}
        {highlight && <span className={styles.highlight}>{highlight}</span>}
      </div>
    </div>
  </div>
);

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Card 1: Adoption */}
          <a
            href="https://hub.docker.com/r/gotenberg/gotenberg"
            className={styles.linkWrapper}
          >
            <StatCard
              icon={DockerIcon}
              number="50M+"
              label="Docker Pulls"
              colorClass="blue"
            />
          </a>

          {/* Card 2: Community */}
          <a
            href="https://github.com/gotenberg/gotenberg"
            className={styles.linkWrapper}
          >
            <StatCard
              icon={StarIcon}
              number="11k+"
              label="GitHub Stars"
              highlight="❤️"
              colorClass="yellow"
            />
          </a>

          {/* Card 3: Safety */}
          <StatCard
            icon={LicenseIcon}
            number="MIT"
            label="Open Source License"
            colorClass="teal"
          />
        </div>
      </div>
    </section>
  );
}
