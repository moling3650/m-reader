<template>
  <div id="app">
    <reader :chapter-id="cid"></reader>
  </div>
</template>

<script>
  import querystring from 'querystring'
  import Reader from 'components/reader/reader'

  export default {
    components: {
      Reader
    },
    data () {
      return {
        cid: querystring.parse(window.location.search.substr(1)).cid || '1'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #app
    height 100%
</style>
