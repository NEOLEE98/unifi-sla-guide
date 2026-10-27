# UniFi WAN SLA guide

A static, interactive guide for adding, editing, assigning, and applying WAN SLA profiles in UniFi Network. The recreated console uses fictional names, documentation-only addresses, and example.com probe hosts. No original screenshots are included.

Languages: English, Traditional Chinese, and Simplified Chinese. The language switcher translates the guide and mock console and remembers the selection locally.

## Run locally

Requires Node.js 22 or later. There are no third-party dependencies or installation step.

```sh
npm run dev
```

Open http://127.0.0.1:4173/unifi-sla-guide.github.io/ to preview the same project subpath used by GitHub Pages. Opening `index.html` directly also works.

```sh
npm test
npm run build
```

Checks cover all 45 localized step views, dictionary parity, highlight targets, and the Auto → select new SLA → pending change → Apply Changes / Cancel → verify flow. Build output in `_site/` contains only the public HTML, CSS, JavaScript, and `.nojekyll` files.

## GitHub Pages deployment

Repository: [NEOLEE98/unifi-sla-guide.github.io](https://github.com/NEOLEE98/unifi-sla-guide.github.io).

1. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
2. Push to `main`, or run **Validate and deploy GitHub Pages** from the Actions tab.
3. Wait for the deployment job to finish.

Expected URL: **https://neolee98.github.io/unifi-sla-guide.github.io/**

This is a project site: the repository name differs from the owner's `NEOLEE98.github.io` user-site name. All site assets use relative paths so deployment under this subpath works without configuration.

The workflow validates pull requests without deploying them. Pushes to `main` and manual runs validate, stage, and deploy the guide with the standard GitHub Pages actions. No deployment secrets, external hosting service, or Sites manifest are required.

Alternatively, this buildless site supports branch publishing: choose **Deploy from a branch → main → / (root)** instead of GitHub Actions. Use one publishing source at a time.

## Files

- `index.html`: guide structure and language selector.
- `app.js`: recreated console, walkthrough, highlights, and pending/apply/cancel state.
- `i18n.js`: all three translation dictionaries.
- `style.css`, `console.css`: guide and console styles.
- `check.mjs`: dependency-free validation.
- `scripts/`: local preview and public-file staging.
- `.github/workflows/pages.yml`: validation and deployment.

The existing-profile editor is explicitly illustrative. Labels and save controls may vary by UniFi version; Chinese console labels are teaching translations. This project is independent of Ubiquiti.

Reference: [Ubiquiti WAN SLA documentation](https://help.ui.com/hc/en-us/articles/360052548713-WAN-Failover-Load-Balancing-and-Port-Remapping-on-UniFi-Gateways).
