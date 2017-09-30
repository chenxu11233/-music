<template>
	<div>
		<div id="sTop">
			<div id="topR"><img :src="this.$route.query.thismenu.picUrl"></div>
			<div id="topL">
			<p><img src="../images/gd.png" style="width:35px;height:35px;position:relative;top:4px;">{{this.$route.query.thismenu.name}}</p>
			<p>{{this.$route.query.thismenu.copywriter}}</p>
			</div>
		</div>
		<div id="clear"></div>
		<div id="sMid">
			<p>歌曲列表</p>
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
			<div v-for="(item,index) in SongList" :class="[(index%2) ? '' : 'bianse']">
			<span class="sIn" :class="[(index%2) ? '' : 'bianse']">{{index+1}}</span>
			<span class="sCz" :class="[(index%2) ? '' : 'bianse']"><img src="../images/add.png" :class="[(index%2) ? '' : 'bianse']" style="width:28px;height:28px;margin-top:4px;" @click="AMusic(item)"></span>
			<span class="sNa" :class="[(index%2) ? '' : 'bianse']" @click="BMusic(item)">{{item.name}}</span>
			<span class="sEr" :class="[(index%2) ? '' : 'bianse']">{{item.ar[0].name}}</span>
			<span class="sAl" :class="[(index%2) ? '' : 'bianse']">{{item.al.name}}</span>
			<span class="sTi" :class="[(index%2) ? '' : 'bianse']">{{Math.floor((Math.floor(item.dt / 1000)/60)) + ':' + Math.floor((Math.floor(item.dt / 1000)%60))}}</span>
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
	#sTop #topR{
		width: 28%;
		height: 220px;
		float: left;
	}
	#sTop #topR img{
		width: 170px;
		height: 170px;
		margin-top: 25px;
		margin-left: 30px;
	}
	#sTop #topL{
		width: 70%;
		height: 220px;
		margin-left: 10px;
		line-height: 50px;
		float: left;
	}
	#sTop #topL p:first-child{
		font-size: 26px;
		margin-top: 50px;
		margin-left: 20px;
	}
	#sTop #topL p{
		margin-left: 20px;
	}
	#clear{
		clear: both;
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
	/* /playlist/detail?id= */
export default {
  data () {
    return {
      SongList: []
    }
  },
  mounted: function () {
    this.getNewsongl()
  },
  methods: {
    getNewsongl () {
      var _this = this
      var url = 'playlist/detail?id='
      var mUrl = url + this.$route.query.thismenu.id
      this.$http.get(mUrl)
      .then(function (response) {
        console.log(response.data)
        _this.SongList = response.data.playlist.tracks
      })
      .catch(function (response) {
        console.log(response)
      })
    },
    BMusic (num) {
      this.$emit('refreshbizlines', num)
    },
    AMusic (num) {
      this.$emit('refreshbizline', num)
    }
  }
}
</script>