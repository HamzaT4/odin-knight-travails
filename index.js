
const knightVer = function(pos){return{
    position: pos || null,
    availableMoves:[pos[0]+1<=7 && pos[1]+2<=7 ? [pos[0]+1,pos[1]+2]:null,
                    pos[0]+2<=7 && pos[1]+1<=7 ? [pos[0]+2,pos[1]+1]:null,
                    pos[0]+2<=7 && pos[1]-1>=0 ? [pos[0]+2,pos[1]-1]:null,
                    pos[0]+1<=7 && pos[1]-2>=0 ? [pos[0]+1,pos[1]-2]:null,
                    pos[0]-2>=0 && pos[1]+1<=7 ? [pos[0]-2,pos[1]+1]:null,
                    pos[0]-1>=0 && pos[1]+2<=7 ? [pos[0]-1,pos[1]+2]:null,
                    pos[0]-2>=0 && pos[1]-1>=0 ? [pos[0]-2,pos[1]-1]:null,
                    pos[0]-1>=0 && pos[1]-2>=0 ? [pos[0]-1,pos[1]-2]:null,
                ],
}};

const gameBoard = function(){return{
    queue:[],
    path:[],
    visited:[],
    distance:[],
    parents:[],
    findThePath:function (pos,tar) {
        
        if (pos==0) {
            this.path.shift();
            return this.path;
        }else{
            this.path.unshift(this.parents[pos[0]][pos[1]]);
            this.findThePath(this.parents[pos[0]][pos[1]]) ;

        }
    },
    knightMoves:function (pos,target) {
        this.distance=Array(8).fill().map(() => Array(8).fill(Infinity));
        this.parents=Array(8).fill().map(() => Array(8).fill(null));
        this.queue.push(pos);
        this.distance[pos[0]][pos[1]]=0;
        this.parents[pos[0]][pos[1]]=0;
        this.visited.push(pos)
       
           
        
        while (this.queue.length>=1) {     
            let x = knightVer(this.queue.shift()) ;
            if (x.position[0]==target[0]&&x.position[1]==target[1]) {

                break;
            }
           
           x.availableMoves.forEach(move => {
            if (!this.visited.some(arr => JSON.stringify(arr) === JSON.stringify(move))&& move!=null) {
                this.visited.push(move)
                this.queue.push(move);
                this.distance[move[0]][move[1]]=this.distance[x.position[0]][x.position[1]]+1
                this.parents[move[0]][move[1]]=[x.position[0],x.position[1]];

            }
            
           });
  
        }
        this.path.push(target);
         this.findThePath([target[0],target[1]]);
         console.log(this.path);
        console.log(`=> You made it in ${this.distance[target[0]][target[1]]} moves!  Here's your path:`);
        this.path.forEach(element => {
            console.log(element);
        });
    }
   
}}; 

let game1=gameBoard();
game1.knightMoves([3,3],[4,3]);

