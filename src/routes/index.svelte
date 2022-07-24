<script context="module" lang="ts">
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

	/** @type {import('./__types/[baz]').Load} */
	export async function load(params: LoadEvent): Promise<LoadOutput<Record<string, any>>> {
		return {
			status: 302,
			redirect: "/products"
		};
	}
</script>
