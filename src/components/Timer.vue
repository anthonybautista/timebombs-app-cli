<template>
  <div class="timer">
    <div v-if="!this.gameStarted && this.active" class="clock q-px-xs">
      ACTIVE
    </div>
    <div v-else-if="timeRemaining > 0" class="clock q-px-xs">
      {{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}
    </div>
    <div v-else-if="this.bombTimestamp > 0 && this.active" class="clock q-px-xs">
      DETONATED
    </div>
    <div v-else class="clock q-px-xs">
      NOT ACTIVE
    </div>
  </div>
</template>

<script>
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_HOUR = 1000 * 60 * 60;
const MS_PER_MINUTE = 1000 * 60;
const MS_PER_SECOND = 1000;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Timer",
  data(){
    return {
      timeRemaining: (this.bombTimestamp + this.game.resetInterval) - Date.now(),
      gameStarted: Date.now() > this.game.startTime,
    }
  },

  props: {
    bombTimestamp: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    game: {
      type: Object,
      required: true,
    },
  },

  computed: {
    days(){
      let days = this.timeRemaining / MS_PER_DAY;
      return this.timeRemaining > 0 ? Math.floor(days) : Math.abs(Math.ceil(days));
    },
    hours(){
      let hours = (this.timeRemaining % MS_PER_DAY) / MS_PER_HOUR;
      return this.timeRemaining > 0 ? Math.floor(hours) : Math.abs(Math.ceil(hours));
    },
    minutes(){
      let minutes = (this.timeRemaining % MS_PER_HOUR) / MS_PER_MINUTE;
      return this.timeRemaining > 0 ? Math.floor(minutes) : Math.abs(Math.ceil(minutes));
    },
    seconds(){
      let seconds = (this.timeRemaining % MS_PER_MINUTE) / MS_PER_SECOND;
      return this.timeRemaining > 0 ? Math.floor(seconds) : Math.abs(Math.ceil(seconds));
    }
  },

  mounted(){
    // update the countdown every 1 second
    if (this.gameStarted && this.timeRemaining > 0 && this.active) {
      setInterval(() => {
        // update time remaining
        this.timeRemaining = (this.bombTimestamp + this.game.resetInterval) - Date.now();
      }, 1000);
    }
  },
}
</script>

<style scoped>
.clock {
  font-family: 'digital_dreamregular', sans-serif;
  color: red;
  background-color: black;
  font-size: medium;
  margin: auto;
  padding-top: 1px;
  border: 5px brown solid;
}

@font-face {
  font-family: 'digital_dreamregular';
  src: url('/public/digitaldream-webfont.woff2') format('woff2'),
  url('/public/digitaldream-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>