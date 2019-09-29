<template>
  <div id="edit-book">
    <v-container>
      <v-card max-width="600px" class="mx-auto mt-5">
        <v-card-title class="pink white--text">Update Book</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onUpdateBook">
            <v-text-field type="text" v-model="isbn" label="ISBN" required disabled></v-text-field>
            <v-text-field type="text" v-model="title" label="Title" required></v-text-field>
            <v-text-field type="text" v-model="author" label="Author" required></v-text-field>
            <v-text-field type="text" v-model="imageUrl" label="Image URL" required></v-text-field>
            <v-img v-if="imageUrl" class="my-4" :src="imageUrl" height="200px" width="300px"></v-img>
            <v-text-field type="number" v-model="price" label="Price" required></v-text-field>
            <v-textarea v-model="description" label="Description" required></v-textarea>
            <v-text-field type="text" v-model="published" label="Published" required disabled></v-text-field>
            <v-date-picker header-color="pink" v-model="datepicker"></v-date-picker>
            <div class="mt-3">
              <v-btn class="ma-2" outlined color="pink" type="submit">Update Book</v-btn>
              <v-btn class="ma-2" outlined color="amber" @click="reset">Reset</v-btn>
              <v-btn class="ma-2" outlined color="grey" @click="cancel">Cancel</v-btn>
            </div>
          </v-form>
        </v-card-text>
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
      imageUrl: "",
      price: 0,
      description: "",
      published: "",
      datepicker: new Date().toISOString().substr(0, 10)
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
            vm.imageUrl = doc.data().imgUrl;
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
            this.imageUrl = doc.data().imgUrl;
            this.price = doc.data().price;
            this.description = doc.data().description;
            this.published = doc.data().published;
          });
        });
    },
    onUpdateBook() {
      db.collection("books")
        .where("isbn", "==", this.$route.params.id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                isbn: this.isbn,
                title: this.title,
                author: this.author,
                imgUrl: this.imageUrl,
                price: this.price,
                description: this.description,
                published: this.datepicker
              })
              .then(() => {
                this.$router.push(`/${this.isbn}`);
              })
              .catch(err => console.log(err));
          });
        });
    },
    reset() {
      this.isbn = "";
      this.title = "";
      this.author = "";
      this.imageUrl = "";
      this.price = 0;
      this.description = "";
      this.published = "";
      this.datepicker = "";
    },
    cancel() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
