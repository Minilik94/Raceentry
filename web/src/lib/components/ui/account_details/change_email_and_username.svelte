<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Loader } from 'lucide-svelte';

	let { data, accountForm } = $props();

	const {
		enhance: enhanceAccount,
		delayed: accountDelayed,
		form: accountFormData,
		message: accountMessage,
		errors: accountErrors
	} = accountForm;

	$accountFormData.email = data.user.email;
	$accountFormData.username = data.user.username;
</script>

<form action="?/updateAccount" method="POST" use:enhanceAccount>
	<div class="grid gap-4">
		<div class="grid gap-2">
			<Form.Field form={accountForm} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input
							{...props}
							placeholder="e@example.com"
							type="email"
							bind:value={$accountFormData.email}
						/>
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="grid gap-2">
			<Form.Field form={accountForm} name="username">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Username</Form.Label>
						<Input {...props} type="text" bind:value={$accountFormData.username} />
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Button
			type="submit"
			class="w-full"
			disabled={data.user.email === $accountFormData.email &&
				data.user.username === $accountFormData.username}
		>
			{#if $accountDelayed}
				<Loader class="size-4 animate-spin" />
				Updating...
			{:else}
				Update
			{/if}</Button
		>
	</div>
</form>
