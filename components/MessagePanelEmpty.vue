<template>
    <div class="panel-wrapper">
      <div class="panel-text">
        <span class="text">Select a chat to start messaging</span>
      </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
  .panel-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @include respond-to('md') {
      display: none;
    }

    .panel-text {
      padding: 5px 20px;
      border-radius: 10px;
      background-color: $bg-secondary;

      .text {
        @include font-text($font-16, normal, $color)
      }
    }
  }
</style>
