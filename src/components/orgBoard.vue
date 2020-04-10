<template>
<!-- board org start -->
    <div class="col-sm-3">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 style="cursor: pointer;" v-on:click="$emit('openTask', id, title)">{{ title }}</h5>
                </div>
            </div>
        </div>
    </div>
<!-- board org end -->
</template>

<script>
export default {
    name: "orgBoard",
    props:['id', 'title'],
}
</script>

<style>

</style>