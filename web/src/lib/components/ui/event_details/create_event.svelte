<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createEventSchema } from '$lib/schema';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import { Switch } from '$lib/components/ui/switch';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import { Calendar as CalendarIcon, Loader } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';

	let { data, open = $bindable(false) } = $props();

	const form = superForm(data.form, {
		validators: zodClient(createEventSchema),
		onUpdated: ({ form }) => {
			if (form.message) {
				if (form.message.type === 'error') {
					toast.error(form.message.text);
				} else {
					toast.success(form.message.text);
				}
			}
		}
	});

	const { enhance, delayed, message, form: formData } = form;

	const df = new DateFormatter('en-US', { dateStyle: 'long' });

	let value = $state<DateValue | undefined>();
	let contentRef = $state<HTMLElement | null>(null);

	$effect(() => {
		if (value) {
			$formData.date = value.toString();
		}
	});

	let avatarPreview: string | null = $state(null);

	const handleAvatarUpload = async (event: Event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			let reader = new FileReader();

			reader.onload = (e) => {
				avatarPreview = e.target?.result as string;
				toast.success('Avatar preview updated');
			};

			reader.readAsDataURL(file);

			$formData.avatar = file;
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[90vh] overflow-y-auto sm:max-w-[800px] no-scrollbar">
		<Dialog.Header>
			<Dialog.Title
				class="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-2xl font-bold text-transparent"
			>
				Create New Event
			</Dialog.Title>
			<Dialog.Description>
				Fill in the details to create an exciting new racing event
			</Dialog.Description>
		</Dialog.Header>
		<form
			action="?/createNewEvent"
			enctype="multipart/form-data"
			method="post"
			use:enhance
			class="mt-4 grid grid-cols-1 gap-6 pb-6 md:grid-cols-2"
		>
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Event Name</Form.Label>
						<Input {...props} bind:value={$formData.name} placeholder="Enter event name" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="location">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Location</Form.Label>
						<Input {...props} bind:value={$formData.location} placeholder="Enter event location" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="description" class="md:col-span-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Description</Form.Label>
						<Textarea
							{...props}
							bind:value={$formData.description}
							placeholder="Describe your event"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="date">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Date</Form.Label>
						<Popover.Root>
							<Popover.Trigger
								class={cn(
									buttonVariants({
										variant: 'outline',
										class: 'w-full justify-start text-left font-normal'
									}),
									!value && 'text-muted-foreground'
								)}
							>
								<CalendarIcon class="mr-2 h-4 w-4" />
								{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
							</Popover.Trigger>
							<Popover.Content bind:ref={contentRef} class="w-auto p-0">
								<Calendar type="single" bind:value />
							</Popover.Content>
						</Popover.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="cost">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Cost</Form.Label>
						<Input
							type="number"
							{...props}
							bind:value={$formData.cost}
							placeholder="Enter event cost"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="approx_number_of_cars">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Approx. Number of Cars</Form.Label>
						<Input
							type="number"
							{...props}
							bind:value={$formData.approx_number_of_cars}
							placeholder="Enter number of cars"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="format">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Format</Form.Label>
						<Input {...props} bind:value={$formData.format} placeholder="Enter event format" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="layout">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Track Layout</Form.Label>
						<Input {...props} bind:value={$formData.layout} placeholder="Enter track layout" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="sessions">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Sessions</Form.Label>
						<Input {...props} bind:value={$formData.sessions} placeholder="Enter session details" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="eligible_cars">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Eligible Cars</Form.Label>
						<Input
							{...props}
							bind:value={$formData.eligible_cars}
							placeholder="Enter eligible car types"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="second_driver_policy">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Second Driver Policy</Form.Label>
						<Input
							{...props}
							bind:value={$formData.second_driver_policy}
							placeholder="Enter second driver policy"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="passenger_policy">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Passenger Policy</Form.Label>
						<Input
							{...props}
							bind:value={$formData.passenger_policy}
							placeholder="Enter passenger policy"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="natsoft_timing">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center space-x-2">
							<Switch {...props} bind:checked={$formData.natsoft_timing} />
							<Label>Natsoft Timing</Label>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="aasa_license">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center space-x-2">
							<Switch {...props} bind:checked={$formData.aasa_license} />
							<Label>AASA License Required</Label>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="engine_requirement">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center space-x-2">
							<Switch {...props} bind:checked={$formData.engine_requirement} />
							<Label>Engine Requirement</Label>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="avatar" class="md:col-span-2">
				<Form.Control>
					<Form.Label>Event Avatar</Form.Label>
					<Label for="new-avatar" class="block h-32 w-full cursor-pointer">
						<Input
							id="new-avatar"
							name="avatar"
							type="file"
							accept="image/*"
							onchange={handleAvatarUpload}
							class="hidden"
						/>
						<div
							class="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
						>
							{#if avatarPreview}
								<img
									src={avatarPreview}
									alt="Avatar preview"
									class="h-full w-full rounded-lg object-cover"
								/>
							{:else}
								<span class="text-gray-500">Upload Image</span>
							{/if}
						</div>
					</Label>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="additional_infos" class="md:col-span-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Additional Information</Form.Label>
						<Textarea
							{...props}
							bind:value={$formData.additional_infos}
							placeholder="Enter any additional information"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex justify-end space-x-2 md:col-span-2">
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
				{#if $delayed}
					<Button disabled>
						<Loader class="mr-2 h-4 w-4 animate-spin" />
						Creating Event...
					</Button>
				{:else}
					<Button
						type="submit"
						class="bg-gradient-to-r from-red-600 to-amber-600 text-white hover:from-red-700 hover:to-amber-600"
					>
						Create Event
					</Button>
				{/if}
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
