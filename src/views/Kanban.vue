<template>
    <container v-bind:containers="containers" class="d-flex justify-content-around">
    </container>
</template>

<script>
import Container from "../components/Container";

export default {
    data()
    {
        return{
            containers : 
            {
                todo : "Todo", 
                in_progress : "In Progress", 
                done : "Done", 
                backlog : "Backlog"
            }
        }
    },
    components :
    {
        Container
    }
}
</script>