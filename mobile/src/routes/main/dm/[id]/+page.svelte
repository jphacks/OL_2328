<script lang="ts">
	import { auth, firestore } from "$lib/auth/firebaseApp";
	import { Collection, collectionStore, userStore } from "sveltefire";
	import type { PageData } from "./$types";
	import { Message, Messagebar, Messages } from "konsta/svelte";
    import type { Message as IMessage } from "$lib/types/Message";
	import CenteredSpinner from "$lib/components/CenteredSpinner.svelte";
	import { createMessage } from "$lib/userDb/dmData";

    const currentUser = userStore(auth);

    export let data: PageData;

    let msgText = "";

    const messages = collectionStore<IMessage>(firestore, `chat/${data.dmId}/messages`);

    const scrollToBottom = (animate = true) => {
        const pageEl = document.querySelector(".dm-page");
        pageEl.scrollTo({
            top: pageEl.scrollHeight - pageEl.offsetHeight,
            behavior: animate ? 'smooth' : 'auto',
        });
    };

    const sendMessage = () => {
        if (msgText === "") return;

        const message: IMessage = {
            id: crypto.randomUUID(),
            senderId: $currentUser?.uid as string,
            content: msgText,
            sentAt: Date.now(),
        };

        createMessage(
            data.dmId,
            message
        );

        msgText = "";

        scrollToBottom();
    }

    const compareMessageByTimeSent = (a: IMessage, b: IMessage): number => {
        return a.sentAt - b.sentAt;
    }
</script>


{#if $messages !== undefined && $messages !== null}
    <Messages class="dm-page">
        
        {#each $messages.sort(compareMessageByTimeSent) as message}
            <Message
            type={message.senderId === $currentUser?.uid ? "sent" : "received"}
            name={message.senderId}
            text={message.content}
            >
                
            </Message>
        {/each}
    </Messages>

    <div class="mb-40"></div>

    <Messagebar onInput={(e) => { msgText = e.target.value; }} class="!bottom-20" placeholder="Hello" value="">
        <iconify-icon on:click={sendMessage} class="ml-0.5 text-primary" width="30" height="30" icon="mdi:send" slot="right" />
    </Messagebar>
{:else}
    <CenteredSpinner />
{/if}