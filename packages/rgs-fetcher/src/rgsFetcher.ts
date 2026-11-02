import type { paths } from './schema';
import { fetcher } from 'utils-fetcher';

// Engine's own spec for the rgs_url launch param says it "may arrive as a
// bare host... with no https://" -- implying it may also arrive WITH one.
// Unconditionally prepending "https://" produced "https://https://..." in
// that case, breaking every RGS call. Only add the scheme when missing.
const toRgsEndpoint = (rgsUrl: string, path: string) =>
	`${/^https?:\/\//i.test(rgsUrl) ? '' : 'https://'}${rgsUrl}${path}`;

export const rgsFetcher = {
	post: async function post<
		T extends keyof paths,
		TResponse = paths[T]['post']['responses'][200]['content']['application/json'],
	>(options: {
		url: T;
		rgsUrl: string;
		variables?: paths[T]['post']['requestBody']['content']['application/json'];
	}): Promise<TResponse> {
		const response = await fetcher({
			method: 'POST',
			variables: options.variables,
			endpoint: toRgsEndpoint(options.rgsUrl, options.url),
		});

		if (response.status !== 200) console.error('error', response);
		const data = await response.json();
		return data as TResponse;
	},
	get: async function get<
		T extends keyof paths,
		TResponse = paths[T]['get']['responses'][200]['content']['application/json'],
	>(options: { url: T; rgsUrl: string }): Promise<TResponse> {
		const response = await fetcher({
			method: 'GET',
			endpoint: toRgsEndpoint(options.rgsUrl, options.url),
		});

		if (response.status !== 200) console.error('error', response);
		const data = await response.json();
		return data as TResponse;
	},
};
