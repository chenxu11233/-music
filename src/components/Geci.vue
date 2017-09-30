<template>
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
          console.log(this.current)
        }
      }
    }
</script>