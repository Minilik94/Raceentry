<script lang="ts">
	import { UserPlus, Search, Flag } from 'lucide-svelte';

	const steps = [
		{
			Icon: UserPlus,
			title: 'Sign Up',
			description: 'Easy registration for users.'
		},
		{
			Icon: Search,
			title: 'Browse Events',
			description: 'Find races by location, date, or type.'
		},
		{
			Icon: Flag,
			title: 'Race & Track Progress',
			description: 'Manage registrations and view race details.'
		}
	];
</script>

<section class="bg-gray-50 py-16">
	<div class="container mx-auto px-4">
		<h2 class="mb-12 text-center text-3xl font-bold">How It Works</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each steps as step, index}
				<div class="flex flex-col items-center text-center">
					<div class="mb-4 rounded-full bg-red-600 p-4 text-white">
						<step.Icon size={32} />
					</div>
					<h3 class="mb-2 text-xl font-semibold">Step {index + 1}: {step.title}</h3>
					<p class="text-gray-600">{step.description}</p>
				</div>
			{/each}
		</div>
		<div class="mt-12 text-center">
			<a
				href="/how-it-works"
				class="inline-block transform rounded-full bg-red-600 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-red-700"
			>
				Learn More
			</a>
		</div>
	</div>
</section>
