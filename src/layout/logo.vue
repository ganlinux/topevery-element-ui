<template>
  <div class="logo" />
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  width: 26px;
  height: 30px;
  border: 1px solid #3cefff;
  // background: #ffffff;
  overflow: hidden;
  margin: 0 4px;
  animation: spin 3s ease infinite;
}

.logo::before {
  width: 100%;
  height: 100%;
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: hsla(185, 100%, 62%, 0.75);
  transform-origin: center bottom;
  transform: scaleY(1);
  animation: fill 3s linear infinite;
}

@keyframes spin {
  50%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fill {
  25%,
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
