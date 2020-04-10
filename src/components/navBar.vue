<template>
  <nav class="navbar navbar-expand navbar-dark">
    <a class="navbar-brand" href="#">Kanban</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExample02">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        </ul>
        <form class="form-inline my-2 my-md-0">
        <input class="form-control " type="text" placeholder="Search">
        <button type="submit" @click.prevent="logout" class="form-control btn-danger ml-4">Logout</button>
        </form>
    </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.clear()
            this.$emit('logout')
        }
    }
}
</script>

<style>

</style>