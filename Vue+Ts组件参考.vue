<template>
  <div class="***">页面内容</div>
</template>

<script lang="ts">
import { Component, Provide, Vue, Prop, Watch } from "vue-property-decorator";

// 引入外部组件
@Component({
  components: {},
})
// 本组件实例
export default class JOIN extends Vue {
  // data数据(建议添加private表示该变量仅属于本组件私有)
  private test: String = "直接写在类中的变量相当于写在Data中";
  // methods函数(建议添加private表示该函数仅属于本组件私有)
  private testFunc(a: any): any {
    "直接写在类中的不与Vue已有函数名冲突的方法相当于写在Methods";
  }
  // 计算属性(建议添加private表示该计算属性仅属于本组件私有)
  private get computedMsg() {
    return "直接写在类中的以get为前缀的函数为计算属性的get, set前缀为set, 注意, get必须有返回值";
  }
  // 生命周期函数(建议添加private表示该生命周期函数仅属于本组件私有)
  private mounted() {
    "直接写在类中的与生命周期函数名称一致的就是生命周期函数";
  }
  // Prop使用
  @Prop() private config: String = "使用Prop装饰器即可接收Prop传递的数据";
  // Watch使用
  @Watch("config")
  onConfigChanged(val: any, oldVal: any) {
    "使用Watch装饰器监听你要监听的变量名, 紧挨着的函数就是当变量发生变化时触发的回调函数";
  }
}
</script>

<style>
</style>