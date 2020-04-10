<template>
    <div>
        <div v-for="(value, key) in containers" :key="key">
            <div class="container" v-bind:id="key">
                <div class="container-header d-flex justify-content-between align-items-center">
                    <div class="container-icon">
                    </div>
                    <h4 class="title">{{value}}</h4>
                    <a href="" v-bind:id="addKey(key)">
                    </a>
                </div>
                <div class="container-main">
                    <div class="card">
                        <div class="card-header">

                        </div>
                        <div class="card-main">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : ["containers"],
    methods:
    {
        addKey(key)
        {
            return `add-${key}`;
        }
    }
}
</script>