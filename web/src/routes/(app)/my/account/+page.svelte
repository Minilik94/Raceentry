<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Camera, Moon, Sun, User, Mail, Shield, Bell, Key, Smartphone } from 'lucide-svelte';
	import { Toaster, toast } from 'svelte-sonner';

	let username = 'John Doe';
	let email = 'john.doe@example.com';
	let avatarUrl = 'https://xsgames.co/randomusers/avatar.php?g=male';
	let isUsernameDialogOpen = false;
	let isEmailDialogOpen = false;
	let newUsername = '';
	let newEmail = '';
	let isDarkMode = false;
	let activeTab = 'general';

	onMount(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		setTheme(prefersDark);
	});

	function setTheme(dark: boolean) {
		isDarkMode = dark;
		document.documentElement.classList.toggle('dark', dark);
	}

	function handleAvatarUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				avatarUrl = e.target?.result as string;
				toast.success('Profile picture updated successfully!');
			};
			reader.readAsDataURL(file);
		}
	}

	function handleUsernameSubmit() {
		username = newUsername;
		isUsernameDialogOpen = false;
		toast.success('Username updated successfully!');
	}

	function handleEmailSubmit() {
		email = newEmail;
		isEmailDialogOpen = false;
		toast.success('Email updated successfully!');
	}

	const tabs = [
		{ id: 'general', label: 'General', icon: User },
		{ id: 'security', label: 'Security', icon: Shield },
		{ id: 'notifications', label: 'Notifications', icon: Bell }
	];
</script>

<div class="container mx-auto max-w-4xl p-6">
	<Card.Root class="bg-background">
		<Card.Header>
			<div class="flex items-center justify-between">
				<Card.Title class="text-3xl font-bold">Account Settings</Card.Title>
				<Button variant="ghost" size="icon" onclick={() => setTheme(!isDarkMode)}>
					{#if isDarkMode}
						<Sun class="h-5 w-5" />
					{:else}
						<Moon class="h-5 w-5" />
					{/if}
				</Button>
			</div>
			<Card.Description>Manage your account information and preferences</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="mb-8 flex items-center space-x-6">
				<div class="relative">
					<Avatar.Root class="h-24 w-24">
						<Avatar.Image src={avatarUrl} alt={username} />
						<Avatar.Fallback>{username.charAt(0)}</Avatar.Fallback>
					</Avatar.Root>
					<label
						for="avatar-upload"
						class="bg-primary text-primary-foreground hover:bg-primary/90 absolute bottom-0 right-0 cursor-pointer rounded-full p-2 transition-colors"
					>
						<Camera class="h-4 w-4" />
					</label>
					<input
						id="avatar-upload"
						type="file"
						accept="image/*"
						class="hidden"
						on:change={handleAvatarUpload}
					/>
				</div>
				<div>
					<h2 class="text-2xl font-semibold">{username}</h2>
					<p class="text-muted-foreground">Member since January 1, 2023</p>
				</div>
			</div>

			<Tabs.Root value={activeTab} class="w-full" onValueChange={(value) => (activeTab = value)}>
				<Tabs.List class="grid w-full grid-cols-3 gap-4">
					{#each tabs as tab}
						<Tabs.Trigger value={tab.id} class="flex items-center justify-center space-x-2">
							<svelte:component this={tab.icon} class="h-4 w-4" />
							<span>{tab.label}</span>
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
				<div class="mt-6">
					<Tabs.Content value="general" class="space-y-6">
						<div class="grid gap-4 md:grid-cols-2">
							<div class="space-y-2">
								<Label for="username">Username</Label>
								<div class="flex items-center space-x-2">
									<Input id="username" value={username} readonly />
									<Button onclick={() => (isUsernameDialogOpen = true)}>Change</Button>
								</div>
							</div>
							<div class="space-y-2">
								<Label for="email">Email</Label>
								<div class="flex items-center space-x-2">
									<Input id="email" value={email} readonly />
									<Button onclick={() => (isEmailDialogOpen = true)}>Change</Button>
								</div>
							</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="security" class="space-y-6">
						<div class="grid gap-4 md:grid-cols-2">
							<div class="space-y-2">
								<Label for="password">Password</Label>
								<div class="flex items-center space-x-2">
									<Input id="password" type="password" value="********" readonly />
									<Button>Change</Button>
								</div>
							</div>
							<div class="space-y-2">
								<Label for="2fa">Two-Factor Authentication</Label>
								<Button variant="outline" class="w-full justify-start">
									<Shield class="mr-2 h-4 w-4" />
									Enable 2FA
								</Button>
							</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="notifications" class="space-y-6">
						<div class="grid gap-4 md:grid-cols-2">
							<div class="space-y-2">
								<Label>Email Notifications</Label>
								<Button variant="outline" class="w-full justify-start">
									<Mail class="mr-2 h-4 w-4" />
									Manage Email Preferences
								</Button>
							</div>
							<div class="space-y-2">
								<Label>Push Notifications</Label>
								<Button variant="outline" class="w-full justify-start">
									<Smartphone class="mr-2 h-4 w-4" />
									Manage Push Notifications
								</Button>
							</div>
						</div>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</Card.Content>
	</Card.Root>
</div>

<Dialog.Root bind:open={isUsernameDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Change Username</Dialog.Title>
			<Dialog.Description>
				Enter your new username below. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form on:submit|preventDefault={handleUsernameSubmit}>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="new-username" class="text-right">Username</Label>
					<Input id="new-username" bind:value={newUsername} class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={isEmailDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Change Email</Dialog.Title>
			<Dialog.Description>
				Enter your new email address below. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form on:submit|preventDefault={handleEmailSubmit}>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="new-email" class="text-right">Email</Label>
					<Input id="new-email" type="email" bind:value={newEmail} class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

