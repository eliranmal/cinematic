<template>
  <div class="controls">
    <div class="action-bar">
      <button class="icon icon-sort" @click="showDrawer = !showDrawer"></button>
      <button class="icon icon-list" @click="triggerAction('list')"></button>
      <button class="icon icon-tiles" @click="triggerAction('tiles')"></button>
    </div>
    <div class="drawer" v-show-slide="showDrawer">
      <div class="sort-form">
        <label for="sort-prop">{{ i18n.sortPropLabel }}</label>
        <select id="sort-prop" v-model="sortProp">
          <option disabled value="">{{ i18n.sortPropSelectPlaceholder }}</option>
          <option v-for="prop in sortPropFields" :key="prop" :value="prop">{{ prop }}</option>
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
        sortPropLabel: 'sort by',
        sortDirLabel: 'sort direction',
        sortDirAscLabel: 'ascending',
        sortDirDescLabel: 'descending',
        sortPropSelectPlaceholder: '---',
      },
      showDrawer: false,
      sortPropFields: [
        'title',
        'year',
        'type',
        'imdbID',
      ],
      sortProp: 'title',
      sortDir: 'asc',
    };
  },
  mounted() {
    this.triggerSort();
  },
  methods: {
    triggerAction(action, data) {
      this.$emit('action-triggered', {
        action,
        data,
      });
    },
    triggerSort() {
      this.triggerAction('sort', {
        prop: this.sortProp,
        dir: this.sortDir,
      });
    },
  },
  watch: {
    sortDir() {
      this.triggerAction('sort', {
        dir: this.sortDir,
      });
    },
    sortProp() {
      this.triggerAction('sort', {
        prop: this.sortProp,
      });
    },
  },
};
</script>

<style scoped lang="scss">

  @mixin is-icon($iconName, $hover: true) {
    &.icon.icon-#{$iconName} {
      background-size: contain;
      background-image: url("../assets/images/#{$iconName}.svg");

      @if $hover == true {
        &:hover {
          background-image: url("../assets/images/#{$iconName}-over.svg");
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

      @include is-icon("list");
      @include is-icon("tiles");
      @include is-icon("sort");
      @include is-icon("shuffle", false);

      &.icon.icon-tiles {
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
