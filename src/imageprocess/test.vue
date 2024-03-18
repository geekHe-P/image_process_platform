<template>
    <div id = 'main'>
        <video ref="video" autoplay></video>
        <canvas width="640" height="480" id="canvas" ref="canvas"></canvas>
        <button style="position: absolute;z-index: 1000" @click="toggleSending">{{ isSending ? '暂停发送请求' : '开始发送请求' }}</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            imageData: null,
            isSending: false,
            stream:null,
            video:null,
            canvas:null,
            canvas1:null,

        };
    },
    mounted() {
        this.init();
        // setInterval(this.startCapture,3000)
    },
    methods: {
        async init(){
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.video = this.$refs.video;
            this.canvas = this.$refs.canvas;
            this.canvas1 = this.$refs.canvas1;
        },
        captureImage() {

            // const video = this.$refs.video;
            const canvas = document.createElement('canvas');
            canvas.width = this.$refs.video.videoWidth;
            canvas.height = this.$refs.video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                // Create a form data object to send the blob to the server
                const formData = new FormData();
                formData.append('image', blob, 'image.jpg');

                // Send the blob to the server using Axios
                axios.post('http://127.0.0.1:8000/detect/', formData)
                    .then((response) => {
                        const detections = JSON.parse(response.data)
                        this.drawDetections(detections)
                        console.log('Image uploaded successfully', response);
                    })
                    .catch((error) => {
                        console.error('Error uploading image', error);
                    });
            }, 'image/jpeg', 0.8);


        },
        async startCapture() {
            this.video.srcObject = this.stream;

            const captureFrame = () => {
                if (!this.isSending){
                    const ctx = this.canvas.getContext('2d');
                    ctx.clearRect(0, 0, this.$refs.video.videoWidth, this.$refs.video.videoHeight);
                    setTimeout(()=>{
                        const ctx = this.canvas.getContext('2d');
                        ctx.clearRect(0, 0, this.$refs.video.videoWidth, this.$refs.video.videoHeight);
                    },500)
                    return;
                }
                this.captureImage();
                // console.log(this.imageData)
                // 创建一个新的FormData对象
                setTimeout(captureFrame, 400)
            };
            captureFrame();
        },
        toggleSending() {
            this.isSending = !this.isSending;
            this.startCapture();
        },
        drawDetections(detections) {
            // 根据检测结果在Canvas上绘制矩形和文字
            // const canvas = this.$refs.canvas;
            const ctx = this.canvas.getContext('2d');

            ctx.clearRect(0, 0, this.$refs.video.videoWidth, this.$refs.video.videoHeight);
            // console.log("前："+detections)
            detections.forEach(detection => {
                console.dir(detection['x'])
                const x = detection['x']
                const y = detection['y']
                const w = detection['w']
                const h = detection['h']
                const confidence = detection['confidence']
                const label = detection['label']
                // const { x, y, w, h, label, confidence, h,  } = detection;
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;

                ctx.strokeRect(x-w/2, y-h/2, w, h);
                ctx.fillStyle = '#00ff00';
                ctx.fillText(`${label} (${Math.round(confidence * 100)}%)`, x-w/2, y-h/2 - 5);
            });
        },
    },
    unmounted() {
        this.isSending=false;
    }
};
</script>

<style scoped>
#main {
    position: relative;

}
#canvas {
    position: absolute;
    top: 0;
    left: 0;
}
</style>

<!--<template>-->
<!--    <div>-->
<!--        <video ref="videoPlayer" autoplay></video>-->
<!--        <button @click="captureImage">Capture Image</button>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            imageData: null-->
<!--        }-->
<!--    },-->
<!--    mounted() {-->
<!--        navigator.mediaDevices.getUserMedia({ video: true })-->
<!--            .then(stream => {-->
<!--                const video = this.$refs.videoPlayer;-->
<!--                video.srcObject = stream;-->
<!--                video.play();-->
<!--            })-->
<!--            .catch(error => {-->
<!--                console.log(error);-->
<!--            });-->
<!--    },-->
<!--    methods: {-->
<!--        captureImage() {-->
<!--            const video = this.$refs.videoPlayer;-->
<!--            const canvas = document.createElement('canvas');-->
<!--            canvas.width = video.videoWidth;-->
<!--            canvas.height = video.videoHeight;-->
<!--            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);-->
<!--            this.imageData = canvas.toDataURL('image/jpeg');-->
<!--            // this.sendImage();-->
<!--            console.log(this.imageData)-->
<!--        },-->
<!--        sendImage() {-->
<!--            // 使用axios将图像数据发送到后端-->
<!--            axios.post('http://127.0.0.1:8000/detect/', { image: this.imageData })-->
<!--                .then(response => {-->
<!--                    // 处理成功响应-->
<!--                    const imageFromServer = response.data.image;-->
<!--                    // 在前端绘制图像-->
<!--                    const img = new Image();-->
<!--                    img.onload = () => {-->
<!--                        const canvas = document.createElement('canvas');-->
<!--                        canvas.width = img.width;-->
<!--                        canvas.height = img.height;-->
<!--                        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);-->
<!--                        document.body.appendChild(canvas);-->
<!--                    };-->
<!--                    img.src = imageFromServer;-->
<!--                })-->
<!--                .catch(error => {-->
<!--                    // 处理错误响应-->
<!--                    console.log(error);-->
<!--                });-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->

