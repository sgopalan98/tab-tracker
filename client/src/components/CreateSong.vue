<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="song.title"
        ></v-text-field>

        <v-text-field
          label="Artist"
          required
          :rules="[required]"
          v-model="song.artist"
        ></v-text-field>

        <v-text-field
          label="Genre"
          required
          :rules="[required]"
          v-model="song.genre"
        ></v-text-field>

        <v-text-field
          label="Album"
          required
          :rules="[required]"
          v-model="song.album"
        ></v-text-field>

        <v-text-field
          label="Album Image Url"
          required
          :rules="[required]"
          v-model="song.albumImageUrl"
        ></v-text-field>

        <v-text-field
          label="YouTube ID"
          required
          :rules="[required]"
          v-model="song.youtubeId"
        ></v-text-field>
        <v-btn
        dark
        class="cyan"
        @click="search">
        Search for song
      </v-btn>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field
          label="Tab"
          multi-line
          required
          :rules="[required]"
          v-model="song.tab"
        ></v-text-field>

        <v-text-field
          label="Lyrics"
          multi-line
          required
          :rules="[required]"
          v-model="song.lyrics"
        ></v-text-field>
      </panel>

      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

      <v-btn
        dark
        class="cyan"
        @click="create">
        Create Song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import Musixmatch from 'musixmatch'
import keys from '@/assets/APIs'

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      try {
        await SongsService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
      }
    },
    async search(){
      if(!this.song.title)
        return
      const query = this.song.title + " " + this.song.artist;
      const url = `https://www.googleapis.com/youtube/v3/search?key=${keys.YOUTUBE_API_KEY}&type=video&part=snippet&q=${query}`;

      const response = await fetch(url);
      const data = await response.json();
      this.song.youtubeId = data.items[0].id.videoId
      console.log(this.song.youtubeId)

      
      const init = {
          // Required from Musixmatch.com
          apikey: keys.MUSIXMATCH_API_KEY,
      
          // Optional default 'https://api.musixmatch.com/ws/1.1/'
          // baseURL will be prepended to `url` unless `url` is absolute.
          baseURL: '/musixmatchapi/ws/1.1/',
      
          // // Optional if you have problem with CORS, default is 'https://cors-anywhere.herokuapp.com/'
          // // if you want remove prefix CORS url set value tobe ''
          corsURL: '',
      
          // // Optional default is 'Json'
          // format: 'json'
        }   
 
        const music = Musixmatch(init)
        
        var song = this.song 
        music.matcherLyrics({q_track:this.song.title, q_artist:this.song.artist})
        .then(function(data){
          console.log(data.lyrics.lyrics_body)
          song.lyrics = data.lyrics.lyrics_body
        }).catch(function(err){
          console.log(err);
        })
    }
  }
}
</script>

<style scoped>
</style>