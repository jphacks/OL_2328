<script lang="ts">
	import CenteredSpinner from '$lib/components/CenteredSpinner.svelte';
	import MatchCard from '$lib/components/MatchCard.svelte';
import {
		Page,
		Button,
		Block,
		BlockTitle,
		Card,
		Link,
		Chip
	} from 'konsta/svelte';
	import { Collection } from 'sveltefire';
</script>

<Collection ref={"users"} let:data>
    <svelte:fragment slot="loading">
        <CenteredSpinner />
    </svelte:fragment>

    {#each data as userData}
        <MatchCard {userData} />
    {/each}
</Collection>

<div class="mt-40"></div>

<Block strong class="space-y-2 fixed bottom-12 w-full">
    <div class="grid grid-cols-3 gap-x-4">
        <Button large rounded class="k-color-brand-black"
            ><iconify-icon width="30" height="30" icon="dashicons:no" /></Button
        >
        <Button large rounded class="k-color-brand-blue"
            ><iconify-icon width="30" height="30" icon="material-symbols:star" /></Button
        >
        <Button large rounded class="k-color-brand-pink"
            ><iconify-icon width="30" height="30" icon="mdi:heart" /></Button
        >
    </div>
</Block>
