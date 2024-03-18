import { createRouter, createWebHashHistory } from 'vue-router';
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Welcome from "@/components/Welcome.vue";
import login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
import Index from "@/components/index.vue";
import Threshold from "@/imageprocess/threshold.vue"
import Canny from "@/imageprocess/canny.vue";
import Smooth from "@/imageprocess/blur.vue";
import Blur from "@/imageprocess/blur.vue";
import GaussianBlur from "@/imageprocess/GaussianBlur.vue";
import Sift_match from "@/imageprocess/sift_match.vue";
import Image_segmentation from "@/imageprocess/image_segmentation.vue";
import Object_detection from "@/imageprocess/object_detection.vue";
import License_plate_recognition from "@/imageprocess/license_plate_recognition.vue";
import Test from "@/imageprocess/test.vue"
import calcHist from "@/imageprocess/calcHist.vue";
import line from "@/imageprocess/line.vue";
import points from "@/imageprocess/points.vue";
import zline from "@/imageprocess/zline.vue";


const routes = [
    // {
    //     path: '/',
    //     name: 'Login',
    //     component: Login,
    // },
    // 重定向
    {
        path: '/home',
        redirect: '/home/threshold'
    },
    // 嵌套路由
    {
        path: '/',
        name: 'Welcome',
        component: Welcome,
        children: [
            {
                path: '/',
                component: Login,
            },
            {
                path: 'register',
                component: Register,
            },
        ],
    },

    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'threshold',
                component: Threshold,
            },
            {
                path: 'canny',
                component: Canny,
            },
            {
                path: 'blur',
                component: Blur,
            },
            {
                path: 'gaussianBlur',
                component: GaussianBlur,
            },
            {
                path: 'sift_match',
                component: Sift_match,
            },
             {
                path: 'image_segmentation',
                component: Image_segmentation,
            },
            {
                path: 'object_detection',
                component: Object_detection,
            },
            {
                path: 'license_plate_recognition',
                component: License_plate_recognition,
            },
           {
                path: 'test',
                component: Test,
           },
            {
                path: 'calcHist',
                component: calcHist,
            },
            {
                path: 'line',
                component: line,
            },
            {
                path: 'zline',
                component: zline,
            },
            {
                path: 'points',
                component: points,
            },

        ]
    },

    // {
    //     path: '/index',
    //     name: 'Index',
    //     component: Index,
    // },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
