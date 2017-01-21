<template>
  <div class="reader">
    <div class="reader__hd" v-show="barShow">
      <a class="reader__back"></a>
      <a class="reader__more"></a>
    </div>
    <div class="reader__bd" @click="toggleBar">
      <ul class="reader__chapter" :style="[{fontSize: contentFontSize + 'px'}, styleObjs[bgType]]">
        <li class="reader__content" v-for="content in contents">
          <h1 class="title">{{ content.t }}</h1>
          <p class="text" v-for="p in content.p">{{ p }}</p>
        </li>
      </ul>
    </div>
    <div class="reader__font" v-show="barShow && fontBarShow">
      <div class="reader__font-size">
        <span>字号</span>
        <a href="javascript:" class="reader__font-large" @click="lgFont">大</a>
        <a href="javascript:" class="reader__font-small" @click="smFont">小</a>
      </div>
      <div class="reader__font-bg">
        <span>背景</span>
        <a href="javascript:" v-for="(key, sobj) in styleObjs" :class="{active: bgType === key}" :style="sobj" @click="changeBgType(key)"></a>
      </div>
    </div>
    <div class="reader__ft" v-show="barShow">
      <div class="reader__ft-bar">
        <a href="javascript:" class="reader__prev-chapter" @click="getPrevChapter">上一章</a>
        <a href="javascript:">{{this.chapterId ? this.chapterId : '1'}}/671</a>
        <a href="javascript:" class="reader__next-chapter" @click="getNextChapter">下一章</a>
      </div>
      <a href="javascript:" class="reader__ft-toc"></a>
      <a href="javascript:" :class="fontBarShow ? 'reader__ft-font-active' : 'reader__ft-font'" @click="toggleFontBar"></a>
      <a href="javascript:" class="reader__ft-night"></a>
    </div>
    <div class="top__bd">
      <ul class="fiction-toc">
        <li class="item" v-for="chapter in chapters">{{ chapter.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getChapters, getChapterContent, storageGetter, storageSetter} from 'common/js/util.js'

  const INIT_BG_TYPE = 0
  const INIT_CONTENT_FONT_SIZE = 14

  export default {
    props: {
      chapterId: String
    },
    methods: {
      toggleBar () {
        this.barShow = !this.barShow
        if (!this.barShow) {
          this.fontBarShow = false
        }
      },
      toggleFontBar () {
        this.fontBarShow = !this.fontBarShow
      },
      lgFont () {
        this.contentFontSize < 20 && this.contentFontSize++
        storageSetter('content-font-size', this.contentFontSize)
      },
      smFont () {
        this.contentFontSize > 12 && this.contentFontSize--
        storageSetter('content-font-size', this.contentFontSize)
      },
      getPrevChapter () {
        if (this.chapterId > 1) {
          getChapterContent(--this.chapterId, (data) => this.contents.splice(0, this.contents.length, data))
        }
      },
      getNextChapter () {
        getChapterContent(++this.chapterId, (data) => this.contents.splice(0, this.contents.length, data))
      },
      changeBgType (type) {
        this.bgType = type
        storageSetter('content-bgType', this.bgType)
      }
    },
    data () {
      return {
        title: '',
        chapters: [],
        contents: [],
        barShow: false,
        fontBarShow: false,
        contentFontSize: INIT_CONTENT_FONT_SIZE,
        styleObjs: [
          {background: '#f7eee5'},
          {background: '#e9dfc7'},
          {background: '#a4a4a4'},
          {background: '#cdefce'},
          {background: '#283548', color: '#7685a2'},
          {background: '#0f1410', color: '#4e534f'}
        ],
        bgType: INIT_BG_TYPE
      }
    },
    created () {
      this.contentFontSize = storageGetter('content-font-size') || INIT_CONTENT_FONT_SIZE
      this.bgType = storageGetter('content-bgType') || INIT_BG_TYPE
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

  .reader__hd
    position fixed
    top 0
    z-index 2
    width 100%
    height 50px
    font-size 14px
    line-height 50px
    background-color rgba(0, 0, 0, .9)
    .reader__back
      float left
      margin 14px 0 0 10px
      &:before
        content ''
        display block
        width 23px
        height 23px
        background url('@back.png') no-repeat
        background-size contain
    .reader__more
      float right
      margin 22px 30px 0 0
      &:before
        content ''
        display block
        width 24px
        height 6px
        background url('more.png') no-repeat
        background-size contain

  .reader__bd
    background-color #e9dfc7
    color #333

  .reader__chapter
    padding 15px

  .reader__content
    padding-bottom 50px
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
      text-align justify
      text-indent 2em

  .reader__font
    position fixed
    bottom 70px
    z-index 3
    display block
    width 100%
    height 135px
    background rgba(0, 0, 0, .9)
    div
      margin-top 15px
      padding 5 10px
    span
      margin 0 20px 0 10px
      font-size 14px
      line-height 21px
      color #fff

  .reader__font-size
    a
      display inline-block
      padding 5px 40px
      border 1px solid #8c8c8c
      border-radius 16px
      margin 0 5px
      font-size 13px
      line-height 16px
      color #fff
      text-decoration none

  .reader__font-bg
    a
      position relative
      display inline-block
      width 30px
      height 30px
      border-radius 50%
      margin-left 10px
      vertical-align middle
      background #fff
      &.active:after
        content ''
        position absolute
        top -2px
        left -2px
        display block
        width 32px
        height 32px
        border-radius 50%
        border 1px solid  #ff7800

  .reader__ft
    position fixed
    bottom 0
    z-index 2
    width 100%
    background rgba(0, 0, 0, 0.9)
    .reader__ft-bar
      overflow hidden
      border-bottom 1px solid #333
      a
        width 25%
        height 48px
        font-size 13px
        line-height 48px
        &:nth-child(2)
          width 50%
    a
      float left
      width 33.33%
      height 70px
      font-size 10px
      line-height 21px
      color #fff
      text-align center
      text-decoration none
      &:before
        content ''
        display block

  .reader__ft-toc
    &:before
      margin 18px auto 9px
      width 18px
      height 13px
      background url('toc.png') no-repeat
      background-size contain
    &:after
      content '\76ee\5f55'

  .reader__ft-font
    &:before
      margin 18px auto 9px
      width 20px
      height 13px
      background url('font.png') no-repeat
      background-size contain
    &:after
      content '\5b57\4f53'

  .reader__ft-font-active
    &:before
      margin 17px auto 8px
      width 22px
      height 15px
      background url('@font.png') no-repeat
      background-size contain
    &:after
      content '\5b57\4f53'

  .reader__ft-day
    &:before
      margin 18px auto 4px
      width 19px
      height 18px
      background url('day.png') no-repeat
      background-size contain
    &:after
      content '\767d\5929'

  .reader__ft-night
    &:before
      margin 18px auto 6px
      width 16px
      height 16px
      background url('night.png') no-repeat
      background-size contain
    &:after
      content '\591c\95f4'



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
