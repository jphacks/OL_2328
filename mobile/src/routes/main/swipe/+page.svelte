<script lang="ts">
	import CenteredSpinner from '$lib/components/CenteredSpinner.svelte';
	import {
		Page,
		Navbar,
		NavbarBackLink,
		Button,
		Block,
		BlockTitle,
		Card,
		Link,
		Chip
	} from 'konsta/svelte';
	import Icon from '@iconify/svelte';

	let cardVisible = true; // カードが表示されているかどうかを管理

	function initCards() {
		// カードの初期化処理
	}

	function swipeLeft() {
		cardVisible = false;
		initCards();
	}

	function swipeUp() {
		cardVisible = false;
		initCards();
	}

	function swipeRight() {
		cardVisible = false;
		initCards();
	}
</script>

<CenteredSpinner />

<Page>
	<BlockTitle>Matching</BlockTitle>
	<div class="lg:grid lg:grid-cols-2">
		{#if cardVisible}
			<div class="tinder--card" style="margin-top: 40px;">
				<Card outline>
					<div
						class="ios:-mx-4 ios:-mt-4 h-48 p-4 flex items-end text-white ios:font-bold bg-cover bg-center material:rounded-xl mb-4 material:text-[22px]"
						style="background-image: url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
					>
						Journey To Mountains
					</div>
					<div class="text-gray-500 mb-3">Posted on January 21, 2021</div>
					<p>
						Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non
						felis. Phasellus quis nibh hendrerit...
					</p>
					<Chip class="m-0.5">Example Chip</Chip>
					<Chip class="m-0.5">Another Chip</Chip>
					<svelte:fragment slot="footer">
						<div class="flex justify-between material:hidden">
							<Link>Read more</Link>
						</div>
						<div class="flex justify-start ios:hidden space-x-2 rtl:space-x-reverse">
							<Button rounded inline outline>Read more</Button>
						</div>
					</svelte:fragment>
				</Card>
			</div>
		{/if}
	</div>
	<Block strong outlineIos class="space-y-2">
		<div class="grid grid-cols-3 gap-x-4">
			<Button large rounded class="k-color-brand-black" onclick={swipeLeft}
				><Icon icon="dashicons:no" /></Button
			>
			<Button large rounded class="k-color-brand-blue" onclick={swipeUp}
				><Icon icon="material-symbols:star" /></Button
			>
			<Button large rounded class="k-color-brand-pink" onclick={swipeRight}
				><Icon icon="mdi:heart" /></Button
			>
		</div>
	</Block>
</Page>
