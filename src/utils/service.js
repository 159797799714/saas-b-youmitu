
export function link (data) {
  if (typeof (data) === Object) {
    this.$router.push(data.path)
  } else if (typeof (data) === String) {
    this.$router.push(data)
  }
}
