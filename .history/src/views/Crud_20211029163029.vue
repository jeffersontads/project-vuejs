 
<template>
            <div>
                <h1>CRUD</h1>
            </div>
</template>

<script> 
export default {

    data() {
        return {
            //array vazio que vamos encher com os dados retornados da api de posts de wp
            entradas: [],
        }
    },

    created() {

    },

    methods:{
        async getEntradasAllPosts:() {
            try {

            }catch (error) {
                console.log(error);
            }
        }
    }

}
</script>