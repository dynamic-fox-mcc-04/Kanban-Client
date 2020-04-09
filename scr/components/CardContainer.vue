<template>
  <div id="container-item">
        <div id="container-backlog" class="overflow-auto scrollbar scrollbar-primary">back log
           <div class="item">
            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">Header</div>
                <div class="card-body">
                  <h5 class="card-title">Primary card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            
            <div class="card border-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">Header</div>
                <div class="card-body text-primary">
                  <h5 class="card-title">Primary card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>

                <div>2</div>
                <div>3</div>
                <div>4</div>
            </div>
           
        </div>
        <div id="container-product" class="overflow-auto">Product
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
        </div>
        <div id="container-development" class="overflow-auto">Development
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
        </div>
        <div id="container-done" class="overflow-auto">Done
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
        </div>
    </div>
</template>

<script>
export default {
name:"CardContainer"
}
</script>

<style>

</style>