<template>
  <div id="app">
    <div id="top">
      <img class="logo" src="./images/logo.png">
      <img class="logo2" src="./images/logo2.png">
      <input type="text" name="" >
    </div>
    <div id="cot">
      <div id="left">
        <p class="btitle">推荐</p>
        <p class="little checked"><i></i>发现音乐</p>
        <p class="little"><i></i>私人FM</p>
        <p class="little"><i></i>MV</p>
        <p class="little"><i></i>朋友</p>
        <p class="btitle">我的音乐</p>
        <p class="little"><i></i>iTunes音乐</p>
        <p class="little"><i></i>下载的音乐</p>
        <p class="btitle">创建的歌单</p>
        <p class="little"><i></i>我最喜欢的音乐</p>
        <p class="btitle">收藏的歌单</p>
        <p class="little"><i></i>苹果客服是个好音乐电台</p>
        <p class="little"><i></i>EDM | 当毒性电音遇上磁性男嗓</p>
        <p class="little"><i></i>那些年被用作个性签名的歌词</p>
        <p class="little"><i></i>陈奕迅翻唱集</p>
        <p class="little"><i></i>生命中有太多遗憾，岁月里有太多伤感</p>
        <div id="bMusic">
          <div id="pic">
            <img :src="songdetail.pic">
          </div>
          <div id="songinfo">
            <p id="sName">{{songdetail.name}}</p>
            <p id="sSinger">{{songdetail.singer}}</p>
            <audio  v-bind:src="this.$store.state.songlist[inx]" ></audio>
          </div>
        </div>
      </div>
      <div id="right">
        <router-view></router-view>
        <div id="menu" >
          <div id="menuTop"><span>播放列表</span></div>
          <div id="menuMid">总共{{this.$store.state.songlist.length}}首</div>
          <div v-for="(sng,index) in this.$store.state.songmenu">
            <p :class="[(index%2) ? 'bianse' : '']"><span class="sname" :class="[(inx === index) ? 'bor' : '']" @click="getCmusic(index)">{{sng.Name}}</span><span :class="[(inx === index) ? 'bor' : '']">{{sng.Singer}}</span><span :class="[(inx === index) ? 'bor' : '']">{{sng.Time}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div id="buttom">
      <img src="./images/previous.png" v-on:click="getPre">
      <img id="cPlay" src="./images/continue.png" v-on:click="getMusic">
      <img src="./images/next.png" v-on:click="getNext">
      <span class="jindu"><span id="jdt"></span></span>
       <span>{{mTime.min}}:{{mTime.sec}}/{{tTime.min}}:{{tTime.sec}}</span>
       <span style="margin-left:159px;cursor:pointer;" v-on:click="getMenu">歌单</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      continue: require('./images/continue.png'),
      stop: require('./images/stop.png'),
      mTime: {
        'min': 0,
        'sec': 0,
        't': 0
      },
      tTime: {
        'min': 0,
        'sec': 0,
        't': 0
      },
      inx: 1,
      songdetail: {
        'singer': '',
        'pic': '',
        'name': ''
      }
    }
  },
  mounted: function () {
    this.getDetail()
  },
  methods: {
    getMusic () {
      var audio = document.getElementsByTagName('audio')[0]
      var _this = this
      this.tTime.t = Math.floor(audio.duration)
      console.log(this.tTime.t)
      this.tTime.sec = Math.floor(this.tTime.t % 60)
      this.tTime.min = Math.floor(this.tTime.t / 60)
      var getMtime = function () {
        _this.mTime.t = Math.round(audio.currentTime)
        _this.mTime.sec = Math.floor(_this.mTime.t % 60)
        _this.mTime.min = Math.floor(_this.mTime.t / 60)
        var percent = _this.mTime.t / _this.tTime.t
        var jdt = document.getElementById('jdt')
        jdt.style.width = Math.floor(percent * 400) + 'px'
      }
      /* 获取音乐专辑图片，歌名，歌手 */

      /* 显示时间和进度条 */
      var pic = document.getElementById('cPlay')
      if (audio.paused) {
        audio.play()
        pic.src = this.stop
      } else {
        audio.pause()
        pic.src = this.continue
      }
      setInterval(getMtime, 1000)
    },
    getNext () {
      var len = this.$store.state.songlist.length
      var _this = this
      if (this.inx === (len - 1)) {
        this.inx = 0
      } else {
        this.inx += 1
      }
      this.getDetail()
      setTimeout(nextmusic, 1000)
      function nextmusic () {
        var audio = document.getElementsByTagName('audio')[0]
        _this.tTime.t = Math.floor(audio.duration)
        console.log(_this.tTime.t)
        _this.tTime.sec = Math.floor(_this.tTime.t % 60)
        _this.tTime.min = Math.floor(_this.tTime.t / 60)
        var getMtime = function () {
          _this.mTime.t = Math.round(audio.currentTime)
          _this.mTime.sec = Math.floor(_this.mTime.t % 60)
          _this.mTime.min = Math.floor(_this.mTime.t / 60)
          var percent = _this.mTime.t / _this.tTime.t
          var jdt = document.getElementById('jdt')
          jdt.style.width = Math.floor(percent * 400) + 'px'
        }
        audio.play()
        var pic = document.getElementById('cPlay')
        pic.src = _this.stop
        setInterval(getMtime, 1000)
      }
    },
    getPre () {
      var len = this.songlist.length
      var _this = this
      if (this.inx === 0) {
        this.inx = len - 1
      } else {
        this.inx -= 1
      }
      this.getDetail()
      setTimeout(nextmusic, 1000)
      function nextmusic () {
        var audio = document.getElementsByTagName('audio')[0]
        console.log(_this.inx)
        _this.tTime.t = Math.floor(audio.duration)
        _this.tTime.sec = Math.floor(_this.tTime.t % 60)
        _this.tTime.min = Math.floor(_this.tTime.t / 60)
        var getMtime = function () {
          _this.mTime.t = Math.round(audio.currentTime)
          _this.mTime.sec = Math.floor(_this.mTime.t % 60)
          _this.mTime.min = Math.floor(_this.mTime.t / 60)
          var percent = _this.mTime.t / _this.tTime.t
          var jdt = document.getElementById('jdt')
          jdt.style.width = Math.floor(percent * 400) + 'px'
        }
        var pic = document.getElementById('cPlay')
        audio.play()
        pic.src = _this.stop
        setInterval(getMtime, 1000)
      }
    },
    getCmusic (sth) {
      this.inx = sth
      var _this = this
      this.getDetail()
      setTimeout(nextmusic, 1000)
      function nextmusic () {
        var audio = document.getElementsByTagName('audio')[0]
        console.log(_this.inx)
        _this.tTime.t = Math.floor(audio.duration)
        _this.tTime.sec = Math.floor(_this.tTime.t % 60)
        _this.tTime.min = Math.floor(_this.tTime.t / 60)
        var getMtime = function () {
          _this.mTime.t = Math.round(audio.currentTime)
          _this.mTime.sec = Math.floor(_this.mTime.t % 60)
          _this.mTime.min = Math.floor(_this.mTime.t / 60)
          var percent = _this.mTime.t / _this.tTime.t
          var jdt = document.getElementById('jdt')
          jdt.style.width = Math.floor(percent * 400) + 'px'
        }
        var pic = document.getElementById('cPlay')
        audio.play()
        pic.src = _this.stop
        setInterval(getMtime, 1000)
      }
    },
    getMenu () {
      var oMenu = document.getElementById('menu')
      if (oMenu.style.display === 'block') {
        oMenu.style.display = 'none'
      } else {
        oMenu.style.display = 'block'
      }
    },
    getDetail () {
      var len = this.inx
      var url = '/song/detail?ids='
      var myUrl = (url + this.$store.state.idlist[len]).toString()
      var _this = this
      this.$http.get(myUrl)
        .then(function (response) {
          console.log(response.data.songs[0])
          _this.songdetail.singer = response.data.songs[0].ar[0].name
          _this.songdetail.name = response.data.songs[0].name
          _this.songdetail.pic = response.data.songs[0].al.picUrl
          console.log(response.data.songs[0].al.picUrl)
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  width: 1002px;
  margin: 0 auto;
  height: 704px;
}
#top{
  width: 1002px;
  height: 55px;
  background-color: #b72712;
  margin: 0 auto;
  position: relative;
  border-radius: 5px;
  margin-top: 50px;
}
.logo{
  position: relative;
  top: 5px;
  left: 30px;
}
.logo2{
  position: relative;
  top: 10px;
  margin-left: 10px;
}
#top input{
  width: 200px;
  height: 22px;
  border-radius: 10px;
  border: none;
  padding-left: 30px;
  outline: medium;
  background-image: url(./images/search.png);
  background-position: 5px 2px;
  background-repeat: no-repeat;
  position: absolute;
  bottom:12px;
  left: 350px;
}
#buttom{
  height: 55px;
  width: 1002px;
  border-radius: 5px;
  background-color: #f6f6f6;
  clear: both;

}
#buttom img{
  width: 32px;
  height: 32px;
  margin-top: 7px;
  margin-left: 22px;
}
#buttom img:nth-child(2){
  width: 40px;
  height: 40px;
}
#cot{
  font-size: 15px;
  height: 512px;
}
#cot .btitle{
  padding-left: 10px;
  color: gray;
}
#cot .little{
  font-size: 13px;
}
#left{
  width: 19%;
  height: 594px;
  float: left;
  background-color: #f6f6f6;
}
#left p{
  width: 100%;
  height: 32px;
  line-height: 32px;
  white-space: nowrap;/*一行显示*/
  overflow: hidden;/*超出部分隐藏*/
  text-overflow: ellipsis;/*用...代替超出部分*/
}
#left i{
  padding-left: 25px;
}
#right{
  width: 80%;
  height: 594px;
  overflow: scroll;
  float: left;
}
#cot ul{
  list-style: none;
}
#cot .checked{
  background-color: #e3e3e3;
  border-left: 3px solid #d72128;
}
#bMusic{
  width: 190px;
  height: 80px;
  float: left;
  background-color: #f6f6f6;
  border-top: 1px solid #c5c5c5;
  border-bottom: 1px solid #c5c5c5;
}
#bMusic #pic{
  width: 40%;
  float: left;
}
#bMusic #songinfo{
  width: 56%;
  height: 80px;
  float: left;
  position: relative;
  top: 20px;
}
#pic img{
  width: 60px;
  height: 60px;
  position: relative;
  top: 10px;
  left: 10px;
  float: left;
}
#songinfo p{
  width: 100px;
  height: 20px;
  line-height: 20px;
}
#songinfo #sName{
  font-size: 14px;
}
#songinfo #sSinger{
  font-size: 12px;
  color: #7777a2;
}
#buttom span{
  display: inline-block;
  width: 40px;
  color: #7777a2;
  position: relative;
  bottom: 13px;
  left: 85px;
  margin-left: 30px;
}
#buttom .jindu{
  display: inline-block;
  background-color: #999999;
  position: relative;
  width: 400px;
  height: 5px;
  left: 80px;
  border-radius: 2px;
  bottom: 6px;
}
#buttom #jdt{
  width: 0px;
  height: 5px;
  background-color: #d71a22;
  position: relative;
  border-radius: 2px;
  top: -12px;
  left: -30px;
}
#menu{
  width: 500px;
  height: 400px;
  background-color:#ffffff;
  position: absolute;
  right: 150px;
  bottom: 5px;
  display: block;
  box-shadow:-2px -2px 3px #aaaaaa;
  display: none;
}
#menu #menuTop{
  text-align: center;
  font-size: 14px;
  height: 45px;
  background-color: #efefef;
  opacity: 0.6;
}
#menu #menuTop span{
  display: inline-block;
  width: 80px;
  color: white;
  border-radius: 4px;
  background-color: #646463;
  height: 25px;
  line-height: 25px;
  margin: 10px 0;
}
#menu #menuMid{
  height: 30px;
  line-height: 30px;
  background-color: #ffffff;
  padding-left: 20px;
  font-size: 14px;
  color: #acacac;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
}
#menu span{
  width: 19%;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  font-size: 14px;
  color: #5e5e5e;
  white-space: nowrap;/*一行显示*/
  overflow: hidden;/*超出部分隐藏*/
  text-overflow: ellipsis;/*用...代替超出部分*/
}
#menu span.sname{
  width: 58%;
  margin-left: 12px;
  display: inline-block;
  cursor: pointer;
}
#menu p.bianse{
  background: #f9f9f9;
}
#menu .bor{
  color: #a50010;
}
</style>
