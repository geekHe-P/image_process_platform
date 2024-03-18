<template>
    <el-container class="background"
    >
        <el-image class="bg-image"
                  src="https://img.js.design/assets/Resources/background/login-bg-5.jpg"
                  fit="cover"
        ></el-image>
        <aside style="background-color: #655F91">
<!--            <h5 style="padding-left: 20%;color: white">处理方法</h5>-->
            <el-container
            style="width: 100%;text-align: center">
                <el-image
                    style="width: 30px;padding-right: 50px;padding-left: 60px;padding-top: 20px;padding-bottom: 10px"
                    src="https://opencv.org/wp-content/uploads/2022/05/logo.png">
                </el-image>
            </el-container>

            <el-menu
                    active-text-color="#ffd04b"
                    background-color="#655F91"
                    class="el-menu-vertical-demo"
                    text-color="#fff"
                    :router="true"
                    style="border-right: solid 0 var(--el-border-color);"
                    default-active="/home/threshold"
            >
                <el-container
                        v-for="item in imagePro">
                    <el-menu-item
                            style="text-align: center;width: 100%"
                            v-if="!Array.isArray(item[0]) "
                            :index="item[2]">
                        <el-icon>
                            <icon-menu/>
                        </el-icon>
                        <span
                        >{{ item[1] }}</span>
                    </el-menu-item>
                    <el-sub-menu
                            style="text-align: center;width: 100%"
                            v-else-if="Array.isArray(item[0])">
                        <template #title>
                            <el-icon>
                                <location/>
                            </el-icon>
                            <span>{{ item[0][3] }}</span>
                        </template>
                        <el-container
                                v-for="ite in item">
                            <el-menu-item
                                    style="text-align: center;width: 100%"
                                    :index="ite[2]">{{ ite[1] }}
                            </el-menu-item>
                        </el-container>
                    </el-sub-menu>
                </el-container>

            </el-menu>

        </aside>
        <el-container>
            <el-header style="background-color: #C7F0FC">
                <h1>
                    基于opencv的图像处理平台{{ imagePro[title] }}
                </h1>
            </el-header>
            <el-main class="imageud" style="padding: 0">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            imagePro: [
                ['1', '阈值处理', '/home/threshold'],
                ['2', '边缘检测', '/home/canny'],
                [
                    ['3-1', 'blur', '/home/blur', '平滑处理'],
                    ['3-2', 'GaussianBlur', '/home/gaussianBlur', '平滑处理'],
                ],
                // ['4', '图像特征检测和匹配', '/home/sift_match'],
                ['5', '图像分割', '/home/image_segmentation'],
                ['6', '目标检测', '/home/object_detection'],
                ['7', '车牌识别', '/home/license_plate_recognition'],
                ['8', '视频流多目标检测', '/home/test'],
                ['9', '图像均衡化', '/home/calcHist'],
                ['10', '轮廓检测', '/home/line'],
                ['11', '直线检测', '/home/zline'],
                ['12', '角点检测', '/home/points'],
            ],
            title: '',
        };
    },

};


</script>


<style>
.el-menu-vertical-demo {
    height: 100vh;
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

.imageud {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.background {
    height: 100vh;
    width: 100%;
}

.bg-image {
    width: 100%;
    height: 100vh;
    position: absolute !important;
    z-index: -1 !important;
}

</style>

