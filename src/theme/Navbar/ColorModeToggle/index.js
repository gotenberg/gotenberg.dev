import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function NavbarColorModeToggle({ className }) {
  const { colorModeChoice, setColorMode } = useColorMode();

  return (
    <div className={clsx(styles.container, className)}>
      <select
        aria-label="Color theme"
        className={styles.select}
        value={colorModeChoice ?? "system"}
        onChange={(event) =>
          setColorMode(
            event.target.value === "system" ? null : event.target.value
          )
        }
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
