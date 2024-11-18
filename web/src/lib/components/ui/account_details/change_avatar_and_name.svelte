<script>
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Avatar from '$lib/components/ui/avatar';
	import { enhance } from '$app/forms';
	import { getImageURL } from '$lib/utils';
	import { Loader } from 'lucide-svelte';
    
</script>



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
