<script>
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<Toaster richColors position="top-right" />

<div class="flex h-screen items-center justify-center border">
	{@render children()}
</div>
