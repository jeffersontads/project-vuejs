 
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
        //invocamos, chamos o metodo que criamos abaixo
        this.getEntradas();
    },

    methods:{
        async getEntradas(){
            try {
                const entradasDB = await this.axios.get('wp-json/wp/v2/posts');

                console.log(entradasDB.data);
                    //esse parametro element é cada um dos objetos do array da dados (posts retornado da api)
                await entradasDB.data.forEach(element => {
                    console.log(element)
                    let item = {}
                    item.id = element.id
                });
            } 
            catch (error) {
                console.log(error);
            }
        }
    }

}
</script>