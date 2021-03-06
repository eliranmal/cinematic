<template>
  <div class="grid"
       :class="layoutType">
    <grid-layout
      :layout="layout"
      :col-num="colNum"
      v-bind="gridLayout">
      <grid-item v-for="(item) in layout"
                 :key="item.i"
                 v-bind="item"
                 :style="itemStyle(item)"
                 class="item">
        <div class="image"
             :class="itemImageClassName(item)"
             :title="item.text"></div>
        <div class="text" :title="item.text">{{item.text}}</div>
        <a v-if="layoutType === 'list' && item.link"
           :href="item.link.url"
           :title="item.link.title"
           target="_blank"
           class="link"
        >{{item.link.text}}</a>
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
        margin: [12, 12],
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
    itemStyle(item) {
      let style = {
        '--item-border-offset': `-${this.gridLayout.margin[1]}px`,
      };
      if (this.hasImage(item)) {
        style = Object.assign(style, {
          '--item-background-image': `url("${item.imageUrl}")`,
          '--item-background-image-fallback': `url("${this.fallbackImageUrl}")`,
        });
      }
      return style;
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
      const { prop, dir } = this.sorter;
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

      .image {
        height: 100%;
        background-image: url("../../assets/images/image-sketch.svg");
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: cover;
        opacity: .7;

        &:hover {
          opacity: 1;
        }

        &.available {
          background-image: var(--item-background-image), var(--item-background-image-fallback);
        }
      }
    }

    &.tiles {
      .item {
        flex-direction: column;
        align-content: stretch;

        .image {
          background-color: var(--color-bg-complement);
          background-position: 0 0;
          transition: background-position 700ms;

          &:hover {
            background-position: 100% 100%;
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

        &:not(:first-child):before {
          content: '';
          position: absolute;
          top: var(--item-border-offset);
          width: 100%;
          border-top: 1px dashed var(--color-text-complement);
        }

        & > * {
          margin: 0 1rem 0 0;

          &:last-child {
            margin-right: 0;
          }
        }

        .image {
          flex-shrink: 0;
          width: 2rem;
          height: 2rem;
        }

        .text,
        .link {
          line-height: 2rem;
        }

        .text {
          flex-grow: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: .7rem;
        }

        .link {
          flex-shrink: 0;
          justify-self: flex-end;
          display: inline-block;
          font-size: .5rem;

          &:before {
            content: '';
            float: left;
            display: inline-block;
            width: .75rem;
            height: 2rem;
            mask: url("../../assets/images/link.svg") 50% 50% / contain no-repeat;
            background-color: var(--color-text);
          }

          &:hover {
            &:before {
              background-color: var(--color-main);
            }
          }
        }
      }
    }
  }

</style>
