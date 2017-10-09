<template>
    <div>
        <div id="sMid">
            <p>单曲</p>
            <p class="border"></p>
        </div>
        <div id="sList">
            <div>
            <span class="sIn">序号</span>
            <span class="sCz">操作</span>
            <span class="sNa">音乐标题</span>
            <span class="sEr">歌手</span>
            <span class="sAl">专辑</span>
            <span class="sTi">时长</span>
            </div>
            <div v-for="(item,index) in this.$store.state.searchlist" :class="[(index%2) ? '' : 'bianse']">
            <span class="sIn" :class="[(index%2) ? '' : 'bianse']">{{index+1}}</span>
            <span class="sCz" :class="[(index%2) ? '' : 'bianse']"><img src="../images/add.png" :class="[(index%2) ? '' : 'bianse']" style="width:28px;height:28px;margin-top:4px;" @click="onlyAddsong(item)"></span>
            <span class="sNa" :class="[(index%2) ? '' : 'bianse']" @click="addSong(item)">{{item.name}}</span>
            <span class="sEr" :class="[(index%2) ? '' : 'bianse']">{{item.artists[0].name}}</span>
            <span class="sAl" :class="[(index%2) ? '' : 'bianse']">{{item.album.name}}</span>
            <span class="sTi" :class="[(index%2) ? '' : 'bianse']">{{Math.floor((Math.floor(item.duration / 1000)/60)) + ':' + Math.floor((Math.floor(item.duration / 1000)%60))}}</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
    *{
        margin: 0;
        padding: 0;
        background-color: #fafafa;
    }
    #sMid {
        width: 100%;
        height: 31px;
        margin-top: 20px;
    }
    #sMid p:first-child{
        width: 70px;
        height: 30px;
        text-align: center;
        color: #fafafa;
        margin-left: 20px;
        line-height: 30px;
        border-radius: 4px;
        background-color: #b72712;
    }
    #sMid p.border{
        width: 800px;
        height: 1px;
        background-color: #b72712;
    }
    #sList{
        width: 100%;
        height: 343px;
    }
    #sList span{
        text-align: left;
        font-size: 12px;
        line-height: 30px;
        overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
    }
    #sList div:first-child span{
        border-right: 1px solid #d4d4d4;
    }
    #sList .sIn{
        width: 5%;
        display: inline-block;
        height:30px;
        text-align: left;
    }
    #sList .sCz{
        width: 8%;
        display: inline-block;
        height:30px;
    }
    #sList .sNa{
        width: 45%;
        display: inline-block;
        height:30px;
        cursor: pointer;
    }
    #sList .sEr{
        width: 15%;
        display: inline-block;
        height:30px;
    }
    #sList .sAl{
        width: 15%;
        display: inline-block;
        height:30px;
    }
    #sList .sTi{
        width: 6%;
        display: inline-block;
        height:30px;
    }
    #sList .bianse{
        background-color:#f4f4f4;
    }
</style>

<script>
export default {
  data () {
    return {
    }
  },
  mounted: function () {
  },
  methods: {
    addSong (sth) {
      console.log(sth.id)
      var oUrl = '/music/url?id=' + sth.id
      var ourUrl = oUrl.toString()
      var _this = this
      var aLi = 2
      console.log(ourUrl)
      function test () {
        var len = _this.$store.state.idlist.length - 1
        _this.$emit('refreshbizlines', len)
      }
      _this.$http.get(ourUrl)
        .then(function (response) {
          console.log(response.data.data[0].url)
          for (var i = 0; i < _this.$store.state.idlist.length; i++) {
            if (_this.$store.state.idlist[i] === response.data.data[0].id) {
              console.log('该歌曲已存在')
              aLi = 1
            }
          }
          console.log(aLi)
          if (aLi !== 1) {
            _this.$store.state.songlist.push(response.data.data[0].url)
            _this.$store.state.idlist.push(sth.id)
            var sUrl = '/song/detail?ids=' + sth.id
            _this.$http.get(sUrl)
              .then(function (response) {
                console.log(response.data.songs[0])
                var Ttime = response.data.songs[0].dt
                var time = Math.floor(Ttime / 1000)
                var sec = Math.floor(time % 60)
                var min = Math.floor(time / 60)
                _this.$store.state.songmenu.push({'Name': response.data.songs[0].name, 'Singer': response.data.songs[0].ar[0].name, 'Time': min + ':' + sec})
              })
            setTimeout(test, 500)
              .catch(function (response) {
                console.log(response)
              })
            _this.$store.state.nowN = _this.$store.state.idlist.length
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onlyAddsong (sth) {
      console.log(sth.id)
      var oUrl = '/music/url?id=' + sth.id
      var ourUrl = oUrl.toString()
      var _this = this
      var aLi = 2
      console.log(ourUrl)
      _this.$http.get(ourUrl)
        .then(function (response) {
          console.log(response.data.data[0].url)
          for (var i = 0; i < _this.$store.state.idlist.length; i++) {
            if (_this.$store.state.idlist[i] === response.data.data[0].id) {
              console.log('该歌曲已存在')
              aLi = 1
            }
          }
          console.log(aLi)
          if (aLi !== 1) {
            _this.$store.state.songlist.push(response.data.data[0].url)
            _this.$store.state.idlist.push(sth.id)
            var sUrl = '/song/detail?ids=' + sth.id
            _this.$http.get(sUrl)
              .then(function (response) {
                console.log(response.data.songs[0])
                var Ttime = response.data.songs[0].dt
                var time = Math.floor(Ttime / 1000)
                var sec = Math.floor(time % 60)
                var min = Math.floor(time / 60)
                _this.$store.state.songmenu.push({'Name': response.data.songs[0].name, 'Singer': response.data.songs[0].ar[0].name, 'Time': min + ':' + sec})
              })
              .catch(function (response) {
                console.log(response)
              })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

