import React, {DragEvent, useState} from 'react';
import './App.css'

type GroupType = {
    id: number
    name: string
}

type ItemType = {
    id: number
    rank: string,
    groups: GroupType[]
}

export const App = () => {

        const [boards, setBoards] = useState<ItemType[]>([
            {
                id: 1,
                rank: 'Mentor',
                groups: [
                    {id: 1, name: 'Viktor'},
                    {id: 2, name: 'Evgeny'},
                    {id: 3, name: 'Petya'}
                ]
            },
            {
                id: 2,
                rank: 'User',
                groups: [
                    {id: 4, name: 'Egor'},
                    {id: 5, name: 'Kolya'},
                    {id: 6, name: 'Tanya'}
                ]
            },
        ])

        const [currentBoard, setCurrentBoard] = useState({} as ItemType)
        const [currentItem, setCurrentItem] = useState({} as GroupType)


        function dragOverHandler(e: DragEvent<HTMLDivElement>) {
            e.preventDefault()
            if (e.currentTarget.className === 'item') {
                e.currentTarget.style.boxShadow = '0 4px 3px gray'
            }
        }

        function dragLeaveHandler(e: DragEvent<HTMLDivElement>) {
            e.currentTarget.style.boxShadow = 'none'
        }

        function dragStartHandler(e: DragEvent<HTMLDivElement>, board: ItemType, group: GroupType) {
            setCurrentBoard(board)
            setCurrentItem(group)
        }

        function dragEndHandler(e: DragEvent<HTMLDivElement>) {
            e.currentTarget.style.boxShadow = 'none'
        }

        function dragHandler(e: DragEvent<HTMLDivElement>, board: ItemType, group: GroupType) {
            e.preventDefault()
            e.stopPropagation()

            const currentIndex = currentBoard.groups.indexOf(currentItem)
            currentBoard.groups.splice(currentIndex, 1)

            const dropIndex = board.groups.indexOf(group)
            board.groups.splice(dropIndex + 1, 0, currentItem)

            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
        }

        function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: ItemType) {
            e.preventDefault()
            e.stopPropagation()

            board.groups.push(currentItem)

            const currentIndex = currentBoard.groups.indexOf(currentItem)
            currentBoard.groups.splice(currentIndex, 1)

            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))

        }

        return (
            <div className={'App'}>
                {boards.map((board) => (
                    <div key={board.id}
                         className={'board'}
                         onDragOver={(e) => dragOverHandler(e)}
                         onDrop={(e) => dropCardHandler(e, board)}
                    >
                        <div className={'board__title'}>{board.rank}</div>
                        {board.groups.map((group) => (
                            <div
                                key={group.id}
                                className={'item'}
                                draggable
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, group)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dragHandler(e, board, group)}
                            >
                                {group.name}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
;
