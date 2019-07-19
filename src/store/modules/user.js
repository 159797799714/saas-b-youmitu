import { login } from '@/api/login'
import { getToken, setToken, removeToken, getId, setId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    leftItem: '',
    id: getId()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ID: (state, id) => {
      state.id = id
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // 判断是否成功，成功即进行存储id和token
          if (response.data.code === 0) {
            const id = response.data.data.id
            const data = response.headers['authorization']
            setToken(data)
            setId(id)
            commit('SET_ID', id)
            commit('SET_TOKEN', data)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
          // console.log(error)
        })
      })
    },
    // 外部跳转携带token
    OutSetToken ({ commit }, token) {
      return new Promise((resolve, reject) => {
        setToken(token)
        commit('SET_TOKEN', token)
        resolve(true)
      })
    },
    // 获取用户信息
    //     GetInfo ({ commit, state }) {
    //       return new Promise((resolve, reject) => {
    //         getInfo(state.token).then(response => {
    //           const data = response.data
    //           if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //             commit('SET_ROLES', data.roles)
    //           } else {
    //             reject('getInfo: roles must be a non-null array !')
    //           }
    //           commit('SET_NAME', data.name)
    //           commit('SET_AVATAR', data.avatar)
    //           resolve(response)
    //         }).catch(error => {
    //           reject(error)
    //         })
    //       })
    //     },
    //
    //     // 登出
    //     LogOut ({ commit, state }) {
    //       return new Promise((resolve, reject) => {
    //         logout(state.token).then(() => {
    //           commit('SET_TOKEN', '')
    //           commit('SET_ROLES', [])
    //           removeToken()
    //           resolve()
    //         }).catch(error => {
    //           reject(error)
    //         })
    //       })
    //     },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
