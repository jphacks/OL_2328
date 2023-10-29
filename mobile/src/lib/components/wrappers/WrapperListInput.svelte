<script lang="ts">
	import { ListInput } from "konsta/svelte";

    export let value = "";
    export let label: string;
    export let type: string;
    export let placeholder = "";
    let className = "";
    export let inputClass = "";

    export { className as class };
</script>

<ListInput {value} {inputClass} class={className} onInput={(e) => { value = e.target.value; }} {label} {type} {placeholder}>
    <svelte:fragment slot="media">
        <slot name="media" />
    </svelte:fragment>
    <slot />
</ListInput>