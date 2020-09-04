# toggle-home package

![Quick demo](https://i.imgur.com/ghBI3RS.gif)

Modifies behaviour of `Home`, `End`, `Shift-Home` and `Shift-End` buttons and key combinations, similiar to Komodo Edit editor. Moves cursor to the begining of a soft-wrapped line, not to the begining of a virtual line. 

If cursor is in any virtual line other than first one of soft-wrapped line, and `Home` button is used, cursor first moves to the begining of current virtual line, and after another use of `Home` button, it moves to the begining of buffer.

If cursor is in any virtual line other than last one of soft-wrapped line, and `End` button is used, cursor first moves to the end of current virtual line, and after another use of `End` button, it moves to the end of buffer.

Combinations with `Shift` key allow to select text in soft-wrapped lines to the very begining and end of buffer.