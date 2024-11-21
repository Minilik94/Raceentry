<script lang="ts">
	import { LayoutDashboardIcon as DashboardIcon, Bug as ReportsIcon } from 'lucide-svelte';
	import UsersIcon from 'lucide-svelte/icons/users';
	import EventsIcon from 'lucide-svelte/icons/calendar';
	import RegistrationsIcon from 'lucide-svelte/icons/file-text';
	import SettingsIcon from 'lucide-svelte/icons/settings';
	import Menu from 'lucide-svelte/icons/menu';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Logo } from '.';

	// Define items for different roles
	const adminItems = [
		{ title: 'Dashboard', url: '/', icon: DashboardIcon },
		{ title: 'Users', url: '#', icon: UsersIcon },
		{ title: 'Events', url: '/events', icon: EventsIcon },
		{ title: 'Registrations', url: '#', icon: RegistrationsIcon },
		{ title: 'Reports', url: '#', icon: ReportsIcon },
		{ title: 'Settings', url: '#', icon: SettingsIcon }
	];

	const userItems = [
		{ title: 'Dashboard', url: '/', icon: DashboardIcon },
		{ title: 'Events', url: '/events', icon: EventsIcon },
		{ title: 'Vehicles', url: '/vehicles', icon: EventsIcon },
		{ title: 'Registrations', url: '/registrations', icon: RegistrationsIcon }
	];

	let { data } = $props();

	let role = $state(data?.user?.role[0]);

	// Determine items to display based on role
	let items = role === 'admin' ? adminItems : userItems;
</script>

<Sidebar.Root>
	<Sidebar.Content class="flex flex-col items-end justify-between">
		<Sidebar.Group class="space-y-8">
			<Sidebar.GroupLabel>
				<div class="mx-auto h-20 w-24">
					<Logo />
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
				class="hover:bg-muted mx-auto flex w-full cursor-pointer items-center gap-1 rounded-md  p-3 px-8 text-sm capitalize"
			>
				<Menu />
				<div class=" md:inline-block">More</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="min-w-sm w-[16rem] rounded-xl p-3 shadow-lg">
				<DropdownMenu.Group class="w-full">
					<a href="/" class="w-full">
						<DropdownMenu.Item class="flex w-full cursor-pointer items-center gap-2 p-3 ">
							<SettingsIcon />Settings
						</DropdownMenu.Item></a
					>
					<a href="/my/account">
						<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
							<UsersIcon /> Account
						</DropdownMenu.Item></a
					>
					<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3">
						<ReportsIcon /> Projects
					</DropdownMenu.Item>
					<DropdownMenu.Separator class="h-2" />
					<form action="/logout" method="POST">
						<DropdownMenu.Item class="p-3">
							<button type="submit" class="h-full w-full">Log out</button>
						</DropdownMenu.Item>
					</form>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Content>
</Sidebar.Root>
