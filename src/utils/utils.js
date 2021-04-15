export default {
  // 图片加载
  imgLoad: (src) => {
    let bgImg = new Image();
    bgImg.src = src; // 获取背景图片的url
    bgImg.onerror = () => {
      console.log("img onerror");
    };
    bgImg.onload = () => {
      // 等背景图片加载成功后 去除loading
      console.log("加载完成");
      return false
    };
  },
  // 获取元素距离   
  getRect(element) {
    const rect = element.getBoundingClientRect();
    const top = !document.documentElement.clientTop ? document.documentElement.clientTop : 0;
    const left = !document.documentElement.clientLeft ? document.documentElement.clientLeft : 0;
    return {
      top: rect.top - top,
      bottom: rect.bottom - top,
      left: rect.left - left,
      right: rect.right - left
    }
  },
  // 封装图片懒加载
  lazyload() {
    let img = document.getElementsByTagName("img");
    let len = img.length;
    let n = 0; // 存储图片加载到的位置，避免每次都从第一张图片开始遍历
    // 可见区域高度
    const seeHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    for (let i = n; i < len; i++) {
      // 如果图片距顶部距离小于可见区域高度与滚动条距离顶部高度之和时，才显示图片
      let rectTop = this.getRect(img[i]).top;
      let rectBottom = this.getRect(img[i]).bottom;
      if (rectTop > 0 && rectTop < seeHeight && rectBottom > 0 && rectBottom < seeHeight) {
        img[i].getAttribute("src") === "" ? (img[i].setAttribute('class', 'opacity'), img[i].src = img[i].getAttribute("data-src")) : n = i + 1;
      } else if (rectTop < seeHeight && rectBottom >= seeHeight) {
        img[i].getAttribute("src") === "" ? (img[i].setAttribute('class', 'opacity'), img[i].src = img[i].getAttribute("data-src")) : n = i + 1;
      }
    }
  }
}
