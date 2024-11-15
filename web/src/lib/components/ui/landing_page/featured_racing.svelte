<script lang="ts">
	import { Clock } from 'lucide-svelte';
	import Electric from '$lib/components/ui/Icons/electric_vehicle_cup.webp';
	import Grand from '$lib/components/ui/Icons/grand_prix_championship.jpg';
	import Endurance from '$lib/components/ui/Icons/endurance_24_hours.jpg';

	interface FeaturedEvent {
		id: number;
		name: string;
		date: string;
		location: string;
		description: string;
		image: string;
		earlyRegistration: boolean;
	}

	const featuredEvents: FeaturedEvent[] = [
		{
			id: 1,
			name: 'Grand Prix Championship',
			date: '2024-08-20',
			location: 'Monaco',
			description:
				'Experience the thrill of the most prestigious racing event of the year. Limited spots available!',
			image: Grand,
			earlyRegistration: true
		},
		{
			id: 2,
			name: 'Endurance 24 Hours',
			date: '2024-09-15',
			location: 'Le Mans, France',
			description: 'Test your limits in this grueling 24-hour race. Do you have what it takes?',
			image: Endurance,
			earlyRegistration: false
		},
		{
			id: 3,
			name: 'Electric Vehicle Cup',
			date: '2024-10-05',
			location: 'Silicon Valley, CA',
			description: 'The future of racing is here. Join the cutting-edge EV racing competition.',
			image: Electric,
			earlyRegistration: true
		}
	];

	function formatDate(dateString: string): string {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	}
</script>

<section class="bg-white py-16">
	<div class="container mx-auto px-4">
		<h2 class="mb-12 text-center text-3xl font-bold">Featured Events</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredEvents as event (event.id)}
				<div
					class="transform overflow-hidden rounded-lg bg-gray-100 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
				>
					<img
						src={event.image}
						alt={event.name}
						class="h-48 w-full object-cover"
					/>
					<div class="p-6">
						<div class="mb-2 flex items-start justify-between">
							<h3 class="text-xl font-semibold">{event.name}</h3>
							{#if event.earlyRegistration}
								<span
									class="flex items-center rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white"
								>
									<Clock size={12} class="mr-1" />
									Early Bird
								</span>
							{/if}
						</div>
						<p class="mb-2 text-gray-600">{formatDate(event.date)}</p>
						<p class="mb-4 text-gray-600">{event.location}</p>
						<p class="mb-4 text-gray-700">{event.description}</p>
						<a
							href={`/event/${event.id}`}
							class="inline-block rounded bg-red-600 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700"
						>
							Learn More
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
