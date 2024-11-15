<script lang="ts">
	import { AppSidebar } from '$lib/components';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<Sidebar.Trigger />
		<div class="">
			{@render children()}
		</div>
	</main>
</Sidebar.Provider>
