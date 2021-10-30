 
<template>
            <div>
                <h1>Posts vindo do WP</h1>
                <ul>
                    <li v-for="(item, index) in entradas" :key="index">
                        {{ item.id }} -- {{ item.status }} -- {{ item.title }} -- {{ item.content }} -- {{ item.date }}
                    </li>
                </ul>
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
            // Para limpiar <p> del content
            limpar(value){
                return value.replace(/<\/?[^>]+(>|$)/g, "")
            },
                async getEntradas(){
            try {
                const entradasDB = await this.axios.get('wp-json/wp/v2/posts');

                //console.log(entradasDB.data);
                    //esse parametro element é cada um dos objetos do array da dados (posts retornado da api)
                await entradasDB.data.forEach(element => {
                    //console.log(element)

                    //aqui estamos fazendo o foreach (loop) e informando que o ITEM vai conter dados dos posts (title, id, conteudo)
                    let item = {}
                    item.id = element.id
                    item.title = element.title.rendered
                    item.content = this.limpar(element.content.rendered)
                    item.date = element.date
                    item.status = element.status
                    this.entradas.push(item)
                });
            } 
            catch (error) {
                console.log(error);
            }
        }
    }

}
</script>