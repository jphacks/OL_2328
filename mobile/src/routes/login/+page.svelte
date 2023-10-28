<script lang="ts">
	import Redirect from '$lib/components/Redirect.svelte';
import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';
    import { Block, BlockTitle, Button, List, ListInput, ListItem, Navbar, Page, Radio, Toggle } from 'konsta/svelte';
	import { SignedIn, SignedOut } from 'sveltefire';
    
    let email = "";
    let password = "";

    const login = (auth: Auth) => {
        signInWithEmailAndPassword(auth, email, password);
    }
</script>

<SignedIn>
    <Redirect to="/main" />
</SignedIn>

<SignedOut let:auth>
    <Page>
        <BlockTitle class="text-5xl text-center justify-self-center" component="h1">
            Login
        </BlockTitle>
    
        <List>
            <ListInput bind:value={email} label="メール" type="email">
                <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-email"></iconify-icon>
            </ListInput>
            <ListInput bind:value={password} label="パスワード" type="password">
                <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-lock"></iconify-icon>
            </ListInput>
    
        </List>
    
        <Block>
            <div class="flex flex-col gap-2">
                <Button rounded on:onclick={() => { login(auth); }}>ログイン</Button>
                <Button rounded outline>新規登録</Button>
            </div>
        </Block>
    </Page>
</SignedOut>
