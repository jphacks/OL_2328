<script lang="ts">
	import { App } from "konsta/svelte";
    import { FirebaseApp, SignedOut } from "sveltefire";
    import { auth, firestore, storage } from "$lib/auth/firebaseApp";
    import "../app.css";
    import 'iconify-icon';
	import Redirect from "$lib/components/Redirect.svelte";
</script>


<FirebaseApp {auth} {firestore} {storage}>
    <App theme="material" safeAreas>
        <slot />
    </App>

    <SignedOut>
        <Redirect to="/login" />
    </SignedOut>
</FirebaseApp>
