<template>
  <section class="our-story">
    <div class="heading-intro mx-auto py-5">
      <h2 class="text-center fs-heading-3 px-5 py-5 text-secondary">
        Our Story
      </h2>
      <p class="fs-light text-center px-5">
        In 1983, Ms. Maria Calinisan started an amazing journey by opening the
        first garden in the Philippines, located in the lovely province of
        Cavite. This was a big step for gardening in the country. Ms. Calinisan
        wanted to create a peaceful and green place where people could enjoy
        nature and relax. Her garden quickly became a favorite spot for both
        locals and visitors, offering a calm escape from busy life. Over the
        years, the garden has grown and thrived, showing Ms. Calinisan's
        dedication, passion, and love for nature that she shared with her
        community.
      </p>
    </div>
    <div class="divider"></div>
    <div class="content mx-auto">
      <h2 class="text-center fs-light fs-heading-3 px-5 py-5">
        <em>The Cavite Garden Philippines</em>
      </h2>
      <div class="row">
        <div class="col">
          <div class="img-container">
            <img
              src="../../assets/images/465364769_1147396093683130_2474356446245648550_n.jpg"
              alt="Our Story 1"
            />
            <figcaption class="mt-1 fw-semibold text-secondary">
              1982
            </figcaption>
          </div>
          <p class="fs-ligh mt-3">
            The Cavite Garden first open it's store in province of Cavite
          </p>
        </div>
        <div class="col">
          <div class="img-container">
            <img
              src="../../assets/images/467458487_594048136476437_3781373336446111887_n.jpg"
              alt="Our Story 1"
            />
            <figcaption class="mt-1 fw-semibold text-secondary">
              2009
            </figcaption>
          </div>
          <p class="fs-light mt-3">
            The Cavite Garden first open it's store in province of Cavite
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.our-story {
  padding: 5rem 0;

  .heading-intro,
  .content {
    width: 80%;
  }

  .content {
    .row {
      @media (max-width: 576px) {
        flex-direction: column;
      }
      .col {
        .img-container {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
