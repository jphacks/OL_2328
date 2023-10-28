<script lang="ts">
	import { auth } from "$lib/auth/firebaseApp";
	import CenteredSpinner from "$lib/components/CenteredSpinner.svelte";
	import DmDisplay from "$lib/components/DmDisplay.svelte";
	import { BlockTitle, List } from "konsta/svelte";
	import { Collection, userStore } from "sveltefire";

	const user = userStore(auth);

</script>

<Collection ref={`users/${$user?.uid}/dms`} let:data let:count>
	<svelte:fragment slot="loading">
		<CenteredSpinner />
	</svelte:fragment>
	<BlockTitle>DM</BlockTitle>
	<List strong>
		{#each data as dm}
			<DmDisplay {dm} />
		{:else}
			<p>DMがありません</p>
		{/each}
	</List>
	
</Collection>