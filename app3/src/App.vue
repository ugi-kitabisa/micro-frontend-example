<template>
    <div>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
import Logo from "./assets/logo.svg?url";

export default {
    data() {
        return {
            msg: "Hello Microfrontend",
            Logo,
        };
    },
};
</script>

<!-- <style>
@import './assets/base.css';
</style> -->
