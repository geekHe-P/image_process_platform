<template>
    <el-col :span="12">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            text-color="#fff"

        >
            <el-menu-item index="1">
                <el-icon><icon-menu /></el-icon>
                <span>Navigator Two</span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>Navigator Two</span>
            </el-menu-item>

        </el-menu>
    </el-col>
</template>

<script>
export default {
    name: "index"
}
</script>

<style scoped>

</style>