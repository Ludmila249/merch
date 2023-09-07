<template>
  <div class="question">
    <div class="question__info-user">
      <img class="question__photo-user" src="../images/user.png" alt="" />
      <div>
        <p class="question__user-name">{{ question.userName }}</p>
        <p>{{ question.date }}, {{ question.time }}</p>
      </div>
    </div>
    <p class="question__question">{{ question.textQuestion }}</p>
    <div>
      <p class="question__brand">Представитель бренда</p>
      <p>{{ question.textAnswer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question-block',
  props: {
    question: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.question {
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

  &__question {
    margin-bottom: 20px;
  }

  &__brand {
    margin-bottom: 10px;
  }

  &__user-name {
    margin-bottom: 5px;
  }
}

.question p {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
}
</style>
