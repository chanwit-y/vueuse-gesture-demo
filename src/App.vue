<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDrag, useMove } from '@vueuse/gesture';
import {  useMotion } from '@vueuse/motion';

const swipeArea = ref<HTMLElement>();

const { set } = useMotion(swipeArea, {
  x: 0,
  y: 0,
});


// Ensure the drag gesture is initialized after the DOM is ready
useMove(({offset, last, event}) => {
  if (!offset) return;
  const boxRect = swipeArea.value?.getBoundingClientRect()
  
  const [offsetX, offsetY] = offset;
  if (!boxRect) return;
  const x = event.pageX - boxRect.left - boxRect.width / 2
  const y = event.pageY - boxRect.top - boxRect.height / 2


  // console.log(`x: ${x}, y: ${y}`);
  set({x, y})

  if (last) {
    if (offsetX > 50) {
      console.log('Swiped Right');
    } else if (offsetX < -50) {
      console.log('Swiped Left');
    }
  }
}, {
  domTarget: swipeArea,
});
</script>


<template>
  <div ref="swipeArea" class="swipe-area" >
    Swipe Here
  </div>
</template>

<style scoped>
.swipe-area {
  background-color: red;
  width: 50px;
  height: 50px;
  /* background-color: #f0f0f0; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* user-select: none; */
  /* Disable text selection */
  /* touch-action: none; */
  /* Disable default browser gestures */
}
</style>