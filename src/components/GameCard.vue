<template>
  <div class="q-pa-md q-gutter-sm q-mt-xl q-mb-none flex justify-center">
    <q-banner rounded class="bg-accent text-white" :key="game.startTime">

      <div id="gameBanner" class="text-center">
        <div id="gameIdDiv" class="full-width text-primary q-pt-sm">
          <p>Game ID: {{game.gameId}}</p>
        </div>
        <div id="changeGameDiv" class="full-width text-primary">
          <q-btn class="bg-secondary shadow-5" @click="resetGame">Change Game</q-btn>
        </div>
        <div id="gameStartDiv" class="bg-primary q-pa-sm q-mx-xs rounded-borders shadow-5">
          <p class="q-mb-xs">Time To Start</p>
          <p v-if="gameStarted" class="q-mb-none">STARTED</p>
          <p v-else class="q-mb-none" :key="timeRemaining">{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</p>
        </div>
        <div id="bombsLeftDiv" class="bg-primary q-pa-sm q-mx-xs rounded-borders shadow-5">
          <p class="q-mb-xs">Bombs Left</p>
          <p class="q-mb-none">{{remaining}}</p>
        </div>
      </div>
      <div class="bg-primary text-center q-mt-md">
        <p class="text-negative">{{this.errorMessage}}</p>
      </div>
      <div class="flex justify-center">
        <q-btn v-if="allowHalt && gameStarted" color="negative" label="Halt Game" class="gameButton q-mt-sm shadow-5" @click="halt" :key="gameStarted"></q-btn>
      </div>
    </q-banner>
  </div>
  <slot></slot>
</template>

<script>
import Bomb from "@/models/Bomb";
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_HOUR = 1000 * 60 * 60;
const MS_PER_MINUTE = 1000 * 60;
const MS_PER_SECOND = 1000;
export default {
  name: "GameCard",
  data: function() {
    return {
      errorMessage: "",
      timeRemaining: 0,
      timed: false,
    }
  },

  props: {
    bombs: {
      type: Array,
      required: true,
    },
    showDash: {
      type: Boolean,
      required: true,
    },
    game: {
      type: Object,
      required: true,
    },
    wallet: {
      type: Object,
      required: true,
    },
  },

  computed: {
    remaining(){
      return this.game.activeBombs.length;
    },
    gameStarted(){
      return Date.now() > this.game.startTime;
    },
    allowHalt(){
      return (this.remaining <= this.game.maxWinners) && !this.game.gameOver;
    },
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

  methods: {
    async halt() {
      this.errorMessage = "Halting Game..."
      try {
        let winningBomb = 0;
        let foundWinner = false;
        let i = 0;
        while (i < this.bombs.length && !foundWinner) {
          this.activeBombs.forEach(bomb => {
            if (Number(bomb) === Number(this.bombs[i].tokenId)) {
              foundWinner = true;
              winningBomb = Number(this.bombs[i].tokenId);
            }
          })
          i++;
        }
        if (winningBomb > 0) {
          this.errorMessage = await Bomb.haltGame(this.game, this.wallet, winningBomb);
        } else {
          this.errorMessage = "You don't have a winning bomb!";
        }
        setTimeout(this.emitUpdate, 2000);
      } catch (e) {
        this.errorMessage = e;
      }
    },
    resetGame() {
      this.$emit('reset-game');
    },
  },

  watch: {
  },

  mounted: async function () {
    if (Date.now() < this.game.startTime) {
      setInterval(() => {
        // update time remaining
        this.timeRemaining = this.game.startTime - Date.now();
      }, 1000);
    }

  },
}
</script>

<style scoped>
#gameBanner {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  font-weight: bolder;
}

#gameIdDiv {
  grid-column: 1/2;
}

#changeGameDiv {
  grid-column: 2/3;
}

#gameStartDiv {
  width: 150px;
  grid-column: 1/2;
  margin: auto;
}

#bombsLeftDiv {
  width: 150px;
  grid-column: 2/3;
}

.gameButton {
  width: 70%;
}
</style>