<script lang="ts">
  import { onMount } from 'svelte';

  let events = [];

  onMount(async () => {
    const apiKey: string = 'vVfpPqeF32jjKE7HhN94';
    const apiUrl: string = 'https://api.doorkeeper.jp/events';

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
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
    <div>
		
      <h2>{event.event.title}</h2>
      <p>{@html event.event.description}</p>
      <p>開始日時: {event.event.starts_at}</p>
      <p>終了日時: {event.event.ends_at}</p>
      <p>場所: {event.event.venue_name}</p>
      <p>住所: {event.event.address}</p>
      <p>参加者数: {event.event.participants}</p>
      <p>待機者数: {event.event.waitlisted}</p>
      <a href={event.event.public_url}>詳細を見る</a>
	  <p>----------------------------------</p>
    </div>
  {/each}
{:else}
  <p>イベントが見つかりませんでした。</p>
{/if}
