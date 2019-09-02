<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group @change="toggleCollect" v-model="reqParams.collect" size="small">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" type="success" style="float: right;" size="small">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :page-count="reqParams.page"
        @current-change="pageChange"
        hide-on-single-page
      ></el-pagination>
    </el-card>
    <!-- 添加素材对话框 -->
    <el-dialog
      title="添加素材"
      :visible.sync="dialogTableVisible"
      width="300px"
      style="text-align:center;"
    >
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="avatarSuccess"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  created () {
    this.getImages()
  },
  data () {
    return {
      total: 0,
      images: [],
      imageUrl: null,
      dialogTableVisible: false,
      headers: { Authorization: `Bearer ${store.getUser().token}` },
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      }
    }
  },
  methods: {
    // 上传成功后的操作
    avatarSuccess (res) {
      // console.log(res)
      this.$message.success('素材上传成功')
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogTableVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    // 添加素材
    openDialog () {
      this.dialogTableVisible = true
      this.imageUrl = null
    },
    // 删除图片素材
    delImage (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${item.id}`)
          this.$message.success('删除素材成功')
          this.getImages()
        })
        .catch()
    },
    // 切换收藏
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    // 素材全部与收藏切换
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 当前页改变
    pageChange (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.img_list {
  margin-top: 20px;
  .img {
    display: inline-block;
    position: relative;
    width: 160px;
    height: 160px;
    margin-right: 50px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    img {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
