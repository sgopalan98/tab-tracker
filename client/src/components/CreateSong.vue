<template>
<v-layout>
    <v-flex xs4>
<panel title = "Song metadata">
    <v-text-field
        label="Title"
        v-model="title"
    ></v-text-field>

    <v-text-field
        label="Artist"
        v-model="artist"
    ></v-text-field>
    <v-text-field
        label="Album"
        v-model="album"
    ></v-text-field>
                <v-text-field
        label="Album - Image URL"
        v-model="albumImageUrl"
    ></v-text-field>
                <v-text-field
        label="Youtube ID"
        v-model="youtubeId"
    ></v-text-field>
</panel>
    </v-flex>
    <v-flex xs8 class = "ml-2">
    <panel title = "Song content">
        <v-text-field
            label="Lyrics"
            v-model="lyrics"
            multi-line
        ></v-text-field>
        <v-text-field
            label="Tabs"
            v-model="tabs"
            multi-line
        ></v-text-field>
    </panel>
    <v-btn 
        dark
        class="cyan" 
        @click="create">Create song</v-btn>
    </v-flex>

</v-layout>

</template>

<script>
import Panel from '@/components/Panel'
export default {

    components:{
        Panel
    },
    data(){
        return {
            title: null,
            artist: null,
            album: null,
            albumImageUrl: null,
            youtubeId: null,
            lyrics: null,
            tabs: null
        }
    },
    methods:{
        create(){
            //Call API
        }
    }
}
</script>

<style scoped>

</style>
