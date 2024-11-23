<script setup lang="ts">
import { useSwipe } from '@vueuse/core/index.cjs';
import { computed, ref } from 'vue';

const container = ref<HTMLElement | null>(null)
const target = ref<HTMLElement | null>(null)
const containerWidth = computed(() => container.value?.offsetWidth)
const left = ref('0')
const opacity = ref(1)
// const background = ref('palegreen') 
const background = ref('white')

const { isSwiping, lengthX, lengthY } = useSwipe(target, {
  passive: false,
  onSwipe: (e) => {
    if (containerWidth.value) {
      const length = Math.abs(lengthX.value)

      if (lengthX.value < 0) {
        left.value = `${length}px`
        background.value = 'palegreen'
        opacity.value = 1 - (length / containerWidth.value)
      } else if (lengthX.value > 0) {
        left.value = `-${length}px`
        background.value = 'red'
        opacity.value = 1 - (length / containerWidth.value)
      } else {
        left.value = '0'
        background.value = 'white'
        opacity.value = 1
      }


    }
  },
  onSwipeEnd: (e, direction) => {

    if (lengthX.value < 0 && containerWidth.value && (Math.abs(lengthX.value) / containerWidth.value) > 0.5) {
      // background.value = 'palegreen'
      left.value = `${containerWidth.value}px`
      opacity.value = 0
    } else if (lengthX.value > 0 && containerWidth.value && (Math.abs(lengthX.value) / containerWidth.value) > 0.5) {
      left.value = `-${containerWidth.value}px`
      opacity.value = 0
    } else {
      left.value = '0'
      background.value = 'white'
      opacity.value = 1
    }
  }
})

</script>

<template>
  <div>
    <div ref="container" class="container select-none">
      <div ref="target" class="overlay" :class="{ animated: !isSwiping }" :style="{ left, opacity, background }">
        <p>Target</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 6px dashed pink;
  border-radius: 15px;
  overflow: hidden;
  height: 150px;
}

.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
}

.overlay.animated {
  transition: all 0.2s ease-in-out;
}

.overlay>p {
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  color: black;
  overflow: hidden;
  letter-spacing: 2px;
  white-space: nowrap;
}
</style>