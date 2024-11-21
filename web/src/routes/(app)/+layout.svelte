<script lang="ts">
	import { AppSidebar } from '$lib/components';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Toaster } from 'svelte-sonner';
	let { children, data } = $props();
</script>

<Toaster richColors position="top-right" />
<Sidebar.Provider>
	<AppSidebar {data} />
	<main class="w-full">
		<Sidebar.Trigger />
		<div class="">
			{@render children()}
		</div>
	</main>
</Sidebar.Provider>
