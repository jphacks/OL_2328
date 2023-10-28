<script lang="ts">
	import { ListInput } from "konsta/svelte";

    export let value = "";
    export let label: string;
    export let type: string;
    export let placeholder = "";
</script>

<ListInput onInput={(e) => { value = e.target.value; }} {label} {type} {placeholder}>
    <svelte:fragment slot="media">
        <slot name="media" />
    </svelte:fragment>
    <slot />
</ListInput>