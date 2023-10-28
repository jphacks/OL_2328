<script lang="ts">
	import { goto } from '$app/navigation';
	import Redirect from '$lib/components/Redirect.svelte';
    import CenteredSpinner from '$lib/components/CenteredSpinner.svelte';
	import WrapperListInput from '$lib/components/wrappers/WrapperListInput.svelte';
import { signInWithEmailAndPassword, type Auth, type UserCredential } from 'firebase/auth';
    import { Block, BlockTitle, Button, List, Page } from 'konsta/svelte';
	import { SignedIn, SignedOut, docStore } from 'sveltefire';
	import { firestore } from '$lib/auth/firebaseApp';
	import type UserData from '$lib/types/UserData';
    
    let email = "";
    let password = "";

    let signinPromise: Promise<UserCredential> | null = null;

    const login = (auth: Auth) => {

        signinPromise = signInWithEmailAndPassword(auth, email, password);

        signinPromise.catch((error) => {
            alert(error.message);
            signinPromise = null;
        });

        signinPromise.then(() => {
            signinPromise = null;
        });
    }
</script>

<SignedIn>
    <Redirect to="/main" />
</SignedIn>

<SignedOut let:auth>
    <Page class="justify-center align-middle">
        {#if signinPromise === null}
            <BlockTitle component="h1">
                <span class="text-5xl">
                    Login
                </span>
            </BlockTitle>
        
            <List>
                <WrapperListInput bind:value={email} label="メール" type="email" placeholder="bob@gmail.com">
                    <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-email"></iconify-icon>
                </WrapperListInput>

                <WrapperListInput bind:value={password} label="パスワード" type="password">
                    <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-lock"></iconify-icon>
                </WrapperListInput>
        
            </List>
        
            <Block>
                <div class="flex flex-col gap-2">
                    <Button rounded onClick={(e) => { login(auth); }}>ログイン</Button>
                    <Button rounded outline onClick={(e) => { goto('/signup'); }}>新規登録</Button>
                </div>
            </Block>
        {:else}
            {#await signinPromise}
                <CenteredSpinner />
            {/await}
        {/if}
    </Page>
</SignedOut>
