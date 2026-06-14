/**
 * Swizzled from @docusaurus/theme-classic Logo (v3.10.1). Only change vs. the
 * original: the wordmark's first letter is split into a `.brand-versal` span
 * so it can render as a centered, blackletter, reversed-out ink block (a
 * letterpress initial) while the remaining letters stay in the serif. The
 * letter is still part of the link text, so the accessible name reads
 * "Gotenberg". Used by both the navbar and the sidebar-on-scroll brand.
 */
import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useThemeConfig } from "@docusaurus/theme-common";
import ThemedImage from "@theme/ThemedImage";

function LogoThemedImage({ logo, alt, imageClassName }) {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );
  return imageClassName ? (
    <div className={imageClassName}>{themedImage}</div>
  ) : (
    themedImage
  );
}

export default function Logo(props) {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo?.href || "/");
  const fallbackAlt = navbarTitle ? "" : title;
  const alt = logo?.alt ?? fallbackAlt;
  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}
    >
      {logo && (
        <LogoThemedImage
          logo={logo}
          alt={alt}
          imageClassName={imageClassName}
        />
      )}
      {navbarTitle != null && (
        <b className={titleClassName}>
          <span className="brand-versal">
            <span className="brand-versal__letter">
              {navbarTitle.charAt(0)}
            </span>
          </span>
          {navbarTitle.slice(1)}
        </b>
      )}
    </Link>
  );
}
