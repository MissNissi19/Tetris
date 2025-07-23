

export const Tetrominos = {
        0: {shape: [0,0, 0], color: "#242038", touched: false }, 
        I: {shape: [
            ["I", 0, 0, 0], 
            ["I", 0, 0, 0], 
            ["I", 0, 0, 0], 
            ["I", 0, 0, 0]], 
           color: "#FFA500", 
           touched: false,
        },
        
        J:{ shape: [
            [0,  0, "J"],
            ["J","J","J"],
            [0,   0,   0]
            ], 
           color: "#D300FF", 
           touched: false,
        },

        L:{ shape: [
            ["L",  0,  0],
            ["L",  0, 0],
            ["L", "L", 0]
            ], 
           color: "#FF007F", 
           touched: false,
        },

        S:{ shape: [
                [0,  "S",  "S"],
                ["S",   "S", 0],
                [0, 0, 0]
            ], 
            color: "#39FF14", 
           touched: false,
        },

        T:{ shape: [
                ["T",  "T",  "T"],
                [0,   "T",  0],
                [0, 0,   0]
            ], 
            color: "#00FFFF", 
            touched: false,
        },

        Z:{ shape: [
                ["Z",  "Z",  0],
                [0,   "Z",  "Z"],
                [0, 0,   0]
            ], 
            color: "#00FF00", 
            touched: false,
        },

        O: {
            shape: [
              ["O", "O", 0],
              ["O", "O", 0],
              [0, 0, 0]
            ],
            color: "#F9F900", 
            touched: false,
          }
}
