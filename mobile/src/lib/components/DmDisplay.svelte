<script lang="ts">
	import { goto } from "$app/navigation";
	import type { DM } from "$lib/types/DM";
	import { ListButton } from "konsta/svelte";
	import { onMount } from "svelte";

    export let dm: DM;



    onMount(() => {
        const element = document.getElementById(dm.id);

        element.addEventListener("click", (e) => {
            e.preventDefault();
            goto(`/main/dm/${dm.id}`);
        });
    })
</script>

<ListButton id={dm.id} >
    {dm.targetName}
</ListButton>