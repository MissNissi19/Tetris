import React from 'react';

export const Tetrominos = {
        0: {shape: [0,0, 0], color: "white", touched: false },
        I: {shape: [
            ["I", 0, 0, 0], 
            ["I", 0, 0, 0], 
            ["I", 0, 0, 0], 
            ["I", 0, 0, 0]], 
           color: "rgb(255, 165, 0)", 
           touched: false,
        },
        
        J:{ shape: [
            [0,  0, "J"],
            ["J","J","J"],
            [0,   0,   0]
            ], 
           color: "rgb(0, 42, 255)",
           touched: false,
        },

        L:{ shape: [
            ["L",  0,  0],
            ["L",  0, 0],
            ["L", "L", "L"]
            ], 
           color: "rgb(227, 53, 120)",
           touched: false,
        },

        S:{ shape: [
                [0,  "S",  "S"],
                ["S",   "S", 0],
                [0, 0, 0]
            ], 
            color: "rgba(43, 242, 83, 0.95)",
            touched: false,
        },

        T:{ shape: [
                ["T",  "T",  "T"],
                [0,   "T",  0],
                [0, 0,   0]
            ], 
            color: "rgb(33, 24, 78)",
            touched: false,
        },

        Z:{ shape: [
                ["Z",  "Z",  0],
                [0,   "Z",  "Z"],
                [0, 0,   0]
            ], 
            color: "rgb(80, 111, 80)",
            touched: false,
        },

        O: {
            shape: [
              ["O", "O", 0],
              ["O", "O", 0],
              [0, 0, 0]
            ],
            color: "blue",
            touched: false,
          }
}
