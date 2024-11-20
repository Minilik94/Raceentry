<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createEventSchema } from '$lib/schema';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { CalendarIcon, Loader } from 'lucide-svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Switch } from '$lib/components/ui/switch';
	import Label from '$lib/components/ui/label/label.svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';

	import * as Popover from '$lib/components/ui/popover';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(createEventSchema),
		onUpdated: ({ form }) => {
			if (form.message) {
				if (form.message.type == 'error') {
					toast.error(form.message.text);
				} else {
					toast.success(form.message.text);
				}
			}
		}
	});

	const { enhance, delayed, message, form: formData } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

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

<Card.Root>
	<Card.Header>
		<Card.Title class="text-2xl font-bold">Create New Event</Card.Title>
		<Card.Description>Fill in the details for your track day event</Card.Description>
	</Card.Header>
	<Card.Content>
		<form action="?/createEvent" enctype="multipart/form-data" method="post" use:enhance>
			<!-- Name -->
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Event Name</Form.Label>
						<Input
							{...props}
							bind:value={$formData.name}
							placeholder="Enter event name"
						/>{/snippet}
				</Form.Control>
				<Form.Description>Give your event a catchy name</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Avatar -->
			<Form.Field {form} name="avatar">
				<Form.Control>
					<Form.Label>Event Avatar</Form.Label>
					<Label for="new-avatar" class="h-32 w-32 cursor-pointer">
						<Input
							id="new-avatar"
							name="avatar"
							type="file"
							accept="image/*"
							onchange={handleAvatarUpload}
							class="h-100 w-100 cursor-pointer"
						/>
					</Label>
				</Form.Control>
				<Form.Description>Upload an image to represent your event</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Description -->
			<Form.Field {form} name="description">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Description</Form.Label>
						<Textarea
							{...props}
							bind:value={$formData.description}
							placeholder="Describe your event"
						/>{/snippet}
				</Form.Control>
				<Form.Description>Provide details about the event</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Location -->
			<Form.Field {form} name="location">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Location</Form.Label>
						<Input
							{...props}
							bind:value={$formData.location}
							placeholder="Enter event location"
						/>{/snippet}
				</Form.Control>
				<Form.Description>Where will the event take place?</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Layout -->
			<Form.Field {form} name="layout">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Track Layout</Form.Label>
						<Input {...props} bind:value={$formData.layout} placeholder="Enter track layout" />
					{/snippet}
				</Form.Control>
				<Form.Description>Specify the track layout</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Date -->
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
				<Form.Description>When will the event take place?</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Cost -->
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
				<Form.Description>Specify the cost of the event (in USD)</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Approx. Number of Cars -->
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
				<Form.Description>Approximate number of cars expected at the event</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Format -->
			<Form.Field {form} name="format">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Format</Form.Label>
						<Input {...props} bind:value={$formData.format} placeholder="Enter event format" />
					{/snippet}
				</Form.Control>
				<Form.Description>Specify the format (e.g., Time Attack)</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Natsoft Timing -->
			<Form.Field {form} name="natsoft_timing">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center space-x-2">
							<Switch {...props} bind:checked={$formData.natsoft_timing} />
							<Label>Natsoft Timing</Label>
						</div>
					{/snippet}
				</Form.Control>
				<Form.Description>Will Natsoft timing be used?</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Sessions -->
			<Form.Field {form} name="sessions">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Sessions</Form.Label>
						<Input
							{...props}
							bind:value={$formData.sessions}
							placeholder="Enter session details"
						/>{/snippet}
				</Form.Control>
				<Form.Description
					>Describe the session structure (e.g., 3x 20-minute sessions)</Form.Description
				>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Eligible Cars -->
			<Form.Field {form} name="eligible_cars">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Eligible Cars</Form.Label>
						<Input
							{...props}
							bind:value={$formData.eligible_cars}
							placeholder="Enter eligible car types"
						/>{/snippet}
				</Form.Control>
				<Form.Description>What types of cars are eligible?</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Second Driver Policy -->
			<Form.Field {form} name="second_driver_policy">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Second Driver Policy</Form.Label>
						<Input
							{...props}
							bind:value={$formData.second_driver_policy}
							placeholder="Enter second driver policy"
						/>{/snippet}
				</Form.Control>
				<Form.Description>What's the policy on second drivers?</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Passenger Policy -->
			<Form.Field {form} name="passenger_policy">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Passenger Policy</Form.Label>
						<Input
							{...props}
							bind:value={$formData.passenger_policy}
							placeholder="Enter passenger policy"
						/>{/snippet}
				</Form.Control>
				<Form.Description>What's the policy on passengers?</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- AASA License -->
			<Form.Field {form} name="aasa_license">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center space-x-2">
							<Switch {...props} bind:checked={$formData.aasa_license} />
							<Label>AASA License Required</Label>
						</div>{/snippet}
				</Form.Control>
				<Form.Description>Is an AASA license required?</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Engine Requirement -->
			<Form.Field {form} name="engine_requirement">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center space-x-2">
							<Switch {...props} bind:checked={$formData.engine_requirement} />
							<Label>Engine Requirement</Label>
						</div>{/snippet}
				</Form.Control>
				<Form.Description>Are there any specific engine requirements?</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Additional Infos -->
			<Form.Field {form} name="additional_infos">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Additional Information</Form.Label>
						<Textarea
							{...props}
							bind:value={$formData.additional_infos}
							placeholder="Enter any additional information"
						/>{/snippet}
				</Form.Control>
				<Form.Description>Provide any other relevant details</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<div class="flex justify-end">
				{#if $delayed}
					<Loader class="size-4 animate-spin" />
				{:else}
					<Button type="submit">Create Event</Button>
				{/if}
			</div>
		</form>
	</Card.Content>
</Card.Root>
