<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Loader } from 'lucide-svelte';

	let { passwordForm } = $props();

	const {
		enhance: enhancePass,
		delayed: delayedPass,
		form: formPass,
		message: messagePass,
		errors: errorPass
	} = passwordForm;
</script>

<form action="?/updatePassword" method="POST" use:enhancePass>
	<div class="grid gap-4">
		<div class="grid gap-2">
			<Form.Field form={passwordForm} name="currentPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>CurrentPassword</Form.Label>
						<Input {...props} type="password" bind:value={$formPass.currentPassword} />
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="grid gap-2">
			<Form.Field form={passwordForm} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input {...props} type="password" bind:value={$formPass.password} />
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="grid gap-2">
			<Form.Field form={passwordForm} name="passwordConfirm">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>PasswordConfirm</Form.Label>
						<Input {...props} type="password" bind:value={$formPass.passwordConfirm} />
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Button type="submit" class="w-full">
			{#if $delayedPass}
				<Loader class="size-4 animate-spin" />
			{:else}
				Update
			{/if}</Button
		>
	</div>
</form>
