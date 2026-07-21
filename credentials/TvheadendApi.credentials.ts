import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TvheadendApi implements ICredentialType {
	name = 'tvheadendApi';

	displayName = 'Tvheadend API';

	icon = 'file:tvheadendApi.svg' as const;

	documentationUrl = 'https://tvheadend.org/projects/tvheadend/wiki/Htsp';

	// Tvheadend uses HTTP Basic auth; the node builds the Authorization header
	// from these credentials, so there is no generic `authenticate` block.
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://tvheadend:9981',
			required: true,
			description: 'Base URL of the Tvheadend instance (e.g. http://tvheadend:9981). No trailing slash.',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			description: 'Tvheadend username (leave empty if anonymous access is enabled)',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Tvheadend password (leave empty if anonymous access is enabled)',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/serverinfo',
		},
	};

	// No transport auth to inject here (handled inside the node); this block
	// lets the node use httpRequestWithAuthentication.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};
}
