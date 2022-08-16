export default {
  process: (content) => ({
    code: "module.exports = " + JSON.stringify(content)
  })
};