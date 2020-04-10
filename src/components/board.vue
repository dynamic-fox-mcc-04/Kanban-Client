<template>
<div id="outer-cont" :status="status">
    <div id="cont-board">
        <div class="row d-flex justify-content-center pt-4" style="min-height: 80vh; max-height: 80vh; width: 100%; margin: 0;" >
            <catBoard :status="status['Pre-Log']" title="Pre-Log" @add="add" @deleteTask="deleteTask"></catBoard>
            <catBoard :status="status['To-Do']" title="To-Do" @add="add" @deleteTask="deleteTask"></catBoard>
            <catBoard :status="status['On-Going']" title="On-Going" @add="add" @deleteTask="deleteTask"></catBoard>
            <catBoard :status="status['Finished']" title="Finished" @add="add" @deleteTask="deleteTask"></catBoard>
        </div>
    </div>
</div>
</template>

<script>
import catBoard from '../components/catBoard'
export default {
    components: {
        catBoard
    },
    props: ['status'],
    methods: {
        add() {
            this.$emit('add')
        },
        deleteTask() {
            this.$emit('deleteTask')
        }
    }
}
</script>

<style>
    #outer-cont {
        display: flex;
        width: 100vw;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        
    }

    #cont-board {
        width: 100vw;
        margin: 2px 6px;
        height: 89vh;
        background-color: #263238;
        border-radius: 0.5rem;
        
    }
</style>