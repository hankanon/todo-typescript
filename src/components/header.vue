<template>
    <header class="header">
        <h1>todos</h1>
        <input
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
            v-model="newTodo"
            @keyup.enter="addTodo"
        />
    </header>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";


@Component
export default class Header extends Vue {
    // props
    // @Prop() private msg!: string;
    // data
    newTodo: string = '';
    // @Model('change', { type: Boolean }) newTodo: string | null = "";
    // methods: 
    public addTodo (): void {
        this.$store.dispatch('addTodo', {
            title: this.newTodo,
            complated: false,
        })
        this.newTodo = ''
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
