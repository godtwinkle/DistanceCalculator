<template>
  <section class="route-list-view">
    <h1>Route List</h1>
  </section>
</template>

<script>
export default {
  data() {
    return {
      routes: [],
    };
  },

  created() {
    const db = firebase.firestore();
    db.collection("routes").onSnapshot((snap) => {
      snap.forEach((doc) => {
        this.routes = [];
        let route = doc.data();
        route.id = doc.id;
        this.routes.push(route);
      });
    });
  },
};
</script>

<style scoped>
.route-list-view {
  margin: 10px;
  z-index: 1;
  position: relative;
  width: 260px;
  background-color: white;
}
</style>
