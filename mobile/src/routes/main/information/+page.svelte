<!-- <script lang="ts">
	import { onMount } from 'svelte';

	type Event = {
		id: number;
		title: string;
		description: string;
		public_url: string;
		starts_at: string;
		ends_at: string;
		venue_name: string;
		address: string;
		lat: string;
		long: string;
		ticket_limit: number;
		published_at: string;
		updated_at: string;
		group: number;
		participants: number;
		waitlisted: number;
		// 他のプロパティをここに追加
	};

	let events: Event[] = [];

	async function fetchEvents() {
		try {
			const response = await fetch('https://api.doorkeeper.jp/events', {
				headers: {
					Authorization: ''
				}
			});

			if (response.ok) {
				const data = await response.json();
				events = data;
			} else {
				console.error('イベントの取得に失敗しました');
			}
		} catch (error) {
			console.error('エラー:', error);
		}
	}

	onMount(fetchEvents);
</script>

{#if events.length > 0}
	{#each events as event (event.id)}
		<div>
			<h2>{event.title}</h2>
			<p>{@html event.description}</p>
			<p>開始日時: {event.starts_at}</p>
			<p>終了日時: {event.ends_at}</p>
			<p>場所: {event.venue_name}</p>
			<p>住所: {event.address}</p>
			<p>参加者数: {event.participants}</p>
			<p>待機者数: {event.waitlisted}</p>
			<a href={event.public_url}>詳細を見る</a>
		</div>
	{/each}
{:else}
	<p>イベントが見つかりませんでした。</p>
{/if} -->
