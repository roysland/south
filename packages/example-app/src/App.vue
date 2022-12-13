<script setup>
import PortCall from './components/PortCall.vue'
const data = [
  { 
    id: 1,
    name: "route 1",
    events: [
      {
        name: "Base",
        start: '2022-12-12 00:00:00',
        end: '2022-12-12 06:00:00',
        type: 'base'
      },
      {
        name: 'Rig 1',
        start: '2022-12-13 12:00:00',
        end: '2022-12-13 17:00:00',
        type: 'rig'
      },
      {
        name: 'Rig 2',
        start: '2022-12-15 18:00:00',
        end: '2022-12-13 20:00:00',
        type: 'rig'
      }
    ]
  }
]
</script>

<template>
  <div v-for="route in data" :key="route.id" class="vessel-routes">
    <div class="route">
      <port-call v-for="(pcall, i) in route.events" :key="i" :port-call-type="pcall.type">{{pcall.name}}</port-call>
    </div>
  </div>
</template>

<style lang="scss">
.vessel-routes {
  display: block;
  position: relative;
  font-family: var(--n-font-family);
  .route {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(10, 1fr);
  }
}
</style>