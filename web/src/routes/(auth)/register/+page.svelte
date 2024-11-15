<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Loader } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { Logo } from '$lib/components';
	import { registerSchema } from '$lib/schema';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(registerSchema)
	});

	console.log(data, 'from frontend register ');

	const { enhance, delayed, errors, form: formData } = form;
</script>

<Card.Root class="mx-auto max-w-md">
	<Card.Header>
		<div class="mx-auto w-fit">
			<Logo />
		</div>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid grid-cols-2 gap-4">
					<div class="grid gap-2">
						<Form.Field {form} name="name">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Name</Form.Label>
									<Input {...props} placeholder="robert" type="text" bind:value={$formData.name} />
								{/snippet}
							</Form.Control>
							<Form.Description />
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<div class="grid gap-2">
						<Form.Field {form} name="username">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Username</Form.Label>
									<Input
										{...props}
										placeholder="robert"
										type="text"
										bind:value={$formData.username}
									/>
								{/snippet}
							</Form.Control>
							<Form.Description />
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input
									{...props}
									placeholder="e@example.com"
									type="email"
									bind:value={$formData.email}
								/>
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<Input {...props} type="password" bind:value={$formData.password} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="passwordConfirm">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>PasswordConfirm</Form.Label>
								<Input {...props} type="password" bind:value={$formData.passwordConfirm} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Button type="submit" class="w-full">
					{#if $delayed}
						<Loader class="size-4 animate-spin" />
					{:else}
						Create an account
					{/if}
				</Button>
				<Button variant="outline" class="w-full">Sign up with GitHub</Button>
			</div>
		</form>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline"> Sign in </a>
		</div>
	</Card.Content>
</Card.Root>
