import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * Local override of config-svelte's shared default config -- same shape,
 * but with explicit adapter-static options so it always writes to the
 * plain "build" directory regardless of environment. config-svelte calls
 * adapter() with no options, which makes adapter-static auto-detect
 * Vercel (VERCEL env var) and switch to its own zero-config Build Output
 * API v3 mode (writing .vercel/output instead of build/). That directory
 * is relative to wherever the build command's cwd ends up -- which, for
 * our Vercel buildCommand ("pnpm --filter=slot_v1 run build"), is this
 * package's own directory, not the repo root where Vercel's vercel.json
 * lives and where it looks for .vercel/output. The mismatch produced a
 * deployment stuck in "Error" status with a clean build log and no
 * visible error (see docs/DECISIONS.md). Passing explicit options here
 * keeps output at a deterministic "build" path, matching every local
 * build already verified this session.
 */
export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ pages: 'build', assets: 'build' }),
		output: {
			bundleStrategy: 'inline',
		},
	},
};
