<script lang="ts">
	import { getImageURL } from '$lib/utils';
	import type { PageData } from './$types';
	import {
		Calendar,
		MapPin,
		Users,
		Clock,
		DollarSign,
		Car,
		Info,
		CheckCircle,
		XCircle
	} from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Progress } from '$lib/components/ui/progress';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();
	let event = $derived(data.event);

	let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
	let progress = 0;

	function updateCountdown() {
		const now = new Date().getTime();
		const eventDate = new Date(event.date).getTime();
		const distance = eventDate - now;

		if (distance > 0) {
			timeLeft.days = Math.floor(distance / (1000 * 60 * 60 * 24));
			timeLeft.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			timeLeft.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			timeLeft.seconds = Math.floor((distance % (1000 * 60)) / 1000);

			// Calculate progress (assuming event duration is 1 day)
			const totalDuration = 24 * 60 * 60 * 1000; // 1 day in milliseconds
			progress = Math.min(100, Math.max(0, ((totalDuration - distance) / totalDuration) * 100));
		} else {
			timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
			progress = 100;
		}
	}

	onMount(() => {
		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	});

	function getStatusColor(status: string) {
		switch (status?.toLowerCase()) {
			case 'open':
				return 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100';
			case 'filling fast':
				return 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100';
			case 'almost full':
				return 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100';
			case 'closed':
				return 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100';
			default:
				return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100';
		}
	}
</script>

<div class="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
	<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
		<!-- Event Image and Basic Info -->
		<div class="md:col-span-2" in:fly={{ y: 20, duration: 500 }}>
			<div class="relative">
				<img
					src={getImageURL(event.collectionId, event.id, event.avatar)}
					alt={event.name}
					class="mb-6 h-64 w-full rounded-lg object-cover shadow-lg"
				/>
				<Badge class={`absolute right-4 top-4 px-3 py-1 text-lg ${getStatusColor(event.status)}`}>
					{event.status}
				</Badge>
			</div>
			<h1 class="mb-4 text-4xl font-bold dark:text-white">{event.name}</h1>
			<div class="mb-6 flex flex-wrap gap-4">
				<Badge
					variant="secondary"
					class="bg-blue-100 px-3 py-1 text-lg text-blue-800 dark:bg-blue-800 dark:text-blue-100"
				>
					<Calendar class="mr-2 inline-block" />
					{new Date(event.date).toLocaleDateString()}
				</Badge>
				<Badge
					variant="secondary"
					class="bg-purple-100 px-3 py-1 text-lg text-purple-800 dark:bg-purple-800 dark:text-purple-100"
				>
					<MapPin class="mr-2 inline-block" />
					{event.location}
				</Badge>
				<Badge
					variant="secondary"
					class="bg-teal-100 px-3 py-1 text-lg text-teal-800 dark:bg-teal-800 dark:text-teal-100"
				>
					<Users class="mr-2 inline-block" />
					{event.approx_number_of_cars} participants
				</Badge>
			</div>
			<p class="mb-6 text-lg dark:text-gray-300">{event.description}</p>
		</div>

		<!-- Countdown and Registration -->
		<div
			class="rounded-lg bg-gray-50 p-6 shadow-md dark:bg-gray-800"
			in:fly={{ x: 20, duration: 500 }}
		>
			<h2 class="mb-4 text-2xl font-semibold dark:text-white">Event Countdown</h2>
			<div class="mb-4 grid grid-cols-4 gap-4">
				{#each Object.entries(timeLeft) as [unit, value]}
					<div class="rounded-lg bg-white p-2 text-center shadow dark:bg-gray-700">
						<div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{value}</div>
						<div class="text-sm uppercase text-gray-600 dark:text-gray-400">{unit}</div>
					</div>
				{/each}
			</div>
			<Progress value={progress} class="mb-4" />
			<Button
				class="mb-4 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
				>Register Now</Button
			>
			<p class="text-center text-sm text-gray-600 dark:text-gray-400">
				{event.approx_number_of_cars - 10} spots remaining
			</p>
		</div>
	</div>

	<!-- Additional Event Details -->
	<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2" in:fade={{ duration: 500 }}>
		<div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
			<h2 class="mb-4 text-2xl font-semibold text-blue-600 dark:text-blue-400">Event Details</h2>
			<ul class="space-y-4">
				<li class="flex items-center">
					<Clock class="mr-2 text-blue-600 dark:text-blue-400" />
					<span class="dark:text-gray-300">Sessions: <strong>{event.sessions}</strong></span>
				</li>
				<li class="flex items-center">
					<DollarSign class="mr-2 text-green-600 dark:text-green-400" />
					<span class="dark:text-gray-300">Cost: <strong>${event.cost}</strong></span>
				</li>
				<li class="flex items-center">
					<Car class="mr-2 text-purple-600 dark:text-purple-400" />
					<span class="dark:text-gray-300"
						>Eligible Cars: <strong>{event.eligible_cars}</strong></span
					>
				</li>
				<li class="flex items-center">
					<Info class="mr-2 text-teal-600 dark:text-teal-400" />
					<span class="dark:text-gray-300">Format: <strong>{event.format}</strong></span>
				</li>
			</ul>
		</div>
		<div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
			<h2 class="mb-4 text-2xl font-semibold text-blue-600 dark:text-blue-400">Policies</h2>
			<ul class="space-y-4">
				<li>
					<strong class="text-gray-700 dark:text-gray-300">Second Driver Policy:</strong>
					<span class="dark:text-gray-400">{event.second_driver_policy}</span>
				</li>
				<li>
					<strong class="text-gray-700 dark:text-gray-300">Passenger Policy:</strong>
					<span class="dark:text-gray-400">{event.passenger_policy}</span>
				</li>
				<li class="flex items-center">
					<strong class="mr-2 text-gray-700 dark:text-gray-300">AASA License Required:</strong>
					{#if event.aasa_license}
						<CheckCircle class="text-green-600 dark:text-green-400" />
					{:else}
						<XCircle class="text-red-600 dark:text-red-400" />
					{/if}
				</li>
				<li class="flex items-center">
					<strong class="mr-2 text-gray-700 dark:text-gray-300">Engine Requirement:</strong>
					{#if event.engine_requirement}
						<CheckCircle class="text-green-600 dark:text-green-400" />
					{:else}
						<XCircle class="text-red-600 dark:text-red-400" />
					{/if}
				</li>
			</ul>
		</div>
	</div>

	<!-- Additional Information -->
	{#if event.additional_infos}
		<div
			class="mt-12 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
			in:fade={{ duration: 500, delay: 200 }}
		>
			<h2 class="mb-4 text-2xl font-semibold text-blue-600 dark:text-blue-400">
				Additional Information
			</h2>
			<p class="text-lg dark:text-gray-300">{event.additional_infos}</p>
		</div>
	{/if}
</div>
