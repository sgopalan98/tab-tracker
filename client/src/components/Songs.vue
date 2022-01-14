<template>
<v-layout column>
    <v-flex xs6 offset-xs3>
  <panel title = "Songs">
    <div v-for="song in songs" :key="song.id">
      {{song.title}} - {{song.artist}} - {{song.album}}
    </div>
  </panel>
  </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongService from '@/services/SongService'
export default {
  components:{
      Panel
  },
  data () {
    return {
      songs:[
        {
          'title' : 'Starboy',
          'album' : 'Starboy',
          'artist': 'The Weeknd'
        }
      ]
    }
  },
  async mounted(){
    this.songs = (await SongService.index()).data
    console.log(this.songs)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
