<template>
  <div>
  <b-modal id="CreateTask" hide-footer>
    <template v-slot:modal-title>
      Create Task
    </template>
    <div class="d-block text-center">
        <b-form @submit.prevent="Create">
        <b-form-group
            id="input-group-1"
            label="Title:"
            label-for="input-1"
            description=""
        >
            <b-form-input
            id="input-1"
            v-model="Title"
            type="text"
            required
            placeholder="Enter Title"
            ></b-form-input>
        </b-form-group>
        
        <b-form-group
            id="input-group-1"
            label="Description:"
            label-for="input-1"
            description="Enter Title Here"
        >
            <b-form-input
            id="input-1"
            v-model="Description"
            type="text"
            required
            placeholder="Enter Description"
            ></b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-1"
            label="Category:"
            label-for="input-1"
            description="Enter Description Here"
        >
            <select v-model="Category" size="sm" class="mt-3" style="width:100%;">
                <option value="Backlog">Backlog</option>
                <option value="Product">Product</option>
                <option value="Development">Development</option>
                <option value="Done">Done</option>
            </select>
        </b-form-group>
        <b-button variant="danger" @click="$bvModal.hide(CreateTask)">Cancel</b-button>
        <b-button variant="success" type="submit">Create</b-button>
        </b-form>
    </div>
  </b-modal>
</div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                    { value: null, text: 'Please select an option' },
                    { value: 'Backlog', text: 'Backlog' },
                    { value: 'Product', text: 'Product' }, 
                    { value: 'Development', text: 'Development' },   
                    { value: 'Done', text: 'Done' },                
                
            ],
            Title: '',
            Description: '',
            Category: '',
        }
    },
    methods: {
        Create() {
            let payload = {
                Title: this.Title,
                Description: this.Description,
                Category: this.Category

            }
            this.$emit('CreateTask', payload)
        }
    },
    computed: {
    }


}
</script>

<style>

</style>