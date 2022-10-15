import { AStarMinHeap, Node, posToString } from "./priority_queue";

export function getAStarPath(startPos,endPos,grid) {
    
    const endNode = AStar(startPos,endPos,grid);

    let path = [];
    let currentNode = endNode;

    while (currentNode != null) {
    	path.unshift (currentNode);
    	currentNode = currentNode.pathParent;
    }
    
    return path;
}

function AStar(startPos, endPos, grid, row_nums, col_nums){

    let aStarHeap = AStarMinHeap();

    let closedListSet = new Set();

    const startNode = new Node(startPos,endPos,0,null);
    aStarHeap.insert(startNode);

    let leastValueNode = null;

    while(aStarHeap.size() !== 0){

        if(leastValueNode != null
            && aStarHeap.isNodeInOpenList(endPos)
            && (leastValueNode.path_cost_g > aStarHeap.heap[aStarHeap.openList.getNodeInOpenList(endPos)].path_cost_g))
            break;
        
        leastValueNode = aStarHeap.getMinNode();

        closedListSet.add(leastValueNode);
        
        let adjacents = getAdjacents(leastValueNode,grid);

        for(let adjacent = 0; adjacent < adjacents.length; adjacent++){
            let distance = leastValueNode.path_cost_g+1;
            let currentAdjacentPos = adjacents[adjacent];
          	
          	if(!closedListSet.has(posToString(currentAdjacentPos)))
          	{       
          			if(!aStarHeap.isNodeInOpenList(currentAdjacentPos))
                    {
                        const currentAdjacentNode = new Node(currentAdjacentPos,endPos,distance,leastValueNode);
                        aStarHeap.insert(currentAdjacentNode);
                    }
                    else
                        aStarHeap.updateNodeIfLessPathCost(currentAdjacentPos,distance,leastValueNode,endPos);
            }
          	
        }

    }

    if(!aStarHeap.isNodeInOpenList(endPos))
        return null;

    return aStarHeap.getNodeInOpenList(endPos);
}

function getAdjacents(leastValueNode,grid,closedListSet){
    let neighbours_list = [];
    let row = leastValueNode.pos[0];
    let column = leastValueNode.pos[1];

    if(row!==0){
        if((grid[row][col] === 0) && (!closedListSet.has(posToString(pos[0],pos[1]))))
        neighbours_list.push(grid[row-1][column]);
    }
    if(column!==0){
        if((grid[row][col] === 0) && (!closedListSet.has(posToString(pos[0],pos[1]))))
        neighbours_list.push(grid[row][column-1]);
    }
    if(column !== grid[0].length-1){
        if((grid[row][col] === 0) && (!closedListSet.has(posToString(pos[0],pos[1]))))
        neighbours_list.push(grid[row][column+1])
    }
    if(row !== grid.length-1){
        if((grid[row][col] === 0) && (!closedListSet.has(posToString(pos[0],pos[1]))))
        neighbours_list.push(grid[row+1][column]);
    }

    return neighbours_list;
}

