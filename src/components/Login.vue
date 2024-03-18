<template>
    <div class="login">
        <el-card class="login-card">
            <h1 class="card-title">登陆</h1>
            <p class="card-description">基于 OpenCV 的图像处理平台</p>
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="账号" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="register-link">
                <el-button type="text" @click="toRegister">没有账号？立即注册</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                phone: '',
                password: ''
            },
            rules: {
                // phone: [
                //     {required: true, message: '请输入账号', trigger: 'blur'},
                //     {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的账号', trigger: 'blur'}
                // ],
                // password: [
                //     {required: true, message: '请输入密码', trigger: 'blur'}
                // ]
            }
        }
    },
    methods: {
        toRegister: function () {
            this.$router.push('/register')
        },
        submitForm() {
            this.$router.push('/home')
            this.$message.success('登陆成功')

            // this.$refs.form.validate(valid => {
            //     if (valid) {
            //         // 表单验证通过，可以提交表单数据
            //         console.log(this.form)
            //         // TODO: 调用后端API验证账号密码是否正确
            //     } else {
            //         // 表单验证不通过，提示用户
            //         this.$message.error('请填写正确的信息')
            //     }
            // })
        },
        resetForm() {
            this.$refs.form.resetFields()
        }
    }
}
</script>
<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-card {
    width: 400px;
    padding: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.card-title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
}

.card-description {
    margin: 0 0 40px;
    font-size: 16px;
    color: #666;
    text-align: center;
}

.register-link {
    margin-top: 20px;
    text-align: center;
}
</style>