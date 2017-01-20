<template>
  <div class="reader">
    <div class="reader__bd">
      <ul class="reader__chapter">
        <li class="reader__content" v-for="content in contents">
          <h1 class="title">{{ content.t }}</h1>
          <p class="text" v-for="p in content.p">{{ p }}</p>
        </li>
      </ul>
    </div>
    <div class="top__bd">
      <ul class="fiction-toc">
        <li class="item" v-for="chapter in chapters">{{ chapter.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getChapters, getChapterContent} from 'common/js/util.js'

  export default {
    props: {
      chapterId: String
    },
    data () {
      return {
        title: '',
        chapters: [],
        contents: []
      }
    },
    created () {
      getChapters((data) => {
        this.title = data.title
        this.chapters = data.chapters
      })
      getChapterContent(this.chapterId, (data) => this.contents.push(data))
    }
  }
</script>

<style lang="stylus" scoped>
  .reader
    position relative
    min-height 100%
    overflow hidden
    background-color #e9dfc7

  .top__bd
    position absolute
    left 100%
    width 100%
</style>
