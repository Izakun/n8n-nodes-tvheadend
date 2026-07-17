# n8n-nodes-tvheadend

[![npm version](https://img.shields.io/npm/v/n8n-nodes-tvheadend.svg)](https://www.npmjs.com/package/n8n-nodes-tvheadend)

n8n community node for [Tvheadend](https://tvheadend.org/) — the TV streaming server/DVR — via its JSON API.

Install via **Settings -> Community Nodes -> Install** -> `n8n-nodes-tvheadend`.

## Operations
- Get Server Info / Channels / Recordings / Connections

## Credentials
Configure the base URL and authentication in the **Tvheadend API** credential.

## Usage example

Read server info:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Server Info**.
4. Execute the node — example output:

```json
{ "sw_version": "4.3", "api_version": 19, "name": "Tvheadend" }
```

## Disclaimer
Not affiliated with or endorsed by the respective project.
