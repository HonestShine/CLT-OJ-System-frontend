/**
 * 格式化题目编号为 T0001 形式
 * @param {number|string} problemId - 题目ID
 * @returns {string} 格式化后的题目编号
 */
export const formatProblemId = (problemId) => {
  return 'T' + String(problemId).padStart(4, '0')
}
