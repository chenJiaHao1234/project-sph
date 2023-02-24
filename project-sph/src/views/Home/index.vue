<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import TypeNav from '@/components/TypeNav'
import ListContainer from '@/views/Home/ListContainer'
import TodayRecommend from '@/views/Home/TodayRecommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
export default {
  components: {
    TypeNav,
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },

  mounted() {
    this.$store.dispatch('userInfo')
    this.$store.dispatch('floorList')
    },
    computed: {
        floorList() {
            return this.$store.state.home.floorList
        }
    },
}
</script>

<style>

</style>