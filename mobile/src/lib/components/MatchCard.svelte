<script lang="ts">
	import type UserData from "$lib/types/UserData";
	import { Block, BlockTitle, Button, Card, Chip, Link } from "konsta/svelte";

    export let userData: UserData;
</script>

<div class="lg:grid lg:grid-cols-2">
    <div class="tinder--card" style="margin-top: 40px;">
        <Card outline>
            <div
                class="h-48 p-4 flex items-end text-white ios:font-bold bg-cover bg-center material:rounded-xl mb-4 material:text-[22px]"
                style="background-image: url({userData.avatar})"
            >
                {userData.name}
            </div>

            <p>
                {userData.bio}
            </p>

            <h3 class="text-primary text-lg pt-10">
                スキル
            </h3>

            <div >
                {#each userData.skilledTechnologies as technology}
                    <Chip class="m-0.5">{technology}</Chip>
                {/each}
            </div>
                
            <h3 class="text-primary text-lg pt-10">
                マッチしたいテクノロジー
            </h3>

            <div >
                {#each userData.technologies as technology}
                    <Chip class="m-0.5">{technology}</Chip>
                {/each}
            </div>

            {#if userData.github}
                <img class="mt-5" alt="Top Used Languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username={userData.github}&layout=compact&theme=onedark" />
            {/if}
        </Card>

        
    </div>
</div>