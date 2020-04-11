<template>
<div class="modalAdd">
    <div class="modalAdd-content">
            <h3 style="display:flex; justify-content:center;">Add Todo</h3>
            <form style="display:flex; flex-direction:column; justify-content:space-between;" @submit.prevent="$emit('createTodo',formValue)">
                    <label for="title">Title</label>
                    <input type="text area" placeholder="Insert title" name="title" id="title" style="margin: 3% 0;" v-model="formValue.title" autocomplete="off"><br>
                    <label for="category">Category</label>
                    <select name="category" id="category" v-model="formValue.category">
                        <option value="backlog">backlog</option>
                        <option value="todo">todo</option>
                        <option value="done">done</option>
                        <option value="completed">completed</option>
                    </select>
                    <!-- <input type="category" placeholder="Insert category" name="category" id="category" style="margin: 3% 0;"> -->
                    <button type="submit" style="margin: 3% 0;" >Add</button>
                    <button type="submit" style="margin: 0 0;" @click="$emit('close')">cancel</button>
                </form>
    </div>
</div>

</template>

<script>
export default {
    name: "AddTodo",
    data() {
        return {
            formValue: {
                title:'',
                category:''
            }
        }
    }
}
</script>

<style>

</style>