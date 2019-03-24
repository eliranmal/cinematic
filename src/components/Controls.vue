<template>
  <div class="controls">
    <div class="action-bar">
      <button class="icon icon-sort"
              :title="i18n.sortButtonTitle"
              @click="showDrawer = !showDrawer"></button>
      <span class="separator"></span>
      <div class="group">
        <input id="layout-tiles" type="radio" value="tiles" checked="checked"
               v-model="layout"/>
        <label for="layout-tiles" class="icon icon-tiles"
               :title="i18n.layoutTilesButtonTitle"
        ></label>
        <input id="layout-list" type="radio" value="list"
               v-model="layout"/>
        <label for="layout-list" class="icon icon-list"
               :title="i18n.layoutListButtonTitle"
        ></label>
      </div>
    </div>
    <div class="drawer" v-show-slide="showDrawer">
      <div class="sort-form">
        <label for="sort-prop">{{ i18n.sortPropLabel }}</label>
        <select id="sort-prop" v-model="sortProp">
          <option disabled value="">{{ i18n.sortPropSelectPlaceholder }}</option>
          <option v-for="prop in sortPropFields" :key="prop" :value="prop">{{ prop }}</option>
        </select>
        <span class="separator"></span>
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
        sortButtonTitle: 'open sort menu',
        layoutTilesButtonTitle: 'toggle tiles view',
        layoutListButtonTitle: 'toggle list view',
      },
      showDrawer: false,
      sortPropFields: [
        'title',
        'year',
        'type',
        'imdbID',
      ],
      sortProp: 'year',
      sortDir: 'desc',
      layout: 'tiles',
    };
  },
  mounted() {
    this.triggerSort();
    this.triggerLayout();
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
    triggerLayout() {
      this.triggerAction(this.layout);
    },
  },
  watch: {
    sortDir(dir) {
      this.triggerAction('sort', {
        dir,
      });
    },
    sortProp(prop) {
      this.triggerAction('sort', {
        prop,
      });
    },
    layout(type) {
      this.triggerAction(type);
    },
  },
};
</script>

<style scoped lang="scss">

  $form-control-height: 1rem;
  $main-button-size: 1.25rem;

  @mixin icon-button {
    display: inline-block;
    flex-shrink: 0;
    flex-grow: 0;
    width: $main-button-size;
    height: $main-button-size;
    margin: 0 .25rem;
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  @mixin icon-image-alt($iconName) {
    background-color: var(--color-main);
  }

  @mixin icon-image($iconName, $stateSelector: "&:hover") {
    mask: url("../assets/images/#{$iconName}.svg") 50% 50% / contain no-repeat;
    background-color: var(--color-text);

    @if $stateSelector {
      #{$stateSelector} {
        @include icon-image-alt($iconName);
      }
    }
  }

  .controls {
    margin: 0 0 1rem;

    input[type="radio"] {
      appearance: none;
      position: absolute;
      visibility: hidden;
    }

    input[type="radio"] + label {
      cursor: pointer;
    }

    button {
      @include icon-button;

      &.icon {
        &.icon-sort {
          @include icon-image("sort");
        }
      }
    }

    .separator {
      position: relative;

      &:after {
        content: '\B7';
        display: inline-block;
        height: 100%;
        text-align: center;
        width: 1rem;
        margin-right: .2em;
      }
    }

    .action-bar,
    .action-bar .group,
    .drawer > div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .drawer > div {
      justify-content: flex-start;
    }

    .action-bar,
    .action-bar .group {
      justify-content: flex-end;
    }

    .action-bar {

      .group {
        input[type="radio"] + label {
          @include icon-button;

          &.icon {
            &.icon-list {
              @include icon-image("list", false);
            }

            &.icon-tiles {
              @include icon-image("tiles", false);
              // make up for large padding in the svg
              width: $main-button-size * 1.1;
              height: $main-button-size * 1.1;
            }
          }
        }

        input[type="radio"]:checked + label {
          &.icon {
            &.icon-list {
              @include icon-image-alt("list");
            }

            &.icon-tiles {
              @include icon-image-alt("tiles");
            }
          }
        }
      }
    }

    .sort-form,
    .sort-form select {
      font-size: $form-control-height * .7;
    }

    .sort-form {
      margin-top: $form-control-height * .25;
      padding: ($form-control-height * .25) ($form-control-height * .75);
      border-left: 3px solid var(--color-main);

      & > label {
        margin-right: $form-control-height * .25;
      }

      select,
      input[type="radio"] + label {
        font-weight: bold;
        color: var(--color-text-shadow);
      }

      select {
        margin-top: .1rem;

        &:hover {
          color: var(--color-main);
        }
      }

      .separator {
        padding-left: $form-control-height * .5;
        padding-right: $form-control-height * .5;
      }

      .group {
        margin-left: $form-control-height * .1;

        input[type="radio"] + label {
          background-color: var(--color-text-complement);
          padding: ($form-control-height * .1) ($form-control-height * .2);
        }

        input[type="radio"]:checked + label {
          color: var(--color-main);
        }
      }
    }
  }

</style>
