<template>
  <div class="flex justify-center q-ma-l q-pa-md text-center bg-primary" id="itemContainer2">
    <q-banner rounded class="bg-accent text-white">
      <p>Active Bombs</p>
      <div id="gameBanner2" class="text-center">
        <div id="bombTimerDiv" class="bg-primary q-pa-sm q-mx-xs rounded-borders shadow-5">
          <p class="q-mb-xs">Bomb Timer</p>
          <p v-if="bombTimer > 0" class="q-mb-none">{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</p>
          <p v-else-if="bombTimer===null" class="q-mb-none">SELECT BOMB</p>
          <p v-else class="q-mb-none">DETONATED</p>
        </div>
        <div id="bombSelectorDiv" class="bg-primary q-pa-sm q-mx-xs rounded-borders shadow-5">
          <p class="q-mb-xs">Bomb #</p>
          <p class="q-mb-none">{{selectedBomb}}</p>
        </div>
      </div>
      <div class="smolBombContainer bg-accent flex justify-center q-ma-l q-pa-md text-center rounded-borders">
        <q-img src="@/assets/bomb.png" class="smolBomb" v-for="bomb in this.game.activeBombs" @click="getTime(bomb)" :key="bomb">
          <p class="text-white flex flex-center bombText">
            {{Number(bomb)}}
          </p>
        </q-img>
      </div>
    </q-banner>
  </div>
</template>

<script>
import Bomb from '@/models/Bomb';
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_HOUR = 1000 * 60 * 60;
const MS_PER_MINUTE = 1000 * 60;
const MS_PER_SECOND = 1000;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  data: function() {
    return {
      gameStarted: Date.now() > this.game.startTime,
      selectedBomb: null,
      bombTimer: null,
    }
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async getTime(id) {
      this.selectedBomb = Number(id);
      let info = await Bomb.bombInfo(this.game, Number(id));
      this.bombTimer = (Number(info[1]) * 1000) - Date.now();
    },
  },

  computed: {
    days(){
      let days = this.bombTimer / MS_PER_DAY;
      return this.bombTimer > 0 ? Math.floor(days) : Math.abs(Math.ceil(days));
    },
    hours(){
      let hours = (this.bombTimer % MS_PER_DAY) / MS_PER_HOUR;
      return this.bombTimer > 0 ? Math.floor(hours) : Math.abs(Math.ceil(hours));
    },
    minutes(){
      let minutes = (this.bombTimer % MS_PER_HOUR) / MS_PER_MINUTE;
      return this.bombTimer > 0 ? Math.floor(minutes) : Math.abs(Math.ceil(minutes));
    },
    seconds(){
      let seconds = (this.bombTimer % MS_PER_MINUTE) / MS_PER_SECOND;
      return this.bombTimer > 0 ? Math.floor(seconds) : Math.abs(Math.ceil(seconds));
    },
  },

  watch: {
    activeBombs: {
      handler: function(newArray) {
        this.remaining = newArray.length;
      },
    },
  },

  mounted: async function () {

  },
}
</script>

<style scoped>
.smolBombContainer {
  width: 95%;
  margin: auto;
}

.smolBomb {
  height: 50px;
  width: 50px;
}

.bombText {
  z-index: 100;
  font-size: xx-small;
  position: relative;
  top: 25px;
  left: -3px;
}

#gameBanner2 {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  font-weight: bolder;
  min-width: 310px;
}
</style>