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
      comparator: null,
      comparators: null,
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
  mounted() {
    this.itemLayoutResolver = itemResolverFactory(this.layoutType);
  },
  methods: {
    itemImageStyle(item) {
      if (this.hasImage(item)) {
        return {
          backgroundImage: `url("${item.imageUrl}")`,
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
    colNum() {
      return cols[this.$mq || 'md'];
    },
    layout() {
      return this.generateLayout(this.applySorter());
    },
  },
  watch: {
    layoutType(type) {
      if (type) {
        this.itemLayoutResolver = itemResolverFactory(type);
      }
    },
    ['sorter.dir'](dir) {
      if (dir && this.comparators) {
        this.comparator = this.comparators[dir];
      }
    },
    ['sorter.by'](prop) {
      if (prop) {
        this.comparators = compareBy(prop);
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
            background-size: cover;
            transition: background-position 700ms;

            &:hover {
              background-position: 100% 100%;
              opacity: 1;
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
          background-size: contain;
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
