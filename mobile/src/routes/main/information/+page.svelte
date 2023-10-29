<script lang="ts">
	import { onMount } from 'svelte';
	import CenteredSpinner from '$lib/components/CenteredSpinner.svelte';
	import { Page, Button, Block, BlockTitle, Card, Link, Chip } from 'konsta/svelte';

	let events = [];

	onMount(async () => {
		const apiKey: string = 'vVfpPqeF32jjKE7HhN94';
		const apiUrl: string = 'https://api.doorkeeper.jp/events';

		try {
			const response = await fetch(apiUrl, {
				headers: {
					Authorization: `Bearer ${apiKey}`
				}
			});

			if (!response.ok) {
				throw new Error('failed');
			}

			const data = await response.json();
			events = data;
			console.log(events);
		} catch (error) {
			console.error('failed:', error);
		}
	});
</script>

{#if events.length > 0}
	{#each events as event, i (i)}
		<Card outline>
			<div
				class="ios:-mx-4 ios:-mt-4 h-48 p-4 flex items-end text-white ios:font-bold bg-cover bg-center material:rounded-xl mb-4 material:text-[22px]"
				style="background-image: url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
			>
				{event.event.title}
			</div>
			<div class="text-gray-500 mb-3">Starts on: {event.event.starts_at}</div>
			<div class="text-gray-500 mb-3">Ends on: {event.event.ends_at}</div>
			<div class="text-gray-500 mb-3">Location: {event.event.venue_name}</div>
			<div class="text-gray-500 mb-3">Address: {event.event.address}</div>
			<p>{@html event.event.description}</p>
			<Chip class="m-0.5">Participants: {event.event.participants}</Chip>
			<Chip class="m-0.5">Waitlisted: {event.event.waitlisted}</Chip>
			<svelte:fragment slot="footer">
				<div class="flex justify-between material:hidden">
					<Button rounded inline outline href={event.event.public_url}>Read more</Button>
				</div>
				<div class="flex justify-start ios:hidden space-x-2 rtl:space-x-reverse">
					<Button rounded inline outline href={event.event.public_url}>Read more</Button>
				</div>
			</svelte:fragment>
		</Card>
	{/each}
{:else}
	<p>イベントが見つかりませんでした。</p>
{/if}
