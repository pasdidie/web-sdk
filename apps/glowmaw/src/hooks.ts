import type { Reroute } from '@sveltejs/kit';

/** Replay links open ".../index.html?replay=true": route them to the root page
 * instead of a client-side 404 ("Not found: /<game>/vN/index.html" in the console). */
export const reroute: Reroute = ({ url }) => {
	if (url.pathname.endsWith('/index.html')) return url.pathname.slice(0, -'index.html'.length);
};
