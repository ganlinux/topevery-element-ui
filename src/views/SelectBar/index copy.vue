<template>
  <div>
    <article
      class="single-pen single-item"
      data-component="Item"
    >
      <header class="header">
        <a
          href="/gau"
          class="authorAvatar"
        />
        <div class="titleAndAuthor">
          <h2
            class="title"
            title="Digital Clock with Vue.js"
          ><a href="https://codepen.io/gau/pen/LjQwGp">Digital Clock with Vue.js</a></h2>
          <address class="author"><a
            href="/gau"
            class="authorName"
          >Toshiyuki TAKAHASHI</a></address>
        </div>
        <div class="action-menu ItemActions_menu-114wt ItemActions_menuSmall-12vVp ActionMenu_menu-2K9wU">
          Text
        </div>
      </header>
      <div
        class="iframe-wrap"
        style="background-image: url(&quot;https://screenshot.codepen.io/218269.LjQwGp.1584947e-39c3-4ce7-a08b-c21b9a58509a.png&quot;);"
        data-loaded="true"
      ><a
        href="https://codepen.io/gau/pen/LjQwGp"
        class="cover-link"
      ><span class="visually-hidden">Open in Editor</span></a><a
        href="/gau/details/LjQwGp"
        class="PopOutPreviewButton_root-2j0aI"
        data-popup-button="true"
      ><button
        class="PopOutPreviewButton_popupButton-3uddv"
        title="View Details"
      ><svg
        width="20"
        height="20"
        class="PopOutPreviewButton_expandIcon-NNnMY icon icon-expand"
      >
        <use xlink:href="/svg_sprite?v=8885a907#expand" /></svg></button></a><iframe
        src="https://cdpn.io/gau/fullcpgrid/LjQwGp"
        title="Digital Clock with Vue.js"
        frameborder="0"
        scrolling="no"
        sandbox="allow-scripts allow-pointer-lock allow-same-origin"
        tabindex="-1"
      /></div>
      <footer class="stats"><button class="single-stat invisible-button loves loves heart-button loved-0"><span class="screen-reader-text">Love</span><svg
        width="16"
        height="16"
        class=" icon icon-heart"
      >
        <use xlink:href="/svg_sprite?v=8885a907#heart" /></svg><span class="count">397</span></button><a
        class="single-stat comments"
        href="/gau/details/LjQwGp"
      ><svg
        width="20"
        height="20"
        class=" icon icon-comment"
        title="Comment"
      >
        <use xlink:href="/svg_sprite?v=8885a907#comment" /></svg>2</a><a
        class="single-stat views"
        href="/gau/full/LjQwGp"
      ><svg
        width="20"
        height="20"
        class=" icon icon-eye"
        title="Views"
      >
        <use xlink:href="/svg_sprite?v=8885a907#eye" /></svg>48,538</a>
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
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  color: #717790;
  position: relative;
  width: 350px;
  height: 250px;
  z-index: 1;

  .header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 1rem;
    -webkit-box-ordinal-group: 4;
    -webkit-order: 3;
    -ms-flex-order: 3;
    order: 3;
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

.stats {
  position: absolute;
  bottom: -44px;
  left: -7px;
  padding: 0 0 0 7px;
  height: 45px;
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 12px;
  overflow: hidden;
}
</style>
