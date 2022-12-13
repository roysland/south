<template>
    <div class="port-call" :class="[portCallType]">
        <div class="grab-handler left"></div>
        <div class="port-call-name"><slot></slot></div>
        <div class="grab-handler right"></div>
    </div>
</template>
<script setup>
const props = defineProps([
    'portCallType'
])
</script>

<style lang="scss">

.port-call {
    --base-color: #43D4A0;
    --rig-color: #FFB800;

    display: block;
    border-radius: 4px;

    font-size: var(--n-font-size-s);
    display: flex;
    justify-content: space-between;
    &.base { background-color: var(--base-color); }
    &.rig { background-color: var(--rig-color);}
    .grab-handler {
        width: 10px;
        height: 100%;
        background-color: rgba(0,0,0,0.1);
        cursor: grab;
    }
    .port-call-name {
        padding: 0.5rem;
        cursor: grab;
        user-select: none;
    }
}
</style>