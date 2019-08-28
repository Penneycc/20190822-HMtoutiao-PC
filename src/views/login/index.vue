<template>
    <div class="container">
        <el-card class="mycard">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon="">
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width: 235px; margin-right: 10px;"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">备选项</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login()" type="primary" style="width:100%;">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    // 自定义验证规则
    const checkModel = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkModel, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 点击事件时校验整体表单
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // // 校验成功
          // // console.log(this.loginForm)
          // this.$http.post('authorizations', this.loginForm)
          //   .then(res => {
          //     store.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码错误')
          //   })

          // 使用 async await替代promise处理异步操作
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .container {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;

        .mycard {
            width: 400px;
            height: 350px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            img {
                display: block;
                width: 200px;
                margin: 0 auto 20px;
            }
        }
    }
</style>
