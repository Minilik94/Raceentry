<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Mail, Shield, LogOut, Camera } from 'lucide-svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { onMount } from 'svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { updateProfileSchema, updateAccountSchema, updatePasswordSchema } from '$lib/schema.js';
	import { getImageURL, hanldeSuperForm } from '$lib/utils.js';
	import type { User as UserTypes } from '$lib/types';
	import {
		ChangeEmailAndUsername,
		ChangeAvatarAndName,
		DeleteAccount,
		ChangePassword,
		ThemeDropdown
	} from '$lib/components/ui/account_details';
	import { browser } from '$app/environment';

	let {
		data
	}: {
		data: {
			user: UserTypes;
			accountData: any;
			profileData: any;
			passwordData: any;
		};
	} = $props();

	let theme: boolean = $state(browser && localStorage.getItem('theme'));
	let username = $state('john doe');
	let avatarUrl = $state('https://xsgames.co/randomusers/avatar.php?g=male');
	let isProfileDialogOpen = $state(false);

	const dispatch = createEventDispatcher();

	const form = hanldeSuperForm(data.accountData, updateProfileSchema, "profile")
	const accountForm = hanldeSuperForm(data.profileData, updateAccountSchema, 'account');
	const passwordForm = hanldeSuperForm(data.passwordData, updatePasswordSchema, 'password');

	const { enhance, form: formData, message } = form;

	$effect(() => {
		applyTheme(theme);
	});

	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'system';
		theme = savedTheme;
	});

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

	$formData.name = data.user.name;

	$effect(() => {
		if ($message?.type && $message?.type === 'success') {
			handleProfileDialogChange(false);
		}
	});

	function handleProfileDialogChange(open: boolean) {
		isProfileDialogOpen = open;
		dispatch('profileDialogChange', { open });
	}
</script>

<div class="mx-auto max-w-4xl p-3">
	<Card.Root class="bg-background">
		<Card.Header class="flex flex-row items-center justify-between">
			<div>
				<Card.Title class="text-3xl font-bold">Settings</Card.Title>
				<Card.Description>Manage your account information and preferences</Card.Description>
			</div>
			<ThemeDropdown />
		</Card.Header>
		<Card.Content>
			<div class="mb-8 flex items-center space-x-6">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="relative">
					<Avatar.Root class="h-24 w-24">
						<Avatar.Image
							src={data.user.avatar
								? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
								: avatarUrl}
							alt={username}
						/>
						<Avatar.Fallback>{data.user.name}</Avatar.Fallback>
					</Avatar.Root>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						onclick={() => handleProfileDialogChange(true)}
						class="bg-primary text-primary-foreground hover:bg-primary/90 absolute bottom-0 right-0 cursor-pointer rounded-full p-2 transition-colors"
					>
						<Camera class="h-4 w-4" />
					</div>
				</div>
				<div>
					<h2 class="text-2xl font-semibold">{data.user.name} ({data.user.username})</h2>
					<p class="text-muted-foreground">Member since January 1, 2023</p>
				</div>
			</div>
			<div class="my-8 flex w-full justify-end">
				<Button
					class="flex w-fit justify-end rounded-sm p-4 shadow"
					onclick={() => handleProfileDialogChange(true)}
				>
					Change Profile
				</Button>
			</div>
			<Tabs.Root class="w-full" value="account">
				<Tabs.List class="mx-auto grid w-full grid-cols-3 ">
					<Tabs.Trigger value="account" class="data-[state=active]:bg-muted">
						<Mail class="mr-2 h-4 w-4" />
						Account
					</Tabs.Trigger>
					<Tabs.Trigger value="security" class="data-[state=active]:bg-muted">
						<Shield class="mr-2 h-4 w-4" />
						Security
					</Tabs.Trigger>
					<Tabs.Trigger value="danger" class="data-[state=active]:bg-muted">
						<LogOut class="mr-2 h-4 w-4" />
						Danger
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<Card.Root>
						<Card.Header>
							<Card.Title>Account Details</Card.Title>
							<Card.Description>you can update your email and username here</Card.Description>
						</Card.Header>
						<Card.Content>
							<ChangeEmailAndUsername {data} {accountForm} />
						</Card.Content>
					</Card.Root>
				</Tabs.Content>
				<Tabs.Content value="security">
					<ChangePassword {passwordForm} />
				</Tabs.Content>
				<Tabs.Content value="danger" class="space-y-6">
					<DeleteAccount />
				</Tabs.Content>
			</Tabs.Root>
		</Card.Content>
	</Card.Root>
</div>

<ChangeAvatarAndName
	{data}
	{form}
	isOpen={isProfileDialogOpen}
	on:profileDialogChange={({ detail }) => handleProfileDialogChange(detail.open)}
/>
