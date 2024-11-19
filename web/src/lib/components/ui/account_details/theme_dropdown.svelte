<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon, Laptop } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let currentTheme: 'light' | 'dark' | 'system';

	function applyTheme(selectedTheme: string) {
		const root = document.documentElement;

		if (
			selectedTheme === 'dark' ||
			(selectedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}

		localStorage.setItem('theme', selectedTheme);
	}

	function setTheme(newTheme: 'light' | 'dark' | 'system') {
		currentTheme = newTheme;
		applyTheme(newTheme);
		toast.success(`Theme set to ${newTheme} mode`);
		dispatch('themeChange', { newTheme });
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item onclick={() => setTheme('light')}>
			<Sun class="mr-2 h-4 w-4" />
			<span>Light</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => setTheme('dark')}>
			<Moon class="mr-2 h-4 w-4" />
			<span>Dark</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => setTheme('system')}>
			<Laptop class="mr-2 h-4 w-4" />
			<span>System</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
