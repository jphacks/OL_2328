<script lang="ts">
	import Redirect from '$lib/components/Redirect.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
import { signInWithEmailAndPassword, type Auth, type UserCredential } from 'firebase/auth';
    import { Block, BlockTitle, Button, List, ListInput, ListItem, Navbar, Page, Radio, Toggle } from 'konsta/svelte';
	import { SignedIn, SignedOut } from 'sveltefire';
    
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
            <BlockTitle class="text-5xl text-center justify-self-center" component="h1">
                Login
            </BlockTitle>
        
            <List>
                <ListInput onInput={(e) => { email = e.target.value; }} label="メール" type="email">
                    <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-email"></iconify-icon>
                </ListInput>
                <ListInput onInput={(e) => { password = e.target.value; }} label="パスワード" type="password">
                    <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-lock"></iconify-icon>
                </ListInput>
        
            </List>
        
            <Block>
                <div class="flex flex-col gap-2">
                    <Button rounded onClick={(e) => { login(auth); }}>ログイン</Button>
                    <Button rounded outline>新規登録</Button>
                </div>
            </Block>
        {:else}
            {#await signinPromise}
                <Spinner />
            {/await}
        {/if}
    </Page>
</SignedOut>
