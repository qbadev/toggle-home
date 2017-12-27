'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'toggle-home:toggle': () => this.toggle()
    }));

  },

  deactivate() {

    this.subscriptions.dispose();

  },

  toggle() {

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

  }

};
