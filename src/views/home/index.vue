<template>
  <div>
    <el-container class="my-container">
      <el-aside :width="iscollapse ? '60px' : '200px'">
        <div class="logo" :class="{miniLogo:iscollapse}"></div>
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="iscollapse"
          :collapse-transition="false"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-menu"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-menu"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-menu"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-menu"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-menu"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span @click="toggleAside()" class="el-icon-s-fold"></span>
          <span>江苏传智播客科技教育有限公司</span>
          <!-- 下拉菜单 -->
          <el-dropdown :hide-on-click="false" @command="checkItem">
            <span class="el-dropdown-link">
              <img class="avatar" :src="photo" alt="">
              <span class="name"> {{name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
export default {
  created () {
    const user = store.getUser()
    this.name = user.name
    this.phtot = user.photo
  },
  data () {
    return {
      iscollapse: false,
      name: '',
      photo: ''
    }
  },
  methods: {
    toggleAside () {
      this.iscollapse = !this.iscollapse
    },
    checkItem (command) {
      this[command]()
    },
    setting () {
      router.push('/setting')
    },
    logout () {
      store.delUser()
      router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background: #002033;
    .logo {
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .miniLogo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .el-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    span {
      vertical-align: middle;
    }
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .el-dropdown {
      float: right;
      img {
        vertical-align: middle;
        width: 36px;
      }
    }
  }
  .el-menu {
    border-right: none;
  }
}
</style>
