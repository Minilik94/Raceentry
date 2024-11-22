<script lang="ts">
	import { Car, Mountain, Rotate3dIcon, MapPin, Waves, Flag, Bike, Truck } from 'lucide-svelte';

	interface RaceType {
		id: number;
		name: string;
		icon: typeof Car;
		description: string;
		color: string;
	}

	const raceTypes: RaceType[] = [
		{
			id: 1,
			name: 'Rally',
			icon: Car,
			description: 'Long-distance races on various terrains',
			color: 'bg-red-100 text-red-600'
		},
		{
			id: 2,
			name: 'Street Circuit',
			icon: Rotate3dIcon,
			description: 'Urban races on closed public roads',
			color: 'bg-blue-100 text-blue-600'
		},
		{
			id: 3,
			name: 'Off-Road',
			icon: Mountain,
			description: 'Challenging races on unpaved terrain',
			color: 'bg-green-100 text-green-600'
		},
		{
			id: 4,
			name: 'Track Day',
			icon: MapPin,
			description: 'Race on professional circuits',
			color: 'bg-purple-100 text-purple-600'
		},
		{
			id: 5,
			name: 'Endurance',
			icon: Flag,
			description: 'Long-duration races testing stamina',
			color: 'bg-yellow-100 text-yellow-600'
		},
		{
			id: 6,
			name: 'Motorcycle',
			icon: Bike,
			description: 'High-speed races for two-wheelers',
			color: 'bg-indigo-100 text-indigo-600'
		},
		{
			id: 7,
			name: 'Drag Racing',
			icon: Truck,
			description: 'Short-distance acceleration races',
			color: 'bg-pink-100 text-brown-600'
		},
		{
			id: 8,
			name: 'Watercraft',
			icon: Waves,
			description: 'Exciting races on water bodies',
			color: 'bg-teal-100 text-teal-600'
		}
	];
</script>

<section class="bg-white py-16">
	<div class="container mx-auto px-4">
		<h2 class="mb-4 text-center text-3xl font-bold">Find Your Race</h2>
		<p class="mb-12 text-center text-gray-600">
			Choose your challenge from our diverse range of race types
		</p>
		<div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
			{#each raceTypes as raceType (raceType.id)}
				<a
					href={`/events?type=${raceType.name.toLowerCase()}`}
					class="group flex transform flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
				>
					<div
						class={`rounded-full p-4 ${raceType.color} mb-4 transition-colors duration-300 group-hover:bg-opacity-80`}
					>
						<svelte:component this={raceType.icon} size={32} />
					</div>
					<h3
						class="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-red-600"
					>
						{raceType.name}
					</h3>
					<p class="text-sm text-gray-600">{raceType.description}</p>
				</a>
			{/each}
		</div>
		<div class="mt-12 text-center">
			<a
				href="/events"
				class="inline-block transform rounded-full bg-red-600 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-red-700"
			>
				View All Events
			</a>
		</div>
	</div>
</section>
