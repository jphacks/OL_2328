<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, firestore } from '$lib/auth/firebaseApp';
	import CenteredSpinner from '$lib/components/CenteredSpinner.svelte';
	import MatchCard from '$lib/components/MatchCard.svelte';
	import type UserData from '$lib/types/UserData';
	import { createDm } from '$lib/userDb/dmData';
	import { getRecommendations, swipeUser } from '$lib/userDb/matching';
	import { getUserData } from '$lib/userDb/userData';
import {
		Button,
		Block,
		Popup,

		Dialog,

		DialogButton



	} from 'konsta/svelte';

    async function getCurrentUserRecommendations() {
        const userData = await getUserData(auth.currentUser?.uid ?? "");

        if (userData.technologies.length === 0 || userData.skilledTechnologies.length === 0) {
            return [];
        }

        const snap = await getRecommendations(userData);



        const users: UserData[] = [];

        snap.forEach(
            (data) => {
                const recUser = data.data();

                if (recUser.id === userData.id) {
                    return;
                }

                users.push(recUser);
            }
        )

        return users;
    };

    let recommendationPromise = getCurrentUserRecommendations();

    let currentReccomendationIndex = 0;

    let matchedVisible = false;

    const getUserAtIndex = (users: UserData[], idx: number) => {
        if (idx >= users.length) {
            recommendationPromise = getCurrentUserRecommendations();
            currentReccomendationIndex = 0;
            return users[0];
        }

        return users[idx];
    }

    const swipe = async (like: boolean, targetUser: UserData) => {
        currentReccomendationIndex++;
        const userData = await getUserData(auth.currentUser?.uid ?? "");

        if(swipeUser(
            userData,
            targetUser,
            like
        )) {
            createDm(
                userData,
                targetUser,
            ).then(() => {
                matchedVisible = true;
            });
        }
    }
</script>

<Dialog opened={matchedVisible} onBackdropClick={() => {matchedVisible = false;}}>
    <span slot="title">マッチしました！</span>
    <svelte:fragment slot="buttons">
        <DialogButton onClick={() => (matchedVisible = false)}>
          閉じる
        </DialogButton>
        <DialogButton onClick={() => { goto('/main/dm') }}>
          見る
        </DialogButton>
    </svelte:fragment>
</Dialog>

{#await recommendationPromise}
    <CenteredSpinner />

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
{:then recommendations} 
    {#if recommendations.length === 0}
        <p>
            マッチが見つかりませんでした。<a href="/main/profile">プロフィールを変えてみませんか？</a>
        </p>
    {:else}
        <MatchCard userData={getUserAtIndex(recommendations, currentReccomendationIndex)} />
    {/if}

    <div class="mt-40"></div>

    <Block strong class="space-y-2 fixed bottom-12 w-full">
        <div class="grid grid-cols-3 gap-x-4">
            <Button large rounded class="k-color-brand-black"
                onClick={() => { swipe(false, recommendations.at(currentReccomendationIndex)) }}><iconify-icon width="30" height="30" icon="dashicons:no" /></Button
            >
            <Button large rounded class="k-color-brand-blue"
                ><iconify-icon width="30" height="30" icon="material-symbols:star" /></Button
            >
            <Button large rounded class="k-color-brand-pink"
                onClick={() => swipe(true, recommendations.at(currentReccomendationIndex))}><iconify-icon width="30" height="30" icon="mdi:heart" /></Button
            >
        </div>
    </Block>
{/await}


