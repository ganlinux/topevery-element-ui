<template>
  <div>
    <article
      class="single-pen single-item"
      data-component="Item"
    >
      <header class="header">
        头部
      </header>
      <div
        class="iframe-wrap"
        style="background-image: url(&quot;https://screenshot.codepen.io/218269.LjQwGp.1584947e-39c3-4ce7-a08b-c21b9a58509a.png&quot;);"
        data-loaded="true"
      />
      <footer class="footer">
        底部数据
      </footer>
    </article>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.single-item {
  display: flex;
  flex-direction: column;
  color: #717790;
  position: relative;
  width: 250px;
  height: 150px;
  z-index: 1;
  font-size: 13px;

  .header {
    display: flex;
    align-items: center;
    order: 3;
  }

  .footer {
    text-align: right;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: -2rem;
    left: 0;
    margin: -1rem;
    border-radius: 10px;
    overflow: hidden;
    z-index: -1;
    background: #1f2229;
    -webkit-clip-path: inset(2rem 0 2rem 2rem round 10px);
    clip-path: inset(2rem 0 2rem 2rem round 10px);
    contain: strict;
    -webkit-transition: -webkit-clip-path 0.3s ease 0.1s;
    transition: -webkit-clip-path 0.3s ease 0.1s;
    transition: clip-path 0.3s ease 0.1s;
    transition: clip-path 0.3s ease 0.1s, -webkit-clip-path 0.3s ease 0.1s;
  }
}

.single-item:hover::after,
.single-item:focus::after,
.single-item:active::after {
  -webkit-clip-path: inset(0 0 0 0 round 10px);
  clip-path: inset(0 0 0 0 round 10px);
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}

.iframe-wrap,
.thumbnail-wrap {
  opacity: 0.99;
  position: relative;
  height: 0;
  border-radius: 6px;
  padding-top: 56.25%;
  overflow: hidden;
  background: #444857;
  background-size: cover;
}
</style>
