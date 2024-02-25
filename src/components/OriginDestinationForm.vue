<template>
  <section class="origin-destination-form">
    <div class="ui form">
      <div class="ui message red small" v-show="error">{{ error }}</div>
      <div class="two fields">
        <div class="field">
          <div class="ui left icon input">
            <i class="marker alternate icon"></i>
            <input ref="origin" type="text" placeholder="Xuất phát" />
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="flag checker icon"></i>
            <input ref="destination" type="text" placeholder="Điểm đến" />
          </div>
        </div>
        <button
          class="ui button small green"
          :class="{ loading: spinner }"
          onclick="calculateButtonPressed"
        >
          Tính
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.origin-destination-form {
  margin: 10px;
  width: 610px;
  z-index: 1;
  position: relative;
}
</style>

<script>
import axios from "axios";
import firebase from "firebase";

export default {
  data() {
    return {
      route: {
        origin: {
          lat: 0,
          lng: 0,
          address: "",
        },
        destination: {
          lat: 0,
          lng: 0,
          address: "",
        },
        distance: {},
        duration: {},
      },
      spinner: false,
      error: "",
    };
  },

  mounted() {
    for (let ref in this.$refs) {
      const autocomplete = new google.maps.places.Autocomplete(
        this.$refs[ref],
        {
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(21.028511, 105.804817)
          ),
        }
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        this.route[ref].lat = place.geometry.location.lat();
        this.route[ref].lng = place.geometry.location.lng();
        this.route[ref].address = `${place.name}, ${place.vivinity}`;
      });
    }
  },
  methods: {
    calculateButtonPressed() {
      this.spinner = true;
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.route.orgin.lat},${this.route.orgin.lng}&destination=${this.route.destination.lat},${this.route.destination.lng}&key=`;
      axios
        .get(URL)
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
          } else {
            const elements = response.data.rows[0].elements;
            if ((elements[0].status = "ZERO_RESULTS")) {
              this.error = "No Results found";
            } else {
              this.route.distance = elements[0].distance;
              this.route.duration = elements[0].duration;

              this.saveRoute();
            }
          }
          this.spinner = false;
        })
        .catch((error) => {
          this.error = error;
          this.spinner = false;
        });
    },

    saveRoute() {
      const db = firebase.firestore();
      db.collection("routes")
        .doc()
        .set(this.route);
    },
  },
};
</script>
