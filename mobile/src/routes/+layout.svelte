<script lang="ts">
	import { App } from "konsta/svelte";
    import "../app.css";
    import 'iconify-icon';
</script>


<App theme="material" safeAreas>
    <slot />
</App>