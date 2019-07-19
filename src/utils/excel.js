import FileSaver from 'file-saver'
import XLSX from 'xlsx'

// 导出excel表
export function exportExcel (idName, excelName) {
  /* 把哪一块转换成excel表 */
  var wb = XLSX.utils.table_to_book(document.querySelector(idName))
  /* 获取字符串输出 */
  var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
  try {
    /* 给导出的excel命名 */
    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), excelName + '.cvs')
  } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
  /* 输出 */
  return wbout
}
