<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { ModeWatcher } from 'mode-watcher';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>


<ModeWatcher />
{@render children()}
