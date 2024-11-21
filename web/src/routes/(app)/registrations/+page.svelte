<!-- <script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Loader } from 'lucide-svelte';


</script>

<form action="?/register" method="POST">
	<div class="grid gap-4">
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
							{$vehicleFormData.induction ? $vehicleFormData.induction : 'Select induction type'}
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
					<Select.Root type="single" bind:value={$vehicleFormData.tyre_treadwear} name={props.name}>
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

	<div class="flex justify-end">
		{#if $vehicleDelayed}
			<Loader class="size-4 animate-spin" />
		{:else}
			<Button type="submit">Add Vehicle</Button>
		{/if}
	</div>
</form> -->
