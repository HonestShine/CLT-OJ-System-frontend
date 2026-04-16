import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import * as monaco from 'monaco-editor'

declare global {
  interface Window {
    MonacoEnvironment?: {
      getWorker: (moduleId: string, label: string) => Worker
    }
  }
}

(self as Window).MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

// 定义符合项目系统的自定义主题
const customTheme: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark', // 基于官方暗色主题
  inherit: true, // 继承默认语法高亮规则
  rules: [
    { token: 'comment', foreground: '#617b91', fontStyle: 'italic' }, // 注释呈现斜体灰蓝
    { token: 'keyword', foreground: '#9333ea', fontStyle: 'bold' }, // 关键字加粗紫色
    { token: 'keyword.class', foreground: '#f97316', fontStyle: 'bold' }, // class关键字橙色
    { token: 'type', foreground: '#f97316' }, // 类型标识橙色
    { token: 'type.name', foreground: '#f97316' }, // 类型名橙色
    { token: 'type.name.class', foreground: '#f97316' }, // 类名橙色
    { token: 'string', foreground: '#22c55e' }, // 字符串绿色
    { token: 'number', foreground: '#3b82f6' }, // 数字蓝色
    { token: 'operator', foreground: '#c7cacf' }, // 运算符浅灰
    { token: 'delimiter', foreground: '#c7cacf' }, // 分隔符浅灰
    { token: 'function', foreground: '#facc15' }, // 函数名黄色
    { token: 'function.method', foreground: '#facc15' }, // 方法名黄色
    { token: 'variable', foreground: '#ffffff' }, // 变量名白色
    { token: 'variable.name', foreground: '#ffffff' }, // 变量名白色
  ],
  colors: {
    'editor.background': '#252837', // 编辑器背景
    'editor.foreground': '#c5cceb', // 默认前景文字
    'editor.lineHighlightBackground': '#29344c', // 当前行高亮背景
    'editor.inactiveSelectionBackground': 'rgba(69, 137, 255, 0.15)', // 未激活选区背景
    'editorCursor.foreground': '#c5cceb', // 光标颜色
    'editorWhitespace.foreground': '#535f79', // 空白字符提示色
    'editorIndentGuide.background': '#535f79', // 缩进指示线
    'editorIndentGuide.activeBackground': '#a9b1d6', // 活动缩进指示线
    'editorLineNumber.foreground': '#617b91', // 行号默认颜色
    'editorLineNumber.activeForeground': '#c5cceb', // 当前行号颜色
    'editorGutter.background': '#252837', // 行号区域背景
    'editorWidget.background': '#29344c', // 弹出组件背景
    'editorWidget.border': '#535f79', // 弹出组件边框
    'editorSuggestWidget.background': '#29344c', // 智能提示背景
    'editorSuggestWidget.border': '#535f79', // 智能提示边框
  },
}

// 注册自定义主题
monaco.editor.defineTheme('custom-dark', customTheme)
