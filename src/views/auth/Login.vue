<template>
  <b-row class="text-center login mx-0">
    <b-col md="6" class="left">
      <b-row align-v="center" class="content-left">
        <b-col>
          <img src="../../assets/icon.png" alt />
          <h3>ELCAPP</h3>
          <p>Online Food Cashier Application</p>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="6" class="right">
      <b-row class="content-right" align-v="center">
        <b-col>
          <div class="card text-left">
            <h4>
              Sign In |
              <span class="regist" @click="registPage">Sign Up</span>
            </h4>
            <b-form
              class="mt-5"
              @submit.prevent="onSubmit"
              @reset.prevent="onReset"
            >
              <b-form-group label="Email">
                <input
                  v-focus
                  v-model="form.user_email"
                  type="email"
                  required
                  placeholder="Input your email"
                />
              </b-form-group>
              <b-form-group label="Password">
                <input
                  v-model="form.user_password"
                  type="password"
                  required
                  placeholder="Input your password"
                />
              </b-form-group>
              <br />
              <b-row>
                <b-col sm="4">
                  <b-button pill variant="outline-info" type="submit"
                    >Sign In</b-button
                  >
                </b-col>
              </b-row>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Login',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  computed: {
    ...mapState(['name'])
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      console.log(this.form)
      this.login(this.form)
        .then((result) => {
          console.log(result)
          this.$bvToast.toast(result.data.msg, {
            title: 'Status :',
            variant: 'success',
            autoHideDelay: 2500,
            appendToast: true
          })
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error.data.msg)
          this.$bvToast.toast(error.data.msg, {
            title: 'Status :',
            variant: 'danger',
            autoHideDelay: 2500,
            appendToast: true
          })
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
    },
    registPage() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montaga&display=swap');

.login {
  color: white;
  font-family: 'Montaga', 'Numans', sans-serif;

  height: 100vh;
  width: 100%;
  text-align: center;
}

h3 {
  margin-top: 10px;
  font-size: 30px;
  font-weight: 700;
}

.card {
  background-color: transparent;
  border: transparent;
}

.regist:hover {
  cursor: pointer;
  color: rgb(87, 199, 187);
}

.regist {
  color: rgb(117, 115, 115);
}

.left {
  height: 100%;
  width: 100%;
  background-color: rgb(87, 199, 187);
}

.right {
  height: 100%;
  width: 100%;
  background-color: rgb(47, 64, 84);
}

.content-left {
  height: 100%;
}

.content-right {
  height: 100%;
}

input {
  width: 80%;
  height: 50px;
  border: 5px solid rgba(169, 169, 169, 0.6);
  color: white;
  border-radius: 10px;
  background: linear-gradient(rgb(87, 199, 187), rgb(87, 199, 187)) center
    bottom 5px / calc(100% - 10px) 2px no-repeat;

  border: 1px solid transparent;
  margin: 5px;
}
</style>
