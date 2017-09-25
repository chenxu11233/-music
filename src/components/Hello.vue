<template>
  <div class="hello">
  <button v-on:click="getNewsong">newsong</button>
  <button v-on:click="getDate">recommend</button>
    <div class="title">
    <h4>热门精选</h4>
      <div v-for="item in commonedlist.result" class="demo">
        <img :src="item.picUrl" style="width:150px;height:150px;">
        <p>{{item.name}}</p>
      </div>
      <div id="clear"></div>
      <h4>新歌速递</h4>
        <div id="newsong">
          <p><img src="../images/b.png" style="width:12px;height:12px;padding-right:10px;padding-left:10px;">播放全部</p>
          <ul v-for="(single,index) in newsonglist.result">
            <li class="sel" v-on:click="addSong(single)"><span class="index">{{index+1}}</span><span class="sName">{{single.name}}</span> <span class="sSinger">{{single.song.artists[0].name}}</span> </li>
          </ul>
        </div>
    </div>
   </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      newsong: [],
      commonedlist: [],
      newsonglist: []
    }
  },
  methods: {
    getDate () {
      var _this = this
      this.$http.post('/personalized')
        .then(function (response) {
          console.log(response.data)
          _this.commonedlist = response.data
          console.log(_this.commonedlist)
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    getNewsong () {
      var _this = this
      this.$http.post('/personalized/newsong')
        .then(function (response) {
          console.log(response.data)
          _this.newsonglist = response.data
          console.log(_this.newsonglist)
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    addSong (sth) {
      console.log(sth.id)
      var oUrl = '/music/url?id=' + sth.id + '&timestamp=1503019930000'
      var ourUrl = oUrl.toString()
      var _this = this
      console.log(ourUrl)
      this.$http.post(ourUrl)
        .then(function (response) {
          console.log(response.data.data[0].url)
          for (var i = 0; i < _this.$store.state.songlist.length; i++) {
            if (_this.$store.state.songlist[i] !== response.data.data[0].url) {
              _this.$store.state.songlist.push(response.data.data[0].url)
              console.log('添加成功')
              return 1
            } else {
              console.log('该歌曲已存在')
              return 1
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding: 0;
  background-color: #fafafa;
}
.title{
  margin-left: 15px;
  padding-bottom: 6px;
  color: #323232;
}
.title h4{
  font-size: 20px;
  font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; 
  border-bottom: solid 1px #e1e1e1;
  margin-bottom: 10px;
}
.demo{
  width:24%;
  font-size: 10px;
  height: 200px;
  float: left;
  margin-bottom: 20px;
}
.demo p{
  width: 150px;
}
#newsong{
  width: 784px;
  height: 195px;
  border:1px solid #e1e1e1;
  z-index: 50px;
}
#newsong p{
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  background-color: #fafafa;
}
#newsong ul{
  list-style: none;
}
#newsong ul li{
  width: 391px;
  border-left: 1px solid #e7e7e7;
  height: 32px;
  float: left;
}
#newsong .index{
  width: 20px;
  display: inline-block;
  color: #828282;
  font-size: 14px;
  padding: 0 15px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
#newsong .sName{
  width: 180px;
  display: inline-block;
  color: #222222;
  font-size: 14px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  cursor:pointer;
}
#newsong .sSinger{
  width: 84px;
  color: #828282;
  float: right;
  padding-right: 20px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
#clear{
  clear: both;
}
</style>
