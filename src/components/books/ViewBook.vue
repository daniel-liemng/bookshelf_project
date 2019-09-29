<template>
  <div id="view-book">
    <h3 class="my-4 display-3 pink--text text-center">Book Details</h3>
    <v-container>
      <v-card max-width="600px" class="mx-auto">
        <v-img :src="imgUrl"></v-img>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          <p>
            <strong>Author:</strong>
            {{ author }}
          </p>
          <p>
            <strong>ISBN:</strong>
            : {{ isbn }}
          </p>
          <p>
            <strong>Price:</strong>
            : ${{ price }}
          </p>
          <p>
            <strong>Description:</strong>
            : {{ description }}
          </p>
          <p>
            <strong>Published:</strong>
            : {{ published }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn :to="`/edit/${isbn}`" class="ma-2" outlined color="pink">Edit Book</v-btn>
          <v-btn @click="deleteBook" class="ma-2" outlined color="amber">Delete</v-btn>
          <v-btn to="/" class="ma-2" outlined color="grey">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "../../config/fbInit";
export default {
  data() {
    return {
      isbn: "",
      title: "",
      author: "",
      imgUrl: "",
      price: 0,
      description: "",
      published: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("books")
      .where("isbn", "==", to.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.isbn = doc.data().isbn;
            vm.title = doc.data().title;
            vm.author = doc.data().author;
            vm.imgUrl = doc.data().imgUrl;
            vm.price = doc.data().price;
            vm.description = doc.data().description;
            vm.published = doc.data().published;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("books")
        .where("isbn", "==", this.$route.params.id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.isbn = doc.data().isbn;
            this.title = doc.data().title;
            this.author = doc.data().author;
            this.imgUrl = doc.data().imgUrl;
            this.price = doc.data().price;
            this.description = doc.data().description;
            this.published = doc.data().published;
          });
        });
    },
    deleteBook() {
      if (confirm("Are you sure?")) {
        db.collection("books")
          .where("isbn", "==", this.$route.params.id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>

<style>
</style>
