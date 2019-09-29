<template>
  <div id="dashboard">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="book in books" :key="book.id">
          <v-card>
            <v-img height="200px" :src="book.imgUrl"></v-img>
            <v-card-title>{{ book.title }}</v-card-title>
            <v-card-text>
              <strong>Price:</strong>
              ${{ book.price }}
            </v-card-text>
            <v-card-actions>
              <v-btn class="ma-2" outlined color="pink" :to="`/${book.isbn}`">View Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="fixed-action-button">
      <!-- <router-link to="/add" class="btn btn-floating bnt-large red"></router-link> -->
      <v-btn absolute dark fab bottom right color="pink" to="/add">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import db from "../../config/fbInit";
export default {
  data() {
    return {
      books: []
    };
  },
  created() {
    db.collection("books")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(doc.data());
          const data = {
            id: doc.id,
            isbn: doc.data().isbn,
            title: doc.data().title,
            author: doc.data().author,
            imgUrl: doc.data().imgUrl,
            price: doc.data().price,
            description: doc.data().description,
            published: doc.data().published
          };
          // console.log(data);
          this.books.push(data);
        });
      });
  }
};
</script>

<style>
</style>
