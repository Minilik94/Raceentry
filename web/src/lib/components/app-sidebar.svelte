<script lang="ts">
	import { LayoutDashboardIcon as DashboardIcon, Bug as ReportsIcon } from 'lucide-svelte';
	import UsersIcon from 'lucide-svelte/icons/users';
	import EventsIcon from 'lucide-svelte/icons/calendar';
	import RegistrationsIcon from 'lucide-svelte/icons/file-text';
	import SettingsIcon from 'lucide-svelte/icons/settings';
	import Menu from 'lucide-svelte/icons/menu';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { mode, toggleMode } from 'mode-watcher';
	import { Logo } from '.';

	// Define items for different roles
	const adminItems = [
		{ title: 'Dashboard', url: '#', icon: DashboardIcon },
		{ title: 'Users', url: '#', icon: UsersIcon },
		{ title: 'Events', url: '#', icon: EventsIcon },
		{ title: 'Registrations', url: '#', icon: RegistrationsIcon },
		{ title: 'Reports', url: '#', icon: ReportsIcon },
		{ title: 'Settings', url: '#', icon: SettingsIcon }
	];

	const userItems = [
		{ title: 'Dashboard', url: '/welcome', icon: DashboardIcon },
		{ title: 'Events', url: '/events', icon: EventsIcon },
		{ title: 'Registrations', url: '/registrations', icon: RegistrationsIcon }
	];

	let role = 'user';

	// Determine items to display based on role
	let items = role === 'admin' ? adminItems : userItems;
</script>

<Sidebar.Root>
	<Sidebar.Content class="flex flex-col items-end justify-between">
		<Sidebar.Group class="space-y-8">
			<Sidebar.GroupLabel>
				<div class="mx-auto h-20 w-24">
					<Logo/>
				</div>
			</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu class="space-y-6">
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<a href={item.url} class="flex items-center gap-2 rounded-md px-4 py-2">
									<item.icon />
									<span>{item.title}</span>
								</a>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<!-- Dropdown menu for additional options -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="hover:bg-muted mx-auto flex w-full cursor-pointer items-center gap-1 rounded-md p-3 px-8 text-sm capitalize"
			>
				<Menu />
				<div class="ml-4 hidden md:inline-block">More</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-full rounded-xl p-3 shadow-lg">
				<DropdownMenu.Group>
					<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
						<SettingsIcon />
						<a href="/">Settings</a>
					</DropdownMenu.Item>
					<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
						<UsersIcon /> Account
					</DropdownMenu.Item>
					<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
						<ReportsIcon /> Projects
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onclick={toggleMode}
						class="flex cursor-pointer items-center gap-2 p-3"
					>
						{#if $mode === 'dark'}
							<Sun /> Light mode
						{:else}
							<Moon /> Dark mode
						{/if}
					</DropdownMenu.Item>
					<DropdownMenu.Separator class="h-2" />
					<DropdownMenu.Item class="p-3">
						<form action="/logout" method="POST">
							<button type="submit" class="h-full w-full">Log out</button>
						</form>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Content>
</Sidebar.Root>
