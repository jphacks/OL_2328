<script lang="ts">
	import type UserData from "$lib/types/UserData";
	import { Block, BlockTitle, Button, Chip, List, ListItem, Radio, Sheet } from "konsta/svelte";
	import WrapperListInput from "./wrappers/WrapperListInput.svelte";

    export let userData: UserData;

    let addingTechnology = false;
    let addingSkilledTechnology = false;

    let newTechnology = "";
    let newSkilledTechnology = "";
</script>

<Sheet 
    class="!w-full pb-safe"
    opened={addingTechnology}
    onBackdropClick={() => { addingTechnology = false; }}
    >
    <BlockTitle>テクノロジーを追加</BlockTitle>
    <Block>
        <WrapperListInput label="追加するテクノロジー" bind:value={newTechnology} type="text" />
        <Button onClick={() => { userData.technologies = [...userData.technologies, newTechnology]; newTechnology = ""; addingTechnology = false; }}>
            追加
        </Button>
    </Block>
</Sheet>

<Sheet
    class="!w-full pb-safe"
    opened={addingSkilledTechnology}
    onBackdropClick={() => { addingSkilledTechnology = false; }}
    >
    <BlockTitle>スキルを追加</BlockTitle>
    <Block>
        <WrapperListInput label="追加するスキル" bind:value={newSkilledTechnology} type="text" />
        <Button onClick={() => { userData.skilledTechnologies = [...userData.skilledTechnologies, newSkilledTechnology]; newSkilledTechnology = ""; addingSkilledTechnology = false; }}>
            追加
        </Button>
    </Block>
</Sheet>

<BlockTitle>
    <span class="text-3xl">Profile</span>
</BlockTitle>

<List>
    <WrapperListInput label="名前" bind:value={userData.name} type="text" />
    <WrapperListInput inputClass="!h-20" label="自己紹介" bind:value={userData.bio} type="textarea" />
    
    <BlockTitle>性別</BlockTitle>
    <Block>
        <ListItem label title="男性">
            <Radio
            slot="media"
            component="div"
            value="M"
            checked={userData.gender === "M"}
            onChange={() => { userData.gender = "M"; }}
            />
        </ListItem>
        <ListItem label title="女性">
            <Radio
            slot="media"
            component="div"
            value="F"
            checked={userData.gender === "F"}
            onChange={() => { userData.gender = "F"; }} />
        </ListItem>
        <ListItem label title="その他">
            <Radio
            slot="media"
            component="div"
            value="O"
            checked={userData.gender === "O"}
            onChange={() => { userData.gender = "O"; }} />
        </ListItem>
    </Block>
    
    <BlockTitle>マッチしたいテクノロジー</BlockTitle>
    <Block>
        {#each userData.technologies as technology}
            <Chip
            class="m-0.5"
            deleteButton
            onDelete={() => { userData.technologies = userData.technologies.filter((t) => t !== technology); }}
            >
                {technology}
            </Chip>
        {/each}

        <Chip class="m-0.5" onClick={() => { addingTechnology = true; }}>
            +
        </Chip>
    </Block>

    <BlockTitle>スキル</BlockTitle>
    <Block>
        {#each userData.skilledTechnologies as technology}
            <Chip
            class="m-0.5"
            deleteButton
            onDelete={() => { userData.skilledTechnologies = userData.skilledTechnologies.filter((t) => t !== technology); }}
            >
                {technology}
            </Chip>
        {/each}

        <Chip class="m-0.5" onClick={() => { addingSkilledTechnology = true; }}>
            +
        </Chip>
    </Block>


    
    <WrapperListInput label="Twitter" bind:value={userData.twitter} type="text" />
    <WrapperListInput label="Github" bind:value={userData.github} type="text" />
</List>


