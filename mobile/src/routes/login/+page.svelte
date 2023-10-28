<script lang="ts">
    import { Block, BlockTitle, Button, List, ListInput, ListItem, Navbar, Page, Radio, Toggle } from 'konsta/svelte';
</script>

<Page>
    <BlockTitle class="text-5xl text-center justify-self-center" component="h1">
        Login
    </BlockTitle>

    <List>
        <ListInput label="メール" type="email">
            <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-email"></iconify-icon>
        </ListInput>
        <ListInput label="パスワード" type="password">
            <iconify-icon width="25" height="25" slot="media" icon="ic:baseline-lock"></iconify-icon>
        </ListInput>

    </List>

    <Block>
        <div class="flex flex-col gap-2">
            <Button rounded>ログイン</Button>
            <Button rounded outline>新規登録</Button>
        </div>
        
    </Block>



</Page>