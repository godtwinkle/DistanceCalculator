<template>
  <section class="route-list-view">
    <div class="route-list-view-header">
      <h3>Danh sách tuyến đường</h3>
    </div>
    <select @change="sortRoute($event)">
      <option selected disabled>Sắp xếp</option>
      <optgroup label="Khoảng cách">
        <option value="distance-asc">Ngắn</option>
        <option value="distance-desc">Dài</option>
      </optgroup>
      <optgroup label="Thời gian">
        <option value="duration-desc">Chậm</option>
        <option value="duration-asc">Nhanh</option>
      </optgroup>
    </select>
    <button class="ui button show-all" @click="showAllRoutesButtonPressed">
      Show All
    </button>
    <div
      class="item"
      v-for="route in routes"
      :key="route.id"
      @click="routeItemPressed()"
    >
      <div>
        <i class="marker alternate icon"></i>
        {{ route.origin.address }}
      </div>
      <div>
        <i class="flag checkered icon"></i>
        {{ route.destination.address }}
      </div>
      <div class="ui label small">{{ route.distance.text }}</div>
      <div class="ui label small">{{ route.duration.text }}</div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import { EventBus } from "@/EventBus";

export default {
  data() {
    return {
      routes: [],
    };
  },

  created() {
    const db = firebase.firestore();
    db.collection("routes").onSnapshot((snap) => {
      this.routes = [];
      snap.forEach((doc) => {
        let route = doc.data();
        route.id = doc.id;
        this.routes.push(route);
      });
    });
  },

  methods: {
    sortRoute(e) {
      let value = e.target.value.split("-");
      let sortName = value[0];
      let sortValue = value[1];

      const db = firebase.firestore();
      db.collection("routes")
        .orderBy(sortName + ".value", sortValue)
        .get()
        .then((snap) => {
          this.routes = [];
          snap.forEach((doc) => {
            let route = doc.data();
            route.id = doc.id;
            this.routes.push(route);
          });
        });
    },
    routeItemPressed(route) {
      EventBus.$emit("routes-data", [route]);
    },
    showAllRoutesButtonPressed() {
      EventBus.$emit("routes-data", this.routes);
    },
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

.route-list-view-header {
  padding: 10px;
}

.item {
  padding: 10px;
  cursor: pointer;
}

.item:hover {
  background-color: rgb(0, 0, 0, 0.1);
}

.show-all {
  padding: 4px 10px;
}
</style>
