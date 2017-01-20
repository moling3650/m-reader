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
    font-family "miui", "Helvetica Neue", Helvetica, STHeiTi, sans-serif

  .reader__bd
    background-color #e9dfc7

  .reader__chapter
    padding 15px

  .reader__content
    padding-bottom 50px
    font-size 14px
    .title
      border-bottom 1px solid
      margin-bottom 20px
      font-size 20px
      line-height 31px
      font-weight bold
      color #736357
      letter-spacing 2px
    .text
      margin .5em 0
      font-size 1em
      line-height 24px
      color #333
      text-align justify
      text-indent 2em

  .top__bd
    position absolute
    left 100%
    width 100%

  .fiction-toc
    .item
      padding 0 14px
      line-height 2.8em
      border-bottom 1px solid #eee
</style>
