<script lang="ts">
	import Button from "../button/button.svelte";

</script>

<h3 class="text-destructive text-lg font-semibold">Danger Zone</h3>
<p class="text-muted-foreground">These actions are irreversible. Please be certain.</p>
<div class="space-y-4">
	<div class="border-destructive rounded-md border p-4">
		<h4 class="text-destructive text-sm font-medium">Delete Account</h4>
		<p class="text-muted-foreground mt-2 text-sm">
			Once you delete your account, there is no going back. Please be certain.
		</p>
		<Button variant="destructive" class="mt-4">Delete Account</Button>
	</div>
</div>
