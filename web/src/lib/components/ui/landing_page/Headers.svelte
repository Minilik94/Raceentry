<script lang="ts">

	const headline = $state('Race with the Best');
	const subheadline = $state('Seamless Registration for the Ultimate Racing Experience');
</script>

<section class="relative flex h-screen items-center justify-center overflow-hidden">
	<div class="absolute inset-0 z-0">
		<img
			src="https://cdn.bleacherreport.net/images_root/slides/photos/000/418/149/1228294_original.jpg?1285764850?height=1080&width=1920"
			alt="Exciting race event"
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-black bg-opacity-50"></div>
	</div>

	<div class="relative z-10 px-4 text-center text-white sm:px-6 lg:px-8">
		<h1 class="animate-fade-in-up mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
			{headline}
		</h1>
		<p class="animate-fade-in-up animation-delay-200 mb-8 text-xl sm:text-2xl md:text-3xl">
			{subheadline}
		</p>
		<div
			class="animate-fade-in-up animation-delay-400 flex flex-col justify-center gap-4 sm:flex-row"
		>
			<a
				href="/upcoming-races"
				class="transform rounded-full bg-red-600 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-red-700"
			>
				View Upcoming Races
			</a>
			<a
				href="/register"
				class="transform rounded-full border-2 border-white bg-transparent px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-red-600"
			>
				Register Now
			</a>
		</div>
	</div>
</section>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.6s ease-out forwards;
	}

	.animation-delay-200 {
		animation-delay: 0.2s;
	}

	.animation-delay-400 {
		animation-delay: 0.4s;
	}
</style>
