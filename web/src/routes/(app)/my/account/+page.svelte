<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import {
		Sun,
		Moon,
		Laptop,
		User,
		Mail,
		Shield,
		LogOut,
		Camera,
		Icon,
		Loader
	} from 'lucide-svelte';
	import { browser } from '$app/environment';
	import * as Tabs from '$lib/components/ui/tabs';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { validators } from 'tailwind-merge';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateProfileSchema } from '$lib/schema.js';
	import { superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { getImageURL } from '$lib/utils.js';
	import type { User as UserTypes } from '$lib/types';

	let {
		data
	}: {
		data: {
			user: UserTypes;
			accountData: any;
		};
	} = $props();

	let theme = $state('system');
	let username = $state('john doe');
	let avatarUrl = $state('https://xsgames.co/randomusers/avatar.php?g=male');
	let isProfileDialogOpen = $state(false);
	let avatarPreview: string | null = $state(null);

	const form = superForm(data.accountData, {
		validators: zodClient(updateProfileSchema),
		onUpdated: ({ form }) => {
			if (form.message) {
				if (form.message.type == 'error') {
					toast.error(form.message.text);
				} else {
					isProfileDialogOpen = false;
					toast.success(form.message.text);
				}
			}
		}
	});

	const { enhance, delayed, form: formData, message } = form;

	const handleAvatarUpload = async (event: Event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		console.log(file);

		if (file) {
			let render = new FileReader();

			render.onload = (e) => {
				avatarPreview = e.target?.result as string;
				toast.success('Profile updated successfuly');
			};

			render.readAsDataURL(file);

			$formData.avatar = file;
		}
	};

	$effect(() => {
		applyTheme(theme);
		theme;
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

	function setTheme(newTheme: 'light' | 'dark' | 'system') {
		theme = newTheme;
		applyTheme(newTheme);
		toast.success(`Theme set to ${newTheme} mode`);
	}

	$formData.name = data.user.name;

	$effect(() => {
		if ($message?.type && $message?.type === 'success') {
			isProfileDialogOpen = false;
		}
	});
</script>

<div class="mx-auto max-w-4xl p-3">
	<Card.Root class="bg-background">
		<Card.Header class="flex flex-row items-center justify-between">
			<div>
				<Card.Title class="text-3xl font-bold">Account Settings</Card.Title>
				<Card.Description>Manage your account information and preferences</Card.Description>
			</div>
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
						onclick={() => (isProfileDialogOpen = true)}
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
					onclick={() => (isProfileDialogOpen = true)}
				>
					Change Profile
				</Button>
			</div>
			<Tabs.Root class="w-full">
				<Tabs.List class="mx-auto grid w-full grid-cols-3 ">
					<Tabs.Trigger value="account" class="data-[state=active]:bg-muted">
						<Mail class="mr-2 h-4 w-4" />
						Account</Tabs.Trigger
					>
					<Tabs.Trigger value="security" class="data-[state=active]:bg-muted">
						<Shield class="mr-2 h-4 w-4" />
						Security</Tabs.Trigger
					>
					<Tabs.Trigger value="danger" class="data-[state=active]:bg-muted">
						<LogOut class="mr-2 h-4 w-4" />
						Danger</Tabs.Trigger
					>
				</Tabs.List>
				<Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
				<Tabs.Content value="security">Change your password here.</Tabs.Content>
			</Tabs.Root>
		</Card.Content>
	</Card.Root>
</div>



<Dialog.Root bind:open={isProfileDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Update profile</Dialog.Title>
			<Dialog.Description>Update name and avatar</Dialog.Description>
		</Dialog.Header>
		<form action="?/updateProfile" enctype="multipart/form-data" method="post" use:enhance>
			<div class="relative flex flex-col gap-4">
				<Avatar.Root class="h-32 w-32">
					<Avatar.Image
						src={avatarPreview ||
							(data.user.avatar &&
								getImageURL(data.user.collectionId, data.user.id, data.user.avatar))}
						alt="Avatar Preview"
					/>
					<Avatar.Fallback>{data.user.name.charAt(0)}</Avatar.Fallback>
				</Avatar.Root>
				<Label for="new-avatar" class="absolute h-32 w-32 cursor-pointer">
					<Input
						id="new-avatar"
						name="avatar"
						type="file"
						accept="image/*"
						onchange={handleAvatarUpload}
						class="h-100 w-100 hidden cursor-pointer"
					/>
				</Label>
			</div>
			<div class="space-y-4">
				<div class="grid gap-2">
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Name</Form.Label>
								<Input
									{...props}
									placeholder={data.user.name}
									type="text"
									contenteditable="true"
									bind:value={$formData.name}
								/>
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
				</div>
			</div>

			<div class="flex justify-end">
				{#if $delayed}
					<Loader class="size-4 animate-spin" />
				{:else}
					<Button type="submit">Change Profile</Button>
				{/if}
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
