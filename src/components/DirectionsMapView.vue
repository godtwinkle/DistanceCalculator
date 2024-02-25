<template>
  <section class="map" ref="map"></section>
</template>

<script>
import { EventBus } from "@/EventBus";
export default {
  mounted() {
    const directionsService = new google.maps.DirectionsService();

    EventBus.$on("routes-data", (routes) => {
      const map = new google.maps.Map(this.$refs["map"], {
        center: new google.maps.LatLng(21.028511, 105.804817),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      routes.forEach(({ origin, destination }) => {
        directionsService.route(
          {
            origin: origin.address,
            destination: destination.address,
            travelMode: "DRIVING",
          },
          (response, status) => {
            if (status === "OK") {
              const directionsRenderer = new google.maps.DirectionsRenderer();
              directionsRenderer.setDirections(response);
              directionsRenderer.setMap(map);
            }
          }
        );
      });
    });
  },
};
</script>

<style scoped>
.map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: aquamarine;
}
</style>
