<template>
  <div class="flex justify-center q-ma-l q-pa-md text-center bg-primary">
    <div v-if="bombs.length > 0" id="itemContainer" class="flex justify-center q-ma-l q-pa-md text-center bg-primary">
      <bomb-card v-for="item in bombs" :key="item.tokenId"
                 :bomb="item" :game="game" :wallet="wallet" @reset="reset">
      </bomb-card>
    </div>
    <div v-else>
      <div class="buffer q-mt-xl"></div>
      <p class="text-white">If bombs don't load after a few seconds, click button.</p>
      <q-btn class="bg-accent text-white" @click="reload">Load Bombs</q-btn>
    </div>
  </div>
</template>

<script>
import BombCard from "@/components/BombCard";
export default {
  name: "BombContainer",
  components: {BombCard},
  data: function() {
    return {
      gameStarted: Date.now() > this.game.startTime,
    }
  },

  props: {
    bombs: {
      type: Array,
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

  methods: {
    reload() {
      this.$emit('reload');
    },
    reset(id) {
      this.$emit('reset', id);
    }
  },

  watch: {
    bombs: {
      handler: async function() {
        this.reload();
      },
    },
    wallet: {
      type: Object,
      required: true,
    },
  },

  mounted: function () {
  },
}
</script>

<style scoped>
#itemContainer {
  width: 90%;
}
</style>