<script lang="ts">
    import Circute from "$lib/components/ui/Icons/coastal_circuit.jpg"
    import Mountain from "$lib/components/ui/Icons/mountain_peak_challenge.webp"
    import Desert from "$lib/components/ui/Icons/desert_rally_championship.webp"

	interface Event {
		id: number;
		name: string;
		date: string;
		location: string;
		description: string;
		registrationDeadline: string;
		image: string;
		status: string;
		maxParticipants: number;
		participantsRegistered: number;
	}

	const events = $state<Event[]>([
		{
			id: 1,
			name: 'Desert Rally Championship',
			date: '2024-05-12',
			location: 'Nevada Desert',
			description: 'An intense off-road race across the Nevada desert.',
			registrationDeadline: '2024-04-30',
			image: Desert,
			status: 'upcoming',
			maxParticipants: 150,
			participantsRegistered: 120
		},
		{
			id: 2,
			name: 'Coastal Circuit',
			date: '2024-06-18',
			location: 'California Coastline',
			description: "A scenic yet challenging race along California's coastline.",
			registrationDeadline: '2024-06-01',
			image: Circute,
			status: 'open',
			maxParticipants: 200,
			participantsRegistered: 75
		},
		{
			id: 3,
			name: 'Mountain Peak Challenge',
			date: '2024-07-15',
			location: 'Rocky Mountains',
			description: 'A high-altitude race for skilled racers in rugged terrain.',
			registrationDeadline: '2024-07-01',
			image: Mountain,
			status: 'open',
			maxParticipants: 100,
			participantsRegistered: 40
		}
	]);

	function formatDate(dateString: string): string {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	}
</script>

<section class="bg-gray-100 py-12">
	<div class="container mx-auto px-4">
		<h2 class="mb-8 text-center text-3xl font-bold">Upcoming Races Near You</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each events as event (event.id)}
				<div
					class="transform overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
				>
					<img
						src={event.image}
						alt={event.name}
						class="h-48 w-full object-cover"
					/>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold">{event.name}</h3>
						<p class="mb-2 text-gray-600">{formatDate(event.date)}</p>
						<p class="mb-4 text-gray-600">{event.location}</p>
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-gray-500">
								{event.participantsRegistered}/{event.maxParticipants} registered
							</span>
							<button
								class="rounded bg-red-600 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700"
							>
								Register
							</button>
						</div>
					</div>
					<div
						class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 opacity-0 transition-opacity duration-300 hover:opacity-100"
					>
						<div class="p-4 text-center text-white">
							<p class="mb-2 font-bold">Event Highlights</p>
							<p>{event.description}</p>
							<p class="mt-2">Registration Deadline: {formatDate(event.registrationDeadline)}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Any additional custom styles can be added here */
</style>
