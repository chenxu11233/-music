<template>
<div>
    <div id="geci">
        <div id="gRight">
            <img :src="this.$store.state.songdetail.pic" >
        </div>
        <div id="gLeft">
            <h4 @click="addCot">{{this.$store.state.songdetail.name}}</h4>
            <p><span class="before">专辑:</span> <span class="after">{{this.$store.state.songdetail.total.al.name}}</span><span class="before">歌手:</span><span class="after">{{this.$store.state.songdetail.singer}}</span></p>
            <div id="content">
                <div v-for="(item,index) in this.$store.state.gecilist">
                    <p :class="[(item.time<current) ? 'current' : 'zhunbei']">{{item.cot}}</p>
                </div>
            </div>
        </div>
    </div>
    <div id="pingl">
        <h4>精彩评论</h4>
        <div v-for="item in this.$store.state.songdetail.comment" class="pl">
            <span id="pleft"><img :src="item.user.avatarUrl"></span>
            <span id="pright">
            <span class="nickn">{{item.user.nickname}}:</span>{{item.content}}
            <p style="color:#888888;">{{new Date(item.time).toLocaleString()}}
            <span id="zan"><img src="../images/zan.png">({{item.likedCount}})</span></p>
            </span>
        </div>
    </div>
</div>
</template>

<style type="text/css" scoped>
    *{
        padding: 0;
        margin:0;
    }
    #geci{
        width: 100%;
        height: 594px;
    }
    #geci #gRight{
        width: 40%;
        height: 594px;
        float: left;
        background-color: #f4f4f4;
    }
    #geci img{
        width: 200px;
        height: 200px;
        margin-top: 80px;
        margin-left: 40px;
        border-radius: 120px;
        border: 20px solid #343434;
    }
    #geci #gLeft{
        width: 59%;
        height: 594px;
        padding-left: 5px;
        float: left;
        background-color: #f4f4f4;
        overflow: scroll;
    }
    #geci #gLeft h4 {
        margin-top: 45px;
        font-size: 25px;
        color: #1f1d1a;
    }
    #geci #gLeft span.before{
        display: inline-block;
        width: 40px;
        margin-left:1px;
        color: #a7a7a5;
        white-space: nowrap;/*一行显示*/
        overflow: hidden;/*超出部分隐藏*/
        text-overflow: ellipsis;/*用...代替超出部分*/
    }
    #geci #gLeft span.after{
        display: inline-block;
        width: 100px;
        margin-right:20px;
        color: #2d77cb;
        white-space: nowrap;/*一行显示*/
        overflow: hidden;/*超出部分隐藏*/
        text-overflow: ellipsis;/*用...代替超出部分*/
    }
    #geci #gLeft #content{
        width: 100%;
        height: 450px;

    }
    #geci #gLeft #content p{
        padding-top: 15px;
    }
    #geci #gLeft #content p.current{
        color: pink;
    }
    #geci #gLeft #content p.zhunbei{
        color: #494948;
    }
    #pingl h4 {
        font-size: 15px;
        color: #494948;
        padding-bottom: 10px;
        padding-top: 10px;
        border-bottom: 1px dashed gray;
    }
    #pingl img{
        width: 40px;
        height: 40px;
        border-radius: 40px;
        display: inline-block;
    }
    #pingl #pleft{
        width: 10%;
        display:inline-block;
        margin-left: 25px;
    }
    #pingl #pright{
        width: 82%;
        display: inline-block;
    }
    #pingl #pright .nickn{
        color: #2d77cb;
    }
    #pingl #pright img{
        width: 20px;
        height: 20px;
        position: relative;
        top: 5px;
        right: 2px;
    }
    #pingl #pright #zan{
        display: inline-block;
        width: 100px;
        float: right;
    }
    #pingl .pl{
        border-bottom: 1px dashed gray;
        font-size: 13px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>

<script type="text/javascript">
    export default {
      name: 'geci',
      data () {
        return {
          current: 0
        }
      },
      mounted: function () {
        var audio = document.getElementsByTagName('audio')[0]
        var _this = this
        audio.ontimeupdate = function () {
          _this.addCot()
        }
      },
      methods: {
        addCot () {
          var audio = document.getElementsByTagName('audio')[0]
          this.current = Math.round(audio.currentTime)
        }
      }
    }
</script>