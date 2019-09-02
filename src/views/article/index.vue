<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <!-- 面包屑自定义插槽 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 频道组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="changeDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover.images[0]"
              style="width:160px;height:100px;border: 1px solid #ddd"
              fit="contain"
            >
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="160px" height="100px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="name" label="状态" width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 0" type="info" plain>草稿</el-button>
            <el-button v-if="scope.row.status === 1" plain>待审核</el-button>
            <el-button v-if="scope.row.status === 2" type="success" plain>审核通过</el-button>
            <el-button v-if="scope.row.status === 3" type="warning" plain>审核失败</el-button>
            <el-button v-if="scope.row.status === 4" type="danger" plain>已删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button @click="$router.push('/publish?=' + scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="delArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      style="text-align:center"
      :current-page="reqParams.page"
      :page-sizes="[reqParams.per_page]"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // channelOptions: [],
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 删除文章
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除成功')
        this.getArticles()
      }).catch(() => {

      })
    },
    // 筛选
    search () {
      this.reqParams.page = 1
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.getArticles()
    },
    // 日期变化
    changeDate (valueArr) {
      if (valueArr) {
        this.reqParams.begin_pubdate = valueArr[0]
        this.reqParams.end_pubdate = valueArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 分页页面改变
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 文章总数
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
</style>
