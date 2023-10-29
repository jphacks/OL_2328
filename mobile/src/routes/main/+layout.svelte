<script lang="ts">
	import Redirect from '$lib/components/Redirect.svelte';
	import { Tabbar, TabbarLink, Page, Navbar, NavbarBackLink } from 'konsta/svelte';
	import { SignedIn, SignedOut } from 'sveltefire';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';

	export let data: LayoutData;
</script>

<SignedOut>
	<Redirect to="/login" />
</SignedOut>

<SignedIn let:auth>
	<Page>
		<Navbar centerTitle>
				<NavbarBackLink
				slot="left"
				class="my-auto"
				onClick={(e) => {
					history.back();
				}}
			/>
			

			<img slot="title" alt="Tech Match Logo" width="60" height="60" src="/tech-match-logo.png" />

			<iconify-icon
				class="mr-2"
				width="25"
				height="25"
				slot="right"
				icon="uis:signout"
				on:click={() => {
					signOut(auth);
				}}
			/>
		</Navbar>

		<slot />

		<div class="mt-24" />

		<Tabbar class="left-0 bottom-0 fixed" icons>
			<TabbarLink
				onClick={() => {
					goto('/main/information');
				}}
				active={data.url === '/main/information'}
			>
				<iconify-icon width="29" height="29" slot="icon" icon="wpf:news" />
			</TabbarLink>
			<TabbarLink
				onClick={() => {
					goto('/main/dm');
				}}
				active={data.url === '/main/dm'}
			>
				<iconify-icon width="29" height="29" slot="icon" icon="ic:outline-message" />
			</TabbarLink>
			<TabbarLink
				onClick={() => {
					goto('/main/swipe');
				}}
				active={data.url === '/main/swipe'}
			>
				<iconify-icon width="29" height="29" slot="icon" icon="ic:baseline-swipe" />
			</TabbarLink>
			<TabbarLink
				onClick={() => {
					goto('/main/profile');
				}}
				active={data.url === '/main/profile'}
			>
				<iconify-icon width="29" height="29" slot="icon" icon="ic:baseline-person" />
			</TabbarLink>
		</Tabbar>
	</Page>
</SignedIn>
