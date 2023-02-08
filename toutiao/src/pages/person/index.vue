<template>
  <div id="person">
    <van-nav-bar
      id="bar"
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 头像 -->
    <div class="pic">
      <van-cell
        is-link
        @click="showPic"
      >
        头像
        <van-image
          round
          width="24px"
          height="24px"
          :src="profile.photo"
        />
      </van-cell>
      <van-popup
        v-model="pic"
        position="bottom"
        :style="{ height: '20%' }"
      >
        <div>拍照</div>
        <div>本地选择</div>
        <div class="cancel">取消</div>
      </van-popup>
    </div>
    <!-- 昵称 -->
    <div class="name">
      <van-cell
        is-link
        title="昵称"
        :value="profile.name"
        @click="showName"
      />
      <van-popup
        v-model="name"
        position="right"
        :style="{ height: '100%', width: '100%' }"
      >
        <!-- 编辑昵称 -->
        <van-nav-bar
          title="编辑昵称"
          right-text="提交"
          left-arrow
          @click-left="onClickLeftName"
          @click-right="onClickRightName"
        />
        <!-- 昵称输入框 -->
        <van-cell-group>
          <van-field
            v-model="value"
            placeholder="15723574832"
          />
        </van-cell-group>
      </van-popup>
    </div>
    <!-- 简介 -->
    <div class="introduction">
      <van-cell
        is-link
        title="简介"
        :value="profile.intro"
        @click="showIntroduction"
      />
      <van-popup
        v-model="introduction"
        position="right"
        :style="{ height: '100%', width: '100%' }"
      >
        <!-- 编辑昵称 -->
        <van-nav-bar
          title="编辑简介"
          right-text="提交"
          left-arrow
          @click-left="onClickLeftIntroduction"
          @click-right="onClickRightIntroduction"
        />
        <!-- 简介输入框 -->
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入简介"
          show-word-limit
        />
      </van-popup>
    </div>
    <!-- 性别 -->
    <div class="sex">
      <van-cell
        is-link
        title="性别"
        :value="profile.gender ? '女' : '男'"
        @click="showSex"
      />
      <van-popup
        v-model="sex"
        position="bottom"
        :style="{ height: '20%' }"
      >
        <div @click="man">男</div>
        <div @click="women">女</div>
        <div
          class="cancel"
          @click="cancelSex"
        >
          取消
        </div>
      </van-popup>
    </div>
    <!-- 生日 -->
    <div class="birthday">
      <van-cell
        is-link
        title="生日"
        :value="formatter(profile.birthday)"
        @click="showBirthday"
      />
      <van-popup
        v-model="birthday"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm"
          @cancel="cancel"
        />
      </van-popup>
    </div>
    <!-- 退出登录 -->
    <div
      class="back"
      @click="exit"
    >
      退出登录
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import * as userApi from '@/api/user.js';
import moment from 'moment';
export default {
  data() {
    return {
      profile: {},
      pic: false,
      name: false,
      introduction: false,
      sex: false,
      value: '',
      message: '',
      birthday: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      birthdayDate: '1998-08-04',
      gender: '男',

    };
  },
  methods: {
    formatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    showPic() {
      this.pic = true;
    },
    showName() {
      this.name = true;
    },
    showIntroduction() {
      this.introduction = true;
    },
    showSex() {
      this.sex = true;
    },
    showBirthday() {
      this.birthday = true;
    },

    back() {
      this.$router.push('/login');
      localStorage.removeItem('token');
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickLeftName() {
      this.name = false;
    },
    onClickRightName() {
      this.name = false;
    },
    onClickLeftIntroduction() {
      this.introduction = false;
    },
    onClickRightIntroduction() {
      this.introduction = false;
    },
    man() {
      this.gender = '男';
      this.sex = false;
    },
    women() {
      this.gender = '女';
      this.sex = false;
    },
    cancelSex() {
      this.sex = false;
    },
    confirm() {
      this.birthday = false;
      this.birthdayDate =
        this.currentDate.getFullYear() +
        '-' +
        (this.currentDate.getMonth() + 1) +
        '-' +
        this.currentDate.getDate();
    },
    cancel() {
      this.birthday = false;
    },
    exit() {
      Dialog.confirm({
        title: '温馨提示',
        message: '亲，您确定要退出吗？',
      })
        .then(() => {
          // on confirm
          this.$router.push('/login');
          localStorage.removeItem('token');
        })
        .catch(() => {
          // on cancel
          // this.$router.push('/person');
        });
    },
  },
  async created() {
    const res = await userApi.getUserProfile();
    this.profile = res.data.data;
  },
};
</script>

<style lang='less'>
#person {
  background-color: #f8f8f8;
  height: 100vh;
  position: relative;
  #bar .van-icon-arrow-left {
    color: #999;
  }
  #bar .van-nav-bar__title {
    color: #000;
    font-size: 18px;
  }
  // 头像
  .pic {
    .van-cell {
      background-color: #fff;
      position: relative;
      .van-image {
        position: absolute;
        right: 0;
      }
    }
    .van-popup {
      display: flex;
      flex-direction: column;
      background-color: #f7f8fa;
      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
      }
      .cancel {
        border-top: 5px solid #e5e5e5;
        color: #999;
      }
    }
  }
  // 昵称
  .name .van-nav-bar .van-icon-arrow-left {
    color: #000;
  }
  .name .van-nav-bar .van-nav-bar__text {
    color: red;
  }
  .name .van-cell-group {
    background-color: #fff;
    border: none;
    .van-field {
      width: calc(100% - 30px);
      border-radius: 10px;
      background-color: #f7f8fa;
      margin: 15px auto;
    }
  }

  // 简介
  .introduction .van-nav-bar .van-icon-arrow-left {
    color: #000;
  }
  .introduction .van-nav-bar .van-nav-bar__text {
    color: red;
  }
  .introduction .van-field {
    width: calc(100% - 30px);
    border-radius: 10px;
    background-color: #f7f8fa;
    margin: 15px auto;
  }
  // 性别
  .sex {
    border-top: 10px solid #f8f8f8;
    .van-popup {
      display: flex;
      flex-direction: column;
      background-color: #f7f8fa;
      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
      }
      .cancel {
        border-top: 5px solid #e5e5e5;
        color: #999;
      }
    }
  }
  // 退出登录
  .back {
    width: 100%;
    line-height: 40px;
    text-align: center;
    color: red;
    position: absolute;
    bottom: 20px;
  }
}
</style>
