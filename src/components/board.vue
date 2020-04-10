<template>
    <div class="card border-dark mb-3 col-sm-3 card-main-con" :list="list">
        <div class="card-header">
            <h4 class="backlog title">{{title}}</h4>
        </div>
        <div class="card-body text-dark task-container">
            <draggable class="list-group" :list="list" group="tasks" style="min-height: 300px">
                <Card v-for="task in list" :taskCard="task" @refetchTasks="refetchTasks" :key="task.id"></Card>
            </draggable>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Card from './card.vue'
import draggable from "vuedraggable"

export default {
    name: 'Board',
    components: {
        Card,
        draggable
    },
    props: ['title','list'],
    methods: {
        refetchTasks() {
            this.$emit('refetchTasks')
        }
    }
}
</script>

