const levels = [
    {width: 9,
     height: 9,
     data: [
	 ["D",0,0,0,0,0,0,0,0],
	 [0,"C","C","C",0,"C","C","C",0],
	 [0,"C","B",0,0,0,"C","C",0],
	 [0,"C",0,0,0,0,0,"C",0],
	 [0,0,0,0,"A",0,0,0,0],
	 [0,"C",0,0,0,0,0,"C",0],
	 [0,"C","C",0,0,0,"B","C",0],
	 [0,"C","C","C",0,"C","C","C",0],
	 [0,0,0,0,0,0,0,0,"D"]
     ]
    },
    {width: 9,
     height: 9,
     data: [
	 [0,0,0,0,"D",0,0,0,0],
	 [0,"C","C","C","C","C","C","C",0],
	 [0,"C","C","C","C","C","C","C",0],
	 [0,0,0,0,0,0,0,0,0],
	 [0,0,0,0,"A",0,0,0,0],
	 [0,0,0,0,0,0,0,0,0],
	 [0,"C","C","C","C","C","C","C",0],
	 [0,"C","C","C","C","C","C","C",0],
	 [0,0,0,0,"D",0,0,0,0]
     ]
    },
    {width: 9,
     height: 9,
     data: [
	 [0,0,0,0,"A",0,0,0,0],
	 ["C","B","C",0,0,0,"C","B","C"],
	 [0,"B","B","C",0,"C","B","B",0],
	 [0,"B",0,0,0,0,0,"B",0],
	 ["D","B",0,0,0,0,0,"B","D"],
	 [0,"B","C",0,0,0,"C","B",0],
	 [0,"B","B","C",0,"C","B","B",0],
	 [0,"B",0,0,0,0,0,"B",0],
	 [0,0,0,"C",0,"C",0,0,0]
     ]
    },
    {width: 9,
     height: 9,
     data: [
	 [0,0,0,0,0,0,0,0,0],
	 [0,"C","C","C",0,"C","C","C",0],
	 [0,0,"D","B",0,"B","D",0,0],
	 [0,"C","B","B",0,"B","B","C",0],
	 [0,0,0,0,"A",0,0,0,0],
	 [0,"C","B","B",0,"B","B","C",0],
	 [0,0,"D","B",0,"B","D",0,0],
	 [0,"C","C","C",0,"C","C","C",0],
	 [0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 9,
     height: 9,
     data: [
	 [0,0,0,0,0,"B",0,0,"D"],
	 [0,0,"C",0,0,"B",0,0,0],
	 [0,0,"C",0,0,"B",0,"C","C"],
	 ["C","C","B","B",0,"B",0,0,0],
	 [0,0,0,"B","A","B",0,0,0],
	 [0,0,0,"B",0,"B","B","C","C"],
	 ["C","C",0,"B",0,0,"C",0,0],
	 [0,0,0,"B",0,0,"C",0,0],
	 ["D",0,0,"B",0,0,0,0,0]
     ]
    },
    {width: 9,
     height: 9,
     data: [
	 [0,0,0,0,0,0,0,0,0],
	 [0,"C","C","C","C","C","C","C",0],
	 [0,"C","C",0,0,0,"C","C",0],
	 [0,"C",0,"D",0,"D",0,"C",0],
	 [0,0,0,0,"B",0,0,0,0],
	 [0,"C",0,"D",0,"D",0,"C",0],
	 [0,"C","C",0,0,0,"C","C",0],
	 [0,"C","C","C","C","C","C","C",0],
	 [0,0,0,0,"A",0,0,0,0]
     ]
    },
    {width: 20,
     height: 10,
     data: [
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,"C",0,"C",0,"C",0,0,0,0,0,0,0,0,"C",0,"C",0,"C",0],
	 [0,"C",0,"C",0,"C",0,0,0,"B","B",0,0,0,"C",0,"C",0,"C",0],
	 [0,"C",0,"C",0,"C",0,"B","B","B","B","B","B",0,"C",0,"C",0,"C",0],
	 [0,"C","D","C",0,"C",0,0,0,0,0,0,0,0,"C",0,"C","D","C",0],
	 [0,"C",0,"C","D","C",0,0,0,"A",0,0,0,0,"C","D","C",0,"C",0],
	 [0,"C",0,"C",0,"C",0,"B","B","B","B","B","B",0,"C",0,"C",0,"C",0],
	 [0,"C",0,"C",0,"C",0,0,0,"B","B",0,0,0,"C",0,"C",0,"C",0],
	 [0,"C",0,"C",0,"C",0,0,0,0,0,0,0,0,"C",0,"C",0,"C",0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 20,
     height: 10,
     data: [
	 [0,0,0,0,"B",0,0,0,0,0,0,0,0,0,0,"B",0,0,0,0],
	 [0,0,0,0,0,0,0,0,0,"A",0,0,0,0,0,0,0,0,0,0],
	 [0,0,0,0,"B",0,0,0,0,0,0,0,0,0,0,"B",0,0,0,0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 ["C","C","C","C","B","C","C","C","C","C","C","C","C","C","C","B","C","C","C",0],
	 [0,0,0,"D",0,0,0,0,0,0,0,0,0,0,0,0,"D",0,0,0],
	 [0,"C","C","C","B","C","C","C","C","C","C","C","C","C","C","B","C","C","C","C"],
	 [0,0,0,"D",0,0,0,0,0,0,0,0,0,0,0,0,"D",0,0,0],
	 ["C","C","C","C","B","C","C","C","C","C","C","C","C","C","C","B","C","C","C",0],
	 [0,0,0,"D",0,0,0,0,0,0,0,0,0,0,0,0,"D",0,0,0]
     ]
    },
    {width: 20,
     height: 10,
     data: [
	 ["D",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"D"],
	 [0,0,0,0,0,0,0,"C",0,0,0,0,"C",0,0,0,0,0,0,0],
	 [0,0,"B","B",0,0,0,"C",0,0,0,0,"C",0,0,0,"B","B",0,0],
	 ["C","C","B","B","C","C","C","C",0,0,0,0,"C","C","C","C","B","B","C","C"],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,0,0,0,0,0,0,0,0,"A",0,0,0,0,0,0,0,0,0,0],
	 ["C","C","B","B","C","C","C","C",0,0,0,0,"C","C","C","C","B","B","C","C"],
	 [0,0,"B","B",0,0,0,"C",0,0,0,0,"C",0,0,0,"B","B",0,0],
	 [0,0,0,0,0,0,0,"C",0,0,0,0,"C",0,0,0,0,0,0,0],
	 ["D",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"D"]
     ]
    },
    {width: 20,
     height: 10,
     data: [
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,"C","C",0,0,"C","C","C","C","C","C","C","C","C","C",0,0,"C","C",0],
	 [0,0,0,0,0,"C",0,0,0,0,0,0,0,0,"C",0,0,"D",0,0],
	 [0,0,0,0,0,"C",0,"D",0,0,0,0,"D",0,"C",0,0,0,0,0],
	 [0,0,0,0,0,"C",0,"B",0,0,0,0,"B",0,0,0,0,"C",0,0],
	 [0,0,0,0,0,"C",0,"B",0,0,0,0,"B",0,0,0,0,"C",0,0],
	 [0,0,0,0,0,"C",0,"D",0,0,0,0,"D",0,"C",0,0,0,0,0],
	 [0,0,0,0,0,"C",0,0,0,0,0,0,0,0,"C",0,0,"A",0,0],
	 [0,"C","C",0,0,"C","C","C","C","C","C","C","C","C","C",0,0,"C","C",0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 20,
     height: 10,
     data: [
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,"C","C","C","C","C","B","B","B","B",0,"B","B","B","B","C","C","C","C",0],
	 [0,"C","C","C","C","C",0,"B",0,"B","A","B",0,"B",0,"C","C","C","C",0],
	 [0,"C","C","C","C","C",0,0,"D",0,0,0,"D",0,0,"C","C","C","C",0],
	 [0,"C","C","C","C","C",0,0,"D",0,0,0,"D",0,0,"C","C","C","C",0],
	 [0,"C","C","C","C","C",0,0,"D",0,0,0,"D",0,0,"C","C","C","C",0],
	 [0,"C","C","C","C","C",0,0,"D",0,0,0,"D",0,0,"C","C","C","C",0],
	 [0,"C","C","C","C","C",0,"B",0,"B",0,"B",0,"B",0,"C","C","C","C",0],
	 [0,"C","C","C","C","C","B","B","B","B",0,"B","B","B","B","C","C","C","C",0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 20,
     height: 10,
     data: [
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,"B",0,"B",0,"B",0,"B",0,"B",0,"B",0,"B",0,"B",0,"B","B",0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"B",0],
	 [0,"B",0,"C",0,"C",0,"C",0,"C",0,"C",0,"C",0,"C",0,"C","B",0],
	 [0,0,"D",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"B",0],
	 [0,"B",0,"C",0,"C",0,"C",0,"C",0,"C",0,"C",0,"C",0,"C","B",0],
	 [0,0,0,0,0,0,0,0,"D",0,0,0,0,0,0,"D","D",0,"B",0],
	 [0,"B",0,"C",0,"C",0,"C",0,"C",0,"C",0,"C",0,"C",0,"C","B",0],
	 [0,"B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B",0],
	 [0,0,0,0,0,"A",0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 25,
     height: 15,
     data: [
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,"C","C",0,0,"C","B",0,0,"C","C",0,0,0,"C","C",0,0,"B","C",0,0,"C","C",0],
	 ["D","C","C",0,0,"B","C",0,0,"C","C",0,0,0,"C","C",0,0,"C","B",0,0,"C","C","D"],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,"B","B",0,0,"B","C",0,0,"B","B",0,0,0,"B","B",0,0,"C","B",0,0,"B","B",0],
	 [0,"B","B",0,0,"C","B",0,0,"C","C",0,"A",0,"C","C",0,0,"B","C",0,0,"B","B",0],
	 [0,"B","B",0,0,"B","C",0,0,"B","B",0,0,0,"B","B",0,0,"C","B",0,0,"B","B",0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 ["D","C","C",0,0,"B","C",0,0,"C","C",0,0,0,"C","C",0,0,"C","B",0,0,"C","C","D"],
	 [0,"C","C",0,0,"C","B",0,0,"C","C",0,0,0,"C","C",0,0,"B","C",0,0,"C","C",0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 25,
     height: 15,
     data: [
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,"C","B","C","C","C",0,0,0,0,"C",0,0,0,"C",0,0,0,0,"C","C","C","B","C",0],
	 [0,"C","B",0,0,0,0,0,0,0,"C",0,0,0,"C",0,0,0,0,0,0,0,"B","C",0],
	 [0,"C","B",0,0,0,0,0,0,0,"C","C","C","C","C",0,0,0,0,0,0,0,"B","C",0],
	 [0,"C","B",0,0,"D",0,0,0,0,0,0,0,0,0,0,0,0,0,"D",0,0,"B","C",0],
	 [0,"C","B",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"B","C",0],
	 [0,0,"B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","A",0],
	 [0,"C","B",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"B","C",0],
	 [0,"C","B",0,0,"D",0,0,0,0,0,0,0,0,0,0,0,0,0,"D",0,0,"B","C",0],
	 [0,"C","B",0,0,0,0,0,0,0,"C","C","C","C","C",0,0,0,0,0,0,0,"B","C",0],
	 [0,"C","B",0,0,0,0,0,0,0,"C",0,0,0,"C",0,0,0,0,0,0,0,"B","C",0],
	 [0,"C","B","C","C","C",0,0,0,0,"C",0,0,0,"C",0,0,0,0,"C","C","C","B","C",0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 25,
     height: 15,
     data: [
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	 [0,"C","C","C","C",0,"C","C","C","C","C",0,"C",0,"C","C","C","C","C",0,"C","C","C","C",0],
	 [0,"C",0,0,"C",0,"C",0,0,0,"C",0,"B",0,"C",0,0,0,"C",0,"C",0,0,"C",0],
	 [0,"C",0,0,"C",0,"C",0,0,0,"C",0,"C",0,"C",0,0,0,"C",0,"C",0,0,"C",0],
	 [0,"C","C","C","C",0,"C","C","C","C","C",0,"B",0,"C","C","C","C","C",0,"C","C","C","C",0],
	 [0,"D",0,0,0,0,0,0,0,0,0,0,"C",0,0,0,0,0,0,0,0,0,0,"D",0],
	 [0,"C","C","C","C",0,"C","C","C","C","C",0,"B",0,"C","C","C","C","C",0,"C","C","C","C",0],
	 [0,"C",0,0,"C",0,"C",0,0,0,"C",0,"C",0,"C",0,0,0,"C",0,"C",0,"A","C",0],
	 [0,"C","C","C","C",0,"C","C","C","C","C",0,"B",0,"C","C","C","C","C",0,"C","C","C","C",0],
	 [0,"D",0,0,0,0,0,0,0,0,0,0,"C",0,0,0,0,0,0,0,0,0,0,"D",0],
	 [0,"C","C","C","C",0,"C","C","C","C","C",0,"B",0,"C","C","C","C","C",0,"C","C","C","C",0],
	 [0,"C",0,0,"C",0,"C",0,0,0,"C",0,"C",0,"C",0,0,0,"C",0,"C",0,0,"C",0],
	 [0,"C",0,0,"C",0,"C",0,0,0,"C",0,"B",0,"C",0,0,0,"C",0,"C",0,0,"C",0],
	 [0,"C","C","C","C",0,"C","C","C","C","C",0,"C",0,"C","C","C","C","C",0,"C","C","C","C",0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 25,
     height: 15,
     data: [
	 [0,0,0,0,0,0,0,0,0,0,0,0,"B","B",0,0,0,0,0,0,0,0,0,0,0],
	 [0,"B","C","C","C","C","C","C","C","C","C",0,0,0,0,"C","C","C","C","C","C","C","C","B",0],
	 [0,"C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C",0],
	 [0,"C","C",0,0,0,0,0,0,0,"C","C","C","C","C","C",0,0,0,0,0,0,"C","C",0],
	 [0,"C","C",0,0,0,0,0,0,0,0,0,"C","C",0,0,0,0,0,0,"D",0,"C","C",0],
	 [0,"C","C",0,0,0,0,0,0,0,0,0,0,0,0,0,0,"D",0,0,0,0,"C","C",0],
	 [0,"C","C",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"D",0,"C","C",0],
	 [0,"C","C",0,0,0,0,"A",0,0,0,0,0,0,0,0,0,0,0,0,0,0,"C","C",0],
	 [0,"C","C",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"D",0,"C","C",0],
	 [0,"C","C",0,0,0,0,0,0,0,0,0,0,0,0,0,0,"D",0,0,0,0,"C","C",0],
	 [0,"C","C",0,0,0,0,0,0,0,0,0,"C","C",0,0,0,0,0,0,"D",0,"C","C",0],
	 [0,"C","C",0,0,0,0,0,0,0,"C","C","C","C","C","C",0,0,0,0,0,0,"C","C",0],
	 [0,"C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C",0],
	 [0,"B","C","C","C","C","C","C","C","C","C",0,0,0,0,"C","C","C","C","C","C","C","C","B",0],
	 [0,0,0,0,0,0,0,0,0,0,0,0,"B","B",0,0,0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 10,
     height: 15,
     data: [
	 [0,0,0,0,0,0,0,0,0,0],
	 [0,"C","C",0,"C",0,0,0,0,0],
	 [0,0,0,0,0,"A","B","B","B",0],
	 [0,"C","C",0,"C",0,"B",0,0,0],
	 [0,0,0,0,0,0,"B",0,0,0],
	 [0,"C","C",0,"C",0,"B","B","B",0],
	 [0,0,0,0,0,0,"B",0,0,"D"],
	 [0,"C","C",0,"C",0,"B",0,0,0],
	 [0,0,0,0,0,0,"B","B","B",0],
	 [0,"C","C",0,"C",0,"B",0,0,"D"],
	 [0,0,0,0,0,0,"B","B","B",0],
	 [0,"C","C",0,"C",0,"B",0,0,0],
	 [0,0,0,0,0,0,"B",0,0,0],
	 [0,"C","C",0,"C",0,"B","B","B","D"],
	 [0,0,0,0,0,0,"B",0,0,0]
     ]
    },
    {width: 10,
     height: 15,
     data: [
	 [0,0,0,0,0,0,0,0,0,0],
	 [0,"B","C","B","C",0,"B","C","B",0],
	 [0,"B","C","B","C",0,"B","C","B",0],
	 [0,"B","C","B","C",0,"B","C","B",0],
	 [0,0,0,0,0,0,0,0,0,0],
	 [0,0,"C",0,"D","C",0,"C",0,0],
	 [0,"B","C","B","D","C","B","C","B",0],
	 [0,"B","C","B","D","C","B","C","B",0],
	 [0,"B","C","B","D","C","B","C","B",0],
	 [0,"B",0,"B","D",0,"B",0,"B",0],
	 [0,0,0,0,0,0,0,0,0,0],
	 [0,"B","C","B","C",0,"B","C","B",0],
	 [0,"B","C","B","C",0,"B","C","B",0],
	 [0,"B","C","B","C",0,"B","C","B",0],
	 [0,0,0,0,0,0,0,0,0,"A"]
     ]
    },
    {width: 10,
     height: 15,
     data: [
	 ["D",0,0,0,0,0,0,0,0,"D"],
	 [0,"B","B","B",0,0,"B","B","B",0],
	 [0,"C","C","C","C","C","C","C","C",0],
	 [0,"B",0,"B",0,0,"B",0,"B",0],
	 [0,"C",0,0,0,0,0,0,"C",0],
	 [0,0,0,"C",0,0,"C",0,0,0],
	 [0,0,0,"B",0,0,"B",0,0,0],
	 [0,"C","C","C",0,0,"C","C","C",0],
	 [0,0,0,"B",0,0,"B",0,0,0],
	 [0,0,0,"C",0,0,"C",0,0,0],
	 [0,"C",0,0,0,0,0,0,"C",0],
	 [0,"B",0,"B","A",0,"B",0,"B",0],
	 [0,"C","C","C","C","C","C","C","C",0],
	 [0,"B","B","B","D","D","B","B","B",0],
	 [0,0,0,0,0,0,0,0,0,0]
     ]
    },
    {width: 10,
     height: 15,
     data: [
	 [0,0,0,0,0,0,0,0,0,0],
	 [0,"C",0,"C",0,0,"C","C","C",0],
	 [0,"C","D","C",0,0,"C","D","C",0],
	 [0,"C","C","C",0,0,"C",0,"C",0],
	 [0,0,0,0,0,0,0,0,0,0],
	 [0,0,"B","B","B","B","B","B",0,0],
	 [0,0,0,"C","C","C","C",0,0,0],
	 [0,"A",0,"C","C","C","C",0,0,0],
	 [0,0,0,"C","C","C","C",0,0,0],
	 [0,0,"B","B","B","B","B","B",0,0],
	 [0,0,0,0,0,0,0,0,0,0],
	 [0,"C","C","C",0,0,"C",0,"C",0],
	 [0,"C","D","C",0,0,"C","D","C",0],
	 [0,"C",0,"C",0,0,"C","C","C",0],
	 [0,0,0,0,0,0,0,0,0,0]
     ]
    }
];

export default levels;
