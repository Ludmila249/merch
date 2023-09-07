<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__chapter">
          <p class="footer__chapter-title">Онлайн магазин</p>
          <ul>
            <li class="footer__chapter-item">
              <a href="#">+7 (928) 700-80-90</a>
            </li>
            <li class="footer__chapter-item">
              <a href="#">+7 (928) 700-80-90</a>
            </li>
          </ul>
        </div>
        <div class="footer__chapter">
          <p class="footer__chapter-title">Офлайн магазин</p>
          <ul>
            <li class="footer__chapter-item">
              <p>Москва, Ленина 220</p>
            </li>
          </ul>
        </div>
        <div class="footer__chapter">
          <p class="footer__chapter-title">Поддержка</p>
          <ul>
            <li class="footer__chapter-item">
              <a href="#">Помощь</a>
            </li>
            <li class="footer__chapter-item">
              <a href="#">Возврат</a>
            </li>
            <li class="footer__chapter-item">
              <a href="#">Доставка и оплата</a>
            </li>
            <li class="footer__chapter-item">
              <a href="#">Программа лояльности</a>
            </li>
          </ul>
        </div>
        <div class="footer__chapter">
          <p class="footer__chapter-title">Информация</p>
          <ul>
            <li class="footer__chapter-item">
              <a href="#">Контакты</a>
            </li>
            <li class="footer__chapter-item">
              <a href="#">Магазины</a>
            </li>
            <li class="footer__chapter-item">
              <a href="#">Блог</a>
            </li>
          </ul>
        </div>
        <div class="footer__chapter">
          <p class="footer__chapter-title">Обратная связь</p>
          <ul>
            <li class="footer__chapter-item">
              <a href="#">Подписаться на email рассылку</a>
            </li>
            <li class="footer__chapter-item">
              <a href="#">Див в вк</a>
            </li>
            <li class="footer__chapter-item">
              <a href="#">Див в телеграме</a>
            </li>
          </ul>
        </div>
      </div>
      <hr class="footer__line" />
      <div class="footer__bottom">
        <p class="footer__year">© div.merch, 2022</p>
        <div class="footer__payment-systems">
          <img src="../images//MasterCard.svg" alt="" />
          <img src="../images/Mir.svg" alt="" />
          <img src="../images//Visa.svg" alt="" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer-block',
  components: {},
};
</script>

<style lang="less">
@import '@/assets/styles/helpers';

.footer {
  width: 100%;
  padding: 60px 40px;

  @media @tablet {
    padding: 60px 20px;
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__chapter-title {
    color: #a6a6a6;
    font-size: 13px;
    line-height: 12px;
    margin-bottom: 24px;
  }

  &__chapter-item {
    color: #000;
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
    margin-bottom: 16px;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #30f;
      transform: scale(1.03);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__line {
    width: 100%;
    height: 1px;
    background-color: #b3b3b3;
    border: none;
    margin: 32px 0;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__year {
    color: #a6a6a6;
    font-size: 12px;
    line-height: 12px;
  }

  &__payment-systems {
    width: 144px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
