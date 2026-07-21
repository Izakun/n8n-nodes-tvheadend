import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class Tvheadend implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tvheadend',
		name: 'tvheadend',
		icon: { light: 'file:tvheadend.svg', dark: 'file:tvheadend.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Query your Tvheadend server through its API',
		defaults: { name: 'Tvheadend' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'tvheadendApi', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Get Channels', value: 'getChannels', action: 'Get many channels' },
					{ name: 'Get Connections', value: 'getConnections', action: 'Get active connections' },
					{ name: 'Get Recordings', value: 'getRecordings', action: 'Get many recordings' },
					{ name: 'Get Server Info', value: 'getServerInfo', action: 'Get the server info' },
				],
				default: 'getServerInfo',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: { show: { operation: ['getChannels', 'getRecordings'] } },
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('tvheadendApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;
				const param = <T>(name: string, fallback?: T) =>
					this.getNodeParameter(name, i, fallback as T) as T;

				// Only send Basic auth when credentials are provided; Tvheadend rejects an
				// empty Basic header (401) but allows anonymous access when none is sent.
				const headers: IDataObject = {};
				if (credentials.username || credentials.password) {
					headers.Authorization = `Basic ${Buffer.from(
						`${credentials.username}:${credentials.password}`,
					).toString('base64')}`;
				}

				const request = (url: string, qs?: IDataObject) =>
					this.helpers.httpRequestWithAuthentication.call(this, 'tvheadendApi', {
						method: 'GET' as IHttpRequestMethods,
						baseURL,
						url,
						qs,
						headers,
						json: true,
					} as IHttpRequestOptions);

				const handlers: Record<string, () => Promise<unknown>> = {
					getServerInfo: () => request('/api/serverinfo'),
					getConnections: () => request('/api/status/connections'),
					getChannels: () => request('/api/channel/grid', { limit: param<number>('limit', 50) }),
					getRecordings: () =>
						request('/api/dvr/entry/grid', { limit: param<number>('limit', 50) }),
				};

				const handler = handlers[operation];
				if (!handler) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const response = (await handler()) as IDataObject;
				const rows = (response?.entries as IDataObject[]) ?? null;
				if (Array.isArray(rows)) {
					for (const element of rows) {
						returnData.push({ json: element, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: response, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
