<template>
    <nav id="navbar" class="d-flex justify-content-between">
        <button id="toShowTodo" class="learn-more">Home</button>
        <h1 id="kanban-title">KanbanKu.co.id</h1>
        <button id="logout" class="learn-more" v-on:click="logout">Logout</button>
    </nav>
</template>

<script>
export default {
    name : "Navbar",
    methods :
    {
        logout()
        {
            localStorage.clear();
            this.$emit("logout");
        }
    }
}
</script>