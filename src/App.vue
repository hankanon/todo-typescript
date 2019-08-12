<template>
    <div id="app">
        <section class="todoapp" v-cloak>
            <v-header></v-header>
            <router-view />
            <v-footer></v-footer>
        </section>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import vHeader from "@/components/header.vue"; // @ is an alias to /src
import vFooter from "@/components/footer.vue"; // @ is an alias to /src

@Component({
    components: {
        vHeader,
        vFooter,
    },
})
export default class APP extends Vue {}
</script>

<style lang="scss">
@import "assets/css/index";
@import "assets/css/base";
[v-cloak] {
    display: none;
}
</style>
