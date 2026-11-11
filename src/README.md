# Site Design and Components

Guidelines for modifying site design, React components, styles, or layout.

## Stack

- Docusaurus 3.10 (React 19)
- CSS Modules (`.module.css`) for components, global CSS (`src/css/custom.css`) for theme overrides
- Fonts: Bricolage Grotesque Variable (display: headings, wordmark), system sans (text and UI), JetBrains Mono Variable (code, small labels); self-hosted via Fontsource. The homepage sets its own pair, Barlow Condensed 700 (capitals) and Barlow 500/700 (text), imported in `src/components/homepage/index.js`
- Icons: inline SVGs in React components (no icon library)
- Images: `@docusaurus/plugin-ideal-image` for optimization

## Design system

Ink on warm paper, set like a product. The docs' look: Bricolage display headings, system sans text, rounded panels, a single indigo for interaction, and rubric red strictly rationed to printer's marks. The homepage shares the paper, the indigo, the mono and the code palette, and draws the rest like an assembly manual (see Homepage below).

### Colors

One indigo across the homepage and docs. It clears WCAG AA on paper (~7.7:1) and behind white button/announcement text, so no separate text shade is needed. In dark mode the primary is the light indigo `#a5b4fc`.

| Token                           | Value                          | Usage                                                                      |
| ------------------------------- | ------------------------------ | -------------------------------------------------------------------------- |
| `--ifm-color-primary`           | `#4338ca`                      | The one indigo: links, CTAs, active states, highlights, field names, fills |
| `--ifm-color-primary-light`     | `#818cf8`                      | Lighter indigo for accents on the dark ink-plate band                      |
| `--accent-text`                 | alias of `--ifm-color-primary` | Body-size links (kept as a name; the primary clears AA directly)           |
| `--rubric`                      | `#b42318`                      | Printer's marks only: pilcrows, required flags, folios                     |
| `--ifm-background-color`        | `#fdfcfa`                      | Paper                                                                      |
| `--paper-shade`                 | `#f6f5f1`                      | Alternating sections, table headers, technical zones                       |
| `--ink-plate`                   | `#1c1917` (dark: `#0f1214`)    | Footer; code panels in dark mode                                           |
| `--ifm-heading-color`           | `#1f1c19`                      | Headings, booktabs rules                                                   |
| `--ifm-color-content`           | `#38332e`                      | Body text                                                                  |
| `--ifm-color-content-secondary` | `#6e675e`                      | Secondary text, sidebar links                                              |
| `--ifm-border-color`            | `#e6e2da`                      | Hairlines, dividers                                                        |
| `--panel`                       | `#ffffff` (dark: `#1d2226`)    | Panels and cards on the paper                                              |
| `--panel-2`                     | `#f3f1ec` (dark: `#23292e`)    | Panel bars, segmented-control tracks                                       |

HTTP method badges: tinted background with dark text (WCAG AA), e.g. POST `rgba(73,204,144,0.16)` / `#036b4e`, clearing 4.5:1 on the panel bar. Never white text on pastel fills.

### Typography

- Headings (h1-h4), the brand wordmark, footer titles and prev/next titles: `--font-display` (Bricolage), weight 700 (h1 800), tight negative letter-spacing
- Prose and UI (body text, sidebar, TOC, footer links, buttons, badges, param lists): system sans
- Navbar links: system sans, sentence case, a rounded tint on hover. The version, theme and search controls share the homepage's control look: 36px tall, `--radius-sm` corners, on a panel
- Sidebar: system sans, an indigo tint on the current page, category headers as small uppercase labels, HTTP method badges in mono
- Brand mark: the Gutenberg caricature (`static/img/logo.png`) as the navbar logo, with the "Gotenberg" wordmark in the display type. The footer shows the animated pixel-art press (`static/img/press-animated.svg`, generated in the art repository) at 120px, three times its 40px grid, at full strength (the theme's dimmed logo link is overridden) and centred over the copyright in its column
- Headings carry no rule or underline
- Lede: the paragraph after h1 renders larger (1.2rem) in heading ink
- Stats and tables: lining tabular numerals
- Code: JetBrains Mono Variable, ligatures disabled. Code panels are white in light mode and the ink plate in dark mode, with a title bar and a square copy button. One palette (`--code-*` in `custom.css`) colors Prism and the homepage; every color clears 4.5:1 on its panel
- Tables, admonitions, API endpoints and prev/next links are panels too; tabs are a segmented control, as on the homepage
- Links: `--accent-text` underline with muted decoration color, full color on hover
- Panels: `--radius` (14px) corners, a 1px `--ifm-border-color` border; a stronger border on hover when the panel is a link
- Corners: `--radius` (14px) for containers, `--radius-sm` (8px) for controls inside them, 4px for inline code and small badges, fully round for pills. Illustrations keep their own

### Spacing

- Max content width: 840px (`.theme-doc-markdown`)
- Container width: 1366px
- Navbar height: 4rem
- Theme selector in the navbar: System (default), Light, or Dark. System follows the OS setting

## Components

### Homepage (`src/components/homepage/`)

Drawn like an assembly manual: one isometric drawing runs down the page. The press prints in the hero, its sheets stack on an indigo slab, drop behind the sections, and land on a second slab above the closing call to action. Navy line work (`--w`, 2.25px, for what is built and for the page's borders; thinner for paper), white sheets, Barlow Condensed capitals, numbered callouts, dashed lines for what moves.

`index.js` composes `Hero` (text and `Scene`), then `Drop`, `Sponsors`, `Parts` and `Closing`.

- Sponsors sit right under the hero: they matter to the project, so keep them high on the page. Their cards stay white, logos in color, in both themes. They hover like the docs' sponsors band: the primary on a card's border, the rubric red on the call to sponsor.
- `iso.js` is the drawing kit: `projector()` turns isometric units into screen points, `Box`, `Cylinder`, `Sheet` and `Stack` draw with it, `SheetGlyph` is one loose sheet as its own SVG. Tones (`wood`, `iron`, `flat`, `hot`) pick a part's three fills from the tokens on `.hp`, so both themes come from the stylesheet. Sheets keep a navy line in dark mode: they are paper.
- `Scene.js` stacks SVG layers on one view box, one per moving part, so nothing else is redrawn. The press works like a hand press, on one cycle (`--cycle`): the carriage rolls the blank sheet under the platen, the bar swings 65 degrees round the screw and the platen comes down, the bar returns, the carriage rolls out with the printed sheet, and that sheet flies to a stack. The bar's swing is a turn level with the ground, so on the isometric page it is a matrix per step (`pull`), with the knob following the same angles (`pull-knob`). The screw is threaded and runs up into the head, so its top never shows; its collar holds the bar, and the bar's layer comes down with the screw. A part is drawn after what it stands on and before what rests on it (the leg before the rails, the platen before the screw). A sheet in flight is its own element: one animation carries it across, another down, and that one's timing function is the dashed curve itself (`ease()`), so the sheet stays on its line. The drawing takes no clicks (`pointer-events: none`): it overlaps the hero's text column. The callouts are an `<ol>` placed over the drawing, on the paper above the slab, clear of the falling sheets; under 1100px it becomes a list under the hero and the drawing shows the numbers; under 640px that list comes right under the drawing.
- `Drop.js` is the layer of sheets falling behind the sections: eleven of them, in three lanes the layout keeps free (the page's two margins and the gap between a part's text and its request). No two alike: each has its own pace (`--time`), its own place in the lane and one of five ways of moving (`sway`, `rock`, `glide`, `flip`, `turn`). The middle lane's sheets slide out from under the slab's edge (`drift`) and stop behind the closing slab (`--stop-b`). Under 1100px the middle and right lanes share one lane along the right edge, which `.parts .col` keeps free with `--lane`. Distances use container units (`cqw`, `cqh`), so nothing is measured in JavaScript.
- `Parts.js` renders `PARTS` from `data.js`: six parts of the API, each with a small drawing (`Figures.js`), a title, two sentences, two to four docs links and one static request. The image tags are a table, one tag and its architectures per line; in a panel too narrow for it (a container query on `.code`), each family's architectures head its three tags instead. No interactive demos, and the request panel is the only box: the text sits on the paper. `data.js` builds the requests with `src/lib/requests.js` and takes the number of stages from `src/data/stages.json`; every route, field and figure must match the Gotenberg API.
- `Closing.js` is centred on the middle lane, not on the page, so the sheets land on its slab.
- `ui.js` holds the shared pieces: the buttons, the copy button, the code panel and the `docker run` command shown in the hero and the closing.
- External links use `@docusaurus/Link`, which opens them in a new tab like the navbar and footer.
- One CSS Module, `Homepage.module.css`, keeps the page's own class names; `cx.js` maps them to the module's names. Dark rules sit under `:global([data-theme="dark"])`. A font family is also named in a plain `font-family` declaration, not only in a custom property, so the production minifier keeps its `@font-face`.
- Motion: the press prints, sheets fly to the stacks, sheets drop down the page. There is no pause control, by the maintainer's choice. Under `prefers-reduced-motion` nothing moves: the carriage rests rolled out with its printed sheet, the flying sheets hold on their curves and the falling ones rest where `--rest` puts them.

### ApiEndpoint (`src/components/documentation/ApiEndpoint.js`)

Core documentation component. Renders method badge + path header, collapsible parameter lists, cURL example via Docusaurus `<CodeBlock>`, and tabbed response display via `<Tabs>`. Has its own CSS Module (`ApiEndpoint.module.css`).

### Sponsors (`src/components/documentation/Sponsors.js`)

Full-width sponsors band shown below the content on every doc page. Mounted once in `src/theme/DocRoot/Layout` (not imported per page). Two labelled groups, Sponsors and Powered by, of white logo cards in color, as on the homepage; the cards stay white in dark mode.

## Theme overrides

- `src/theme/DocSidebar/index.js`: custom sidebar with HTTP method badges via CSS pseudo-elements on `.sidebar-method-*` classes.
- `src/theme/DocRoot/Layout/index.js`: renders the full-width sponsors bandeau below the doc content (sidebar + article + TOC), above the footer.

## CSS conventions

- Use CSS custom properties (`--ifm-*`) for Docusaurus theme values.
- Name a custom property that holds a font family with "font" in it (`--font-display`, `--font-caps`). The production CSS minifier drops any `@font-face` whose family only appears in properties without "font" in their name, and `npm start` doesn't minify, so check fonts on `npm run build`.
- Use CSS Modules for component-scoped styles.
- Use `src/css/custom.css` only for global overrides (admonitions, sidebar, footer, typography).
- Transitions: `0.2s ease`. Panels and buttons change color or border on hover: they never rise, glow or carry a corner wash. Only small marks move, such as a button's arrow. Keyframe animations only on the homepage, as listed above.
- Use `clsx` for conditional class composition in React components.
- Respect Docusaurus's Infima CSS framework. Override with specificity, not `!important`.
- Use `@docusaurus/Link` for internal navigation. Use `useBaseUrl` for static asset paths.

## Responsive design

- A panel wider than its column scrolls sideways, with a shade at the edge that has more and no scrollbar. The shade is global CSS (`custom.css`, "Sideways scrolling") on docs tables, code blocks, tabs and any element with `data-scroller`. `src/clientModules/scrollAffordances.js` marks the edges that have more (`data-more-left`, `data-more-right`) as the panel scrolls, and makes a panel that scrolls a Tab stop, so the keyboard can scroll it. Don't move the shades back to covers with `background-attachment: local`: iOS Safari keeps such a background still on a panel scrolled by touch, and the covers hide both shades.
- Tables are as wide as their content, up to the column. Under 640px a table that scrolls gives its last column 16em, so a description is not one word per line.
- Identifiers wrap between their words on a phone: option names, form fields and environment variables render through `breakable()` (`Options.js`), which puts a `<wbr>` before each camelCase capital and after each underscore. Headings drop to 2.25rem under 640px, and the announcement bar keeps only its first link.
- Content padding adjusts at 996px and 1400px breakpoints.
- The homepage has breakpoints at 1100px and 640px. Above 1100px the drawing sits beside the hero's text, flush with the page's right edge up to 1440px, and each part is text, lane, request; the buttons come before the run command, which stops short of the slab's left corner. Under 1100px the drawing shrinks to the hero's right, the callouts become a list, a part's request goes under its text and the parts leave a lane on the right. Under 820px the buttons and the command sit below the slab's corner and take the width it leaves. Under 640px the hero is one column (headline, lede, the drawing at full width, its callouts, buttons, command): `.hero__txt` and `.scene` use `display: contents` so the drawing and its callouts can sit between the lede and the buttons. The callouts start under the slab's front corner, next to the numbers they name: nothing of the drawing reaches them, and the two sheets drawn past the slab's edge (`.scene__off`) are hidden. The buttons sit side by side without the arrow, down to 360px. The run command wraps instead of scrolling. A rule that sets a hero item's `max-width` in a wider breakpoint needs its match in the narrower ones (`.hero__txt > .btns`, `.hero__txt > .run`): `.hero__txt > *` alone does not override it.
- Homepage code panels carry `data-scroller`, so they scroll with the site's cue. Their lines wrap between words only: a URL stays whole.
- `.hp` uses `overflow-x: clip`, not `hidden`: the slabs bleed off the page's edge, and `hidden` would make it a scroll container.
