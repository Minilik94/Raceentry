<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { getImageURL, formatDate } from '$lib/utils';
	import { Calendar, MapPin, Users, Plus } from 'lucide-svelte';
	import { CreateEvent } from '$lib/components/ui/event_details/';

	let { data } = $props();
	let dialogOpen = $state(false);
</script>

<div class="container mx-auto space-y-12 p-8">
	<header class="space-y-4 text-center">
		<h1
			class="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-5xl font-extrabold text-transparent"
		>
			Racing Events
		</h1>
		<p class="text-muted-foreground mx-auto max-w-2xl text-xl">
			Discover and join exhilarating track day events. Push your limits and experience the thrill of
			high-speed racing.
		</p>
	</header>

	<div class="flex justify-end">
		{#if data.user.role[0] === 'admin'}
			<Button
				class="bg-gradient-to-r from-red-600 to-amber-600 text-white transition-all duration-300 hover:from-red-700 hover:to-pink-700"
				onclick={() => (dialogOpen = true)}
			>
				<Plus class="mr-2 h-4 w-4" />
				Create Event
			</Button>
		{/if}
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each data.events as event, index (event.id)}
			<div
				in:fly={{ y: 20, duration: 300, delay: index * 100, easing: cubicOut }}
				out:fade={{ duration: 200 }}
			>
				<Card.Root
					class="bg-card overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
				>
					<div class="relative h-56">
						<img
							src={event?.avatar && getImageURL(event.collectionId, event.id, event.avatar)}
							alt={event.name}
							class="h-full w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
						<div class="absolute bottom-4 left-4 right-4">
							<h2 class="mb-1 text-2xl font-bold text-white">{event.name}</h2>
							<p class="line-clamp-2 text-sm text-white/90">{event.description}</p>
						</div>
					</div>
					<Card.Content class="space-y-4 p-6">
						<div class="flex items-center space-x-3 text-sm">
							<Calendar class="h-5 w-5 text-purple-500" />
							<span>{formatDate(event.date)}</span>
						</div>
						<div class="flex items-center space-x-3 text-sm">
							<MapPin class="h-5 w-5 text-brown-500" />
							<span>{event.location}</span>
						</div>
						<div class="flex items-center space-x-3 text-sm">
							<Users class="h-5 w-5 text-indigo-500" />
							<span>Approx. {event.approx_number_of_cars} participants</span>
						</div>
						<div class="flex flex-wrap gap-2 pt-2">
							<Badge variant="secondary" class="bg-transparent">{event.format}</Badge
							>
							{#if event.natsoft_timing}
								<Badge variant="secondary" class="bg-transparent">Natsoft Timing</Badge>
							{/if}
						</div>
					</Card.Content>
					<Card.Footer class="bg-muted/50 flex flex-col space-y-3 p-6">
						<Button
							class="w-full bg-gradient-to-r from-red-600 to-amber-600 text-white transition-all duration-300 hover:from-red-700 hover:to-pink-700"
							onclick={() => (window.location.href = `/events/${event.id}`)}
						>
							View Details
						</Button>
						{#if data.user.role[0] === 'admin'}
							<Button
								variant="outline"
								class="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
								href={`/events/edit/${event.id}`}
							>
								Edit Event
							</Button>
						{/if}
					</Card.Footer>
				</Card.Root>
			</div>
		{/each}
	</div>

	<CreateEvent bind:open={dialogOpen} {data} />
</div>
