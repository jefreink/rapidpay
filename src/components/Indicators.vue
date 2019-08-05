<template>
  <div>
    <div @resize="changePosition">
      <div class="box-indicators" :class="[direction == 'vertical' ? 'vertical' : 'horizontal'] ">
        <ul :class="[direction == 'vertical' ? 'list-unstyled' : 'list-inline'] ">
          <li
            v-for="(index) of selection"
            :key="index"
            :class="[{'active':selected == index}, {'list-inline-item': direction == 'horizontal'}]"
            @click="indicador(index)"
            :ref="'item'+(index)"
          ></li>
          <div class="indicator" ref="indicator"></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "indicator",
  props: ["selection", "direction"],
  data() {
    return {
      selected: 1
    };
  },
  methods: {
    indicador(val) {
      this.selected = val;
      this.$emit("selected", val);
      if (this.direction == "horizontal") {
        this.$refs.indicator.style.left =
          this.$refs["item" + val][0].offsetLeft + 2 + "px";
        this.$refs.indicator.style.top =
          this.$refs["item" + val][0].offsetTop + 2 + "px";
      }
    },
    changePosition() {
      if (this.direction == "horizontal") {
        this.$refs.indicator.style.left =
          this.$refs["item" + this.selected][0].offsetLeft + 2 + "px";
        this.$refs.indicator.style.top =
          this.$refs["item" + this.selected][0].offsetTop + 2 + "px";
      }
    }
  },
  mounted() {
    if (this.direction == "horizontal") {
      this.$nextTick(function() {
        window.addEventListener("resize", this.changePosition);
        this.changePosition();
      });
    }
  },
  watch: {
    soon: function(val) {
      this.selected = val + 1;
      if (this.direction == "horizontal") {
        this.$refs.indicator.style.left =
          this.$refs["item" + this.selected][0].offsetLeft + 2 + "px";
        this.$refs.indicator.style.top =
          this.$refs["item" + this.selected][0].offsetTop + 2 + "px";
      }
    }
  },
  computed: {
    ...mapGetters({
      soon: "sendSoon"
    })
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.changePosition);
  }
};
</script>
<style lang="scss" scoped>
@mixin positionTop($from, $to, $dist, $dir) {
  @for $i from $from to $to {
    &:nth-child(#{$i}) {
      &.active {
        ~ {
          .indicator {
            #{$dir}: ($dist * ($i - 1) + $from) + px;
          }
        }
      }
    }
  }
}

.box-indicators {
  &.horizontal {
    position: absolute;
    bottom: 20px;
    height: 40px;
    width: auto;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 100;
    li {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #000;
      position: relative;
      box-shadow: 0 0 0px 0px #000000 inset, 0 0 0px 0px #000000,
        0 0 2px 3px #020202;
      border: 2px solid #000;
      margin-right: 16px;
      transition: all ease 0.5s;
      &.active {
        border: none;
        box-shadow: 0 0 0px 0px #005aff inset, 0 0 40px 0px #005aff,
          0 0 2px 2px #b0e2ff;
      }
    }
    .indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #005aff;
      position: relative;
      box-shadow: none;
      margin-right: 16px;
      position: absolute;
      top: 7px;
      transition: all ease 0.3s;
    }
  }
}

.box-indicators {
  &.vertical {
    position: fixed;
    width: 30px;
    left: 5px;
    top: -30px;
    height: 100vh;
    z-index: 100;
    ul {
      position: absolute;
      bottom: 40px;
      li {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #000;
        position: relative;
        box-shadow: none;
        border: 3px solid #080808;
        margin-bottom: 16px;
        transition: all ease 0.5s;
        &.active {
          width: 10px;
          height: 10px;
          margin-left: 2px;
          border: none;
          box-shadow: 0 0 0px 0px #005aff inset, 0 0 40px 0px #005aff,
            0 0 2px 2px #b0e2ff;
        }
        @include positionTop(2, 50, 31, "top");
      }
    }
    .indicator {
      top: 2px;
      left: 4px;
      border-radius: 50%;
      width: 6px;
      height: 6px;
      position: absolute;
      background: #005aff;
      transition: all ease 0.3s;
    }
  }
}
</style>
