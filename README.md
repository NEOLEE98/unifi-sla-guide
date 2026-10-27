# UniFi WAN SLA Guide

An interactive, step-by-step guide to configuring WAN SLA profiles in UniFi Network.

**[Open the guide →](https://neolee98.github.io/unifi-sla-guide/)**

## What it covers

- Creating an SLA profile and configuring verification servers, probe timing, and thresholds.
- Editing an existing profile.
- Switching a WAN from Auto to a custom SLA.
- Applying or cancelling pending changes and verifying the result.

The guide recreates the console with fictional example data and highlights the controls for each step. It is a teaching tool and does not connect to or change your gateway.

## Languages

English, 繁體中文, and 简体中文. Use the language selector to translate the instructions and example console. Your preference is remembered in your browser.

## Run locally

Open `index.html` directly, or use Node.js 22 or later:

```sh
npm run dev
```

Then visit [the local preview](http://127.0.0.1:4173/unifi-sla-guide/). No dependencies need to be installed.

To run the validation checks:

```sh
npm test
```

## About

This is an independent project, not affiliated with Ubiquiti. The existing-profile editor is illustrative, and labels or controls may vary by UniFi version. Chinese console labels are teaching translations.

For product details, see [Ubiquiti's WAN SLA documentation](https://help.ui.com/hc/en-us/articles/360052548713-WAN-Failover-Load-Balancing-and-Port-Remapping-on-UniFi-Gateways).
