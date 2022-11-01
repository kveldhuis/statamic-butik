<template>
    <div>
        <input type="text" placeholder="3SQBEF0052264" v-on:input="updateValue($event.target.value)"
               v-model="value" class="border border-sky-500"/>
        <button @click="click" class="submit">Opslaan</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        value: {
            type: String
        },
        id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    methods: {
        updateValue: function (value) {
            this.$emit('input', value)
        },
        click: function () {
            axios.post(this.url, {
                trackAndTrace: this.value
            }).then(function (repsonse) {
                console.log(response);
            });
        }
    }
}
</script>
