<template>
    <div class="container">
        <el-card class="mycard">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form :model="Loginform">
                <el-form-item>
                    <el-input v-model="Loginform.model" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="Loginform.code" placeholder="请输入验证码" style="width: 235px; margin-right: 10px;"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">备选项</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%;">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      Loginform: {
        model: '',
        code: ''
      }
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
