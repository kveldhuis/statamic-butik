<template>
    <div class="px-5 py-2">
        <div class="text-right">
            <a v-on:click.prevent="editing = !editing">Edit</a>
        </div>
        <div v-if="editing == false">
            <p>{{ value }}</p>
        </div>
        <div v-if="editing">
            <textarea v-on:input="updateValue($event.target.value)" v-model="value" class="w-full border border-sky-500"
                      rows="20">

            </textarea>
            <button @click="click" class="submit btn btn-default my-1">Opslaan</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        value: {
            type: String
        },
        editing: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    methods: {
        updateValue: function (value) {
            this.$emit('input', value)
        },
        click: async function () {
            await axios.post(this.url, {
                note: this.value
            }).then(response => {
                this.$toast.info('Gegevens opgeslagen!');    // Basic message
            }).catch(error => {
                this.$toast.error(error)
            });
        }
    }
}
</script>
