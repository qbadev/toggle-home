'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'toggle-home:home': () => this.toggleHome(),
      'toggle-home:end': () => this.toggleEnd(),
      'toggle-home:shifthome': () => this.toggleShiftHome(),
      'toggle-home:shiftend': () => this.toggleShiftEnd()
    }));

  },

  deactivate() {

    this.subscriptions.dispose();

  },

  toggleHome() {

    var editor = atom.workspace.getActiveTextEditor()
    var cursor = editor.getCursors()[0]
    
    const screenRow = cursor.getScreenRow()
    const bufferCol = cursor.getBufferColumn()
    const screenLineBufferRange = editor.bufferRangeForScreenRange([editor.clipScreenPosition([screenRow, 0], {skipSoftWrapIndentation: false}), [screenRow, Infinity]])
    
    if (screenLineBufferRange.start.column > 0) {
      if (screenLineBufferRange.start.column == bufferCol) {
        editor.moveToBeginningOfLine()
      }
    }
    editor.moveToFirstCharacterOfLine()

  },

  toggleEnd() {

    var editor = atom.workspace.getActiveTextEditor()
    var screenPos = editor.getCursorScreenPosition()

    var screenLineEnd = editor.clipScreenPosition([screenPos.row, Infinity], {skipSoftWrapIndentation: true})

    if(screenPos.column != screenLineEnd.column){
      editor.moveToEndOfScreenLine()
    }
    else{
      editor.moveToEndOfLine()
    }

  },

  toggleShiftHome() {

    var editor = atom.workspace.getActiveTextEditor()
    var cursor = editor.getCursors()[0]
    
    const screenRow = cursor.getScreenRow()
    const bufferCol = cursor.getBufferColumn()
    const screenLineBufferRange = editor.bufferRangeForScreenRange([editor.clipScreenPosition([screenRow, 0], {skipSoftWrapIndentation: false}), [screenRow, Infinity]])
    
    if (screenLineBufferRange.start.column > 0) {
      if (screenLineBufferRange.start.column == bufferCol) {
        editor.selectToBeginningOfLine()
      }
    }
    editor.selectToFirstCharacterOfLine()

  },

  toggleShiftEnd() {

    var editor = atom.workspace.getActiveTextEditor()
    var screenPos = editor.getCursorScreenPosition()

    var screenLineEnd = editor.clipScreenPosition([screenPos.row, Infinity], {skipSoftWrapIndentation: true})

    if(screenPos.column != screenLineEnd.column){
      editor.selectToEndOfLine()
    }
    else{
      var row = editor.getCursorBufferPosition().row
      var bufferEnd = editor.clipBufferPosition([row, Infinity], {skipSoftWrapIndentation: true})
      editor.selectToBufferPosition(bufferEnd)
    }

  }

};
