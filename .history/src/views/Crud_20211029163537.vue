 
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
        async getEntradas(){
            try {
                const entradasDB = await this.axios.get('wp/v2/posts');

                console.log(entradasDB);
            } 
            catch (error) {
                console.log(error);
            }
        }
    }

}
</script>