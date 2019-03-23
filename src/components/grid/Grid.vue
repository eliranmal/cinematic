<template>
  <div class="grid"
       :class="layoutType">
    <grid-layout
      :layout="layout"
      :margin="[12, 12]"
      :col-num="colNum"
      v-bind="gridLayout">
      <grid-item v-for="(item) in layout"
                 :key="item.i"
                 v-bind="item"
                 class="item">
        <div class="image"
             :class="itemImageClassName(item)"
             :style="itemImageStyle(item)"
             :title="item.text"></div>
        <div class="text" :title="item.text">{{item.text}}</div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { GridItem, GridLayout } from 'vue-grid-layout';
import { compareBy } from './sorting';
import { itemResolverFactory } from './layout';
import { breakpoints } from '../../config/layout';
import { resolvedPathMap } from '../../lib/runtime';

const cols = {
  xxs: 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
};

export default {
  name: 'Grid',
  props: {
    layoutType: {
      type: String,
      default: 'tiles',
    },
    items: {
      type: Array,
      default: null,
    },
    sorter: {
      type: Object,
      default: {
        prop: 'id',
        dir: 'asc',
      },
    },
  },
  components: {
    GridItem,
    GridLayout,
  },
  data() {
    return {
      imgCache: {},
      itemLayoutResolver: null,
      gridLayout: {
        rowHeight: 30,
        cols,
        breakpoints,
        responsive: false,
        verticalCompact: false,
        isDraggable: false,
        isResizable: false,
        isMirrored: false,
        useCssTransforms: true,
      },
    };
  },
  beforeMount() {
    this.imgCache = resolvedPathMap(require.context('../../assets/images/', true, /image-sketch\.svg$/));
  },
  mounted() {
    this.itemLayoutResolver = itemResolverFactory(this.layoutType);
  },
  methods: {
    itemImageStyle(item) {
      if (this.hasImage(item)) {
        return {
          backgroundImage: `url("${item.imageUrl}"), url("${this.fallbackImageUrl}")`,
        };
      }
      return false;
    },
    itemImageClassName(item) {
      if (this.hasImage(item)) {
        return 'available';
      }
      return 'not-available';
    },
    hasImage({ imageUrl }) {
      return imageUrl && imageUrl !== 'N/A';
    },
    applySorter(collection = this.items, comparator = this.comparator) {
      if (comparator) {
        return collection.sort(comparator);
      }
      return collection;
    },
    generateLayout(items = this.items, colNum = this.colNum, resolver = this.itemLayoutResolver) {
      return items.map((item, i) => {
        const layout = resolver(i, colNum);
        return Object.assign({}, item, layout);
      });
    },
  },
  computed: {
    fallbackImageUrl() {
      return this.imgCache['./image-sketch.svg'];
    },
    colNum() {
      return cols[this.$mq || 'md'];
    },
    layout() {
      return this.generateLayout(this.applySorter());
    },
    comparator() {
      if (!this.sorter) {
        return null;
      }
      const { by: prop, dir } = this.sorter;
      let comparators;
      if (prop) {
        comparators = compareBy(prop);
      }
      let comparator;
      if (comparators) {
        comparator = comparators[dir];
      }
      return comparator;
    },
  },
  watch: {
    layoutType(type) {
      if (type) {
        this.itemLayoutResolver = itemResolverFactory(type);
      }
    },
  },
};
</script>

<style scoped lang="scss">

  .grid {
    .item {
      position: relative;
      display: flex;
    }

    .image {
      height: 100%;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
      opacity: .7;

      &:hover {
        opacity: 1;
      }

      &.not-available {
        background-image: url("../../assets/images/image-sketch.svg");
        background-size: 100% 100%;
      }
    }

    &.tiles {
      .item {
        flex-direction: column;
        align-content: stretch;

        .image {
          height: 100%;
          background-color: var(--color-bg-complement);
          background-repeat: no-repeat;
          opacity: .7;

          &.available {
            /* background-image is determined imperatively from api data */
            transition: background-position 700ms;

            &:hover {
              background-position: 100% 100%;
            }
          }

          &.not-available {
            background-image: url("../../assets/images/image-sketch.svg");
            background-size: 100% 100%;
          }
        }

        .text {
          padding: .25rem;
          font-size: .4rem;
          font-weight: bold;
          color: var(--color-bg);
          background-color: var(--color-text);
        }
      }
    }

    &.list {
      .item {
        flex-direction: row;
        align-content: stretch;

        &:not(:last-child) {
          border-bottom: 1px dashed var(--color-text-complement);
        }

        .image {
          flex-shrink: 0;
          width: 2rem;
          height: 2rem;
        }

        .text {
          line-height: 2rem;
          font-size: .7rem;
          padding: 0 1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }

</style>
