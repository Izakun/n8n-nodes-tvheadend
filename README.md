<img src="nodes/Tvheadend/tvheadend.svg" width="90" align="right" alt="Tvheadend" />

# n8n-nodes-tvheadend

[![npm version](https://img.shields.io/npm/v/n8n-nodes-tvheadend.svg)](https://www.npmjs.com/package/n8n-nodes-tvheadend)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-tvheadend.svg)](https://www.npmjs.com/package/n8n-nodes-tvheadend)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-tvheadend.svg)](./LICENSE)
[![n8n verified](https://img.shields.io/badge/n8n-verified%20community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)

Community node for **n8n** to interact with **Tvheadend**. It lets you automate
Tvheadend directly from your n8n workflows using a secure stored credential.

> ✅ **Verified community node** — installable directly from the n8n node panel
> (self-hosted **and** n8n Cloud).

## Installation

This is a **verified** community node: in n8n click **+ (Add node)**, search for
**Tvheadend**, and add it — no manual install needed.

<details>
<summary>Manual install (older n8n, or as an unverified package)</summary>

Go to **Settings → Community Nodes → Install** and enter `n8n-nodes-tvheadend`.
</details>

## Operations

| Operation | Description |
|---|---|
| **Get Channels** | Get many channels |
| **Get Connections** | Get active connections |
| **Get Recordings** | Get many recordings |
| **Get Server Info** | Get the server info |

## Authentication

This node uses the **Tvheadend API** credential. In n8n, go to **Credentials → New**, pick
**Tvheadend API**, and fill in:

- **Base URL** — the address of your instance, e.g. `http://tvheadend:9981` (no trailing slash).
- **Username** — your account username.
- **Password** — your account password.

HTTP Basic authentication (username + password).

**Where to find it:** See the service documentation: https://tvheadend.org/projects/tvheadend/wiki/Htsp

The credential's **Test** button verifies the connection before you save.

## Usage

1. Add the **Tvheadend** node to a workflow (after a trigger such as *When clicking 'Test workflow'* or a Schedule Trigger).
2. Select your **Tvheadend API** credential.
3. Pick an **Operation** and run the workflow — the response is returned as JSON for the next node.

## Compatibility

Requires n8n **1.0** or newer. Built and linted with the official `@n8n/node-cli`, and
published to npm with a build-provenance attestation.

## Resources

- [Tvheadend](https://tvheadend.org/projects/tvheadend/wiki/Htsp)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](./LICENSE)
