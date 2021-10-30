<template>
  <v-data-table
    :headers="headers"
    :items="entradas"
    sort-by="id"
    class=""
  >
    <template v-slot:top>
      <v-toolbar
        light
        shaped
      >
        <v-toolbar-title>Gerenciar Postagens!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-1"
              v-bind="attrs"
              v-on="on"
            >
              Novo Post
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h4">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.title" label="Titulo"> </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.content" label="Conteúdo" type="text"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Publicar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Tem certeza de que deseja excluir este item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        medium
        class="mr-2"
        @click="editItem(item)"
        color="blue"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        medium
        @click="deleteItem(item)"
         color="red"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="blue"
        @click="initialize"
      >
        Resetar
      </v-btn>
    </template>
  </v-data-table>
</template>



<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>

<script>
  export default {
    data: () => ({
        config: {
            headers:{
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9uZXh0anN0ZXN0YXBpLmxvY2FsIiwiaWF0IjoxNjM1NTU0MDMwLCJuYmYiOjE2MzU1NTQwMzAsImV4cCI6MTYzNjE1ODgzMCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.FddqFPYZbLn5eNob4rvwDa-JZx_xA5flgh_A4d7k0PU'
            }    
        },

      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Titulo do Post',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'id', value: 'id' },
        { text: 'Conteúdo', value: 'content' },
        { text: 'Data', value: 'date' },
        { text: 'status', value: 'status' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      entradas: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        id: '',
        content: '',
        date: '',
        status: '',
      },
      defaultItem: {
        title: '',
        id: '',
        content: '',
        date: '',
        status: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Post' : 'Editar Post'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
     async initialize () {

         try {
          const entradasDB = await this.axios.get('wp-json/wp/v2/posts');
        // console.log(entradasDB.data);
            await entradasDB.data.forEach(element => {
                //console.log(element);
                let item = {}
                item.id = element.id;
                item.date = element.date;
                item.status = element.status;
                item.content = this.limpiar(element.content.rendered);
                item.title = element.title.rendered;
                this.entradas.push(item)
                });
            } 
            catch (error) {
                console.log(error);
            }
        },
      limpiar(value){
        return value.replace(/<\/?[^>]+(>|$)/g, "")
      },

      editItem (item) {
        this.editedIndex = this.entradas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      async deleteItem (item) {
        const index = this.entradas.indexOf(item)
        const respuesta = confirm('Tem certeza de que deseja excluir este item?') && this.entradas.splice(index, 1)

        if(respuesta){
          await this.axios.delete(`wp-json/wp/v2/posts/${item.id}`, this.config);
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

async save () {
  if (this.editedIndex > -1) {
    // Editar
    Object.assign(this.entradas[this.editedIndex], this.editedItem)
  } else {
    // Agregar
    console.log(this.editedItem);
    const entrada = {
      title: this.editedItem.title,
      content: this.editedItem.content,
      status: 'publish'
    }
    try {
      const entradaNova = await this.axios.post('wp-json/wp/v2/posts',entrada, this.config);
      console.log(entradaNova.data);
      this.editedItem.id = entradaNova.data.id;  
      this.editedItem.date = entradaNova.data.date;  
      this.editedItem.status = entradaNova.data.status;  
    } catch (error) {
      console.log(error);
    }
    this.entradas.push(this.editedItem)
  }
  this.close()
},
    },
  }
</script>