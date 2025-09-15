<template>
  <div
    :draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { DRAG_TRANSFER_PAYLOAD_KEY, DRAG_TYPE } from "@/common/constants";

const props = defineProps<{
  transferData: unknown;
}>();

function onDrag({ dataTransfer }: DragEvent) {
  if (!dataTransfer) return;
  dataTransfer.effectAllowed = DRAG_TYPE;
  dataTransfer.dropEffect = DRAG_TYPE;
  dataTransfer.setData(
    DRAG_TRANSFER_PAYLOAD_KEY,
    JSON.stringify(props.transferData),
  );
}
</script>
