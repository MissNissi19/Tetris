

export const Tetrominos = {
        0: {shape: [0,0, 0], color: "#F0FFFF", touched: false },
        I: {shape: [
            ["I", 0, 0, 0], 
            ["I", 0, 0, 0], 
            ["I", 0, 0, 0], 
            ["I", 0, 0, 0]], 
           color: "#FCEC0B", 
           touched: false,
        },
        
        J:{ shape: [
            [0,  0, "J"],
            ["J","J","J"],
            [0,   0,   0]
            ], 
           color: "#094A20",
           touched: false,
        },

        L:{ shape: [
            ["L",  0,  0],
            ["L",  0, 0],
            ["L", "L", 0]
            ], 
           color: "#95054F",
           touched: false,
        },

        S:{ shape: [
                [0,  "S",  "S"],
                ["S",   "S", 0],
                [0, 0, 0]
            ], 
            color: "#545962",
            touched: false,
        },

        T:{ shape: [
                ["T",  "T",  "T"],
                [0,   "T",  0],
                [0, 0,   0]
            ], 
            color: "#FF69B4",
            touched: false,
        },

        Z:{ shape: [
                ["Z",  "Z",  0],
                [0,   "Z",  "Z"],
                [0, 0,   0]
            ], 
            color: "#5A1A87",
            touched: false,
        },

        O: {
            shape: [
              ["O", "O", 0],
              ["O", "O", 0],
              [0, 0, 0]
            ],
            color: "#40E0D0",
            touched: false,
          }
}
