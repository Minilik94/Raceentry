<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Loader } from 'lucide-svelte';

	let { open = $bindable(false), vehicleForm } = $props();

	const {
		enhance: enhanceVehicle,
		delayed: vehicleDelayed,
		form: vehicleFormData,
		message: vehicleMessage,
		errors: vehicleErrors
	} = vehicleForm;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[600px] no-scrollbar">
		<Dialog.Header>
			<Dialog.Title class="text-2xl font-bold">Add New Vehicle</Dialog.Title>
			<Dialog.Description>Enter the details of your new racing machine.</Dialog.Description>
		</Dialog.Header>
		<form action="?/addNewVehicle" method="POST" use:enhanceVehicle class="mt-4">
			<div class="grid max-h-[60vh] gap-6 overflow-y-auto px-6 no-scrollbar">
				<div class="grid grid-cols-2 gap-4">
					<Form.Field form={vehicleForm} name="car_year">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Car Year</Form.Label>
								<Input {...props} type="number" bind:value={$vehicleFormData.car_year} />
							{/snippet}
						</Form.Control>
						<Form.Description>Enter the year of the vehicle</Form.Description>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field form={vehicleForm} name="car_make">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Car Make</Form.Label>
								<Input {...props} type="text" bind:value={$vehicleFormData.car_make} />
							{/snippet}
						</Form.Control>
						<Form.Description>Enter the make of the vehicle</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<Form.Field form={vehicleForm} name="car_model">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Car Model</Form.Label>
								<Input {...props} type="text" bind:value={$vehicleFormData.car_model} />
							{/snippet}
						</Form.Control>
						<Form.Description>Enter the model of the vehicle</Form.Description>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field form={vehicleForm} name="car_colour">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Car Colour</Form.Label>
								<Input {...props} type="text" bind:value={$vehicleFormData.car_colour} />
							{/snippet}
						</Form.Control>
						<Form.Description>Enter the colour of the vehicle</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
				</div>

				<Form.Field form={vehicleForm} name="drivetrain_layout">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Drivetrain Layout</Form.Label>
							<Select.Root
								type="single"
								bind:value={$vehicleFormData.drivetrain_layout}
								name={props.name}
							>
								<Select.Trigger {...props}>
									{$vehicleFormData.drivetrain_layout
										? $vehicleFormData.drivetrain_layout
										: 'Select drivetrain layout'}
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="RWD" label="RWD" />
									<Select.Item value="FWD" label="FWD" />
									<Select.Item value="AWD" label="AWD" />
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.Description>Select the drivetrain layout</Form.Description>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field form={vehicleForm} name="induction">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Induction</Form.Label>
							<Select.Root type="single" bind:value={$vehicleFormData.induction} name={props.name}>
								<Select.Trigger {...props}>
									{$vehicleFormData.induction
										? $vehicleFormData.induction
										: 'Select induction type'}
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="NA" label="NA" />
									<Select.Item value="TURBO" label="TURBO" />
									<Select.Item value="SC" label="SC" />
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.Description>Select the induction type</Form.Description>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field form={vehicleForm} name="tyre_treadwear">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Tyre Treadwear</Form.Label>
							<Select.Root
								type="single"
								bind:value={$vehicleFormData.tyre_treadwear}
								name={props.name}
							>
								<Select.Trigger {...props}>
									{$vehicleFormData.tyre_treadwear
										? $vehicleFormData.tyre_treadwear
										: 'Select tyre treadwear'}
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="over200" label="Over 200" />
									<Select.Item value="above200" label="Above 200" />
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.Description>Select the tyre treadwear</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="mt-6 flex justify-end">
				{#if $vehicleDelayed}
					<Button disabled>
						<Loader class="mr-2 h-4 w-4 animate-spin" />
						Adding Vehicle...
					</Button>
				{:else}
					<Button
						type="submit"
						class="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-pink-700"
					>
						Add Vehicle
					</Button>
				{/if}
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
