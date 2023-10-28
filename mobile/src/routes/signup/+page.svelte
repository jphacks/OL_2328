<script lang="ts">
	import { goto } from "$app/navigation";
	import { auth } from "$lib/auth/firebaseApp";
	import CenteredSpinner from "$lib/components/CenteredSpinner.svelte";
	import Redirect from "$lib/components/Redirect.svelte";
	import WrapperListInput from "$lib/components/wrappers/WrapperListInput.svelte";
	import { createUserWithEmailAndPassword, type UserCredential } from "firebase/auth";
	import { Block, BlockTitle, Button, List, Page } from "konsta/svelte";
    import { SignedIn, SignedOut } from "sveltefire";

    let email = "";
    let password = "";
    let confirmPassword = "";

    let signupPromise: Promise<UserCredential> | null = null;

    function signup() {
            
            if (password !== confirmPassword) {
                alert("パスワードが一致しません。");
                return;
            }
    
            signupPromise = createUserWithEmailAndPassword(auth, email, password);
    
            signupPromise.catch((error) => {
                alert(error.message);
                signupPromise = null;
            });
    
            signupPromise.then(() => {
                signupPromise = null;
            });
    }
</script>

<SignedIn>
    <Redirect to="/main" />
</SignedIn>

<SignedOut let:auth>
    <Page>
        {#if signupPromise === null}
            <BlockTitle>
                <span class="text-4xl">Signup</span>
            </BlockTitle>

            <List>
                <WrapperListInput bind:value={email} label="メール" type="email" placeholder="bob@gmail.com">
                    <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-email"></iconify-icon>
                </WrapperListInput>
        
                <WrapperListInput bind:value={password} label="パスワード" type="password">
                    <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-lock"></iconify-icon>
                </WrapperListInput>
        
                <WrapperListInput bind:value={confirmPassword} label="パスワード(確認)" type="password">
                    <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-lock"></iconify-icon>
                </WrapperListInput>
            </List>
            
            <Block>
                <div class="flex flex-col gap-2">
                    <Button rounded onClick={(e) => { signup(); }}>アカウントを作成</Button>
                    <Button rounded outline onClick={(e) => { goto('/login'); }}>ログイン</Button>
                </div>
            </Block>
        {:else}
            {#await signupPromise}
                <CenteredSpinner />
            {/await}
        {/if}
    </Page>
</SignedOut>