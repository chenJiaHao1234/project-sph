<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="list in carsouelList">
                <img :src="list.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css'
export default {
    props: ['carsouelList'],
    watch: {
        carsouelList: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    new Swiper(this.$refs.mySwiper, {
                        direction: "horizontal", // 垂直切换选项
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        autoplay: {
                            autoplay: true,
                            disableOnInteraction: false
                        }
                    })
                })
            }
        }
    }
}

</script>

<style scoped>

</style>
