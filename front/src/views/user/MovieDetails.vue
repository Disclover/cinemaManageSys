<template xmlns:vertical-align="http://www.w3.org/1999/xhtml">
  <div class="app"  >

    <el-container  >
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <img src="@/assets/1.jpg"
               :width="isCollapse ? '60' : '60'"
               :height="isCollapse ? '60' : '60'"
               style="float:left"/><br>&nbsp&nbsp&nbsp已登录
        </div>
        <div >
          <!-- 我是样例菜单 -->


          <el-menu default-active="1-5-1"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   :collapse="isCollapse">

            <el-menu-item index="1" @click="getMovie">
              <i class="el-icon-s-grid"></i>
              <span slot="title">全部电影</span>
            </el-menu-item>
            <el-menu-item index="2" @click="getmymovie">
              <i class="el-icon-s-ticket"></i>
              <span slot="title">我的电影票</span>
            </el-menu-item>
            <el-menu-item index="3" @click="getmycard">
              <i class="el-icon-postcard"></i>
              <span slot="title">我的会员卡</span>
            </el-menu-item>
            <!--<el-menu-item index="4" @click="getinfo">-->
              <!--<i class="el-icon-setting"></i>-->
              <!--<span slot="title">个人信息</span>-->
            <!--</el-menu-item>-->
            <el-menu-item index="5" @click="logout">
              <i class="el-icon-switch-button"></i>
              <span slot="title">登出</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div style="width: 60px; cursor: pointer;"
             @click.prevent="toggleSideBar">
          <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
          <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>

        </div>
        <!-- 我是样例菜单 -->
        <el-menu default-active="1"
                 class="el-menu-demo tab-page"
                 mode="horizontal"
                 @select="handleSelect"
                 active-text-color="#409EFF">

        </el-menu>
      </el-aside>

      <el-container>

        <el-main class="app-body">
          <el-steps :active="1" finish-status="success" simple>
            <el-step title="电影详情" ></el-step>
            <el-step title="选座" ></el-step>
            <el-step title="支付" ></el-step>
          </el-steps>


          <div class="details">
          <img  height="430px" width="320px" :src="ids.posterUrl" style="float:left;margin-top: 10px" >
            <span>
              <el-col :span="3">
              <h1>{{ids.name}}</h1>
              </el-col>

            </span><br><br><br><br>
            <span >简介：{{ids.description}}</span><br><br>
            <span>上映：{{ids.startDate}}</span><br>
            <span>地区：{{ids.country}}</span><br>
            <span>类型：{{ids.type}}</span><br>
            <span>语言：{{ids.language}}</span><br>
            <span>导演：{{ids.director}}</span><br>
            <span>主演：{{ids.starring}}</span><br>
            <span>编剧：{{ids.screenWriter}}</span><br><br>
            <span>

              <el-col :span="1.5">
              <span>想看：</span>
              </el-col>
              <el-col :span="1.5"  style="margin-top: -5px">

                <!--<el-button v-show="like==0" @click="MarkMovie" :class="{ liBackground:changeLeftBackground == index}" ><li class="el-icon-star-on" ></li></el-button>-->
                <el-button circle @click="change"  :class="changeLeftBackground==index? 'liBackground' : 'ltBackground'" ><i class="el-icon-star-off"></i></el-button>
              </el-col>

            </span><br><br><br><br><br>

          </div>
          <el-divider></el-divider>

          <div>
            <el-tabs style="margin-top: 50px">
            <el-tab-pane
              v-for="item in result"
              :label="day(item.date)"
              :key="item.date"
              >
              <span v-if="!item.scheduleItemList.length>0">今日暂无排片</span>
              <span v-if="item.scheduleItemList.length>0">
              <template>
                    <el-table
                      :data="item.scheduleItemList"
                      style="width: 100%"
                      max-height="250">
                      <el-table-column
                        prop="startTime"
                        label="放映开始时间"
                        width="250">
                        <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ time(scope.row.startTime)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="endTime"
                        label="放映结束时间"
                        width="250">
                        <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ time(scope.row.endTime)}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="province"
                        label="放映厅"
                        width="200">
                        <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.hallName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="city"
                        label="票价"
                        width="200">
                         <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.fare}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                      <router-link :to="{path:'/user/SelectSeats/id',query:{id:scope.row}}">
                      <el-button  size="small" > 选座</el-button>
                      </router-link>

                    </template>
                  </el-table-column>
                    </el-table>
                  </template>
              </span>

            </el-tab-pane>
          </el-tabs>
          </div>


        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    getMovie,getMovieDetail,markMovie,getMovieSchedule,getOccupiedSeat,LikeMovie,easeMovie
  }from "../../api/userAPI"
  export default {
    name: "MovieDetails",
    data(){
      return{
        changeLeftBackground: 0,
        isCollapse:false,
        result:[],
        ids:'',
        like:'',
        name:'',
        index:1,
      }},
    methods: {
      day(k){
        return k.substring(0,10)
      },
      time(k){
        return k.substring(11,19)
      },
      change(){
        if(this.like==0){
          this.MarkMovie()
        }else{
          this.EaseMovie()
        }
      },
      likeMivie(){
        LikeMovie(this.ids.id,sessionStorage.getItem('userId')).then((res)=>{
          console.log("fdsfdv")
          console.log(res)
          this.like=res.data.content.islike
          this.index=this.like
        },(error) => console.log('promise catch err'));
      },
      MarkMovie(){
        markMovie(this.ids.id,sessionStorage.getItem('userId')).then((res)=>{
          this.like=res.data.content.islike
          this.like=1
          this.index=1

        },(error) => console.log('promise catch err'));
      },
      EaseMovie(){
        easeMovie(this.ids.id,sessionStorage.getItem('userId')).then((res)=>{
          console.log(res)
          this.like=0
          this.like=0
          console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
          this.index=this.like
          console.log(this.like)
        },(error) => console.log('promise catch err'));
      },
      movieSh(){
        getMovieSchedule(this.ids.id).then((res)=>{
          console.log(this.ids.id)
          this.result=res.data.content;
          console.log(this.result.scheduleItemList)

        },(error) => console.log('promise catch err'));
      },
      toggleSideBar() {
        this.isCollapse = !this.isCollapse
      },
      logout: function () {
        this.$confirm('确认退出?', '提示', {})
          .then(() => {
            sessionStorage.removeItem('user');
            this.$router.push('/login');
          })
          .catch(() => { });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getMovie(event){
        this.$router.push({path: '/user/MovieList'});
      },
      getmymovie(event){
        this.$router.push({path: '/user/MyMovie'});
      },
      getmycard(event){
        this.$router.push({path: '/user/MyCard'});
      },
      getinfo(event){
        this.$router.push({path: '/user/Info'});
      },
      coming(event){
        this.$router.push({path: '/user/Coming'});
      },
      intheather(event){
        this.$router.push({path: '/user/MovieList'});
      },
      loadMovieList(){
        this.loading = true;
        // 请求参数
        let params = {
            count: 18
          },
          // 请求路径
          movieUrl = '/api/movie/' + this.movieType;
        // 如果是搜索进入，新增搜索关键字参数
        if (this.movieType == 'search') {
          params['q'] = this.$route.params.searchKey;
        }
        this.$http.post(movieUrl, params).then((res) => {
          console.log(res.data)
          // 这里不做多校验，可自己加，直接上数据
          this.list = res.data.subjects;
          this.title = res.data.title;
          this.loading = false;

        })
      }
    },
    create(){

    },
    mounted() {
      let ids=this.$route.query.id;
      console.log(this.$route.query.id)
      this.ids=ids
      this.movieSh(this.ids)
      this.likeMivie()
    }
  }

</script>

<style scoped>
  img{
    margin-right: 20px
  }

  .liBackground {
    background: #FFFFFF;
  }
  .ltBackground {
    background: lightgray;
  }


</style>




