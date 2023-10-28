<script lang="ts">
	import { auth, firestore } from "$lib/auth/firebaseApp";
	import CenteredSpinner from "$lib/components/CenteredSpinner.svelte";
	import ProfileView from "$lib/components/ProfileView.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import type UserData from "$lib/types/UserData";
	import { setUserData } from "$lib/userDb/userData";
	import { Block, Button } from "konsta/svelte";
	import { Doc, docStore, userStore } from "sveltefire";

    const user = userStore(auth);
    const profile = docStore<UserData>(firestore, `users/${$user?.uid}`);
    
    let saving = false;

    const save = async() => {
        saving = true;
        await setUserData($profile as UserData, $user?.uid as string);
        saving = false;
    }

</script>

{#if $profile !== undefined && $profile !== null}
    <ProfileView userData={$profile} />

    <Block>
        <Button rounded onClick={() => { save(); }}>
            {#if saving}
                <Spinner />
            {:else}
                保存
            {/if}
        </Button>
    </Block>
{:else}
    <CenteredSpinner />
{/if}
