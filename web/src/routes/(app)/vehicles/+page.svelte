<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut, elasticOut } from 'svelte/easing';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Car, Gauge, Droplets, Tractor, Flag, Zap } from 'lucide-svelte';
	import { handleSuperForm } from '$lib/utils';
	import { addVehicleSchema } from '$lib/schema';
	import AddNewVehicle from '$lib/components/ui/vehicle_details';

	
	let {
		data
	}: {
		data: { vehicles: Vehicle[]; vehicleData: any };
	} = $props();

	const vehicleForm = handleSuperForm(data.vehicleData, addVehicleSchema, 'vehicle');

	interface Vehicle {
		id: string;
		car_year: number;
		car_make: string;
		car_model: string;
		car_colour: string;
		drivetrain_layout: string;
		induction: string;
		tyre_treadwear: string;
	}

	let hoveredVehicle = $state(null);
	let dialogOpen = $state(false);

	function getColorClass(color: string): string {
		const colorMap = {
			red: 'bg-red-500',
			blue: 'bg-blue-500',
			'sky blue': 'bg-sky-500',
			'light blue': 'bg-blue-300',
			'dark blue': 'bg-blue-700',
			green: 'bg-green-500',
			yellow: 'bg-yellow-500',
			black: 'bg-gray-900',
			white: 'bg-gray-100',
			silver: 'bg-gray-300',
			gray: 'bg-gray-500',
			orange: 'bg-orange-500',
			purple: 'bg-purple-500',
			brown: 'bg-amber-700',
			pink: 'bg-pink-500',
			teal: 'bg-teal-500',
			indigo: 'bg-indigo-500',
			cyan: 'bg-cyan-500'
		};

		const normalizedColor = color.toLowerCase().replace(/\s+/g, '');
		return colorMap[normalizedColor] || 'bg-gray-500';
	}

	function getTextColorClass(color: string): string {
		const darkColors = ['black', 'blue', 'darkblue', 'green', 'red', 'purple', 'brown', 'indigo'];
		const normalizedColor = color.toLowerCase().replace(/\s+/g, '');
		return darkColors.some((darkColor) => normalizedColor.includes(darkColor))
			? 'text-white'
			: 'text-gray-900';
	}

	function handleViewDetails(vehicle) {
		alert(`Viewing details for ${vehicle.car_year} ${vehicle.car_make} ${vehicle.car_model}`);
	}
</script>

<div class="container mx-auto space-y-12 p-4">
	<header class="space-y-4 text-center" in:fly={{ y: -50, duration: 1000, easing: elasticOut }}>
		<h1
			class="bg-gradient-to-r from-red-400 to-amber-600 bg-clip-text text-5xl font-extrabold text-transparent"
		>
			Your Racing Fleet
		</h1>
		<p class="text-muted-foreground text-xl">Unleash the power of your high-performance machines</p>
	</header>

	{#if data.vehicles.length > 0}
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.vehicles as vehicle, index (vehicle.id)}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore event_directive_deprecated -->
				<div
					in:scale={{ duration: 600, delay: index * 100, easing: cubicOut }}
					out:fade={{ duration: 300 }}
					on:mouseenter={() => (hoveredVehicle = vehicle.id)}
					on:mouseleave={() => (hoveredVehicle = null)}
					class="transform transition-all duration-300 hover:-translate-y-2"
				>
					<Card.Root class="group overflow-hidden transition-all duration-500 hover:shadow-2xl">
						<div class={`relative h-48 ${getColorClass(vehicle.car_colour)}`}>
							<div class="absolute inset-0 flex items-center justify-center">
								<Car class="h-24 w-24 text-white/80" />
							</div>
							<div
								class={`absolute bottom-4 left-4 right-4 transform transition-all duration-300 group-hover:translate-y-[-10px] ${getTextColorClass(vehicle.car_colour)}`}
							>
								<h2 class="mb-1 text-3xl font-bold">{vehicle.car_year} {vehicle.car_make}</h2>
								<p class="text-lg opacity-90">{vehicle.car_model}</p>
							</div>
						</div>
						<Card.Content class="space-y-6 p-6">
							<div class="flex items-center justify-between">
								<Badge
									variant={vehicle.drivetrain_layout === 'AWD' ? 'default' : 'secondary'}
									class="px-3 py-1 text-sm"
								>
									{vehicle.drivetrain_layout}
								</Badge>
								<span class="text-primary text-lg font-semibold">{vehicle.car_colour}</span>
							</div>
							<div class="grid grid-cols-2 gap-6">
								<div class="flex items-center space-x-3">
									<div class="bg-primary/10 rounded-full p-2">
										{#if vehicle.induction === 'NA'}
											<Droplets class="text-primary h-6 w-6" />
										{:else if vehicle.induction === 'TURBO'}
											<Zap class="text-primary h-6 w-6" />
										{:else if vehicle.induction === 'SC'}
											<Tractor class="text-primary h-6 w-6" />
										{:else}
											<Car class="text-primary h-6 w-6" />
										{/if}
									</div>
									<span class="text-sm font-medium">{vehicle.induction}</span>
								</div>
								<div class="flex items-center space-x-3">
									<div class="bg-primary/10 rounded-full p-2">
										<Gauge class="text-primary h-6 w-6" />
									</div>
									<span class="text-sm font-medium">
										{vehicle.tyre_treadwear === 'over200' ? 'Treadwear 200+' : 'Treadwear <200'}
									</span>
								</div>
							</div>
						</Card.Content>
						{#if hoveredVehicle === vehicle.id}
							<div
								class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								in:fade={{ duration: 200 }}
								out:fade={{ duration: 200 }}
							>
								<Flag class="h-16 w-16 animate-pulse text-white" />
							</div>
						{/if}
					</Card.Root>
				</div>
			{/each}
		</div>
	{:else}
		<div class="py-16 text-center" in:fly={{ y: 50, duration: 1000, easing: elasticOut }}>
			<Card.Root class="mx-auto max-w-md">
				<Card.Content class="pb-8 pt-10">
					<div class="mb-6">
						<Car class="text-primary mx-auto h-16 w-16 animate-bounce" />
					</div>
					<h2 class="mb-4 text-3xl font-bold">No Vehicles Added</h2>
					<p class="text-muted-foreground mb-8">
						Your garage is empty. Time to add some horsepower!
					</p>
					<Button
						size="lg"
						class="transform bg-gradient-to-r from-red-600 to-amber-600 transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-pink-700"
						on:click={() => (dialogOpen = true)}
					>
						Add Your First Vehicle
					</Button>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}

	<Button
		size="lg"
		class="transform bg-gradient-to-r from-red-600 to-amber-600 transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-pink-700"
		onclick={() => (dialogOpen = true)}
	>
		Add Your Vehicle
	</Button>

	<AddNewVehicle bind:open={dialogOpen} {vehicleForm} />
</div>
