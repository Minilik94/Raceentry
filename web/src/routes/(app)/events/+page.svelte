<!-- <script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Progress from '$lib/components/ui/progress';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Calendar,
		MapPin,
		Clock,
		Users,
		Car,
		Shield,
		DollarSign,
		Flag,
		Award
	} from 'lucide-svelte';
	import { getImageURL } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedEventIndex = $state(0);
	let countdown = $state({ days: 0, hours: 0, minutes: 0, seconds: 0 });
	let mapLoaded = $state(false);
	let registrationProgress = $state(0);

	let events = $derived(data.events);
	let selectedEvent = $derived(events[selectedEventIndex]);

	$effect(() => {
		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	});

	$effect(() => {
		simulateRegistrationProgress();
	});

	function updateCountdown() {
		const eventDate = new Date(selectedEvent.date);
		const now = new Date();
		const diff = eventDate.getTime() - now.getTime();

		countdown = {
			days: Math.floor(diff / (1000 * 60 * 60 * 24)),
			hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((diff % (1000 * 60)) / 1000)
		};
	}

	function simulateRegistrationProgress() {
		const totalSpots = selectedEvent.approx_number_of_cars;
		const registeredSpots = Math.floor(Math.random() * totalSpots);
		registrationProgress = (registeredSpots / totalSpots) * 100;
	}

	function getAvatarUrl(event) {
		if (event.avatar) {
			return getImageURL(event.collectionId, event.id, event.avatar);
		}
		return `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${encodeURIComponent(event.name)}`;
	}

	// Simulating map load
	setTimeout(() => {
		mapLoaded = true;
	}, 1000);
</script>

<div class="container mx-auto space-y-8 p-4">
	{#if events.length > 1}
		<div class="flex justify-center space-x-2">
			{#each events as event, index}
				<Button
					variant={index === selectedEventIndex ? 'default' : 'outline'}
					onclick={() => (selectedEventIndex = index)}
				>
					{event.name}
				</Button>
			{/each}
		</div>
	{/if}

	<header
		class="bg-primary text-primary-foreground relative overflow-hidden rounded-lg p-8"
		in:fly={{ y: -50, duration: 500, easing: cubicOut }}
	>
		<div class="relative z-10 flex items-center space-x-4">
			<Avatar.Root class="h-20 w-20">
				<Avatar.Image src={getAvatarUrl(selectedEvent)} alt={selectedEvent.name} />
				<Avatar.Fallback>{selectedEvent.name.charAt(0)}</Avatar.Fallback>
			</Avatar.Root>
			<div>
				<h1 class="mb-2 text-4xl font-bold">{selectedEvent.name}</h1>
				<p class="text-xl opacity-90">{selectedEvent.description}</p>
				<div class="mt-4 flex items-center space-x-2">
					<Badge variant="secondary">{selectedEvent.format}</Badge>
					{#if selectedEvent.natsoft_timing}
						<Badge variant="secondary">Natsoft Timing</Badge>
					{/if}
				</div>
			</div>
		</div>
		<div
			class="from-primary to-primary-foreground absolute inset-0 bg-gradient-to-r opacity-50"
		></div>
	</header>

	<div class="grid gap-8 md:grid-cols-3">
		<Card.Root class="col-span-2">
			<Card.Header>
				<Card.Title class="text-2xl">Event Details</Card.Title>
			</Card.Header>
			<Card.Content>
				<Tabs.Root class="w-full">
					<Tabs.List>
						<Tabs.Trigger value="info">Information</Tabs.Trigger>
						<Tabs.Trigger value="location">Location</Tabs.Trigger>
						<Tabs.Trigger value="rules">Rules & Requirements</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="info" class="space-y-4 pt-4">
						<div class="flex items-center space-x-2">
							<Calendar class="text-primary" />
							<span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
						</div>
						<div class="flex items-center space-x-2">
							<Clock class="text-primary" />
							<span>{selectedEvent.sessions}</span>
						</div>
						<div class="flex items-center space-x-2">
							<Users class="text-primary" />
							<span>Approx. {selectedEvent.approx_number_of_cars} cars</span>
						</div>
						<div class="flex items-center space-x-2">
							<Car class="text-primary" />
							<span>{selectedEvent.eligible_cars}</span>
						</div>
						<div class="flex items-center space-x-2">
							<DollarSign class="text-primary" />
							<span>£{selectedEvent.cost}</span>
						</div>
						<div class="flex items-center space-x-2">
							<Flag class="text-primary" />
							<span>{selectedEvent.format}</span>
						</div>
					</Tabs.Content>
					<Tabs.Content value="location" class="space-y-4 pt-4">
						<div class="flex items-center space-x-2">
							<MapPin class="text-primary" />
							<span>{selectedEvent.location} - {selectedEvent.layout}</span>
						</div>
						<div class="bg-muted aspect-video overflow-hidden rounded-lg">
							{#if mapLoaded}
								<img
									src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(-0.6,52.0)/-0.6,52.0,13,0/800x400@2x?access_token=pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xrMTRlOXR1MDJoMDNkbzZwZGR3bTlsNSJ9.xKqkXYwFVhxkMPbGBUTdxQ"
									alt="Event location map"
									class="h-full w-full object-cover"
									in:fade
								/>
							{:else}
								<div class="flex h-full w-full items-center justify-center">
									<span class="loading loading-spinner loading-lg"></span>
								</div>
							{/if}
						</div>
					</Tabs.Content>
					<Tabs.Content value="rules" class="space-y-4 pt-4">
						<div class="flex items-center space-x-2">
							<Shield class="text-primary" />
							<span>AASA License: {selectedEvent.aasa_license ? 'Required' : 'Not Required'}</span>
						</div>
						<p>Second Driver: {selectedEvent.second_driver_policy}</p>
						<p>Passengers: {selectedEvent.passenger_policy}</p>
						<p>Engine Requirement: {selectedEvent.engine_requirement ? 'Yes' : 'No'}</p>
						<p>Additional Info: {selectedEvent.additional_infos}</p>
					</Tabs.Content>
				</Tabs.Root>
			</Card.Content>
		</Card.Root>

		<div class="space-y-8">
			<Card.Root>
				<Card.Header>
					<Card.Title>Countdown to Event</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="grid grid-cols-4 gap-4 text-center">
						{#each Object.entries(countdown) as [unit, value]}
							<div class="bg-primary/10 rounded-lg p-2">
								<div class="text-2xl font-bold">{value}</div>
								<div class="text-muted-foreground text-sm">{unit}</div>
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Registration Status</Card.Title>
				</Card.Header>
				<Card.Content>
					<Progress.Root value={registrationProgress} class="w-full">
						<Progress.Indicator
							style="transform: translateX(-{100 - registrationProgress}%)"
							class="bg-primary h-full w-full"
						/>
					</Progress.Root>
					<p class="text-muted-foreground mt-2 text-center text-sm">
						{Math.round(registrationProgress)}% of spots filled
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Quick Actions</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					<Button class="w-full" onclick={() => alert('Registration process started!')}
						>Register Now</Button
					>
					<Button
						variant="outline"
						class="w-full"
						onclick={() => alert('Downloading event guide...')}>Download Event Guide</Button
					>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Event Highlights</Card.Title>
				</Card.Header>
				<Card.Content>
					<ul class="space-y-2">
						<li class="flex items-center space-x-2">
							<Award class="text-primary" />
							<span>Professional timing system</span>
						</li>
						<li class="flex items-center space-x-2">
							<Award class="text-primary" />
							<span>Experienced marshals</span>
						</li>
						<li class="flex items-center space-x-2">
							<Award class="text-primary" />
							<span>On-site catering</span>
						</li>
					</ul>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>

<style>
	:global(.loading) {
		@apply border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent;
	}
</style> -->

<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Calendar, MapPin, Users, Search } from 'lucide-svelte';
	import { getImageURL } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Events array
	let events = $derived(data.events);

	// Search term
	let searchTerm = $state('');

	let filteredEvents = $derived(() =>
		events.filter((event) => {
			console.log(event, 'event');
			event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.location.toLowerCase().includes(searchTerm.toLowerCase());
		})
	);

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Generate avatar URL for an event
	function getAvatarUrl(event) {
		if (event.avatar) {
			return getImageURL(event.collectionId, event.id, event.avatar);
		}
		return `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${encodeURIComponent(event.name)}`;
	}
</script>

<div class="container mx-auto space-y-8 p-4">
	<h1
		class="mb-8 text-center text-4xl font-bold"
		in:fly={{ y: -20, duration: 500, easing: cubicOut }}
	>
		Upcoming Racing Events
	</h1>

	<div class="relative mb-6" in:fly={{ y: -10, duration: 500, delay: 200, easing: cubicOut }}>
		<Search class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform" />
		<Input
			type="text"
			placeholder="Search events..."
			bind:value={searchTerm}
			class="w-full py-2 pl-10 pr-4"
		/>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredEvents as event, index (event.id)}
			<div
				in:fly={{ y: 20, duration: 300, delay: index * 100, easing: cubicOut }}
				out:fade={{ duration: 200 }}
			>
				<Card.Root
					class="transform overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
				>
					<div class="bg-primary relative h-48">
						<img src={getAvatarUrl(event)} alt={event.name} class="h-full w-full object-cover" />
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
					<Card.Footer class="bg-muted/50 p-4">
						<Button class="w-full" onclick={() => alert(`Viewing details for ${event.name}`)}>
							View Details
						</Button>
					</Card.Footer>
				</Card.Root>
			</div>
		{/each}
	</div>

	{#if filteredEvents.length === 0}
		<p class="text-muted-foreground text-center" in:fade>No events found matching your search.</p>
	{/if}
</div>
