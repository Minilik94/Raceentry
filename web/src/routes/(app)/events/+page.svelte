<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { getImageURL } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Calendar, MapPin, Users } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { formatDate } from '$lib/utils.js';

	let { data } = $props();
</script>

<div class="mb-4 flex justify-between">
	<!-- Create Button visible only if user is an admin -->
	{#if data.user.role[0] === 'admin'}
		<Button
			class="bg-primary hover:bg-primary-foreground text-white dark:bg-transparent dark:text-white"
			href="/events/create-events">Create Event</Button
		>
	{/if}
</div>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
	{#each data.events as event, index (event.id)}
		<div
			in:fly={{ y: 20, duration: 300, delay: index * 100, easing: cubicOut }}
			out:fade={{ duration: 200 }}
		>
			<Card.Root
				class="transform overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
			>
				<div class="bg-primary relative h-48">
					<img
						src={event?.avatar && getImageURL(event.collectionId, event.id, event.avatar)}
						alt={event.name}
						class="h-full w-full object-cover"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
					<div class="absolute bottom-4 left-4 right-4">
						<h2 class="mb-1 text-2xl font-bold text-white">{event.name}</h2>
						<p class="text-sm text-white/80">{event.description}</p>
					</div>
				</div>
				<Card.Content class="space-y-4 p-4">
					<div class="flex items-center space-x-2 text-sm">
						<Calendar class="text-primary h-4 w-4" />
						<span>{formatDate(event.date)}</span>
					</div>
					<div class="flex items-center space-x-2 text-sm">
						<MapPin class="text-primary h-4 w-4" />
						<span>{event.location}</span>
					</div>
					<div class="flex items-center space-x-2 text-sm">
						<Users class="text-primary h-4 w-4" />
						<span>Approx. {event.approx_number_of_cars} participants</span>
					</div>
					<div class="flex flex-wrap gap-2">
						<Badge variant="secondary">{event.format}</Badge>
						{#if event.natsoft_timing}
							<Badge variant="secondary">Natsoft Timing</Badge>
						{/if}
					</div>
				</Card.Content>
				<Card.Footer class="bg-muted/50 flex flex-col space-y-2 p-4">
					<Button class="w-full" href={`/events/${event.id}`}>View Details</Button>

					<!-- Edit Button visible only if user is an admin -->
					{#if data.user.role[0] === 'admin'}
						<Button
							class="bg-warning hover:text-primary dark:bg-primary-foreground w-full text-white dark:text-white"
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
