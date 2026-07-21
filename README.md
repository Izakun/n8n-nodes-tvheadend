<img src="nodes/Tvheadend/tvheadend.svg" width="90" align="right" alt="Tvheadend" />

# n8n-nodes-tvheadend

[![npm version](https://img.shields.io/npm/v/n8n-nodes-tvheadend.svg)](https://www.npmjs.com/package/n8n-nodes-tvheadend)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-tvheadend.svg)](https://www.npmjs.com/package/n8n-nodes-tvheadend)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-tvheadend.svg)](./LICENSE)

Community node for **n8n** to interact with **Tvheadend**. It lets you automate
Tvheadend directly from your n8n workflows using a secure stored credential.

> 🟡 **Community node** — submitted to n8n for verification (review in progress).
> Until it is approved, install it as a community node (below).

## Installation

In n8n, go to **Settings → Community Nodes → Install** and enter `n8n-nodes-tvheadend`.
Once it passes n8n's verification it will also be available directly from the **+ (Add node)** panel.

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
