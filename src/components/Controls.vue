<template>
  <div class="controls">
    <div class="action-bar">
      <button class="sort" @click="showDrawer = !showDrawer"></button>
      <button class="list" @click="triggerAction('list')"></button>
      <button class="tiles" @click="triggerAction('tiles')"></button>
    </div>
    <div class="drawer" v-show-slide="showDrawer">
      <div class="sort-form">
        <label for="sort-by">{{ i18n.sortByLabel }}</label>
        <select id="sort-by" v-model="sortBy">
          <option disabled value="">{{ i18n.sortBySelectPlaceholder }}</option>
          <option v-for="prop in sortByFields" :key="prop" :value="prop">{{ prop }}</option>
        </select>
        <label>{{ i18n.sortDirLabel }}</label>
        <div class="group">
          <input id="sort-dir-asc" type="radio" name="sort-dir" value="asc" checked="checked"
                 v-model="sortDir"/>
          <label for="sort-dir-asc">{{ i18n.sortDirAscLabel }}</label>
          <input id="sort-dir-desc" type="radio" name="sort-dir" value="desc"
                 v-model="sortDir"/>
          <label for="sort-dir-desc">{{ i18n.sortDirDescLabel }}</label>
        </div>
        <button type="submit" class="shuffle" @click="submitSort"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  data() {
    return {
      i18n: {
        sortByLabel: 'sort by',
        sortDirLabel: 'sort dir',
        sortDirAscLabel: 'asc',
        sortDirDescLabel: 'desc',
        sortBySelectPlaceholder: '- choose -',
      },
      showDrawer: false,
      sortByFields: [
        'title',
        'year',
        'type',
        'imdbID',
      ],
      sortDir: 'asc',
      sortBy: 'title',
    };
  },
  methods: {
    triggerAction(action, data) {
      this.$emit('action-triggered', {
        action,
        data,
      });
    },
    submitSort() {
      this.triggerAction('sort', {
        dir: this.sortDir,
        by: this.sortBy,
      });
    },
  },
};
</script>

<style scoped lang="scss">

  @mixin image-button($className, $hover: true) {
    &.#{$className} {
      background-image: url("../assets/images/#{$className}.svg");

      @if $hover == true {
        &:hover {
          background-image: url("../assets/images/#{$className}-over.svg");
        }
      }
    }
  }

  $form-control-height: 1rem;

  .controls {
    margin: 0 0 1rem;

    .action-bar,
    .drawer > div {
      display: flex;
      flex-direction: row;
    }

    .action-bar {
      align-items: flex-end;
      justify-content: flex-end;
    }

    .drawer > div {
      align-items: center;
      justify-content: flex-start;
    }

    /* buttons may appear anywhere on the template, don't nest them further */
    button {
      flex-shrink: 0;
      flex-grow: 0;
      width: 1.25rem;
      height: 1.25rem;
      margin: 0 .25rem;
      background-color: transparent;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      @include image-button("list");
      @include image-button("tiles");
      @include image-button("sort");
      @include image-button("shuffle", false);

      &.tiles {
        // make up for large padding in the svg
        background-size: 1.5rem 1.5rem;
      }

      &[type="submit"] {
        width: $form-control-height;
        height: $form-control-height;
        border-radius: 50%;
        background-color: var(--color-main);
      }
    }

    .sort-form,
    .sort-form select {
      font-size: $form-control-height * .7;
    }

    .sort-form {
      margin-top: $form-control-height * .25;
      padding: ($form-control-height * .25) ($form-control-height * .5);
      border-left: 3px solid var(--color-main);

      select,
      input[type="radio"] + label {
        font-weight: bold;
        color: var(--color-text-shadow);

        &:hover,
        &:checked {
          color: var(--color-main);
        }
      }

      & > label {
        margin-right: $form-control-height * .25;

        & + * {
          margin-right: $form-control-height;
        }
      }

      select {
        margin-top: .1rem;
      }

      .group {
        margin-left: $form-control-height * .1;

        input[type="radio"] + label {
          background-color: var(--color-text-complement);
          cursor: pointer;
          padding: ($form-control-height * .1) ($form-control-height * .2);
        }

        input[type="radio"] {
          appearance: none;
          position: absolute;
          visibility: hidden;

          &:checked + label {
            color: var(--color-main);
          }
        }
      }
    }
  }

</style>
