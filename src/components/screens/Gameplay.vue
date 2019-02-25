<template>
  <v-container fluid class="page" id="gameplay">
    <div id="map"></div>
  </v-container>
</template>

<script>
import gmapsInit from './../../assets/js/gmaps';

export default {
  name: 'Gameplay',
  data() {
    return {
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2914326832447!2d106.8112654!3d-6.225252200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f151248c8305%3A0x8b5ad35e1dfb9038!2sThe+Capital+Residence!5e0!3m2!1sid!2sid!4v1513579885026",
      style: [
        {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "weight": "2.00"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#9c9c9c"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "color": "#f2f2f2"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7b7b7b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c8d7d4"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#070707"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        }
      ],
    }
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);
      const styledMapType = new google.maps.StyledMapType(this.style);

      geocoder.geocode({ address: 'Austria' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        console.log(results);
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
      });
    } catch (error) {
      console.error(error);
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/css/style.scss';

.page {
  height: 100vh;
  width: 100vw;
}
</style>
