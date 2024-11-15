<script lang="ts">
	import Circut from '$lib/components/ui/Icons/coastal_circuit.jpg';
	import Desert from '$lib/components/ui/Icons/desert_rally_championship.webp';
	import AtomImg from '$lib/components/ui/Icons/electric_vehicle_cup.webp';
	import Urban from '$lib/components/ui/Icons/mountain_peak_challenge.webp';
	import Endurance from '$lib/components/ui/Icons/grand_prix_championship.jpg';
	import {
		Calendar,
		User,
		Search,
		Flag,
		AlertCircle,
		ChevronDown,
		ChevronUp,
		Download,
		ExternalLink,
		MapPin,
		Bell,
		CreditCard,
		FileText,
		Upload,
		Check,
		Clock,
		X,
		DollarSign,
		Newspaper
	} from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	export let data;

	console.log(data, 'from welcome page');

	interface Race {
		id: number;
		name: string;
		date: string;
		location: string;
		status: 'Registered' | 'Payment Pending' | 'Confirmed';
		image: string;
	}

	interface PastRace {
		id: number;
		name: string;
		date: string;
		location: string;
		result: string;
		certificateUrl?: string;
		resultsUrl?: string;
	}

	interface RecommendedRace {
		id: number;
		name: string;
		date: string;
		location: string;
		image: string;
		category: string;
	}

	interface Notification {
		id: number;
		type: 'info' | 'warning' | 'success';
		message: string;
		date: string;
	}

	interface Transaction {
		id: number;
		date: string;
		eventName: string;
		amount: number;
		invoiceUrl?: string;
	}

	interface NewsItem {
		id: number;
		title: string;
		excerpt: string;
		date: string;
		imageUrl: string;
		url: string;
	}

	const userName = data?.user != undefined ? data.user?.name : 'john doe';
	const userEmail = data?.user != undefined ? data.user?.email : 'john.doe@example.com';
	const profileImageUrl = 'https://xsgames.co/randomusers/avatar.php?g=male';
	const races: Race[] = [
		{
			id: 1,
			name: 'Desert Rally Championship',
			date: '2024-05-12',
			location: 'Nevada Desert',
			status: 'Confirmed',
			image: Desert
		},

		{
			id: 2,
			name: 'Coastal Circuit',
			date: '2024-06-18',
			location: 'California Coastline',
			status: 'Payment Pending',
			image: Circut
		}
	];

	const pastRaces: PastRace[] = [
		{
			id: 1,
			name: 'Mountain Trail Challenge',
			date: '2023-09-15',
			location: 'Rocky Mountains',
			result: 'Finished 3rd in category',
			certificateUrl: '/certificates/mountain-trail-2023.pdf',
			resultsUrl: '/results/mountain-trail-2023'
		},
		{
			id: 2,
			name: 'City Marathon',
			date: '2023-06-22',
			location: 'New York City',
			result: 'Personal best time',
			resultsUrl: '/results/city-marathon-2023'
		},
		{
			id: 3,
			name: 'Coastal Bike Race',
			date: '2023-04-10',
			location: 'California Coast',
			result: 'Completed',
			certificateUrl: '/certificates/coastal-bike-2023.pdf'
		}
	];

	const recommendedRaces: RecommendedRace[] = [
		{
			id: 1,
			name: 'Alpine Ski Challenge',
			date: '2024-01-15',
			location: 'Swiss Alps',
			image: AtomImg,
			category: 'Winter Sports'
		},
		{
			id: 2,
			name: 'Desert Ultra Marathon',
			date: '2024-03-20',
			location: 'Sahara Desert',
			image: Desert,
			category: 'Endurance'
		},
		{
			id: 3,
			name: 'Urban Cycling Tour',
			date: '2024-05-05',
			location: 'Amsterdam',
			image: Urban,
			category: 'Cycling'
		}
	];

	const notifications: Notification[] = [
		{ id: 1, type: 'warning', message: 'Payment pending for Coastal Circuit', date: '2023-11-10' },
		{
			id: 2,
			type: 'success',
			message: 'Registration confirmed for Desert Rally Championship',
			date: '2023-11-08'
		},
		{ id: 3, type: 'info', message: 'New race added in your area', date: '2023-11-05' }
	];

	const transactions: Transaction[] = [
		{
			id: 1,
			date: '2023-10-15',
			eventName: 'Mountain Trail Challenge',
			amount: 150,
			invoiceUrl: '/invoices/mtn-trail-2023.pdf'
		},
		{ id: 2, date: '2023-09-01', eventName: 'City Marathon', amount: 100 },
		{
			id: 3,
			date: '2023-08-20',
			eventName: 'Coastal Bike Race',
			amount: 75,
			invoiceUrl: '/invoices/coastal-bike-2023.pdf'
		}
	];

	const newsItems: NewsItem[] = [
		{
			id: 1,
			title: 'New World Record Set at Marathon Championships',
			excerpt: 'Kenyan runner breaks 2-hour barrier in an astounding feat of human endurance.',
			date: '2023-11-12',
			imageUrl: Urban,
			url: '/news/marathon-world-record'
		},
		{
			id: 2,
			title: 'Upcoming Changes to Race Registration Policies',
			excerpt: 'Important updates to our registration process to ensure fair participation.',
			date: '2023-11-10',
			imageUrl: Endurance,
			url: '/news/registration-policy-update'
		},
		{
			id: 3,
			title: 'Spotlight: Community Hero Organizes Charity Race',
			excerpt: "Local runner's initiative raises thousands for children's hospital.",
			date: '2023-11-08',
			imageUrl: 'https://xsgames.co/randomusers/avatar.php',
			url: '/news/charity-race-spotlight'
		}
	];

	let isHistoryExpanded = false;
	let outstandingBalance = 150; // Example balance

	function getStatusColor(status: Race['status']): string {
		switch (status) {
			case 'Confirmed':
				return 'bg-green-100 text-green-800';
			case 'Payment Pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'Registered':
				return 'bg-blue-100 text-blue-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function toggleHistoryExpansion() {
		isHistoryExpanded = !isHistoryExpanded;
	}

	function getNotificationIcon(type: Notification['type']) {
		switch (type) {
			case 'info':
				return Bell;
			case 'warning':
				return AlertCircle;
			case 'success':
				return Check;
			default:
				return Bell;
		}
	}

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
	}
</script>

<div class="min-h-screen bg-gray-100">
	<div class="container mx-auto px-4 py-8">
		<!-- Profile & License Information -->
		<div class="mb-8 rounded-lg bg-white p-6 shadow-md">
			<div class="mb-4 flex items-center justify-between">
				<div class="flex items-center">
					<img src={profileImageUrl} alt={userName} class="mr-4 h-16 w-16 rounded-full" />
					<div>
						<h2 class="text-xl font-bold">{userName}</h2>
						<p class="text-gray-600">{userEmail}</p>
					</div>
				</div>
				<a href="/edit-profile" class="btn bg-blue-500 text-white hover:bg-blue-600">
					<User class="mr-2 h-5 w-5" />
					Edit Profile
				</a>
			</div>
			<div class="mt-4">
				<h3 class="mb-2 font-semibold">License & Documents</h3>
				<div class="flex items-center justify-between rounded-md bg-gray-50 p-3">
					<div>
						<p class="font-medium">Racing License #12345</p>
						<p class="text-sm text-gray-600">Expires: December 31, 2024</p>
					</div>
					<span class="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800"
						>Verified</span
					>
				</div>
				<button class="btn mt-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
					<Upload class="mr-2 h-5 w-5" />
					Upload/Update Documents
				</button>
			</div>
		</div>

		<!-- Notifications & Updates -->
		<div class="mb-8 rounded-lg bg-white p-6 shadow-md">
			<h2 class="mb-4 text-xl font-bold">Recent Notifications</h2>
			{#if notifications.length > 0}
				<ul class="space-y-4">
					{#each notifications as notification (notification.id)}
						<li class="flex items-start rounded-md bg-gray-50 p-3">
							<svelte:component
								this={getNotificationIcon(notification.type)}
								class="mr-3 mt-1 h-5 w-5"
							/>
							<div class="flex-grow">
								<p
									class={notification.type === 'warning'
										? 'text-yellow-700'
										: notification.type === 'success'
											? 'text-green-700'
											: 'text-blue-700'}
								>
									{notification.message}
								</p>
								<p class="mt-1 text-xs text-gray-500">{formatDate(notification.date)}</p>
							</div>
							<button class="text-gray-400 hover:text-gray-600">
								<X class="h-5 w-5" />
							</button>
						</li>
					{/each}
				</ul>
				<button class="mt-4 text-blue-600 hover:underline">Mark all as read</button>
			{:else}
				<p class="text-gray-600">No new notifications</p>
			{/if}
		</div>

		<!-- Payment & Billing Section -->
		<div class="mb-8 rounded-lg bg-white p-6 shadow-md">
			<h2 class="mb-4 text-xl font-bold">Payment & Billing</h2>
			{#if outstandingBalance > 0}
				<div class="mb-4 border-l-4 border-yellow-400 bg-yellow-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<AlertCircle class="h-5 w-5 text-yellow-400" />
						</div>
						<div class="ml-3">
							<p class="text-sm text-yellow-700">
								You have an outstanding balance of {formatCurrency(outstandingBalance)}
							</p>
						</div>
					</div>
				</div>
				<a href="/payment" class="btn mb-6 bg-green-500 text-white hover:bg-green-600">
					<DollarSign class="mr-2 h-5 w-5" />
					Pay Now
				</a>
			{/if}
			<h3 class="mb-2 font-semibold">Recent Transactions</h3>
			<ul class="space-y-3">
				{#each transactions as transaction (transaction.id)}
					<li class="flex items-center justify-between rounded-md bg-gray-50 p-3">
						<div>
							<p class="font-medium">{transaction.eventName}</p>
							<p class="text-sm text-gray-600">{formatDate(transaction.date)}</p>
						</div>
						<div class="flex items-center">
							<span class="mr-4 font-semibold">{formatCurrency(transaction.amount)}</span>
							{#if transaction.invoiceUrl}
								<a href={transaction.invoiceUrl} class="text-blue-600 hover:underline">
									<FileText class="h-5 w-5" />
								</a>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
			<a href="/transaction-history" class="mt-4 inline-block text-blue-600 hover:underline"
				>View Full History</a
			>
		</div>

		<!-- Community Highlights or Racing News -->
		<div class="mb-8 rounded-lg bg-white p-6 shadow-md">
			<h2 class="mb-4 text-xl font-bold">Racing News & Community Highlights</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each newsItems as item (item.id)}
					<a
						href={item.url}
						class="block overflow-hidden rounded-lg bg-gray-50 transition-shadow duration-300 hover:shadow-md"
					>
						<img src={item.imageUrl} alt={item.title} class="h-40 w-full object-cover" />
						<div class="p-4">
							<h3 class="mb-2 font-semibold">{item.title}</h3>
							<p class="mb-2 text-sm text-gray-600">{item.excerpt}</p>
							<p class="text-xs text-gray-500">{formatDate(item.date)}</p>
						</div>
					</a>
				{/each}
			</div>
			<div class="mt-6 text-center">
				<a href="/news" class="text-blue-600 hover:underline">View All News</a>
			</div>
		</div>

		<!-- My Races Section -->
		<div class="mb-8 rounded-lg bg-white p-6 shadow-md">
			<h2 class="mb-4 text-xl font-bold">My Races</h2>
			{#if races.length > 0}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					{#each races as race (race.id)}
						<div class="flex rounded-lg bg-gray-50 p-4">
							<img
								src={race.image}
								alt={race.name}
								class="mr-4 h-24 w-24 rounded-md object-cover"
							/>
							<div class="flex-grow">
								<h3 class="font-semibold">{race.name}</h3>
								<p class="text-sm text-gray-600">{formatDate(race.date)}</p>
								<p class="text-sm text-gray-600">{race.location}</p>
								<div class="mt-2 flex items-center justify-between">
									<span
										class={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(race.status)}`}
									>
										{race.status}
									</span>
									<a
										href={`/manage-registration/${race.id}`}
										class="text-sm text-blue-600 hover:underline"
									>
										Manage Registration
									</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="flex items-center border-l-4 border-yellow-400 bg-yellow-50 p-4">
					<AlertCircle class="mr-2 h-6 w-6 text-yellow-400" />
					<div>
						<p class="font-semibold">No upcoming races</p>
						<p class="text-sm">
							Ready for your next challenge? Find and register for upcoming events!
						</p>
					</div>
				</div>
				<a
					href="/events"
					class="btn mt-4 inline-flex items-center bg-blue-500 text-white hover:bg-blue-600"
				>
					<Flag class="mr-2 h-5 w-5" />
					Explore Races
				</a>
			{/if}
		</div>

		<!-- Race History -->
		<div class="mb-8 rounded-lg bg-white p-6 shadow-md">
			<h2 class="mb-4 text-xl font-bold">Race History</h2>
			<div class="space-y-4">
				{#each pastRaces.slice(0, isHistoryExpanded ? undefined : 2) as race (race.id)}
					<div class="rounded-lg bg-gray-50 p-4">
						<h3 class="font-semibold">{race.name}</h3>
						<p class="text-sm text-gray-600">{formatDate(race.date)} - {race.location}</p>
						<p class="mt-1 text-sm font-medium">{race.result}</p>
						<div class="mt-2 space-x-2">
							{#if race.certificateUrl}
								<a
									href={race.certificateUrl}
									class="inline-flex items-center text-sm text-blue-600 hover:underline"
								>
									<Download class="mr-1 h-4 w-4" />
									Download Certificate
								</a>
							{/if}
							{#if race.resultsUrl}
								<a
									href={race.resultsUrl}
									class="inline-flex items-center text-sm text-blue-600 hover:underline"
								>
									<ExternalLink class="mr-1 h-4 w-4" />
									View Results
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			{#if pastRaces.length > 2}
				<button
					on:click={toggleHistoryExpansion}
					class="mt-4 flex items-center text-blue-600 hover:underline"
				>
					{isHistoryExpanded ? 'Show Less' : 'Show More'}
					{#if isHistoryExpanded}
						<ChevronUp class="ml-1 h-4 w-4" />
					{:else}
						<ChevronDown class="ml-1 h-4 w-4" />
					{/if}
				</button>
			{/if}
		</div>

		<!-- Recommendations -->
		<div class="rounded-lg bg-white p-6 shadow-md">
			<h2 class="mb-4 text-xl font-bold">Recommendations for You</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each recommendedRaces as race (race.id)}
					<div class="overflow-hidden rounded-lg bg-gray-50">
						<img src={race.image} alt={race.name} class="h-40 w-full object-cover" />
						<div class="p-4">
							<h3 class="mb-2 font-semibold">{race.name}</h3>
							<p class="mb-1 flex items-center text-sm text-gray-600">
								<Calendar class="mr-1 h-4 w-4" />
								{formatDate(race.date)}
							</p>
							<p class="mb-2 flex items-center text-sm text-gray-600">
								<MapPin class="mr-1 h-4 w-4" />
								{race.location}
							</p>
							<p class="mb-3 text-xs text-gray-500">Category: {race.category}</p>
							<a
								href={`/register/${race.id}`}
								class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700"
							>
								Register
							</a>
						</div>
					</div>
				{/each}
			</div>
			<div class="mt-6 text-center">
				<a href="/recommended-events" class="text-blue-600 hover:underline">
					See All Recommended Events
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.btn {
		@apply flex items-center justify-center rounded-md px-4 py-2 font-semibold transition-colors duration-300;
	}
</style>
