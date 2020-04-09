<template>
  <div id="container">
    <div id="container-header">
        <div>Back Log</div>
        <div>Product</div>
        <div>Development</div>
        <div>Done</div>
    </div>
    <card-container></card-container>
</div>

</template>

<script>
import CardContainer from '../components/cardContainer'
export default {
    name:"HomePage",
    components:{
        CardContainer
    },

}
</script>

<style>

</style>