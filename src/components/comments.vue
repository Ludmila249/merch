<template>
  <div class="comments">
    <div class="comments__info-user">
      <img class="comments__photo-user" src="../images/user.png" alt="" />
      <div>
        <p class="comments__user-name">{{ comment.userName }}</p>
        <p>{{ comment.date }}, {{ comment.time }}</p>
      </div>
    </div>
    <p class="comments__comments">{{ comment.textComments }}</p>
  </div>
</template>

<script>
export default {
  name: 'comments-block',
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.comments {
  width: 70%;
  padding: 20px;

  &__info-user {
    display: flex;
    margin-bottom: 10px;
  }

  &__photo-user {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }

  &__comments {
    margin-bottom: 20px;
  }

  &__brand {
    margin-bottom: 10px;
  }

  &__user-name {
    margin-bottom: 5px;
  }
}

.comments p {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
</style>
