<template>
  <div>
    <div class="box">
      <div class="header">
        <span>id</span><span>标题</span><span>简述</span><span>时间</span
        ><span>操作</span>
      </div>
      <div
        v-for="article in articles.slice(page * 10, page * 10 + 9)"
        :key="article.id"
        class="body"
      >
        <span>{{ article.id }}</span
        ><span>{{ article.title }}</span> <span>{{ article.describes }}</span>
        <span>{{ article.date }}</span>
        <span
          ><el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="deleteArticle(article.id)"
            circle
          ></el-button
        ></span>
      </div>
      <div class="footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="articles.length"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  data() {
    return {
      articles: [],
      page: 0,
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      this.page = val - 1;
    },
    getArticle() {
      let _this = this;
      request({
        url: "/api/article/getAllArticles",
        methods: "get",
      }).then((res) => {
        _this.articles = res.data.data;
      });
    },
    deleteArticle(id) {
      console.log(id);
      let _this = this;
      request({
        url: "/api/article/articleDeleteById",
        methods: "get",
        params: {
          id: id,
        },
      }).then((res) => {
        if (res.status == "200") {
          console.log(res);
          _this.getArticle();
        } else {
          alert("系统出小差了");
        }
      });
    },
  },
};
</script>
<style  lang="scss" scoped>
.box {
  margin: 30px;
  .header,
  .body {
    display: flex;
    border-bottom: 1px solid #eee;
    span {
      flex: 1;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .header {
    span {
      text-align-last: left;
      color: #909399;
    }
  }
}
.footer {
  margin: 40px auto;
  text-align: center;
}
</style>