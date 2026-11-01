# nexus-icons-unified

Lucide icons with NEXUS semantic aliases, dynamic name lookup and static named exports. The current implementation uses **Lucide only**. Heroicons, Tabler, Bootstrap and Ionicons are not integrated, and this package does not ship TypeScript declarations.

## Usage

Prefer a static named export when the icon is known at build time:

```jsx
import { ArrowUpRight } from 'nexus-icons-unified';
<ArrowUpRight size={24} aria-label="Open details" />
```

Use the dynamic API when the name is selected at runtime:

```jsx
import { Icon, getIcon, getAvailableIcons, searchIcons } from 'nexus-icons-unified';
<Icon name="nexus-create" size={24} aria-label="Create" />
<Icon name="arrow-up-right" size={24} aria-label="Open details" />
getIcon('arrowupright'); // Same component as ArrowUpRight
searchIcons('nexus');  // Includes semantic NEXUS aliases
getAvailableIcons();   // Names accepted by the lookup API
```

Unknown, malformed and prototype-property names fall back to HelpCircle. The registry is built lazily when dynamic lookup is needed. Dynamic lookup retains the full supported icon namespace; static named imports can be tree-shaken by a compatible bundler.

## Build and validation

`npm ci --ignore-scripts` installs the committed development graph. `npm test` builds ESM/CommonJS package entries and checks name resolution, aliases, safe fallbacks, actual SVG rendering and static-import bundling. `npm pack --dry-run --ignore-scripts` inspects the distributable files.

The pinned local browser fixture, with React external, measured 746 bytes for a static ArrowUpRight import versus 398,036 bytes for the dynamic Icon registry. This is a specific fixture, not an application-wide size guarantee.

Tests use React 18.3.1 and lucide-react 0.263.1. The existing React peer range is retained; React 19, consumer page styling, icon labels/contrast and human accessibility acceptance remain separate adoption checks. No package publication or downstream migration is performed by this review branch.

## License

MIT © Mattlk13. Lucide remains an external MIT-licensed peer dependency; retain its notices when distributing a downstream bundle.
