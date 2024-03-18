<template>
    <el-row>
        <el-col :span="12">
            <el-row class="demo-image__placeholder">
                <el-col class="block"
                        style="padding: 0">
                    <el-card style="margin: 30px 100px 15px 100px;"
                             :body-style="{ padding: 0 }">
                        <span class="demonstration">处理前 </span>
                        <el-image
                                class='image'
                                ref="img"
                                fit="contain"
                                :key="upSrc"
                                :src="upSrc"
                        >
                            <template #placeholder>
                                <div class="image-slot">Loading<span class="dot">...</span></div>
                            </template>
                        </el-image>
                        <el-upload
                                ref='upload'
                                style="padding-bottom: 10px;padding-left: 30px;padding-right: 30px"
                                class="upload-demo"
                                :action='url'
                                method="post"
                                :data="formData_up"
                                :on-exceed="handleExceed"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :before-upload="handleBeforeUp"
                                :on-progress="handleProgress"
                                :on-preview="handlePreview"
                                :on-change="handleChange"
                                limit="1"
                                :auto-upload="false"
                                :show-file-list="false"
                        >
                            <el-button type="primary">选择图片</el-button>

                        </el-upload>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="demo-image__placeholder">
                <el-col class="block" style="padding: 0">
                    <el-card style="margin: 15px 100px 0 100px;"
                             :body-style="{ padding: '0' }">
                        <span class="demonstration">处理后</span>
                        <el-image
                                class="image"
                                fit="contain"
                                :key="downSrc"
                                :src="downSrc"/>
                        <div
                                style="padding-bottom: 10px;padding-left: 30px;padding-right: 30px"
                                class="upload-demo">
                            <el-button
                                    type="primary"
                                    @click="dowmImg"
                            >下载图片
                            </el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="12" class="parameter">
            <el-card class="form-card">
                <h1 class="button">参数</h1>
                <div style="margin: 20px"/>
                <el-form
                        :label-position="labelPosition"
                        label-width="100px"
                        style="max-width: 460px"
                        class="input"
                >
                    <!----------------------------   参数表单   ----------------------------------------->
                    <el-container
                            v-for="(item, index) in formData">
                        <el-form-item
                                v-if="item[3] == true"
                                :label="item[0]">
                            <el-input v-model="formData[index][1]" :placeholder="item[2]"/>
                        </el-form-item>
                    </el-container>
<!--                    <el-container>-->
                        <el-form-item
                                :label="formData[2][0]">
                            <el-cascader
                                    :props="props"
                                    v-model="formData[2][1]"
                                    :options="options1"
                                    @change="handleChangeS1"
                                    :placeholder="formData[2][2]"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="formData[3][0]">
                            <el-cascader
                                    :props="props"
                                    v-model="formData[3][1]"
                                    :options="options2"
                                    @change="handleChangeS2"
                                    :placeholder="formData[3][2]"
                            />
                        </el-form-item>
                        <el-form-item
                            :label="formData[4][0]">
                            <el-cascader
                                    :props="props"
                                    v-model="formData[4][1]"
                                    :options="options3"
                                    @change="handleChangeS3"
                                    :placeholder="formData[4][2]"
                            />
                        </el-form-item>
<!--                    </el-container>-->
                    <!----------------------------   参数表单   ----------------------------------------->
                </el-form>
                <div class="button">
                    <el-button type="primary" @click="processing">处理图片</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import {genFileId, UploadFile, UploadFiles} from 'element-plus'
import {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {defineComponent, reactive, ref} from "vue"
import FileSaver from 'file-saver';
import {ElMessage} from 'element-plus';

// 修改项
const name = 'line/'

// const formData = reactive({
//     // img_gray, threshold1, threshold2, apertureSize=apertureSize, L2gradient=L2gradient
//     img_gray: '',
//     threshold1: '',
//     threshold2: '',
//     apertureSize: '',
//     L2gradient: '',
// })

const formData = reactive([
    ['threshold_value', '', '128', true],
    ['max_value', '', '255', true],
    ['threshold_type', '', 'cv2.THRESH_BINARY', 4],
    ['model', '', 'cv2.RETR_EXTERNAL', 2],
    ['method', '', 'cv2.CHAIN_APPROX_SIMPLE', 3],
])

// 选项
const options1 = [
    {
        value: 0,
        label: 'cv2.THRESH_BINARY',
    },
    {
        value: 1,
        label: 'cv2.THRESH_BINARY_INV',
    },
    {
        value: 2,
        label: 'cv2.THRESH_TRUNC',
    },
    {
        value: 3,
        label: 'ccv2.THRESH_TOZERO',
    },
    {
        value: 4,
        label: 'cv2.THRESH_TOZERO_INV',
    },
]

const options2 = [
    {
        value: 0,
        label: 'cv2.RETR_EXTERNAL',
    },
    {
        value: 1,
        label: 'cv2.RETR_LIST',
    },
    {
        value: 2,
        label: 'cv2.RETR_CCOMP',
    },
    {
        value: 3,
        label: 'cv2.RETR_TREE',
    },
]

const options3 = [
    {
        value: 1,
        label: 'cv2.CHAIN_APPROX_NONE',
    },
    {
        value: 2,
        label: 'CHAIN_APPROX_SIMPLE',
    },
]


const handleChangeS1 = (value) => {
    formData[2][1] = value
    console.log(value[0])
}
const handleChangeS2 = (value) => {
    formData[3][1] = value
    console.log(value[0])
}
const handleChangeS3 = (value) => {
    formData[4][1] = value
    console.log(value[0])
}


// 参数
const upSrc = ref('')
const downSrc = ref('')
const imgFlog = ref(true)
const url = 'http://127.0.0.1:8000/' + name

const labelPosition = ref('right')


let formData_up = reactive({})

const value = ref([])

const props = {
    expandTrigger: 'hover' as const,
}

const upload = ref<UploadInstance>()


// 触发函数

const processing = () => {
    upload.value!.submit()
}

const dowmImg = () => {
    FileSaver.saveAs(downSrc.value, 'image.jpg');
    ElMessage.success('图片下载成功');
}

// 钩子
const handleSuccess: UploadProps['onSuccess'] = async (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    // 从响应中获取 Base64 编码的图像数据
    const imageBase64 = response.image_base64;

    // 将 Base64 编码的字符串解码成二进制数据
    const binaryData = window.atob(imageBase64);

    // 将二进制数据转换为 Blob 对象
    const blob = new Blob([new Uint8Array(binaryData.length).map((_, i) => binaryData.charCodeAt(i))], {
        type: 'image/jpeg',
    });

    // 将 Blob 对象转换为 URL，用于显示图像
    downSrc.value = URL.createObjectURL(blob);
    ElMessage.success('图片处理成功');
    // imgFlog.value = false
    upload.value!.clearFiles()
    const file = uploadFile.raw
    file.uid = genFileId()
    upload.value!.handleStart(uploadFile.raw)
    console.log("请求成功")
}


const handleError: UploadProps['onError'] = (Error, UploadFile, UploadFiles) => {
    ElMessage.error('图片处理失败');
    upload.value!.clearFiles()
    const file = UploadFile.raw
    file.uid = genFileId()
    upload.value!.handleStart(UploadFile.raw)
    // imgFlog.value = true
    console.log("失败日志：" + UploadFile.raw)
}

const handleBeforeUp: UploadProps['beforeUpload'] = (UploadRawFile) => {
    for (const item of formData) {
        // 如果属性值为空值，则删除该属性
        if (item[1] != '') {
            formData_up[item[0]] = item[1]
            console.log(item[0] + ':' + item[1])
        }
    }
    console.log("请求前日志:" + UploadRawFile)
}

const handleProgress: UploadProps['onProgress'] = (UploadProgressEvent, UploadRawFile, UploadRawFiles) => {

}

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

const handlePreview: UploadProps['onPreview'] = (file) => {

}

const handleChange: UploadProps['onChange'] = (file) => {
    upSrc.value = URL.createObjectURL(file.raw)
}

</script>

<style scoped>
.input {
    padding-right: 20px;
    padding-left: 20px;
}

.form-card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.image {
    width: 100%;
    height: 100vh;
}

.button {
    text-align: center;
}

.parameter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.bottom {
    margin: 7px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.demo-image__placeholder .block {
    padding: 30px 0;
    text-align: center;
    /*border-right: solid 1px var(--el-border-color);*/
    display: inline-block;
    width: 49%;
    /*box-sizing: border-box;*/
    vertical-align: top;
}

.demo-image__placeholder .demonstration {
    display: block;
    color: black;
    font-size: 18px;
    margin-bottom: 15px;
    margin-top: 15px;
}

.demo-image__placeholder .el-image {
    padding: 0 5px;
    max-width: 300px;
    max-height: 200px;
}

.demo-image__placeholder .dot {
    animation: dot 2s infinite steps(3, start);
    overflow: hidden;
}
</style>