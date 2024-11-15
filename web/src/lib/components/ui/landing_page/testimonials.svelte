<script lang="ts">
    import { Star } from 'lucide-svelte';
  
    interface Testimonial {
      id: number;
      name: string;
      quote: string;
      rating: number;
      image: string;
    }
  
    const testimonials: Testimonial[] = [
      {
        id: 1,
        name: "Alex Johnson",
        quote: "RaceEntry made registering for my first rally a breeze. The platform's user-friendly interface and detailed event information gave me the confidence to take on this new challenge!",
        rating: 5,
        image: "https://xsgames.co/randomusers/avatar.php?g=male"
      },
      {
        id: 2,
        name: "Sarah Lee",
        quote: "As a seasoned racer, I've used many platforms, but RaceEntry stands out. Their customer support is top-notch, and the ability to track my race history is invaluable.",
        rating: 4,
        image: "https://xsgames.co/randomusers/avatar.php?g=female"
      },
      {
        id: 3,
        name: "Mike Chen",
        quote: "The variety of events on RaceEntry is impressive. I've discovered local races I never knew existed and have had some of my most memorable racing experiences thanks to this platform.",
        rating: 5,
        image: "https://xsgames.co/randomusers/avatar.php?g=male"
      }
    ];
  </script>
  
  <section class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">What Our Racers Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each testimonials as testimonial (testimonial.id)}
          <div class="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
            <div class="flex items-center mb-4">
              <img 
                src={`${testimonial.image}`} 
                alt={testimonial.name} 
                class="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 class="font-semibold">{testimonial.name}</h3>
                <div class="flex">
                  {#each Array(5) as _, i}
                    <Star 
                      size={16} 
                      class={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} 
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  {/each}
                </div>
              </div>
            </div>
            <p class="text-gray-600 italic flex-grow">"{testimonial.quote}"</p>
          </div>
        {/each}
      </div>
    </div>
  </section>