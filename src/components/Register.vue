<template>
    <div class="register">
        <el-card class="register-card">
            <h1 class="card-title">注册</h1>
            <p class="card-description">基于 OpenCV 的图像处理平台</p>
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="账号" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="form.confirmPassword" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">注册</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="login-link">
                <el-button type="text" @click="$router.push('/')">已有账号？立即登陆</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'Register',
    data() {
        return {
            form: {
                phone: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            rules: {
                phone: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {message: '请输入正确的账号', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, message: '密码长度不能少于6位', trigger: 'blur'}
                ],
                confirmPassword: [
                    {required: true, message: '请再次输入密码', trigger: 'blur'},
                    {validator: this.checkConfirmPassword, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        checkConfirmPassword(rule, value, callback) {
            if (value !== this.form.password) {
                callback(new Error('两次输入的密码不一致'))
            } else {
                callback()
            }
        },
        submitForm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    // 表单验证通过，可以提交表单数据
                    console.log(this.form)
                    axios.post('/api/register/', this.form).then(response => {
                        // 注册成功，跳转到登陆页面
                        this.$message.success('注册成功，请登录')
                        this.$router.push('/')
                    }).catch(error => {
                        // 注册失败，提示用户
                        this.$message.error(error.response.data.message)
                    })
                } else {
                    // 表单验证不通过，提示用户
                    this.$message.error('请填写正确的信息')
                }
            })
        }
    }
}
</script>

<style scoped>
.register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.register-card {
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

.login-link {
    margin-top: 20px;
    text-align: center;
}
</style>
